import os
import csv
from django.core.management.base import BaseCommand
from settings.models import OptionCategory, OptionChoices

class Command(BaseCommand):
    help = 'Import options from CSV files'

    def handle(self, *args, **kwargs):
        option_category_csv_file_path = os.path.join(os.path.dirname(__file__), 'data', 'rio_option_categories.csv')
        option_choices_csv_file_path = os.path.join(os.path.dirname(__file__), 'data', 'rio_option_choices.csv')

        # Import OptionCategory
        if os.path.isfile(option_category_csv_file_path):
            with open(option_category_csv_file_path, mode='r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    OptionCategory.objects.get_or_create(
                        name=row['name'],
                        defaults={'description': row['description'], 'config': row['config']}
                    )
        else:
            self.stdout.write(self.style.ERROR('OptionCategory CSV file not found.'))

        # Import OptionChoices
        if os.path.isfile(option_choices_csv_file_path):
            with open(option_choices_csv_file_path, mode='r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    category = OptionCategory.objects.get(id=row['category_id'])
                    OptionChoices.objects.get_or_create(
                        category=category,
                        name=row['name'],
                        value=row['value'],
                        config=row['config']
                    )
        else:
            self.stdout.write(self.style.ERROR('OptionChoices CSV file not found.'))

        self.stdout.write(self.style.SUCCESS('Successfully imported options from CSV files'))
