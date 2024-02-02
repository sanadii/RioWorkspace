from django.db import models
from workspace.models.services import Service  # Import the Service model from your 'services' app

class Staff(models.Model):
    name = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    telephone = models.CharField(max_length=15, blank=True, null=True)
    sms_number = models.CharField(max_length=15, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    normal_working_hours = models.CharField(max_length=255, blank=True, null=True)
    online_booking_interval = models.PositiveIntegerField(default=15)
    reset_online_booking_time_after_break = models.BooleanField(default=True)
    monday_working_hours = models.CharField(max_length=255, blank=True, null=True)
    tuesday_working_hours = models.CharField(max_length=255, blank=True, null=True)
    wednesday_working_hours = models.CharField(max_length=255, blank=True, null=True)
    thursday_working_hours = models.CharField(max_length=255, blank=True, null=True)
    friday_working_hours = models.CharField(max_length=255, blank=True, null=True)
    saturday_working_hours = models.CharField(max_length=255, blank=True, null=True)
    sunday_working_hours = models.CharField(max_length=255, blank=True, null=True)
    working_on_sunday = models.BooleanField(default=True)
    online_booking_enabled = models.BooleanField(default=True)
    show_on_mini_website = models.BooleanField(default=True)
    alias_nickname = models.CharField(max_length=100, blank=True, null=True)
    reference_number_type = models.CharField(max_length=100, blank=True, null=True)
    job_title = models.CharField(max_length=100, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    message_for_confirmation_reminder_emails = models.TextField(blank=True, null=True)
    calendar_sync_enabled = models.BooleanField(default=False)
    services = models.ManyToManyField(Service, related_name='staff_members')

    def __str__(self):
        return self.name


    class Meta:
        # managed = False
        db_table = "staff"