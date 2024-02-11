from rest_framework import serializers
from workspace.models.clients import Client

class ClientSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = Client
        fields = '__all__'  # or list specific fields if you don't want to expose all

    def get_name(self, obj):
        # Concatenate first name and last name
        return f"{obj.first_name} {obj.last_name}".strip()


