from django.db import models

class ServiceCategory(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    order = models.PositiveIntegerField(default=0)  # Add 'order' field here

    def __str__(self):
        return self.name

    def __str__(self):
        return self.name

    class Meta:
        # managed = False
        db_table = "service_category"

class Service(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    category = models.ForeignKey(ServiceCategory, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    duration = models.PositiveIntegerField(default=30)
    service_colour = models.CharField(max_length=100, default="Choose a color")
    # staff = models.ManyToManyField('StaffMember', blank=True)
    resources_required = models.BooleanField(default=False)
    online_booking = models.BooleanField(default=False)
    optional_booking_question = models.TextField(blank=True, null=True)
    order = models.PositiveIntegerField(default=0)  # Add 'order' field here
    deleted = models.BooleanField(default=False)  # New field for soft deletion

    def __str__(self):
        return self.name

    class Meta:
        # managed = False
        db_table = "service"
