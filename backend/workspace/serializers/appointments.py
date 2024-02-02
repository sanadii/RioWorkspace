from rest_framework import serializers
from workspace.models.appointments import Appointment

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'  # or list specific fields if you don't want to expose all