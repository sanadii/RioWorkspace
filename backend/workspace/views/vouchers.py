from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.generics import UpdateAPIView, DestroyAPIView, CreateAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import AllowAny, IsAuthenticated

# Apps
from workspace.models.vouchers import Voucher
from workspace.serializers.vouchers import VoucherSerializer

class GetVouchers(APIView):
    def get(self, request, format=None):
        revenues = Voucher.objects.all()  # Adjust the query as needed
        serializer = VoucherSerializer(revenues, many=True)
        return Response({'data': serializer.data}, status=status.HTTP_200_OK)

class AddVoucher(CreateAPIView):
    queryset = Voucher.objects.all()
    serializer_class = VoucherSerializer

    def create(self, request, *args, **kwargs):
        """Handle Voucher creation."""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({"data": serializer.data, "count": 1, "code": 201}, status=status.HTTP_201_CREATED, headers=headers)

class UpdateVoucher(UpdateAPIView):
    queryset = Voucher.objects.all()
    serializer_class = VoucherSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

    def get_object(self):
        """Retrieve and return the Voucher object."""
        daily_revenue = super().get_object()
        # Add any specific checks or conditions you need here
        # For example, if you need to validate against a specific condition:
        # if some_condition_not_met:
        #     raise ValidationError("Some validation error message")
        return daily_revenue

    def update(self, request, *args, **kwargs):
        """Handle Voucher update."""
        partial = kwargs.pop('partial', False)
        serializer = self.get_serializer(instance=self.get_object(), data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({"data": serializer.data, "count": 1, "code": 200}, status=status.HTTP_200_OK)

class DeleteVoucher(DestroyAPIView):
    queryset = Voucher.objects.all()
    serializer_class = VoucherSerializer
    lookup_field = 'id'

    def delete(self, request, *args, **kwargs):
        try:
            # Retrieve and delete the Voucher instance
            self.get_object().delete()
            return JsonResponse({"data": "Daily Voucher deleted successfully", "count": 1, "code": 200})
        except Voucher.DoesNotExist:
            return JsonResponse({"data": "Daily Voucher not found", "count": 0, "code": 404}, status=404)
