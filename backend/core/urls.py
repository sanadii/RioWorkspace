from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('settings/', include('apps.settings.urls')),


    # Apps
    path('account/', include('apps.account.urls')),
    # path('appointments/', include('apps.appointments.urls')),
    # path('clients/', include('apps.clients.urls')),
    path('finance/', include('apps.finance.urls')),
    # path('staff/', include('apps.staff.urls')),
    # path('services/', include('apps.services.urls')),

]
