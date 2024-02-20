from django.db import models

class Discount(models.Model):
    name = models.CharField(max_length=100)
    general_misc = models.CharField(max_length=100)
    tax = models.CharField(max_length=100, default="Not applicable")
    discount_type = models.CharField(max_length=10, choices=[('percentage', 'Percentage'), ('fixed', 'Fixed')])
    
    def __str__(self):
        return self.name


    class Meta:
        # managed = False
        db_table = "service_discount"