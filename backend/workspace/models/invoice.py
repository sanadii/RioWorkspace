from django.db import models
from workspace.models.appointments import Appointment
from workspace.models.products import Product
from workspace.models.packages import Package

# Define choices for the status field
STATUS_CHOICES = [
    ('active', 'Active'),
    ('paid', 'Paid'),
    ('cancelled', 'Cancelled'),
]

ACCOUNT_CHOICES = [
    ('revenue', 'Revenue'),
    ('expense', 'Expense'),
]


class Invoice(models.Model):
    date = models.DateField()
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    paid = models.BooleanField()
    status = models.CharField(max_length=100, choices=STATUS_CHOICES, default='active')
    appointment = models.ForeignKey(Appointment, on_delete=models.CASCADE, related_name='invoices')
    payment_type = models.CharField(max_length=100)
    account = models.CharField(max_length=100, choices=ACCOUNT_CHOICES, default='revenue')
    
    
    # Create 1-Many relationship
    # InvoiceServices 
    # InvoicePackages
    # InvoiceProducts
    # InvoiceVoucher
    # InvoiceCredit
    # Invoice Transactions

    def __str__(self):
        return f"Invoice #{self.id} for {self.appointment} ({self.status})"

    class Meta:
        db_table = "invoice"


class InvoiceService(models.Model):
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE, related_name='services')
    service = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='invoices')
    description = models.CharField(max_length=150,)
    quantity = models.IntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.product} - {self.quantity} units"

    class Meta:
        db_table = "invoice_product"


class InvoiceProduct(models.Model):
    invoice = models.ForeignKey(
        Invoice, on_delete=models.CASCADE, related_name='products')
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name='invoices')
    quantity = models.IntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.product} - {self.quantity} units"

    class Meta:
        db_table = "invoice_product"


class InvoicePackage(models.Model):
    invoice = models.ForeignKey(
        Invoice, on_delete=models.CASCADE, related_name='packages')
    package = models.ForeignKey(
        Package, on_delete=models.CASCADE, related_name='invoices')
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.package}"

    class Meta:
        db_table = "invoice_package"


class InvoiceTransaction(models.Model):
    date = models.DateField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)  # Assuming it's a monetary value
    status = models.CharField(max_length=100, choices=STATUS_CHOICES, default='Active')
    payment_type = models.CharField(max_length=100)
    # staff = models.ForeignKey()