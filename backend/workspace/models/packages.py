from django.db import models
from django.utils import timezone

from workspace.models.services import Service

class Package(models.Model):
    name = models.CharField(max_length=255)
    sku = models.CharField(max_length=50, unique=True, null=True, blank=True)
    description = models.TextField()
    # cost_price = models.DecimalField(max_digits=10, decimal_places=2,  null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    validity_months = models.PositiveIntegerField(default=1)
    redemption_start_date = models.DateField(null=True, blank=True)
    redemption_end_date = models.DateField(null=True, blank=True)
    send_expiry_email = models.BooleanField(default=False)
    photo = models.ImageField(upload_to='packages/', null=True, blank=True)

    def __str__(self):
        return self.name

    @property
    def is_valid(self):
        """Check if the package is still valid based on the redemption end date."""
        if self.redemption_end_date:
            return self.redemption_end_date >= timezone.now().date()
        return True

    class Meta:
        verbose_name = 'Package'
        verbose_name_plural = 'Packages'
        db_table = "Package"

class PackageItem(models.Model):
    package = models.ForeignKey(Package, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, related_name='items', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    visit_limit = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.name} ({self.visit_limit} Visits)"

    class Meta:
        verbose_name = 'Package Item'
        verbose_name_plural = 'Package Items'
        db_table = "Package_item"
