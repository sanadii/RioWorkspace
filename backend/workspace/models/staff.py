from django.db import models
from workspace.models.services import Service

class ContactInformation(models.Model):
    telephone = models.CharField(max_length=15, blank=True, null=True)
    sms_number = models.CharField(max_length=15, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        db_table = "staff_contact"
class WorkingHours(models.Model):
    normal_working_hours = models.CharField(max_length=255, blank=True, null=True)
    monday_working_hours = models.CharField(max_length=255, blank=True, null=True)
    tuesday_working_hours = models.CharField(max_length=255, blank=True, null=True)
    wednesday_working_hours = models.CharField(max_length=255, blank=True, null=True)
    thursday_working_hours = models.CharField(max_length=255, blank=True, null=True)
    friday_working_hours = models.CharField(max_length=255, blank=True, null=True)
    saturday_working_hours = models.CharField(max_length=255, blank=True, null=True)
    sunday_working_hours = models.CharField(max_length=255, blank=True, null=True)
    working_on_sunday = models.BooleanField(default=True)

    class Meta:
        db_table = "staff_work"
class AdditionalInformation(models.Model):
    online_booking_interval = models.PositiveIntegerField(default=15)
    reset_online_booking_time_after_break = models.BooleanField(default=True)
    online_booking_enabled = models.BooleanField(default=True)
    show_on_mini_website = models.BooleanField(default=True)
    alias_nickname = models.CharField(max_length=100, blank=True, null=True)
    reference_number_type = models.CharField(max_length=100, blank=True, null=True)
    job_title = models.CharField(max_length=100, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    message_for_confirmation_reminder_emails = models.TextField(blank=True, null=True)
    calendar_sync_enabled = models.BooleanField(default=False)

    class Meta:
        db_table = "staff_info"

class Staff(models.Model):
    name = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    contact_information = models.OneToOneField(ContactInformation, on_delete=models.CASCADE, blank=True, null=True)
    working_hours = models.OneToOneField(WorkingHours, on_delete=models.CASCADE, blank=True, null=True)
    additional_information = models.OneToOneField(AdditionalInformation, on_delete=models.CASCADE, blank=True, null=True)
    services = models.ManyToManyField(Service, related_name='staff_members')

    def __str__(self):
        return self.name

    class Meta:
        db_table = "staff"
