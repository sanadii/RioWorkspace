# Finance Urls
from django.urls import path
from workspace.views.vouchers import *

app_name = "vouchers"

urlpatterns = [
    # Voucher URLs
    path("getVouchers", GetVouchers.as_view(), name="GetVouchers"),
    path('addVoucher', AddVoucher.as_view(), name='AddVoucher'),
    path('updateVoucher/<int:id>', UpdateVoucher.as_view(), name='UpdateVoucher'),
    path('deleteVoucher/<int:id>', DeleteVoucher.as_view(), name='DeleteVoucher'),
]