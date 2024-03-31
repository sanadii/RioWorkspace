# Finance Urls
from django.urls import path
from workspace.views.finance import *
from workspace.views.invoices import *

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
    
    # Invoice URLs
    path("getInvoices", GetInvoices.as_view(), name="GetInvoices"),
    path("GetInvoiceById/<int:id>", GetInvoiceById.as_view(), name="GetInvoiceById"),
    path('addInvoice', AddInvoice.as_view(), name='AddInvoice'),
    path('updateInvoice/<int:id>', UpdateInvoice.as_view(), name='UpdateInvoice'),
    path('deleteInvoice/<int:id>', DeleteInvoice.as_view(), name='DeleteInvoice'),

    # Transactions URLs
    path("getTransactions", GetTransactions.as_view(), name="GetTransactions"),
    path("getTransactionById/<int:id>", GetTransactionById.as_view(), name="GetTransactionById"),
    path('addTransaction', AddTransaction.as_view(), name='AddTransaction'),
    path('updateTransaction/<int:id>', UpdateTransaction.as_view(), name='UpdateTransaction'),
    path('deleteTransaction/<int:id>', DeleteTransaction.as_view(), name='DeleteTransaction'),

]
