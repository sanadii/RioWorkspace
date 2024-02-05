from rest_framework import serializers
from workspace.models.appointments import Appointment
from workspace.models.clients import Client

class AppointmentSerializer(serializers.ModelSerializer):
    client_id = serializers.IntegerField(source='client.id', read_only=True)
    client_name = serializers.CharField(source='client.name', read_only=True)

    class Meta:
        model = Appointment
        fields = '__all__'  # You can also list specific fields along with 'client_id' and 'client_name'

    # If you need to include additional logic or fields, you can define them here

        # fields = [
        #     'id', 'appointment_date', 'staff_member',
        #     'client_id', 'client_name',
        #     'services', 'subject'
        # ]