from rest_framework import serializers
from .models import DailyRevenue

class DailyRevenueSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyRevenue
        fields = '__all__'  # or list specific fields if you don't want to expose all
