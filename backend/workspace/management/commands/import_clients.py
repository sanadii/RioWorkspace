# myapp/management/commands/import_clients.py
from django.core.management.base import BaseCommand
import pandas as pd
from datetime import datetime
from workspace.models.clients import Client, ClientAdditionalInfo
import os
from tqdm import tqdm


class Command(BaseCommand):
    help = 'Import clients from a CSV file'

    def handle(self, *args, **kwargs):
        csv_file_path = os.path.join(os.path.dirname(__file__), 'data', 'rio_clients.csv')
        if not os.path.isfile(csv_file_path):
            self.stdout.write(self.style.ERROR('CSV file not found. Please specify a valid file path.'))
            return

        data = pd.read_csv(csv_file_path)
        total_rows = len(data)
        self.stdout.write(self.style.SUCCESS(f'Starting import of {total_rows} clients...'))

        date_formats = ['%Y-%m-%d %I:%M%p', '%Y-%m-%d', '%m/%d/%Y']

        for index, row in tqdm(data.iterrows(), total=total_rows, desc="Importing clients"):
            date_of_birth = None
            if pd.notna(row['date_of_birth']):
                for fmt in date_formats:
                    try:
                        date_of_birth = datetime.strptime(row['date_of_birth'], fmt).date()
                        break
                    except ValueError:
                        continue
                if date_of_birth is None:
                    self.stdout.write(self.style.WARNING(f"Invalid date format for {row['first_name']} {row['last_name']}"))
                for fmt in date_formats:
                    try:
                        date_of_birth = datetime.strptime(row['date_of_birth'], fmt).date()
                        break
                    except ValueError:
                        continue
                if date_of_birth is None:
                    self.stdout.write(self.style.WARNING(f"Invalid date format for {row['first_name']} {row['last_name']}"))


            client = Client(
                first_name=row['first_name'],
                last_name=row['last_name'] if pd.notna(row['last_name']) else '',
                mobile=row['mobile'],
                email=row['email'] if pd.notna(row['email']) else '',
                city=row['city'] if pd.notna(row['city']) else '',
                date_of_birth=date_of_birth,
                occupation=row['occupation'] if pd.notna(row['occupation']) else '',
            )
            client.save()

            ClientAdditionalInfo(
                client=client,
                mobile_alt=row['mobile_alt'] if pd.notna(row['mobile_alt']) else '',
                referred_by=row['referred_by'] if pd.notna(row['referred_by']) else '',
                vip=row['vip'],
                status=row['status'],
                blocked=row['blocked'],
            ).save()

        self.stdout.write(self.style.SUCCESS('Successfully imported clients'))
