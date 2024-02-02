# Finance Urls
from django.urls import path
from workspace.views.appointments import *

app_name = "appointments"

urlpatterns = [
    # Appointment URLs
    path("getAppointments", GetAppointments.as_view(), name="GetAppointments"),
    path('addAppointment', AddAppointment.as_view(), name='AddAppointment'),
    path('updateAppointment/<int:id>', UpdateAppointment.as_view(), name='UpdateAppointment'),
    path('deleteAppointment/<int:id>', DeleteAppointment.as_view(), name='DeleteAppointment'),
]