from rest_framework import serializers
from django.shortcuts import get_object_or_404

from workspace.models.appointments import Appointment, AppointmentService, ServiceProvider
from workspace.models.clients import Client
from workspace.models.staff import Staff
from workspace.models.services import Service



from workspace.serializers.clients import ClientSerializer
from workspace.serializers.services import ServiceSerializer
from workspace.serializers.staff import StaffSerializer

# class AppointmentServiceSerializer (serializers.ModelSerializer):
#         service_id = serializers.IntegerField(source='service.id', read_only=True)
#         name = serializers.CharField(source='service.name', read_only=True)
#         duration = serializers.IntegerField(source='service.duration', read_only=True)
#         price = serializers.IntegerField(source='service.price', read_only=True)
#         class Meta:
#             model = AppointmentService
#             fields = '__all__'

class AppointmentServiceSerializer(serializers.ModelSerializer):
    # Assuming you have a serializer for the Service model
    service_id = serializers.IntegerField(source='service.id', read_only=True)
    name = serializers.CharField(source='service.name', read_only=True)

    service = serializers.PrimaryKeyRelatedField(queryset=Service.objects.all())
    staff = serializers.PrimaryKeyRelatedField(queryset=Staff.objects.all())

    class Meta:
        model = AppointmentService
        fields = ['id', 'service', 'staff', 'start_time', 'end_time', 'duration', 'price',
                  'service_id', 'name']


class AppointmentSerializer(serializers.ModelSerializer):
    client_id = serializers.IntegerField(write_only=True)
    client = ClientSerializer(read_only=True)
    services = AppointmentServiceSerializer(many=True, required=False)

    class Meta:
        model = Appointment
        fields = ['id', 'start_time', 'end_time', 'status', 'client', 'client_id', 'services']

    def create(self, validated_data):
        services_data = validated_data.pop('services', [])
        client_id = validated_data.pop('client_id')
        client = get_object_or_404(Client, id=client_id)
        appointment = Appointment.objects.create(client=client, **validated_data)

        for service_data in services_data:
            # Create each AppointmentService instance
            service_instance = AppointmentService.objects.create(**service_data)
            # Add the service instance to the appointment
            appointment.services.add(service_instance)

        return appointment

    def update(self, instance, validated_data):
        services_data = validated_data.pop('services', [])
        existing_service_ids = [service.id for service in instance.services.all()]
        updated_service_ids = []

        instance.start_time = validated_data.get('start_time', instance.start_time)
        instance.end_time = validated_data.get('end_time', instance.end_time)
        instance.status = validated_data.get('status', instance.status)
        instance.save()

        for service_data in services_data:
            service_id = service_data.get('id')
            if service_id:
                updated_service_ids.append(service_id)
                service_instance = AppointmentService.objects.get(id=service_id)
                # Update the existing service instance
                for attr, value in service_data.items():
                    setattr(service_instance, attr, value)
                service_instance.save()
            else:
                # Create a new service instance and add it to the appointment
                new_service = AppointmentService.objects.create(**service_data)
                instance.services.add(new_service)

        # Remove services that are no longer associated with the appointment
        for service_id in existing_service_ids:
            if service_id not in updated_service_ids:
                instance.services.remove(service_id)

        # Update other fields of Appointment instance
        # ...

        instance.save()
        return instance


class ServiceProviderSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceProvider
        fields = '__all__'


class ScheduleSerializer(serializers.ModelSerializer):
    # Suppose to get 
    ## appointments from appointment Model
    ## staff from staff model

    client_id = serializers.IntegerField(source='client.id', read_only=True)
    client_name = serializers.SerializerMethodField(read_only=True)
    service_id = serializers.IntegerField(source='service.id', read_only=True)
    service_name = AppointmentServiceSerializer(many=True, read_only=True)
    duration = serializers.IntegerField(source='service.duration', read_only=True)
    price = serializers.IntegerField(source='service.price', read_only=True)


    def create(self, validated_data):
        services_data = validated_data.pop('services')
        appointment = Appointment.objects.create(**validated_data)
        for service_data in services_data:
            appointment_service = AppointmentService.objects.create(**service_data)
            ServiceProvider.objects.create(service=appointment_service, employee=appointment.staff)
        return appointment

    class Meta:
        model = Appointment
        fields = [
            'id', 'client_id', 'client_name', 'services',
        ]


    def get_service_name(self, obj):
        # Concatenate first name and last name of the client
        return f"{obj.service.name}".strip()

    def get_client_name(self, obj):
        # Concatenate first name and last name of the client
        return f"{obj.client.first_name} {obj.client.last_name}".strip()

