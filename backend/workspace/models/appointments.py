from django.db import models
from workspace.models.clients import Client
from workspace.models.staff import Staff
from workspace.models.resources import ResourceItem
from workspace.models.services import Service


class AppointmentService(models.Model):
    # appointment = models.ForeignKey(Appointment, on_delete=models.CASCADE)
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
    date = models.DateTimeField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    recurrence_rule = models.CharField(max_length=255, null=True, blank=True)
    services = models.ManyToManyField(AppointmentService, related_name='appointments')

    def __str__(self):
        return f"Appointment with {self.client} on {self.appointment_date}"

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
