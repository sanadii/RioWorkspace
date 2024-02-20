from django.db import models
from django.utils import timezone

class Voucher(models.Model):
    # Basic voucher details
    name = models.CharField(max_length=255)
    description = models.TextField()
    is_custom_amount = models.BooleanField(default=False)
    fixed_amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    is_redeemable_online = models.BooleanField(default=False)
    is_voidable = models.BooleanField(default=False)

    # Template and Expiry
    TEMPLATE_CHOICES = [
        ('template1', 'voucher template 1'),
        ('template2', 'voucher template 2'),
        ('template3', 'voucher template 3'),
        ('template4', 'voucher template 4'),
    ]
    template = models.CharField(max_length=50, choices=TEMPLATE_CHOICES)
    expiry_months = models.PositiveIntegerField(default=1)  # 0 for 'Never'

    # Terms and Customization
    terms = models.TextField()
    show_business_name = models.BooleanField(default=True)
    show_business_logo = models.BooleanField(default=True)
    show_online_booking_link = models.BooleanField(default=True)
    custom_voucher_code_enabled = models.BooleanField(default=False)

    # Auto-generated fields
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    @property
    def is_expired(self):
        """Check if the voucher is expired based on the expiry months."""
        if self.expiry_months == 0:  # 0 means 'Never'
            return False
        expiry_date = self.created_at + timezone.timedelta(days=self.expiry_months * 30)
        return timezone.now() > expiry_date

    class Meta:
        verbose_name = 'Voucher'
        verbose_name_plural = 'Vouchers'
        db_table = 'voucher'
