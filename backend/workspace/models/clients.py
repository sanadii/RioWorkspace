from django.db import models

class Client(models.Model):
    # Main client information
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100, blank=True, null=True)
    mobile = models.CharField(max_length=15)
    email = models.EmailField(blank=True, null=True)
    occupation = models.CharField(max_length=100, blank=True, null=True)
    customer_type = models.CharField(max_length=100, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    class Meta:
        db_table = "client"

class ClientAddress(models.Model):
    # Client address information
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    physical_address = models.TextField(blank=True, null=True)
    suburb = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    post_code = models.CharField(max_length=10, blank=True, null=True)
    postal_address = models.TextField(blank=True, null=True)

    class Meta:
        db_table = "client_address"

class ClientAdditionalInfo(models.Model):
    # Additional client information
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    referred_by = models.CharField(max_length=100, blank=True, null=True)
    alerts = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=100, blank=True, null=True)
    no_shows = models.IntegerField(default=0)

    class Meta:
        db_table = "client_additional_info"

# Uncomment and use the following model when you're ready to implement notification settings
# class ClientNotificationSettings(models.Model):
#     client = models.ForeignKey(Client, on_delete=models.CASCADE)
#     booking_change_email = models.BooleanField(default=True)
#     email_reminder_interval = models.IntegerField(default=48)  # hours
#     sms_reminder_interval = models.IntegerField(default=24)  # hours

#     class Meta:
#         db_table = "client_notification_settings"
