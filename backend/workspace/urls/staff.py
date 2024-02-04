# staff Urls
from django.urls import path
from workspace.views.staff import *

app_name = "staff"

urlpatterns = [
    # Staff URLs
    path("getAllStaff", GetAllStaff.as_view(), name="GetStaffs"),
    path('addStaff', AddStaff.as_view(), name='AddStaff'),
    path('updateStaff/<int:id>', UpdateStaff.as_view(), name='UpdateStaff'),
    path('deleteStaff/<int:id>', DeleteStaff.as_view(), name='DeleteStaff'),
]