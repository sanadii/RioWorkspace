from django.db import models
from workspace.models.clients import Client
from workspace.models.staff import Staff


# Service Model
class AppointmentService(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    # change staff_member to many to many we will use service provider
    staff_member = models.ForeignKey(Staff, on_delete=models.CASCADE)

    
    def __str__(self):
        return self.name

    class Meta:
        # managed = False
        db_table = "appointment_service"

# Appointment Model
class Appointment(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    appointment_date = models.DateTimeField()
    services = models.ManyToManyField(AppointmentService)
    subject = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    category_color = models.CharField(max_length=100)
    staff_member = models.ForeignKey(Staff, on_delete=models.CASCADE)

    is_all_day = models.BooleanField(default=False)
    recurrence_rule = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f"Appointment with {self.client} on {self.appointment_date}"

    class Meta:
        # managed = False
        db_table = "appointment"

    
# Service Provider Model
class ServiceProvider(models.Model):
    service = models.ForeignKey(AppointmentService, on_delete=models.CASCADE)
    employee = models.ForeignKey(Staff, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.employee} - {self.service}"
    
    class Meta:
        # managed = False
        db_table = "service_provider"
