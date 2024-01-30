from django.db import models
from apps.clients.models import Client
from apps.staff.models import Staff

# Appointment Model
class Appointment(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    appointment_date = models.DateTimeField()
    services = models.ManyToManyField('AppointmentService')
    
    def __str__(self):
        return f"Appointment with {self.client} on {self.appointment_date}"

# Service Model
class AppointmentService(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    # change staff_member to many to many we will use service provider
    staff_member = models.ForeignKey(Staff, on_delete=models.CASCADE)

    
    def __str__(self):
        return self.name

# Service Provider Model
class ServiceProvider(models.Model):
    service = models.ForeignKey(AppointmentService, on_delete=models.CASCADE)
    employee = models.ForeignKey(Staff, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.employee} - {self.service}"