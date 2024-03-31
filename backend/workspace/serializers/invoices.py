from rest_framework import serializers
from workspace.models.invoices import Invoice, InvoiceProduct, InvoicePackage, Transaction
from workspace.models.products import Product
from workspace.models.packages import Package
from workspace.models.services import Service

class InvoicePackageSerializer(serializers.ModelSerializer):
    item_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = InvoicePackage
        fields = ['invoice', 'package', 'quantity', 'unit_price', 'total_price', 'item_id']

    def create(self, validated_data):
        # Extract itemId and find the corresponding Package
        item_id = validated_data.pop('item_id')
        package = Package.objects.get(id=item_id)
        
        print("item_id: ", item_id)
        # Create the InvoicePackage instance with the correct package reference
        invoice_package = InvoicePackage.objects.create(package=package, **validated_data)
        return invoice_package

class InvoiceProductSerializer(serializers.ModelSerializer):
    item_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = InvoiceProduct
        fields = ['invoice', 'product', 'quantity', 'unit_price', 'total_price', 'item_id']

    def create(self, validated_data):
        # Extract itemId and find the corresponding Product
        item_id = validated_data.pop('item_id')
        product = Product.objects.get(id=item_id)
        
        # Create the InvoiceProduct instance with the correct product reference
        invoice_product = InvoiceProduct.objects.create(product=product, **validated_data)
        return invoice_product

# Assuming you have a similar serializer for services
class InvoiceServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'



# class InvoiceSerializer(serializers.ModelSerializer):
#     products = InvoiceProductSerializer(many=True, read_only=True)
#     packages = InvoicePackageSerializer(many=True, read_only=True)

#     class Meta:
#         model = Invoice
#         fields = ['id', 'date', 'client', 'status', 'invoice_type', 'note', 'products', 'packages']

#     def to_representation(self, instance):
#         representation = super().to_representation(instance)
#         items = {
#             'products': representation.pop('products', []),
#             'packages': representation.pop('packages', []),
#         }
        
#         # print("self printing: ", self)

#         representation['items'] = items
#         return representation

#     def create(self, validated_data):
#         items_data = validated_data.pop('items', {})
#         products_data = items_data.get('products', [])
#         packages_data = items_data.get('packages', [])
#         invoice = Invoice.objects.create(**validated_data)
#         print("items_data: ", items_data)
#         print("products_data: ", products_data)
#         print("self printing: ", self)

#         for product_data in products_data:
#             product_id = product_data.pop('item_id')
#             product_instance = Product.objects.get(id=product_id)
#             InvoiceProduct.objects.create(invoice=invoice, product=product_instance, **product_data)

#         for package_data in packages_data:
#             package_id = package_data.pop('item_id')
#             package_instance = Package.objects.get(id=package_id)
#             InvoicePackage.objects.create(invoice=invoice, package=package_instance, **package_data)

#         return invoice

class InvoiceSerializer(serializers.ModelSerializer):
    products = InvoiceProductSerializer(many=True, read_only=True)
    packages = InvoicePackageSerializer(many=True, read_only=True)

    class Meta:
        model = Invoice
        fields = ['id', 'date', 'client', 'status', 'invoice_type', 'note', 'products', 'packages']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        items = {
            'products': representation.pop('products', []),
            'packages': representation.pop('packages', []),
        }
        representation['items'] = items
        return representation

    def create(self, validated_data):
        print("validated_data: ", validated_data)  # Debug print
        # Rest of the method...

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'
