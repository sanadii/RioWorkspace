from django.http import JsonResponse
from django.utils.dateparse import parse_datetime
from django.shortcuts import get_object_or_404
from datetime import datetime
from django.core.exceptions import ObjectDoesNotExist

from rest_framework.views import APIView
from rest_framework.generics import UpdateAPIView, DestroyAPIView, CreateAPIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework.exceptions import NotFound
from rest_framework.permissions import AllowAny, IsAuthenticated

# Apps
from workspace.models.appointments import Appointment, AppointmentService
from workspace.models.staff import Staff
from workspace.models.clients import Client
from workspace.models.services import Service
from workspace.models.products import Product
from workspace.models.packages import Package
from workspace.models.vouchers import Voucher

from workspace.serializers.appointments import AppointmentSerializer, AppointmentServiceSerializer, ScheduleSerializer
from workspace.serializers.staff import StaffSerializer
from workspace.serializers.clients import ClientSerializer

from workspace.serializers.services import ServiceSerializer
from workspace.serializers.products import ProductSerializer
from workspace.serializers.packages import PackageSerializer
from workspace.serializers.vouchers import VoucherSerializer



class GetAppointments(APIView):
    def get(self, request, format=None):
        appointments = Appointment.objects.all()  # Adjust the query as needed
        serializer = AppointmentSerializer(appointments, many=True)
        return Response({'data': serializer.data}, status=status.HTTP_200_OK)


class GetAppointment(APIView):
    """
    Retrieve a specific appointment by ID.
    """

    def get(self, request, id, format=None):  # Add 'id' as an argument here
        try:
            appointment = Appointment.objects.get(id=id)  # Use the 'id' argument
        except Appointment.DoesNotExist:
            return Response({"error": "Appointment not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = AppointmentSerializer(appointment)
        return Response({'data': serializer.data}, status=status.HTTP_200_OK)

class GetScheduleData(APIView):
    def get(self, request, format=None):
        # Parse start and end dates from the query parameters
        start_date_str = request.query_params.get('StartDate', None)
        end_date_str = request.query_params.get('EndDate', None)

        # Convert string dates to datetime objects
        start_date = parse_datetime(start_date_str) if start_date_str else None
        end_date = parse_datetime(end_date_str) if end_date_str else None

        # Filter appointments between start and end dates, if provided
        if start_date and end_date:
            appointments = Appointment.objects.filter(
                start__gte=start_date,
                end__lte=end_date
            )
        else:
            appointments = Appointment.objects.all()

        appointment_serializer = AppointmentSerializer(appointments, many=True)

        # Fetch all services (assuming no date filtering for services)
        services = Service.objects.all()
        service_serializer = ServiceSerializer(services, many=True)

        # Fetch only staff who are commissionable and active
        commissionable_active_staff = Staff.objects.filter(commissionable=True, active=True)
        staff_serializer = StaffSerializer(commissionable_active_staff, many=True)

        # Fetch all products (assuming no date filtering for services)
        products = Product.objects.all()
        product_serializer = ProductSerializer(products, many=True)

        # Fetch all products (assuming no date filtering for services)
        packages = Package.objects.all()
        package_serializer = PackageSerializer(packages, many=True)

        # Fetch all vouchers (assuming no date filtering for services)
        vouchers = Voucher.objects.all()
        voucher_serializer = VoucherSerializer(vouchers, many=True)


        response_data = {
            'appointments': appointment_serializer.data,
            'services': service_serializer.data,
            'staff': staff_serializer.data,
            'products': product_serializer.data,
            'packages': package_serializer.data,
            'vouchers': voucher_serializer.data,
        }

        return Response({'data': response_data}, status=status.HTTP_200_OK)


# class AddAppointment(APIView):
#     def post(self, request):
#         client_data = request.data.get('client')
#         appointment_data = request.data.get('appointment')

#         print("appointment_dta: ", appointment_data)

#         if 'id' in client_data and client_data['id']:
#             client = get_object_or_404(Client, id=client_data['id'])
#             # Directly set the client ID in the appointment data
#             appointment_data['client_id'] = client.id
#         else:
#             client_serializer = ClientSerializer(data=client_data)
#             if client_serializer.is_valid():
#                 client = client_serializer.save()
#                 appointment_data['client_id'] = client.id
#             else:
#                 return Response(client_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#         appointment_serializer = AppointmentSerializer(data=appointment_data)
#         if appointment_serializer.is_valid():
#             appointment = appointment_serializer.save()
#             return Response(appointment_serializer.data, status=status.HTTP_201_CREATED)
#         else:
#             return Response(appointment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AddAppointment(APIView):
    def post(self, request):

        client_data = request.data.get('client')
        if not client_data:
            return Response({"client": ["Client data is required."]}, status=status.HTTP_400_BAD_REQUEST)

        client_id = client_data.get('id')
        if client_id:
            # Existing client, validate client ID
            try:
                client = Client.objects.get(id=client_id)
            except Client.DoesNotExist:
                return Response({"client": ["Invalid client ID."]}, status=status.HTTP_404_NOT_FOUND)
        else:
            # New client, create client
            client_serializer = ClientSerializer(data=client_data)
            if client_serializer.is_valid():
                client = client_serializer.save()
            else:
                return Response(client_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Prepare appointment data with client ID
        appointment_data = request.data.copy()
        appointment_data['client_id'] = client.id
        
        print("i want to see the client: ", client.id)

        # appointment_data = {
        #     'client': client,
        #     'start': request.data.get('start'),
        #     'end': request.data.get('end'),
        #     'note': request.data.get('description'),
        #     'services': request.data.get('services', [])
        # }

        print("Appointment Data:", appointment_data)  # Print the processed appointment data

        appointment_serializer = AppointmentSerializer(data=appointment_data)
        if appointment_serializer.is_valid():
            appointment = appointment_serializer.save()
            print("Created Appointment:", appointment)  # Print the created appointment
            return Response({'data': appointment_serializer.data}, status=status.HTTP_201_CREATED)
        else:
            print("Appointment Serializer Errors:", appointment_serializer.errors)  # Print serializer errors
            return Response(appointment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateAppointment(UpdateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

    def get_object(self):
        """Retrieve and return the Appointment object."""
        appointment = super().get_object()
        # Add any specific checks or conditions you need here
        # For example, if you need to validate against a specific condition:
        # if some_condition_not_met:
        #     raise ValidationError("Some validation error message")
        return appointment

    def update(self, request, *args, **kwargs):
        """Handle Appointment update."""
        partial = kwargs.pop('partial', False)
        serializer = self.get_serializer(
            instance=self.get_object(), data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({"data": serializer.data, "count": 1, "code": 200}, status=status.HTTP_200_OK)


class DeleteAppointment(DestroyAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    lookup_field = 'id'

    def delete(self, request, *args, **kwargs):
        try:
            # Retrieve and delete the Appointment instance
            self.get_object().delete()
            return JsonResponse({"data": "Daily Appointment deleted successfully", "count": 1, "code": 200})
        except Appointment.DoesNotExist:
            return JsonResponse({"data": "Daily Appointment not found", "count": 0, "code": 404}, status=404)
