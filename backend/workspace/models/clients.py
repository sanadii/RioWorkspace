from django.db import models

STATUS_CHOICES = [
    (1, 'Low'),
    (2, 'Medium'),
    (3, 'High'),
]

class Client(models.Model):
    # Main client information
    date_added = models.DateTimeField(auto_now_add=True)
    first_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100, blank=True, null=True)
    mobile = models.CharField(max_length=15, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    occupation = models.CharField(max_length=100, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    class Meta:
        db_table = "client"

class ClientAdditionalInfo(models.Model):
    # Additional client information
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    mobile_alt = models.CharField(max_length=15, blank=True, null=True)  # Added field
    referred_by = models.CharField(max_length=100, blank=True, null=True)
    status = models.IntegerField(choices=STATUS_CHOICES, default=1, blank=True, null=True)
    vip = models.BooleanField(default=False)  # Added field
    blocked = models.BooleanField(default=False)  # Added field

    class Meta:
        db_table = "client_additional_info"

class ClientNotification(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    allow_email = models.BooleanField(default=True)  # Changed to BooleanField
    allow_sms = models.BooleanField(default=True)  # Changed to BooleanField

    class Meta:
        db_table = "client_notification_settings"
