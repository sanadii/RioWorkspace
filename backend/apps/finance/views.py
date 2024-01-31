from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.generics import UpdateAPIView, DestroyAPIView, CreateAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

# Apps
from .models import DailyRevenue
from .serializers import DailyRevenueSerializer

class GetDailyRevenues(APIView):
    def get(self, request, format=None):
        revenues = DailyRevenue.objects.all()  # Adjust the query as needed
        serializer = DailyRevenueSerializer(revenues, many=True)
        return Response({'data': serializer.data}, status=status.HTTP_200_OK)

class AddDailyRevenue(CreateAPIView):
    queryset = DailyRevenue.objects.all()
    serializer_class = DailyRevenueSerializer

class EditDailyRevenue(UpdateAPIView):
    queryset = DailyRevenue.objects.all()
    serializer_class = DailyRevenueSerializer
    lookup_field = 'id'  # or another field that you use as an identifier

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
