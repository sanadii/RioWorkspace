from rest_framework import serializers
from workspace.models.services import Service

class ServiceSerializer(serializers.ModelSerializer):
    price = serializers.FloatField()
    category_name = serializers.StringRelatedField(source='category')
    
    class Meta:
        model = Service
        fields = ['category_name', 'name', 'description', 'price', 'duration', 'service_colour', 'resources_required', 'online_booking', 'optional_booking_question', 'order', 'deleted']
