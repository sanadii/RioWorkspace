from rest_framework import serializers
from workspace.models.appointments import Appointment, AppointmentService
from workspace.models.clients import Client

class AppointmentServiceSerializer (serializers.ModelSerializer):
        service_id = serializers.IntegerField(source='service.id', read_only=True)
        name = serializers.CharField(source='service.name', read_only=True)
        duration = serializers.IntegerField(source='service.duration', read_only=True)
        price = serializers.IntegerField(source='service.price', read_only=True)
        class Meta:
            model = AppointmentService
            fields = '__all__'

class AppointmentSerializer(serializers.ModelSerializer):
    client_id = serializers.IntegerField(source='client.id', read_only=True)
    client_name = serializers.SerializerMethodField(read_only=True)

    # Include fields from the AppointmentService model using the nested serializer
    services = AppointmentServiceSerializer(many=True, read_only=True)

    class Meta:
        model = Appointment
        # fields = '__all__'  # You can also list specific fields along with 'client_id' and 'client_name'

    # If you need to include additional logic or fields, you can define them here

        fields = [
            'id', 'appointment_date', 'staff',
            'client_id', 'client_name',
            'services', 'subject',
            'category_color', 'start_time', 'end_time', 'location',
        ]

    def get_client_name(self, obj):
        # Concatenate first name and last name of the client
        return f"{obj.client.first_name} {obj.client.last_name}".strip()




