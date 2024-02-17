from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.generics import UpdateAPIView, DestroyAPIView, CreateAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.db.models import Q  # Import Q for complex lookups

# Apps
from workspace.models.clients import Client
from workspace.serializers.clients import ClientSerializer

class GetClients(APIView):
    def get(self, request, format=None):
        clients = Client.objects.all()  # Adjust the query as needed
        serializer = ClientSerializer(clients, many=True)
        return Response({'data': serializer.data}, status=status.HTTP_200_OK)


class GetClientSearch(APIView):
    def get(self, request):
        client_search = request.GET.get('clientName', '').strip()
        
        if client_search.isdigit():
            clients = Client.objects.filter(mobile__icontains=client_search)
            if not clients.exists():
                return Response({"data": [], "count": 0, "code": 404}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Split the client_search into words
            keywords = client_search.split()
            # Filter clients by first name, last name, or mobile number
            clients = Client.objects.filter(
                Q(first_name__icontains=client_search) | 
                Q(last_name__icontains=client_search) | 
                Q()
            )
            for keyword in keywords:
                # Filter clients by mobile field
                clients = clients | Client.objects.filter(mobile__icontains=keyword)
        
        # Get the first 10 entries
        clients = clients[:10]
                
        serializer = ClientSerializer(clients, many=True)
        client_count = clients.count()  # Get the count of clients

        return Response({"data": serializer.data, "count": client_count, "code": 200}, status=status.HTTP_200_OK)


class AddClient(CreateAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

    def create(self, request, *args, **kwargs):
        """Handle Client creation."""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({"data": serializer.data, "count": 1, "code": 201}, status=status.HTTP_201_CREATED, headers=headers)

class UpdateClient(UpdateAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

    def get_object(self):
        """Retrieve and return the Client object."""
        daily_revenue = super().get_object()
        # Add any specific checks or conditions you need here
        # For example, if you need to validate against a specific condition:
        # if some_condition_not_met:
        #     raise ValidationError("Some validation error message")
        return daily_revenue

    def update(self, request, *args, **kwargs):
        """Handle Client update."""
        partial = kwargs.pop('partial', False)
        serializer = self.get_serializer(instance=self.get_object(), data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({"data": serializer.data, "count": 1, "code": 200}, status=status.HTTP_200_OK)

class DeleteClient(DestroyAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    lookup_field = 'id'

    def delete(self, request, *args, **kwargs):
        try:
            # Retrieve and delete the Client instance
            self.get_object().delete()
            return JsonResponse({"data": "Daily Client deleted successfully", "count": 1, "code": 200})
        except Client.DoesNotExist:
            return JsonResponse({"data": "Daily Client not found", "count": 0, "code": 404}, status=404)
