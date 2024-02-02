from django.db import models

from django.db import models

class ServiceCategory(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return self.name

class Service(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    category = models.CharField(max_length=100, default="No category")
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    duration_minutes = models.PositiveIntegerField(default=30)
    tax = models.CharField(max_length=100, default="Not applicable")
    service_colour = models.CharField(max_length=100, default="Choose a color")
    staff = models.ManyToManyField('StaffMember', blank=True)
    resources_required = models.BooleanField(default=False)
    online_booking = models.BooleanField(default=False)
    is_video_call = models.BooleanField(default=False)
    optional_booking_question = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        # managed = False
        db_table = "service"

class StaffMember(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Package(models.Model):
    name = models.CharField(max_length=100)
    sku = models.CharField(max_length=20)
    description = models.TextField(blank=True, null=True)
    cost_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    tax = models.CharField(max_length=100, default="Not applicable")
    price_includes_tax = models.BooleanField(default=False)
    validity_months = models.PositiveIntegerField(default=1)
    redemption_start_date = models.DateField(null=True, blank=True)
    redemption_end_date = models.DateField(null=True, blank=True)
    send_email_before_expiry = models.BooleanField(default=False)
    photo = models.ImageField(upload_to='package_photos/', null=True, blank=True)
    items = models.ManyToManyField(Service, through='PackageItem')

    def __str__(self):
        return self.name

    class Meta:
        # managed = False
        db_table = "service_package"

class PackageItem(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    package = models.ForeignKey(Package, on_delete=models.CASCADE)
    limit = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.service.name} - {self.package.name}"

    class Meta:
        # managed = False
        db_table = "service_package_item"

from django.db import models


class Discount(models.Model):
    name = models.CharField(max_length=100)
    general_misc = models.CharField(max_length=100)
    tax = models.CharField(max_length=100, default="Not applicable")
    discount_type = models.CharField(max_length=10, choices=[('percentage', 'Percentage'), ('fixed', 'Fixed')])
    
    def __str__(self):
        return self.name


    class Meta:
        # managed = False
        db_table = "discount"