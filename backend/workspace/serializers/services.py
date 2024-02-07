from rest_framework import serializers
from workspace.models.services import Service

class ServiceSerializer(serializers.ModelSerializer):
    price = serializers.FloatField()  # Serialize price as a floating-point number
    
    class Meta:
        model = Service
        fields = '__all__'  # or list specific fields if you don't want to expose all
