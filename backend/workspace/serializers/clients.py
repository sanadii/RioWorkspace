from rest_framework import serializers
from workspace.models.clients import Client

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'  # or list specific fields if you don't want to expose all