from rest_framework import serializers
from workspace.models.invoices import Invoice, Transaction

class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields = '__all__'  # or list specific fields if you don't want to expose all

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'
