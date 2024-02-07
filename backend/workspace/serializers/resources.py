from rest_framework import serializers
from workspace.models.resources import Resource

class ResourceSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = Resource
        fields = '__all__'  # or list specific fields if you don't want to expose all

    def get_name(self, obj):
        # Concatenate first name and last name
        return f"{obj.first_name} {obj.last_name}".strip()
