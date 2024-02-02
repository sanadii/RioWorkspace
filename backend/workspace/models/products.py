from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=100)
    sku_handle = models.CharField(max_length=100)
    barcode = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    supplier = models.CharField(max_length=100, default="None")
    supplier_product_code = models.CharField(max_length=100)
    cost_price = models.DecimalField(max_digits=10, decimal_places=2)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    tax = models.CharField(max_length=100, default="Not applicable")
    stock_location = models.CharField(max_length=100)
    track_stock = models.BooleanField(default=True)
    available_quantity = models.PositiveIntegerField(default=0)
    product_photo = models.ImageField(upload_to='product_photos/', blank=True, null=True)
    history = models.TextField(blank=True, null=True)
    is_professional = models.BooleanField(default=False)  # Added field for professional products

    def __str__(self):
        return self.name

    class Meta:
        # managed = False
        db_table = "product"

# Option Details
from django.db import models
from django.core.exceptions import ValidationError

from django.db import models

class OptionCategory(models.Model):
    name = models.CharField(max_length=100)

# Create option categories
sales_settings_category = OptionCategory.objects.create(name="Sales settings")
invoice_settings_category = OptionCategory.objects.create(name="Invoice settings")

class Option(models.Model):
    name = models.CharField(max_length=100)
    category = models.ForeignKey(OptionCategory, on_delete=models.CASCADE)
    value = models.TextField()

    def __str__(self):
        return self.name


class BusinessOptionManager(models.Manager):
    def create_option(self, option_name, option_value):
        if self.filter(option_name=option_name).exists():
            raise ValidationError(f'Option with name "{option_name}" already exists.')
        option = self.create(option_name=option_name, option_value=option_value)
        return option

class BusinessOption(models.Model):
    option_name = models.CharField(max_length=100, unique=True)
    option_value = models.TextField()

    objects = BusinessOptionManager()

    def __str__(self):
        return self.option_name

try:
    BusinessOption.objects.create_option(option_name='business_name', option_value='Rio Brazil Salon')
    BusinessOption.objects.create_option(option_name='business_website', option_value='https://www.example.com')
    # Add more options as needed
except ValidationError as e:
    print(e)


from django.db import models

class Location(models.Model):
    name = models.CharField(max_length=100)
    location_type = models.CharField(max_length=100, choices=[('fixed', 'Fixed'), ('mobile', 'Mobile')])
    online_booking = models.BooleanField(default=True)
    telephone = models.CharField(max_length=15)
    address = models.CharField(max_length=255)
    apartment_suite_unit = models.CharField(max_length=255, blank=True, null=True)
    suburb = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    state_region = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=10)
    monday_open = models.TimeField(blank=True, null=True)
    monday_close = models.TimeField(blank=True, null=True)
    tuesday_open = models.TimeField(blank=True, null=True)
    tuesday_close = models.TimeField(blank=True, null=True)
    wednesday_open = models.TimeField(blank=True, null=True)
    wednesday_close = models.TimeField(blank=True, null=True)
    thursday_open = models.TimeField(blank=True, null=True)
    thursday_close = models.TimeField(blank=True, null=True)
    friday_open = models.TimeField(blank=True, null=True)
    friday_close = models.TimeField(blank=True, null=True)
    saturday_open = models.TimeField(blank=True, null=True)
    saturday_close = models.TimeField(blank=True, null=True)
    sunday_open = models.TimeField(blank=True, null=True)
    sunday_close = models.TimeField(blank=True, null=True)

    def __str__(self):
        return self.name
    
    from django.db import models

class Resource(models.Model):
    resource_name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.resource_name

class ResourceItem(models.Model):
    resource = models.ForeignKey(Resource, on_delete=models.CASCADE)
    item_name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.item_name

class Service(models.Model):
    # ... other fields ...
    required_resources = models.ManyToManyField(Resource, related_name='services')

    def __str__(self):
        return self.name



# Calendar
from django.db import models

class CalendarSettings(models.Model):
    first_day_of_week = models.CharField(max_length=10, default='Sunday')
    calendar_start_time = models.TimeField(blank=True, null=True)
    calendar_intervals = models.PositiveIntegerField(default=15)
    high_contrast_mode = models.BooleanField(default=False)
    display_padding_times = models.BooleanField(default=False)

class AppointmentSettings(models.Model):
    new_appointment_status = models.CharField(max_length=20, default='Pencilled-in')
    company_name_field = models.BooleanField(default=False)
    keep_padding_times = models.BooleanField(default=False)
    allow_appointment_deletion = models.BooleanField(default=True)

class InclusionSettings(models.Model):
    add_pronoun_field = models.BooleanField(default=False)
    display_client_pronouns_on_calendar = models.BooleanField(default=False)
    vaccination_policy = models.BooleanField(default=False)
    daily_appointment_summary = models.BooleanField(default=False)

class CancellationReason(models.Model):
    reason = models.CharField(max_length=100)

class AppointmentStatus(models.Model):
    status = models.CharField(max_length=100)

from django.db import models

class GiftVoucherTemplate(models.Model):
    name = models.CharField(max_length=100)
    preview_image = models.ImageField(upload_to='voucher_templates/', blank=True, null=True)

class GiftVoucherTerms(models.Model):
    content = models.TextField()

class GiftVoucher(models.Model):
    name = models.CharField(max_length=100)
    custom_amount_voucher = models.BooleanField(default=False)
    allow_online_redemption = models.BooleanField(default=False)
    allow_voiding = models.BooleanField(default=False)
    template = models.ForeignKey(GiftVoucherTemplate, on_delete=models.SET_NULL, blank=True, null=True)
    expire_never = models.BooleanField(default=False)
    expire_after_months = models.PositiveIntegerField(blank=True, null=True)
    terms = models.ForeignKey(GiftVoucherTerms, on_delete=models.SET_NULL, blank=True, null=True)
    show_business_name = models.BooleanField(default=True)
    show_business_logo = models.BooleanField(default=True)
    link_to_online_booking = models.BooleanField(default=True)
    default_terms = models.TextField()
    enable_custom_voucher_codes = models.BooleanField(default=False)
    auto_generate_voucher_code = models.BooleanField(default=True)
    custom_voucher_code = models.CharField(max_length=50, blank=True, null=True)

    def save(self, *args, **kwargs):
        if self.auto_generate_voucher_code and not self.custom_voucher_code:
            # Generate a custom voucher code if not provided
            # You can implement your own code generation logic here
            self.custom_voucher_code = generate_custom_voucher_code()
        super().save(*args, **kwargs)

def generate_custom_voucher_code():
    # Implement your own custom voucher code generation logic here
    # For example, you can generate a random alphanumeric code
    import random
    import string
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=10))
