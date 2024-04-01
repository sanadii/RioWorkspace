from django.db import models
from workspace.models.appointments import Appointment
from workspace.models.products import Product
from workspace.models.packages import Package
from workspace.models.clients import Client
from workspace.models.staff import Staff


# Define choices for the status field
STATUS_CHOICES = [
    ('pending', 'Pending'),
    ('paid', 'Paid'),
    ('cancelled', 'Cancelled'),
]

ACCOUNT_CHOICES = [
    ('revenue', 'Revenue'),
    ('expense', 'Expense'),
]

INVOICE_TYPE_CHOICES = [
    ('appoiuntment', 'Appoiuntment'),
    ('online Sale', 'OnlineSale'),
]
# Create 1-Many relationship
# InvoiceServices 
# InvoicePackages
# InvoiceProducts
# InvoiceVoucher
# InvoiceCredit
# Invoice Transactions

class Invoice(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    status = models.CharField(max_length=100, choices=STATUS_CHOICES, default='pending')
    invoice_type = models.CharField(max_length=100, choices=INVOICE_TYPE_CHOICES, default='appoiuntment')
    note = models.CharField(max_length=250, blank=True, null=True)  # Accepts blank and null
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE, blank=True, null=True)

    # Relationships
    # InvoiceAppointment model - 1 to many
    # InvoiceProduct model - 1 to many
    # InvoicePackage model - 1 to many
    # InvoiceTransaction model - 1 to many

    def __str__(self):
        return f"Invoice {self.id} for {self.appointment}"

    class Meta:
        db_table = "invoice"


class InvoiceAppointment(models.Model):
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE)
    appointment = models.ForeignKey(Appointment, on_delete=models.CASCADE)

    class Meta:
        db_table = "invoice_appointment"
     

class InvoiceProduct(models.Model):
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE, related_name='product_invoices')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='invoices')
    quantity = models.IntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return f"{self.product} - {self.quantity} units"

    class Meta:
        db_table = "invoice_product"


class InvoicePackage(models.Model):
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE, related_name='package_invoices')
    package = models.ForeignKey(Package, on_delete=models.CASCADE, related_name='invoices')
    quantity = models.IntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return f"{self.package}"

    class Meta:
        db_table = "invoice_package"

class Transaction(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_type = models.CharField(max_length=100, choices=[('cash', 'Cash'), ('credit', 'Credit'), ('link', 'Link'), ('others', 'Others')])
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return f"Transaction {self.id} for Invoice {self.invoice.id}"

    class Meta:
        db_table = "transaction"
    
    
class InvoiceTransactions(models.Model):
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE, related_name='products')
    transaction = models.ForeignKey(Transaction, on_delete=models.CASCADE, related_name='products')
    
    
   
   
# class InvoiceTransaction(models.Model):
#     date = models.DateField()
#     amount = models.DecimalField(max_digits=10, decimal_places=2)  # Assuming it's a monetary value
#     status = models.CharField(max_length=100, choices=STATUS_CHOICES, default='Active')
#     payment_type = models.CharField(max_length=100)
#     # staff = models.ForeignKey()


# class InvoiceService(models.Model):
#     invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE, related_name='services')
#     service = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='invoices')
#     description = models.CharField(max_length=150,)
#     quantity = models.IntegerField()
#     unit_price = models.DecimalField(max_digits=10, decimal_places=2)
#     total_price = models.DecimalField(max_digits=10, decimal_places=2)

#     def __str__(self):
#         return f"{self.product} - {self.quantity} units"

#     class Meta:
#         db_table = "invoice_service"

