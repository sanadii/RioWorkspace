import os
import csv
from django.core.management.base import BaseCommand
from django.db import transaction
from settings.models import OptionCategory, OptionChoices

class Command(BaseCommand):
    help = 'Import options from CSV files'

    def handle(self, *args, **kwargs):
        option_category_csv_file_path = os.path.join(os.path.dirname(__file__), 'data', 'rio_option_categories.csv')
        option_choices_csv_file_path = os.path.join(os.path.dirname(__file__), 'data', 'rio_option_choices.csv')

        with transaction.atomic():
            # Delete existing data
            OptionCategory.objects.all().delete()
            OptionChoices.objects.all().delete()

            # Import OptionCategory
            if os.path.isfile(option_category_csv_file_path):
                with open(option_category_csv_file_path, mode='r', encoding='utf-8') as file:
                    reader = csv.DictReader(file)
                    for row in reader:
                        OptionCategory.objects.get_or_create(
                            id=row['id'],  # Assuming you have an 'id' column
                            defaults={
                                'name': row['name'],
                                'description': row['description'],
                                'value': row.get('value', ''),
                                'config': row.get('config', ''),
                            }
                        )
            else:
                self.stdout.write(self.style.ERROR('OptionCategory CSV file not found.'))

            # Import OptionChoices
            if os.path.isfile(option_choices_csv_file_path):
                with open(option_choices_csv_file_path, mode='r', encoding='utf-8') as file:
                    reader = csv.DictReader(file)
                    for row in reader:
                        category = OptionCategory.objects.filter(id=row['category_id']).first()
                        if category:
                            OptionChoices.objects.create(
                                category=category,
                                name=row['name'],
                                value=row['value'],
                                config=row['config'],
                            )
                        else:
                            self.stdout.write(self.style.WARNING(f'Category with ID "{row["category_id"]}" not found. Skipping choice "{row["name"]}".'))
            else:
                self.stdout.write(self.style.ERROR('OptionChoices CSV file not found.'))

        self.stdout.write(self.style.SUCCESS('Successfully imported options from CSV files'))
