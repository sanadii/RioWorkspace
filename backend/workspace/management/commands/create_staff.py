import csv
import os
from django.core.management.base import BaseCommand
from workspace.models.staff import Staff

class Command(BaseCommand):
    help = 'Create sample staff from CSV file'

    def handle(self, *args, **options):
        # Path to the CSV file
        csv_file_path = os.path.join(os.path.dirname(__file__), 'data', 'rio_staff.csv')
        if not os.path.isfile(csv_file_path):
            self.stdout.write(self.style.ERROR('CSV file not found. Please specify a valid file path.'))
            return

        try:
            with open(csv_file_path, newline='', encoding='utf-8') as csvfile:
                reader = csv.DictReader(csvfile)
                total_rows = sum(1 for row in reader)  # Count total rows
                csvfile.seek(0)  # Reset file pointer to the beginning
                reader = csv.DictReader(csvfile)  # Reinitialize reader

                self.stdout.write(self.style.SUCCESS(f'Starting import of {total_rows} staff members...'))

                for index, row in enumerate(reader):
                    progress = (index + 1) / total_rows * 100
                    self.stdout.write(f"\rImporting staff... {progress:.2f}% completed", ending='')  # Update progress
                    self.stdout.flush()  # Clear the buffer

                    # Extract staff information from each row
                    name = row['name']
                    salary = float(row['salary'])
                    active = row['active'].lower() == 'true'
                    bookable = row['bookable'].lower() == 'true'
                    commissionable = row['commissionable'].lower() == 'true'

                    # Create or update staff instance
                    staff, created = Staff.objects.update_or_create(
                        name=name,
                        defaults={'salary': salary, 'active': active, 'bookable': bookable, 'commissionable': commissionable}
                    )

                self.stdout.write("\n")  # Move to the next line after completion
                self.stdout.write(self.style.SUCCESS('Successfully imported staff members'))

        except FileNotFoundError:
            self.stdout.write(self.style.ERROR('CSV file not found. Please check the file path.'))
