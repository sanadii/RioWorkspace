from rest_framework import serializers
from workspace.models.finance import Revenue, Expense

class RevenueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Revenue
        fields = '__all__'  # or list specific fields if you don't want to expose all

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = '__all__'
