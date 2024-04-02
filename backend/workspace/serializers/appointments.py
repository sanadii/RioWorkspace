from rest_framework import serializers
from django.shortcuts import get_object_or_404

from workspace.models.appointments import (
    Appointment,
    AppointmentService,
    AppointmentPackage,
    AppointmentProduct,
    ServiceProvider,
    AppointmentNote,
)
from workspace.models.clients import Client
from workspace.models.staff import Staff
from workspace.models.services import Service
from workspace.models.packages import Package
from workspace.models.products import Product

from workspace.serializers.clients import ClientSerializer
from workspace.serializers.services import ServiceSerializer
from workspace.serializers.staff import StaffSerializer

from workspace.utils.choices import STATUS_CLASS_MAP

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
    service = serializers.PrimaryKeyRelatedField(
        queryset=Service.objects.all())
    staff = serializers.PrimaryKeyRelatedField(queryset=Staff.objects.all())

    class Meta:
        model = AppointmentService
        fields = ['id', 'service', 'staff', 'start', 'end', 'duration', 'price',
                  'service_id', 'name']


class AppointmentPackageSerializer(serializers.ModelSerializer):
    # Assuming you have a serializer for the Service model
    package_id = serializers.IntegerField(source='package.id', read_only=True)
    name = serializers.CharField(source='package.name', read_only=True)
    package = serializers.PrimaryKeyRelatedField(
        queryset=Package.objects.all())
    staff = serializers.PrimaryKeyRelatedField(queryset=Staff.objects.all())

    class Meta:
        model = AppointmentService
        fields = ['id', 'package', 'staff', 'price', 'package_id', 'name']


class AppointmentProductSerializer(serializers.ModelSerializer):
    # Assuming you have a serializer for the Service model
    product_id = serializers.IntegerField(source='product.id', read_only=True)
    name = serializers.CharField(source='product.name', read_only=True)
    product = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all())
    staff = serializers.PrimaryKeyRelatedField(queryset=Staff.objects.all())

    class Meta:
        model = AppointmentService
        fields = ['id', 'product', 'staff', 'price', 'product_id', 'name']


# ManyToMany Relationship with Appointments
class AppointmentProductSerializer(serializers.ModelSerializer):
    # Assuming you have a serializer for the Service model
    product_id = serializers.IntegerField(source='product.id', read_only=True)
    name = serializers.CharField(source='product.name', read_only=True)
    product = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all())
    staff = serializers.PrimaryKeyRelatedField(queryset=Staff.objects.all())

    class Meta:
        model = AppointmentService
        fields = ['id', 'product', 'staff', 'price', 'product_id', 'name']


# OneToOne Relationship with Appointments
class AppointmentNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppointmentNote
        fields = ['id', 'note']


class AppointmentSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    client_id = serializers.IntegerField(write_only=True)
    client = ClientSerializer(read_only=True)
    services = AppointmentServiceSerializer(many=True, required=False)
    # packages = AppointmentPackageSerializer(many=True, required=False)
    # products = AppointmentProductSerializer(many=True, required=False)
    note = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    class_name = serializers.SerializerMethodField()

    class Meta:
        model = Appointment
        fields = [
            'id', 'start', 'end', 'title', 'status', 'class_name',
            # FullCalendar Extended Props
            'client', 'client_id', 'services', 'note'
            # 'packages', 'products', 
            ]

    def get_title(self, obj):
        # Concatenate first name and last name
        return f"{obj.client.first_name} {obj.client.last_name}"

    def get_class_name(self, obj):
        class_names = ["fc-booking"]
        status_class = STATUS_CLASS_MAP.get(obj.status, '')
        if status_class:
            class_names.append(status_class)
        return class_names
    
    def get_something(self, obj):
        class_names = ["fc-booking"]
        status_class = STATUS_CLASS_MAP.get(obj.status, '')
        if status_class:
            class_names.append(status_class)
        return class_names

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        try:
            note_instance = instance.note
            representation['note'] = note_instance.note if note_instance else None
        except AppointmentNote.DoesNotExist:
            representation['note'] = None
        return representation

    def create(self, validated_data):
        note_text = validated_data.pop('note', None)
        services_data = validated_data.pop('services', [])
        # packages_data = validated_data.pop('packages', [])
        # products_data = validated_data.pop('products', [])

        client_id = validated_data.pop('client_id')
        client = get_object_or_404(Client, id=client_id)
        appointment = Appointment.objects.create(
            client=client, **validated_data)

        for service_data in services_data:
            # Create each AppointmentService instance
            service_instance = AppointmentService.objects.create(
                **service_data)
            # Add the service instance to the appointment
            appointment.services.add(service_instance)

        # for package_data in packages_data:
        #     # Create each AppointmentPackage instance
        #     package_instance = AppointmentPackage.objects.create(**package_data)
        #     # Add the service instance to the appointment
        #     appointment.packages.add(package_instance)

        # for product_data in products_data:
        #     # Create each AppointmentProduct instance
        #     product_instance = AppointmentProduct.objects.create(**product_data)
        #     # Add the product instance to the appointment
        #     appointment.products.add(product_instance)

        # Notes
        if note_text is not None:
            AppointmentNote.objects.create(appointment=appointment, note=note_text)
        return appointment

    def update(self, instance, validated_data):
        # Updating basic appointment fields
        for attr, value in validated_data.items():
            if attr not in ['services', 'packages', 'products', 'note']:
                setattr(instance, attr, value)

        # Handle nested relationships only if they are provided in the payload
        if 'services' in validated_data:
            services_data = validated_data.get('services')
            self.update_services(instance, services_data)

        # Similar checks can be added for packages and products
        # if 'packages' in validated_data:
        #     self.update_packages(instance, validated_data.get('packages'))
        # if 'products' in validated_data:
        #     self.update_products(instance, validated_data.get('products'))

        # Handle the note update or creation
        note_text = validated_data.get('note')
        if note_text is not None:
            AppointmentNote.objects.update_or_create(
                appointment=instance,
                defaults={'note': note_text}
            )

        instance.save()
        return instance
    
    def update_services(self, instance, services_data):
        existing_service_ids = set(instance.services.values_list('id', flat=True))
        updated_service_ids = set()

        for service_data in services_data:
            service_id = service_data.get('id')
            if service_id:
                updated_service_ids.add(service_id)
                service_instance = AppointmentService.objects.get(id=service_id)
                for attr, value in service_data.items():
                    setattr(service_instance, attr, value)
                service_instance.save()
            else:
                new_service = AppointmentService.objects.create(**service_data)
                instance.services.add(new_service)

        # Remove services that are no longer associated with the appointment
        for service_id in existing_service_ids - updated_service_ids:
            instance.services.remove(service_id)






class ServiceProviderSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceProvider
        fields = '__all__'


class ScheduleSerializer(serializers.ModelSerializer):
    # Suppose to get
    # appointments from appointment Model
    # staff from staff model

    client_id = serializers.IntegerField(source='client.id', read_only=True)
    client_name = serializers.SerializerMethodField(read_only=True)
    service_id = serializers.IntegerField(source='service.id', read_only=True)
    service_name = AppointmentServiceSerializer(many=True, read_only=True)
    duration = serializers.IntegerField(
        source='service.duration', read_only=True)
    price = serializers.IntegerField(source='service.price', read_only=True)

    def create(self, validated_data):
        services_data = validated_data.pop('services')
        appointment = Appointment.objects.create(**validated_data)
        for service_data in services_data:
            appointment_service = AppointmentService.objects.create(
                **service_data)
            ServiceProvider.objects.create(
                service=appointment_service, employee=appointment.staff)
        return appointment

    class Meta:
        model = Appointment
        fields = [
            'id', 'client_id', 'client_name', 'services', 'packages', 'products', 'notes'
        ]

    def get_service_name(self, obj):
        # Concatenate first name and last name of the client
        return f"{obj.service.name}".strip()

    def get_client_name(self, obj):
        # Concatenate first name and last name of the client
        return f"{obj.client.first_name} {obj.client.last_name}".strip()
