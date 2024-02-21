import random
from datetime import timedelta
from django.utils import timezone
from django.core.management.base import BaseCommand
from workspace.models.services import Service
from workspace.models.packages import Package, PackageItem

PACKAGE_NAMES = [
    "Wellness Retreat", "Spa Day Special", "Ultimate Relaxation", "Beauty Bonanza",
    "Pamper Package", "Luxury Spa Experience", "Rejuvenation Package",
    "Holistic Health", "Mindfulness Retreat", "Detox Delight"
]

class Command(BaseCommand):
    help = 'Create random packages'

    def add_arguments(self, parser):
        parser.add_argument('num_packages', type=int, help='The number of random packages to create')

    def handle(self, *args, **options):
        num_packages = options['num_packages']

        for _ in range(num_packages):
            package = self.create_random_package()
            self.stdout.write(self.style.SUCCESS(f'Successfully created package {package.name}'))

    def create_random_package(self):
        name = random.choice(PACKAGE_NAMES)
        sku = self.random_string(5)
        description = self.random_string(50)
        cost_price = random.uniform(10.0, 100.0)
        sale_price = cost_price + random.uniform(5.0, 20.0)
        validity_months = random.randint(1, 12)
        redemption_start_date = timezone.now().date()
        redemption_end_date = redemption_start_date + timedelta(days=validity_months * 30)

        package = Package(
            name=name, sku=sku, description=description, cost_price=cost_price,
            sale_price=sale_price, validity_months=validity_months,
            redemption_start_date=redemption_start_date, redemption_end_date=redemption_end_date
        )
        package.save()

        for _ in range(random.randint(1, 5)):
            package_item = self.create_random_package_item()
            if package_item:
                package.items.add(package_item)

        return package

    def create_random_package_item(self):
        services = Service.objects.all()
        if not services:
            print("No services found in the database.")
            return None

        service = random.choice(services)
        name = f"{service.name} Package Item"
        visit_limit = random.randint(1, 10)

        package_item = PackageItem(service=service, name=name, visit_limit=visit_limit)
        package_item.save()

        return package_item

    def random_string(self, length):
        return ''.join(random.choices('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', k=length))
