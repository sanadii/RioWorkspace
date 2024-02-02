from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('settings/', include('settings.urls')),
    path('account/', include('account.urls')),


    # Apps
    path('finance/', include('workspace.urls.finance')),
    path('appointments/', include('workspace.urls.appointments')),
    path('services/', include('workspace.urls.services')),
]
