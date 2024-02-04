from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.generics import UpdateAPIView, DestroyAPIView, CreateAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import AllowAny, IsAuthenticated

# Apps
from workspace.models.finance import Revenue, Expense
from workspace.serializers.finance import RevenueSerializer, ExpenseSerializer

class GetRevenues(APIView):
    def get(self, request, format=None):
        revenues = Revenue.objects.all()  # Adjust the query as needed
        serializer = RevenueSerializer(revenues, many=True)
        return Response({'data': serializer.data}, status=status.HTTP_200_OK)

class AddRevenue(CreateAPIView):
    queryset = Revenue.objects.all()
    serializer_class = RevenueSerializer

    def create(self, request, *args, **kwargs):
        """Handle Revenue creation."""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({"data": serializer.data, "count": 1, "code": 201}, status=status.HTTP_201_CREATED, headers=headers)

class UpdateRevenue(UpdateAPIView):
    queryset = Revenue.objects.all()
    serializer_class = RevenueSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

    def get_object(self):
        """Retrieve and return the Revenue object."""
        daily_revenue = super().get_object()
        # Add any specific checks or conditions you need here
        # For example, if you need to validate against a specific condition:
        # if some_condition_not_met:
        #     raise ValidationError("Some validation error message")
        return daily_revenue

    def update(self, request, *args, **kwargs):
        """Handle Revenue update."""
        partial = kwargs.pop('partial', False)
        serializer = self.get_serializer(instance=self.get_object(), data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({"data": serializer.data, "count": 1, "code": 200}, status=status.HTTP_200_OK)

class DeleteRevenue(DestroyAPIView):
    queryset = Revenue.objects.all()
    serializer_class = RevenueSerializer
    lookup_field = 'id'

    def delete(self, request, *args, **kwargs):
        try:
            # Retrieve and delete the Revenue instance
            self.get_object().delete()
            return JsonResponse({"data": "Daily Revenue deleted successfully", "count": 1, "code": 200})
        except Revenue.DoesNotExist:
            return JsonResponse({"data": "Daily Revenue not found", "count": 0, "code": 404}, status=404)


# Expense
class GetExpenses(APIView):
    def get(self, request, format=None):
        expenses = Expense.objects.all()  # Adjust the query as needed
        serializer = ExpenseSerializer(expenses, many=True)
        return Response({'data': serializer.data}, status=status.HTTP_200_OK)

class AddExpense(CreateAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({"data": serializer.data, "count": 1, "code": 201}, status=status.HTTP_201_CREATED, headers=headers)

class UpdateExpense(UpdateAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

class DeleteExpense(DestroyAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    lookup_field = 'id'

    def delete(self, request, *args, **kwargs):
        try:
            self.get_object().delete()
            return JsonResponse({"data": "Expense deleted successfully", "count": 1, "code": 200})
        except Expense.DoesNotExist:
            return JsonResponse({"data": "Expense not found", "count": 0, "code": 404}, status=404)
