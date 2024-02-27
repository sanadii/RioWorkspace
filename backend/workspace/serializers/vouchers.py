from rest_framework import serializers
from workspace.models.vouchers import Voucher

class VoucherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Voucher
        fields = '__all__'  # or list specific fields if you don't want to expose all

