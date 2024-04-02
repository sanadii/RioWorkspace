# Generated by Django 4.2.3 on 2024-03-31 17:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('workspace', '0022_transaction_staff_alter_invoice_staff_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='invoicepackage',
            name='total_price',
        ),
        migrations.RemoveField(
            model_name='invoiceproduct',
            name='total_price',
        ),
        migrations.AlterField(
            model_name='invoiceproduct',
            name='unit_price',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True),
        ),
    ]