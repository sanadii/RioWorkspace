from rest_framework import serializers
from workspace.models.staff import Staff

class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = '__all__'  # or list specific fields if you don't want to expose all
