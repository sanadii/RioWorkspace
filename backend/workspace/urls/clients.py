# Finance Urls
from django.urls import path
from workspace.views.clients import *

app_name = "clients"

urlpatterns = [
    # Client URLs
    path("getClients", GetClients.as_view(), name="GetClients"),
    path('addClient', AddClient.as_view(), name='AddClient'),
    path('updateClient/<int:id>', UpdateClient.as_view(), name='UpdateClient'),
    path('deleteClient/<int:id>', DeleteClient.as_view(), name='DeleteClient'),
]