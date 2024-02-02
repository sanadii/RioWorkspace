from django.db import models

# Apps
from apps.clients.models import Client
from apps.staff.models import Staff
from apps.appointments.models import AppointmentService
from apps.settings.models import OptionChoices

# DailyRevenue Model
class DailyRevenue(models.Model):
    date = models.DateField()
    notes = models.TextField()
    cash = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    credit = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    link = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    others = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    notes = models.TextField()
    status = models.ForeignKey(OptionChoices, on_delete=models.SET_NULL, null=True, blank=True, related_name='daily_revenue_status_choices')
    is_closed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.dailyRevenue_date} - {self.amount}"

# Expenses Model
class Expenses(models.Model):
    date = models.DateField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    notes = models.TextField()
    paid_by = models.ForeignKey(OptionChoices, on_delete=models.SET_NULL, null=True, blank=True, related_name='expenses_paid_by_choices')
    status = models.ForeignKey(OptionChoices, on_delete=models.SET_NULL, null=True, blank=True, related_name='expenses_status_choices')
    category = models.ForeignKey(OptionChoices, on_delete=models.SET_NULL, null=True, blank=True, related_name='expenses_category_choices')

    def __str__(self):
        return f"{self.date} - {self.description} - {self.amount}"


# Commission Model
class Commission(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    # appointment_service = models.ForeignKey(AppointmentService, on_delete=models.CASCADE)
    employee = models.ForeignKey(Staff, on_delete=models.CASCADE)
    percentage = models.DecimalField(max_digits=5, decimal_places=2)
    
    def __str__(self):
        # return f"Commission for {self.employee} - {self.appointment_service} by {self.client}"
        return f"Commission for {self.employee} by {self.client}"

