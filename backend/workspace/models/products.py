from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=100)
    sku_handle = models.CharField(max_length=100)
    barcode = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    category = models.CharField(max_length=100, default="None")
    tags = models.CharField(max_length=100, default="None")
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.CharField(max_length=100)

    # supplier = models.CharField(max_length=100, default="None")
    # supplier_product_code = models.CharField(max_length=100)
    # tax = models.CharField(max_length=100, default="Not applicable")
    # track_stock = models.BooleanField(default=True)
    # available_quantity = models.PositiveIntegerField(default=0)
    # product_photo = models.ImageField(upload_to='product_photos/', blank=True, null=True)
    # history = models.TextField(blank=True, null=True)
    # is_professional = models.BooleanField(default=False)  # Added field for professional products

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Product'
        verbose_name_plural = 'Products'
        db_table = "product"
