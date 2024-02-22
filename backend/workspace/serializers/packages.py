from rest_framework import serializers
from workspace.models.packages import Package

class PackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Package
        fields = '__all__'  # or list specific fields if you don't want to expose all
