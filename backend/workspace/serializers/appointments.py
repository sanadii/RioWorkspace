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
        fields = ['id', 'service', 'staff', 'start_time', 'end_time', 'duration', 'price',
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
    title = serializers.CharField(source='client.first_name', read_only=True)
    client_id = serializers.IntegerField(write_only=True)
    client = ClientSerializer(read_only=True)
    services = AppointmentServiceSerializer(many=True, required=False)
    packages = AppointmentPackageSerializer(many=True, required=False)
    products = AppointmentProductSerializer(many=True, required=False)
    note = serializers.CharField(required=False, allow_blank=True)
    start = serializers.DateTimeField(source='start_time')  # Renaming start_time to start

    class Meta:
        model = Appointment
        fields = [
            'id', 'start_time', 'end_time', 'start', 'status', 'title', 'client', 'client_id',
            'services', 'packages', 'products', 'note'
            ]

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

        return appointment

    def update(self, instance, validated_data):
        # Updating basic appointment fields
        instance.start_time = validated_data.get(
            'start_time', instance.start_time)
        instance.end_time = validated_data.get('end_time', instance.end_time)
        instance.status = validated_data.get('status', instance.status)
        instance.save()

        services_data = validated_data.pop('services', [])
        packages_data = validated_data.pop('packages', [])
        products_data = validated_data.pop('products', [])
        note_text = validated_data.pop('note', None)

        existing_service_ids = [
            service.id for service in instance.services.all()]
        existing_package_ids = [
            package.id for package in instance.packages.all()]
        existing_product_ids = [
            product.id for product in instance.products.all()]

        updated_service_ids = []
        updated_package_ids = []
        updated_product_ids = []

        # Update or create services
        for service_data in services_data:
            service_id = service_data.get('id')
            if service_id:
                updated_service_ids.append(service_id)
                service_instance = AppointmentService.objects.get(
                    id=service_id)
                for attr, value in service_data.items():
                    setattr(service_instance, attr, value)
                service_instance.save()
            else:
                new_service = AppointmentService.objects.create(**service_data)
                instance.services.add(new_service)

        # Update or create packages
        for package_data in packages_data:
            package_id = package_data.get('id')
            if package_id:
                updated_package_ids.append(package_id)
                package_instance = AppointmentPackage.objects.get(
                    id=package_id)
                for attr, value in package_data.items():
                    setattr(package_instance, attr, value)
                package_instance.save()
            else:
                new_package = AppointmentPackage.objects.create(**package_data)
                instance.packages.add(new_package)

        # Update or create products
        for product_data in products_data:
            product_id = product_data.get('id')
            if product_id:
                updated_product_ids.append(product_id)
                product_instance = AppointmentProduct.objects.get(
                    id=product_id)
                for attr, value in product_data.items():
                    setattr(product_instance, attr, value)
                product_instance.save()
            else:
                new_product = AppointmentProduct.objects.create(**product_data)
                instance.products.add(new_product)

        # Remove old services, packages, and products
        for service_id in existing_service_ids:
            if service_id not in updated_service_ids:
                instance.services.remove(service_id)

        for package_id in existing_package_ids:
            if package_id not in updated_package_ids:
                instance.packages.remove(package_id)

        for product_id in existing_product_ids:
            if product_id not in updated_product_ids:
                instance.products.remove(product_id)

        # Handle the note update or creation
        if note_text is not None:
            note_instance, created = AppointmentNote.objects.update_or_create(
                appointment=instance,
                defaults={'note': note_text}
            )

        instance.save()
        return instance


    # def update(self, instance, validated_data):
    #     services_data = validated_data.pop('services', [])
    #     existing_service_ids = [service.id for service in instance.services.all()]
    #     updated_service_ids = []

    #     instance.start_time = validated_data.get('start_time', instance.start_time)
    #     instance.end_time = validated_data.get('end_time', instance.end_time)
    #     instance.status = validated_data.get('status', instance.status)
    #     instance.save()

    #     for service_data in services_data:
    #         service_id = service_data.get('id')
    #         if service_id:
    #             updated_service_ids.append(service_id)
    #             service_instance = AppointmentService.objects.get(id=service_id)
    #             # Update the existing service instance
    #             for attr, value in service_data.items():
    #                 setattr(service_instance, attr, value)
    #             service_instance.save()
    #         else:
    #             # Create a new service instance and add it to the appointment
    #             new_service = AppointmentService.objects.create(**service_data)
    #             instance.services.add(new_service)

    #     # Remove services that are no longer associated with the appointment
    #     for service_id in existing_service_ids:
    #         if service_id not in updated_service_ids:
    #             instance.services.remove(service_id)

    #     instance.save()
    #     return instance


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
