from django.core.management.base import BaseCommand
import pandas as pd
from datetime import datetime
from workspace.models.clients import Client, ClientAdditionalInfo
import csv
import os


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

        for index, row in data.iterrows():
            progress = (index + 1) / total_rows * 100
            self.stdout.write(f"Importing clients... {progress:.2f}% completed")

            # Rest of the code for processing each row

        self.stdout.write(self.style.SUCCESS('Successfully imported clients'))
