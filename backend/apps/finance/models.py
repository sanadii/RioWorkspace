from django.db import models
from apps.clients.models import Client
from apps.staff.models import Staff
from apps.appointments.models import AppointmentService

# Define common choices for transaction and expense categories
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

# Transactions Model
class Transactions(models.Model):
    transaction_date = models.DateField()
    description = models.TextField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=100, choices=TRANSACTION_CATEGORY_CHOICES)

    def __str__(self):
        return f"{self.description} - {self.amount}"

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
