from rest_framework import serializers
from workspace.models.products import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'  # or list specific fields if you don't want to expose all
