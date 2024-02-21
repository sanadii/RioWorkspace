from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.generics import UpdateAPIView, DestroyAPIView, CreateAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.db.models import Q  # Import Q for complex lookups

# Apps
from workspace.models.packages import Package
# from workspace.serializers.clients import ClientSerializer
