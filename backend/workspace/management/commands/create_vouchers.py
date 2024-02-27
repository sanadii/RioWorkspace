import os
import csv
from django.core.management.base import BaseCommand
from django.utils import timezone
from workspace.models.vouchers import Voucher  # Replace 'yourapp' with the name of your Django app

class Command(BaseCommand):
    help = 'Load vouchers from a CSV file'

    def handle(self, *args, **kwargs):
        # Set the path to the CSV file
        csv_file_path = os.path.join(os.path.dirname(__file__), 'data', 'rio_vouchers.csv')

        with open(csv_file_path, mode='r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            for row in reader:
                Voucher.objects.create(
                    name=row['name'],
                    description=row['description'],
                    is_custom_amount=row['is_custom_amount'] == 'True',
                    fixed_amount=float(row['fixed_amount']) if row['fixed_amount'] else None,
                    is_redeemable_online=row['is_redeemable_online'] == 'True',
                    is_voidable=row['is_voidable'] == 'True',
                    template=row['template'],
                    expiry_months=int(row['expiry_months']),
                    terms=row['terms'],
                    created_at=timezone.now(),
                    updated_at=timezone.now()
                )
        self.stdout.write(self.style.SUCCESS('Successfully loaded vouchers from CSV'))
