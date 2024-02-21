import csv
import os
from django.core.management.base import BaseCommand
from workspace.models.products import Product

class Command(BaseCommand):
    help = 'Import products from a CSV file'

    def handle(self, *args, **kwargs):
        products_csv_file_path = os.path.join(os.path.dirname(__file__), 'data', 'rio_products.csv')

        if not os.path.isfile(products_csv_file_path):
            self.stdout.write(self.style.ERROR('Products CSV file not found. Please specify a valid file path.'))
            return

        with open(products_csv_file_path, newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                product_name = row.get('name', '').strip()
                if not product_name:
                    self.stdout.write(self.style.ERROR('Missing product name in row. Skipping...'))
                    continue

                product, created = Product.objects.update_or_create(
                    name=product_name,
                    defaults={
                        'sku_handle': row.get('sku_handle', '').strip(),
                        'barcode': row.get('barcode', '').strip(),
                        'description': row.get('description', '').strip(),
                        'category': row.get('category', 'None').strip(),
                        'tags': row.get('tags', 'None').strip(),
                        'price': float(row.get('price', 0)) if row.get('price') else 0.0,
                        'stock': row.get('stock', '').strip(),
                        # Add other fields if necessary
                    }
                )

                if created:
                    self.stdout.write(self.style.SUCCESS(f'Successfully created product: {product.name}'))
                else:
                    self.stdout.write(self.style.WARNING(f'Updated existing product: {product.name}'))

        self.stdout.write(self.style.SUCCESS('Successfully imported all products'))
