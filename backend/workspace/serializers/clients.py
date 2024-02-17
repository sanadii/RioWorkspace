from rest_framework import serializers
from workspace.models.clients import Client

class ClientSerializer(serializers.ModelSerializer):
    name = serializers.CharField(write_only=True)
    date_of_birth = serializers.DateField(format='%Y-%m-%d', input_formats=['%Y-%m-%d'], required=False, allow_null=True)

    class Meta:
        model = Client
        fields = '__all__'

    def create(self, validated_data):
        # Split the name into first name and last name
        name = validated_data.pop('name', '')
        name_parts = name.split()
        first_name = name_parts[0] if name_parts else ''
        last_name = ' '.join(name_parts[1:]) if len(name_parts) > 1 else ''

        # Create the client instance
        client = Client.objects.create(
            first_name=first_name,
            last_name=last_name,
            **validated_data
        )
        return client

    def to_representation(self, instance):
        # Custom representation for reading
        representation = super(ClientSerializer, self).to_representation(instance)
        representation['name'] = self.get_name(instance)
        return representation

    def get_name(self, obj):
        # Concatenate first name and last name
        return f"{obj.first_name} {obj.last_name}".strip()
