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

# Calendar
ALL_CALENDARS = 'all'
VIEW_ONLY = 'view_only'
CALENDAR_ACCESS_CHOICES = [
    (ALL_CALENDARS, 'All calendars'),
    (VIEW_ONLY, 'All calendars (view only)'),
]

# Customers
FULL_ACCESS = 'full_access'
SOME_ACCESS = 'some_access'
NO_ACCESS = 'no_access'
CONTACT_DETAILS_ONLY = 'contact_details_only'

CUSTOMER_ACCESS_CHOICES = [
    (NO_ACCESS, 'No access to customer information (customer name only)'),
    (CONTACT_DETAILS_ONLY, 'Access to customer contact details and notes only'),
    (FULL_ACCESS, 'Access to all customer database'),
]


SETUP_ACCESS_CHOICES = [
    (FULL_ACCESS, 'Full access'),
    (SOME_ACCESS, 'Some access'),
    (NO_ACCESS, 'No access'),
]

DASHBOARD_ACCESS_CHOICES = [
    (FULL_ACCESS, 'Full access'),
    (SOME_ACCESS, 'Some access'),
    (NO_ACCESS, 'No access'),
]

class StaffAccess(models.Model):
    staff = models.OneToOneField('Staff', on_delete=models.CASCADE)
    
    # Login access
    pin_number = models.CharField(max_length=4)

    # Calendar
    calendar_access = models.CharField(max_length=20, choices=CALENDAR_ACCESS_CHOICES, default=VIEW_ONLY)
    hide_prices_on_calendar = models.BooleanField(default=False)

    # Dashboard
    dashboard_access = models.CharField(max_length=20, choices=DASHBOARD_ACCESS_CHOICES, default=NO_ACCESS)

    # Sales
    view_and_raise_sales = models.BooleanField(default=False)
    can_process_refunds = models.BooleanField(default=False)
    can_void_payments = models.BooleanField(default=False)
    can_edit_prices_on_sale = models.BooleanField(default=False)

    # Customer
    customer_access = models.CharField(max_length=20, choices=CUSTOMER_ACCESS_CHOICES, default=NO_ACCESS)
    allow_contact_details_access = models.BooleanField(default=False)
    allow_block_customers = models.BooleanField(default=False)
    allow_adjust_rewards = models.BooleanField(default=False)

    # Messages
    access_sent_messages = models.BooleanField(default=False)
    access_sms_campaigns = models.BooleanField(default=False)

    # Reports
    # Similar structure to other sections

    # Other
    setup_access = models.CharField(max_length=11, choices=SETUP_ACCESS_CHOICES, default=NO_ACCESS)
    # ... other fields for 'Other' section

    def __str__(self):
        return f"Access settings for {self.staff.name}"

class Staff(models.Model):
    name = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    contact_information = models.OneToOneField(ContactInformation, on_delete=models.CASCADE, blank=True, null=True)
    working_hours = models.OneToOneField(WorkingHours, on_delete=models.CASCADE, blank=True, null=True)
    additional_information = models.OneToOneField(AdditionalInformation, on_delete=models.CASCADE, blank=True, null=True)
    services = models.ManyToManyField(Service, related_name='staff_members')
    active = models.BooleanField(default=True)
    bookable = models.BooleanField(default=True)
    commissionable = models.BooleanField(default=False)

    

    def __str__(self):
        return self.name

    class Meta:
        db_table = "staff"
