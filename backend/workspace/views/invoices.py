from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.generics import UpdateAPIView, DestroyAPIView, CreateAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import AllowAny, IsAuthenticated

# Apps
from workspace.models.invoices import Invoice, Transaction
from workspace.serializers.invoices import InvoiceSerializer, TransactionSerializer

class GetInvoices(APIView):
    def get(self, request, format=None):
        invoices = Invoice.objects.all()  # Adjust the query as needed
        serializer = InvoiceSerializer(invoices, many=True)
        return Response({'data': serializer.data}, status=status.HTTP_200_OK)

class GetInvoiceById(APIView):
    """
    Retrieve a specific invoice by ID.
    """

    def get(self, request, id, format=None):  # Add 'id' as an argument here
        try:
            invoice = Invoice.objects.get(id=id)  # Use the 'id' argument
        except Invoice.DoesNotExist:
            return Response({"error": "Invoice not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = InvoiceSerializer(invoice)
        return Response({'data': serializer.data}, status=status.HTTP_200_OK)
    
class AddInvoice(CreateAPIView):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer

    def create(self, request, *args, **kwargs):
        """Handle Invoice creation."""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({"data": serializer.data, "count": 1, "code": 201}, status=status.HTTP_201_CREATED, headers=headers)

class UpdateInvoice(UpdateAPIView):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

    def get_object(self):
        """Retrieve and return the Invoice object."""
        daily_invoice = super().get_object()
        # Add any specific checks or conditions you need here
        # For example, if you need to validate against a specific condition:
        # if some_condition_not_met:
        #     raise ValidationError("Some validation error message")
        return daily_invoice

    def update(self, request, *args, **kwargs):
        """Handle Invoice update."""
        partial = kwargs.pop('partial', False)
        serializer = self.get_serializer(instance=self.get_object(), data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({"data": serializer.data, "count": 1, "code": 200}, status=status.HTTP_200_OK)

class DeleteInvoice(DestroyAPIView):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
    lookup_field = 'id'

    def delete(self, request, *args, **kwargs):
        try:
            # Retrieve and delete the Invoice instance
            self.get_object().delete()
            return JsonResponse({"data": "Daily Invoice deleted successfully", "count": 1, "code": 200})
        except Invoice.DoesNotExist:
            return JsonResponse({"data": "Daily Invoice not found", "count": 0, "code": 404}, status=404)


# Transaction
class GetTransactions(APIView):
    def get(self, request, format=None):
        transactions = Transaction.objects.all()  # Adjust the query as needed
        serializer = TransactionSerializer(transactions, many=True)
        return Response({'data': serializer.data}, status=status.HTTP_200_OK)

class GetTransactionById(APIView):
    """
    Retrieve a specific transaction by ID.
    """

    def get(self, request, id, format=None):  # Add 'id' as an argument here
        try:
            transaction = Transaction.objects.get(id=id)  # Use the 'id' argument
        except Transaction.DoesNotExist:
            return Response({"error": "Transaction not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = TransactionSerializer(transaction)
        return Response({'data': serializer.data}, status=status.HTTP_200_OK)
    
class AddTransaction(CreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({"data": serializer.data, "count": 1, "code": 201}, status=status.HTTP_201_CREATED, headers=headers)

class UpdateTransaction(UpdateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

class DeleteTransaction(DestroyAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    lookup_field = 'id'

    def delete(self, request, *args, **kwargs):
        try:
            self.get_object().delete()
            return JsonResponse({"data": "Transaction deleted successfully", "count": 1, "code": 200})
        except Transaction.DoesNotExist:
            return JsonResponse({"data": "Transaction not found", "count": 0, "code": 404}, status=404)
