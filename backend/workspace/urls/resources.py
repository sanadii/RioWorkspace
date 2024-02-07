# Finance Urls
from django.urls import path
from backend.workspace.views.resources import *

app_name = "resources"

urlpatterns = [
    # Resource URLs
    path("getResources", GetResources.as_view(), name="GetResources"),
    path('addResource', AddResource.as_view(), name='AddResource'),
    path('updateResource/<int:id>', UpdateResource.as_view(), name='UpdateResource'),
    path('deleteResource/<int:id>', DeleteResource.as_view(), name='DeleteResource'),
]