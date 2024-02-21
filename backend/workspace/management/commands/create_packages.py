import csv
import os
from django.core.management.base import BaseCommand
from workspace.models.packages import Package, PackageItem
from workspace.models.services import Service

class Command(BaseCommand):
    help = 'Import packages and package items from CSV files'

    def handle(self, *args, **kwargs):
        # Paths to the CSV files
        packages_csv_file_path = os.path.join(os.path.dirname(__file__), 'data', 'rio_packages.csv')
        package_items_csv_file_path = os.path.join(os.path.dirname(__file__), 'data', 'rio_package_items.csv')

        # Import Packages
        if not os.path.isfile(packages_csv_file_path):
            self.stdout.write(self.style.ERROR('Packages CSV file not found. Please specify a valid file path.'))
        else:
            with open(packages_csv_file_path, newline='', encoding='utf-8') as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    package, created = Package.objects.update_or_create(
                        id=row['id'],
                        defaults={
                            'name': row['name'],
                            'sku': row['sku'] if row['sku'] else None,
                            'price': float(row['price']) if row['price'] else 0.0,
                            # Add other fields if necessary
                        }
                    )

                    if created:
                        self.stdout.write(self.style.SUCCESS(f'Successfully created package: {package.name}'))
                    else:
                        self.stdout.write(self.style.WARNING(f'Updated existing package: {package.name}'))

        # Import Package Items
        if not os.path.isfile(package_items_csv_file_path):
            self.stdout.write(self.style.ERROR('Package Items CSV file not found. Please specify a valid file path.'))
        else:
            with open(package_items_csv_file_path, newline='', encoding='utf-8') as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    package = Package.objects.get(id=row['package_id'])
                    service = Service.objects.get(id=row['service_id'])
                    item, created = PackageItem.objects.update_or_create(
                        package=package,
                        service=service,
                        defaults={
                            'visit_limit': int(row['visits']) if row['visits'] else 0,
                            # Add other fields if necessary
                        }
                    )

                    if created:
                        self.stdout.write(self.style.SUCCESS(f'Successfully created package item: {item.name} for package {package.name}'))
                    else:
                        self.stdout.write(self.style.WARNING(f'Updated existing package item: {item.name} for package {package.name}'))

        self.stdout.write(self.style.SUCCESS('Successfully imported all packages and package items'))
