# Finance Urls
from django.urls import path
from workspace.views.finance import *

app_name = "finance"

urlpatterns = [
    # Revenue URLs
    path("getRevenues", GetRevenues.as_view(), name="GetRevenues"),
    path('addRevenue', AddRevenue.as_view(), name='AddRevenue'),
    path('updateRevenue/<int:id>', UpdateRevenue.as_view(), name='UpdateRevenue'),
    path('deleteRevenue/<int:id>', DeleteRevenue.as_view(), name='DeleteRevenue'),

    # Expenses URLs
    path("getExpenses", GetExpenses.as_view(), name="GetExpenses"),
    path('addExpense', AddExpense.as_view(), name='AddExpense'),
    path('updateExpense/<int:id>', UpdateExpense.as_view(), name='UpdateExpense'),
    path('deleteExpense/<int:id>', DeleteExpense.as_view(), name='DeleteExpense'),
]