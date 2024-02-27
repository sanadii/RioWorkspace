from django.db import models
from django.utils import timezone
import uuid


# Template and Expiry
TEMPLATE_CHOICES = [
    ('mothersday', 'voucher template 1'),
    ('birthday', 'voucher template 2'),
    ('valentinesday', 'voucher template 3'),
    ('anniversary', 'voucher template 4'),
    ]


# class Voucher(models.Model):
#     # Basic Voucher Information
#     client_id = models.UUIDField(default=uuid.uuid4, editable=False)
#     code = models.CharField(max_length=100)
#     gift_voucher_id = models.IntegerField()
#     message = models.TextField()
#     voucher_type = models.CharField(max_length=100, default="GiftVoucher")

#     # Pricing and Quantity
#     full_unit_price = models.DecimalField(max_digits=10, decimal_places=2)
#     unit_price = models.DecimalField(max_digits=10, decimal_places=2)
#     unit_price_inc = models.DecimalField(max_digits=10, decimal_places=2)
#     total_inc = models.DecimalField(max_digits=10, decimal_places=2)
#     quantity = models.IntegerField()

#     # Recipient Information
#     recipient_client_id = models.IntegerField(null=True, blank=True)
#     recipient_email = models.EmailField(max_length=255, blank=True)
#     recipient_name = models.CharField(max_length=255, blank=True)

#     # Sender Information
#     sender_client_id = models.IntegerField()
#     sender_email = models.EmailField(max_length=255)
#     sender_name = models.CharField(max_length=255)

#     # Voucher Settings
#     email_voucher_to_recipient = models.BooleanField(default=False)
#     email_voucher_to_sender = models.BooleanField(default=False)
#     editable_fields = models.JSONField()  # Requires Django 3.1+
#     expiry = models.DateField(null=True, blank=True)
#     index = models.IntegerField()
#     is_included = models.BooleanField(default=True)
#     is_valid = models.BooleanField(default=True)
#     to_delete = models.BooleanField(default=False)

#     # Auto-generated or System Fields
#     description = models.TextField()
#     invoice_item_id = models.IntegerField(null=True, blank=True)
#     client_gift_voucher_id = models.IntegerField(null=True, blank=True)
#     staff_id = models.IntegerField()

#     # Fields related to discounts and taxes (commented out for now)
#     # can_discount = models.BooleanField(default=True)
#     # discounted_tax_total = models.DecimalField(max_digits=10, decimal_places=2, default=0)
#     # discounted_total = models.DecimalField(max_digits=10, decimal_places=2)
#     # exclude_discount = models.BooleanField(default=False)


#     # Auto generated
#     name = models.CharField(max_length=255)

#     def __str__(self):
#         return self.name

#     class Meta:
#         db_table = "voucher"


# Voucher Settings
class Voucher(models.Model):
    # Basic voucher details
    name = models.CharField(max_length=255)
    description = models.TextField()
    is_custom_amount = models.BooleanField(default=False)
    fixed_amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    is_redeemable_online = models.BooleanField(default=False)
    is_voidable = models.BooleanField(default=False)
    category = models.CharField(max_length=50, choices=TEMPLATE_CHOICES)
    # template = models.CharField(max_length=50, choices=TEMPLATE_CHOICES)


    expiry_months = models.PositiveIntegerField(default=1)  # 0 for 'Never'

    # Terms and Customization
    terms = models.TextField()
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
