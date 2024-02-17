from django.db import models
from workspace.models.clients import Client
from workspace.models.staff import Staff
from workspace.models.resources import ResourceItem
from workspace.models.services import Service

STATUS_CHOICES = [
    (1, 'pencilled-in'),
    (2, 'not-started'),
    (3, 'arrived'),
    (4, 'started'),
    (5, 'finished'),
    (6, 'did-not-show'),
    (7, 'cancelled'),
]


class AppointmentService(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    duration = models.PositiveIntegerField(default=30)
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE)
    resources = models.ManyToManyField(ResourceItem, blank=True)

    def __str__(self):
        return str(self.service)

    class Meta:
        db_table = "appointment_service"



# Appointment Model
class Appointment(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    status = models.IntegerField(choices=STATUS_CHOICES, default=1, blank=True, null=True)
    services = models.ManyToManyField(AppointmentService, related_name='appointments')
    # recurrence_rule = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f"Appointment with {self.client} on {self.start_time}"

    def allocate_resources(self):
        # Logic to allocate resources based on minimize_switching and match_resources settings
        pass

    class Meta:
        db_table = "appointment"


# Service Model

# Service Provider Model


class ServiceProvider(models.Model):
    service = models.ForeignKey(AppointmentService, on_delete=models.CASCADE)
    employee = models.ForeignKey(Staff, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.employee} - {self.service}"

    class Meta:
        db_table = "service_provider"

class Invoice(models.Model):
    appointment = models.ForeignKey(Appointment, on_delete=models.CASCADE)
    account_type = models.CharField(max_length=100, choices=[('revenue', 'Revenue')])
    invoice_type = models.CharField(max_length=100, choices=[('appointment', 'Appointment'), ('product', 'Product'), ('package', 'Package')])
    description = models.TextField()
    quantity = models.PositiveIntegerField(default=1)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    is_paid = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Invoice {self.id} for {self.appointment}"

    class Meta:
        db_table = "invoice"


class Transaction(models.Model):
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE)
    transaction_type = models.CharField(max_length=100, choices=[('cash', 'Cash'), ('credit', 'Credit'), ('link', 'Link'), ('others', 'Others')])
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Transaction {self.id} for Invoice {self.invoice.id}"

    class Meta:
        db_table = "transaction"

