from rest_framework import serializers
from workspace.models.invoices import Invoice, InvoiceAppointment, InvoiceProduct, InvoicePackage, Transaction
from workspace.models.products import Product
from workspace.models.packages import Package
from workspace.models.services import Service
from workspace.models.staff import Staff
from workspace.models.appointments import Appointment


class InvoicePackageSerializer(serializers.ModelSerializer):
    item_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = InvoicePackage
        fields = ['invoice', 'package', 'quantity', 'unit_price', 'staff', 'item_id']

    def create(self, validated_data):
        item_id = validated_data.pop('item_id')
        staff_id = validated_data.pop('staff', None)

        package_instance = Package.objects.get(id=item_id)
        staff_instance = Staff.objects.get(id=staff_id) if staff_id else None

        return InvoiceProduct.objects.create(
            package=package_instance, 
            staff=staff_instance, 
            **validated_data
        )



class InvoiceProductSerializer(serializers.ModelSerializer):
    item_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = InvoiceProduct
        fields = ['invoice', 'product', 'quantity','unit_price', 'staff', 'item_id']

    def create(self, validated_data):
        item_id = validated_data.pop('item_id')
        staff_id = validated_data.pop('staff', None)

        product_instance = Product.objects.get(id=item_id)
        staff_instance = Staff.objects.get(id=staff_id) if staff_id else None

        return InvoiceProduct.objects.create(
            product=product_instance, 
            staff=staff_instance, 
            **validated_data
        )


class InvoiceAppointmentSerializer(serializers.ModelSerializer):
    appointment = serializers.PrimaryKeyRelatedField(
        queryset=Appointment.objects.all()
    )

    class Meta:
        model = InvoiceAppointment
        fields = '__all__'


class InvoiceSerializer(serializers.ModelSerializer):
    appointment = serializers.PrimaryKeyRelatedField(
        queryset=Appointment.objects.all(),
        write_only=True
    )
    items = serializers.JSONField(write_only=True)  # Make this field write-only

    class Meta:
        model = Invoice
        fields = ['id', 'date', 'client', 'status', 'invoice_type', 'note', 'items', 'appointment']
        # extra_kwargs = {'items': {'write_only': True}}

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        # Fetch related packages and products
        packages = instance.package_invoices.all()  # Use the correct related_name
        products = instance.product_invoices.all()  # Use the correct related_name

        # Serialize packages and products
        serialized_packages = InvoicePackageSerializer(packages, many=True).data
        serialized_products = InvoiceProductSerializer(products, many=True).data

        # Nest serialized packages and products under 'items'
        representation['items'] = {
            'packages': serialized_packages,
            'products': serialized_products
        }

        return representation


    def create(self, validated_data):
        items_data = validated_data.pop('items', {})
        products_data = items_data.get('products', [])
        packages_data = items_data.get('packages', [])
        appointment_id = validated_data.pop('appointment', None)

        print("Processing Products:", products_data)  # Debug

        invoice = Invoice.objects.create(**validated_data)

        # Appointment handling
        if appointment_id:
            appointment_instance = Appointment.objects.get(
                id=appointment_id.id)
            InvoiceAppointment.objects.create(
                invoice=invoice, appointment=appointment_instance)

        # Handling products
        for product_data in products_data:
            self.create_invoice_product(product_data, invoice)

        # Handling packages
        for package_data in packages_data:
            self.create_invoice_package(package_data, invoice)

        return invoice

    def create_invoice_product(self, product_data, invoice):
        print("Creating Invoice Product with data:", product_data)  # Debug
        product_id = product_data.pop('item_id')
        staff_id = product_data.pop('staff', None)
        product_data.pop('name', None)

        product_instance = Product.objects.get(id=product_id)
        
        # Fetch the Staff instance using staff_id
        staff_instance = None
        if staff_id is not None:
            staff_instance = Staff.objects.get(id=staff_id)


        InvoiceProduct.objects.create(
            invoice=invoice,
            product=product_instance,
            staff=staff_instance,
            # total_price=total_price,  # Provide the calculated total_price
            **product_data
        )
        
        print("Invoice Product Created:", product_data)  # Debug


    def create_invoice_package(self, package_data, invoice):
        package_id = package_data.pop('item_id')
        staff_id = package_data.pop('staff', None)
        package_data.pop('name', None)

        package_instance = Package.objects.get(id=package_id)

        # Fetch the Staff instance using staff_id
        staff_instance = None
        if staff_id is not None:
            staff_instance = Staff.objects.get(id=staff_id)

        # # Calculate total_price
        # quantity = package_data.get('quantity', 1)
        # unit_price = package_data.get('unit_price', 0)
        # total_price = quantity * unit_price

        # Create the InvoiceProduct instance
        InvoicePackage.objects.create(
            invoice=invoice,
            package=package_instance,
            staff=staff_instance,
            # total_price=total_price,  # Provide the calculated total_price
            **package_data
        )


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'
