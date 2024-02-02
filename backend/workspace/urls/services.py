# Finance Urls
from django.urls import path
from workspace.views.services import *

app_name = "services"

urlpatterns = [
    # Service URLs
    path("getServices", GetServices.as_view(), name="GetServices"),
    path('addService', AddService.as_view(), name='AddService'),
    path('updateService/<int:id>', UpdateService.as_view(), name='UpdateService'),
    path('deleteService/<int:id>', DeleteService.as_view(), name='DeleteService'),
]