# Finance Urls
from django.urls import path
from .views import *

app_name = "finance"

urlpatterns = [

    # DailyRevenue
    path("getDailyRevenues", GetDailyRevenues.as_view(), name="GetDailyRevenues"),
    path('addDailyRevenue', AddDailyRevenue.as_view(), name='add_daily_revenue'),
    path('editDailyRevenue/<int:id>', EditDailyRevenue.as_view(), name='edit_daily_revenue'),
    path('deleteDailyRevenue/<int:id>', DeleteDailyRevenue.as_view(), name='delete_daily_revenue'),

    # Commissions

    # Expenses


    # path("getAllFinance", GetAllFinance.as_view(), name="GetAllFinance"),
    # path("getAttendee", GetAttendee.as_view(), name="GetAttendee"),
    # path('updateAttendee/<int:pk>', UpdateAttendee.as_view(), name='UpdateAttendee'),
    # path('getFinance', GetFinance.as_view(), name='GetFinance'),

]