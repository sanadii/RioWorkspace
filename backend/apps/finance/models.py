from django.db import models
from apps.clients.models import Client
from apps.staff.models import Staff
from apps.appointments.models import AppointmentService

# Define common choices for dailyRevenue and expense categories
TRANSACTION_CATEGORY_CHOICES = [
    ('Cash', 'Cash'),
    ('Credit', 'Credit'),
    ('Link', 'Link'),
    ('Others', 'Others'),
]

EXPENSES_CATEGORY_CHOICES = [
    ('Utilities', 'Utilities'),
    ('Salon Supplies', 'Salon Supplies'),
    ('Beauty Products', 'Beauty Products'),
    ('Business Licensing', 'Business Licensing'),
    ('Construction/Remodeling', 'Construction/Remodeling'),
    ('Advertisement Expenses', 'Advertisement Expenses'),
    ('Professional Services', 'Professional Services'),
    ('Office Supplies', 'Office Supplies'),
    ('Travel and Transportation', 'Travel and Transportation'),
    ('Miscellaneous', 'Miscellaneous'),
]

DAILY_REVENUE_STATUS_CHOICES = [
    ('pending', 'Pending'),
    ('reviewed', 'Reviewed'),
    ('declined', 'Declined'),
]


# DailyRevenue Model
class DailyRevenue(models.Model):
    dailyRevenue_date = models.DateField()
    notes = models.TextField()
    cash = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    credit = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    others = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    notes = models.TextField()
    status = models.CharField(max_length=100, choices=DAILY_REVENUE_STATUS_CHOICES)
    is_closed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.dailyRevenue_date} - {self.amount}"

# Expenses Model
class Expenses(models.Model):
    expense_date = models.DateField()
    description = models.TextField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=100, choices=EXPENSES_CATEGORY_CHOICES)

    def __str__(self):
        return f"{self.description} - {self.amount}"


# Commission Model
class Commission(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    appointment_service = models.ForeignKey(AppointmentService, on_delete=models.CASCADE)
    employee = models.ForeignKey(Staff, on_delete=models.CASCADE)
    percentage = models.DecimalField(max_digits=5, decimal_places=2)
    
    def __str__(self):
        return f"Commission for {self.employee} - {self.service} by {self.client}"
