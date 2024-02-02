# apps/workspace/urls.py
from django.urls import path, include

app_name = "workspace"

urlpatterns = [
    path('finance/', include('workspace.urls.finance')),
]
