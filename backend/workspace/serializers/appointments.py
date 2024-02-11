from rest_framework import serializers
from workspace.models.appointments import Appointment, AppointmentService, ServiceProvider
from workspace.models.clients import Client
from workspace.models.staff import Staff

class AppointmentServiceSerializer (serializers.ModelSerializer):
        service_id = serializers.IntegerField(source='service.id', read_only=True)
        name = serializers.CharField(source='service.name', read_only=True)
        duration = serializers.IntegerField(source='service.duration', read_only=True)
        price = serializers.IntegerField(source='service.price', read_only=True)
        class Meta:
            model = AppointmentService
            fields = '__all__'

# class AppointmentSerializer(serializers.ModelSerializer):
#     client_id = serializers.IntegerField(source='client.id', read_only=True)
#     client_name = serializers.SerializerMethodField(read_only=True)
#     services = AppointmentServiceSerializer(many=True)


#     def create(self, validated_data):
#         services_data = validated_data.pop('services')
#         appointment = Appointment.objects.create(**validated_data)
#         for service_data in services_data:
#             appointment_service = AppointmentService.objects.create(**service_data)
#             ServiceProvider.objects.create(service=appointment_service, employee=appointment.staff)
#         return appointment

#     class Meta:
#         model = Appointment
#         # fields = '__all__'  # You can also list specific fields along with 'client_id' and 'client_name'

#     # If you need to include additional logic or fields, you can define them here

#         fields = [
#             'id', 'client_id', 'client_name', 'services',
#             # 'appointment_date', 'start_time', 'end_time',
#         ]

#     def get_client_name(self, obj):
#         # Concatenate first name and last name of the client
#         return f"{obj.client.first_name} {obj.client.last_name}".strip()

# class AppointmentSerializer(serializers.ModelSerializer):
#     client_id = serializers.IntegerField(source='client.id', read_only=True)  # Change this line
#     client_name = serializers.SerializerMethodField(read_only=True)
#     services = AppointmentServiceSerializer(many=True)

#     def create(self, validated_data):
#         services_data = validated_data.pop('services')
#         appointment = Appointment.objects.create(**validated_data)
#         for service_data in services_data:
#             appointment_service = AppointmentService.objects.create(**service_data)
#             ServiceProvider.objects.create(service=appointment_service, employee=appointment.staff)
#         return appointment

#     class Meta:
#         model = Appointment
#         fields = [
#             'id', 'client_id', 'client_name', 'services',
#         ]

#     def get_client_name(self, obj):
#         return f"{obj.client.first_name} {obj.client.last_name}".strip()

class AppointmentSerializer(serializers.ModelSerializer):
    client = serializers.SerializerMethodField()
    client_name = serializers.SerializerMethodField(read_only=True)
    client_mobile = serializers.SerializerMethodField(read_only=True)
    services = AppointmentServiceSerializer(many=True)

    def get_client(self, obj):
        # Serialize the client object to a dictionary with desired fields
        client_obj = obj.client
        return {
            'id': client_obj.id,
            'first_name': client_obj.first_name,
            'last_name': client_obj.last_name,
            # Add more fields as needed
        }

    class Meta:
        model = Appointment
        fields = [
            'id', 'client', 'services', 'client_name', 'client_mobile',
             'start_time', 'end_time'
        ]

    def get_client_name(self, obj):
        # Concatenate first name and last name of the client
        return f"{obj.client.first_name} {obj.client.last_name}".strip()

    def get_client_mobile(self, obj):
        # Concatenate first name and last name of the client
        return f"{obj.client.mobile}".strip()

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

