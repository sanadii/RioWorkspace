from django.db import models

# Client Model
class Client(models.Model):
    name = models.CharField(max_length=100)
    contact_number = models.CharField(max_length=15)
    email = models.EmailField(blank=True, null=True)
    address = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

from django.db import models

class Appointment(models.Model):
    Subject = models.CharField(max_length=255)
    Location = models.CharField(max_length=255)
    StartTime = models.DateTimeField()
    EndTime = models.DateTimeField()
    IsAllDay = models.BooleanField(default=False)
    StartTimezone = models.CharField(max_length=255, null=True, blank=True)
    EndTimezone = models.CharField(max_length=255, null=True, blank=True)
    Description = models.TextField(null=True, blank=True)
    RecurrenceRule = models.CharField(max_length=255, null=True, blank=True)
    Id = models.PositiveIntegerField()

    def __str__(self):
        return self.Subject
