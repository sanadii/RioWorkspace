# Finance Urls
from django.urls import path
from .views import *

app_name = "finance"

urlpatterns = [
    # DailyRevenue URLs
    path("getDailyRevenues", GetDailyRevenues.as_view(), name="GetDailyRevenues"),
    path('addDailyRevenue', AddDailyRevenue.as_view(), name='AddDailyRevenue'),
    path('updateDailyRevenue/<int:id>', UpdateDailyRevenue.as_view(), name='UpdateDailyRevenue'),
    path('deleteDailyRevenue/<int:id>', DeleteDailyRevenue.as_view(), name='DeleteDailyRevenue'),

    # Expenses URLs
    path("getExpenses", GetExpenses.as_view(), name="GetExpenses"),
    path('addExpense', AddExpense.as_view(), name='AddExpense'),
    path('updateExpense/<int:id>', UpdateExpense.as_view(), name='UpdateExpense'),
    path('deleteExpense/<int:id>', DeleteExpense.as_view(), name='DeleteExpense'),
]