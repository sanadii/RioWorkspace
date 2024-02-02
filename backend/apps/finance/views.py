from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.generics import UpdateAPIView, DestroyAPIView, CreateAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import AllowAny, IsAuthenticated

# Apps
from .models import DailyRevenue, Expenses
from .serializers import DailyRevenueSerializer, ExpensesSerializer

class GetDailyRevenues(APIView):
    def get(self, request, format=None):
        revenues = DailyRevenue.objects.all()  # Adjust the query as needed
        serializer = DailyRevenueSerializer(revenues, many=True)
        return Response({'data': serializer.data}, status=status.HTTP_200_OK)

class AddDailyRevenue(CreateAPIView):
    queryset = DailyRevenue.objects.all()
    serializer_class = DailyRevenueSerializer

    def create(self, request, *args, **kwargs):
        """Handle DailyRevenue creation."""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({"data": serializer.data, "count": 1, "code": 201}, status=status.HTTP_201_CREATED, headers=headers)

class UpdateDailyRevenue(UpdateAPIView):
    queryset = DailyRevenue.objects.all()
    serializer_class = DailyRevenueSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

    def get_object(self):
        """Retrieve and return the DailyRevenue object."""
        daily_revenue = super().get_object()
        # Add any specific checks or conditions you need here
        # For example, if you need to validate against a specific condition:
        # if some_condition_not_met:
        #     raise ValidationError("Some validation error message")
        return daily_revenue

    def update(self, request, *args, **kwargs):
        """Handle DailyRevenue update."""
        partial = kwargs.pop('partial', False)
        serializer = self.get_serializer(instance=self.get_object(), data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({"data": serializer.data, "count": 1, "code": 200}, status=status.HTTP_200_OK)

class DeleteDailyRevenue(DestroyAPIView):
    queryset = DailyRevenue.objects.all()
    serializer_class = DailyRevenueSerializer
    lookup_field = 'id'

    def delete(self, request, *args, **kwargs):
        try:
            # Retrieve and delete the DailyRevenue instance
            self.get_object().delete()
            return JsonResponse({"data": "Daily Revenue deleted successfully", "count": 1, "code": 200})
        except DailyRevenue.DoesNotExist:
            return JsonResponse({"data": "Daily Revenue not found", "count": 0, "code": 404}, status=404)


# Expenses
class GetExpenses(APIView):
    def get(self, request, format=None):
        expenses = Expenses.objects.all()  # Adjust the query as needed
        serializer = ExpensesSerializer(expenses, many=True)
        return Response({'data': serializer.data}, status=status.HTTP_200_OK)

class AddExpense(CreateAPIView):
    queryset = Expenses.objects.all()
    serializer_class = ExpensesSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({"data": serializer.data, "count": 1, "code": 201}, status=status.HTTP_201_CREATED, headers=headers)

class UpdateExpense(UpdateAPIView):
    queryset = Expenses.objects.all()
    serializer_class = ExpensesSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

class DeleteExpense(DestroyAPIView):
    queryset = Expenses.objects.all()
    serializer_class = ExpensesSerializer
    lookup_field = 'id'

    def delete(self, request, *args, **kwargs):
        try:
            self.get_object().delete()
            return JsonResponse({"data": "Expense deleted successfully", "count": 1, "code": 200})
        except Expenses.DoesNotExist:
            return JsonResponse({"data": "Expense not found", "count": 0, "code": 404}, status=404)
