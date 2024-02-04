# Import necessary models and libraries
from django.core.management.base import BaseCommand
from faker import Faker
from workspace.models.staff import Staff

class Command(BaseCommand):
    help = 'Create sample staff'

    def handle(self, *args, **options):
        fake = Faker()  # Create a Faker instance

        # Create a Staff instance with random data
        staff = Staff.objects.create(
            name=fake.name(),  # Generate a random staff name
            position=fake.job(),  # Generate a random staff position
            salary=fake.random_int(min=30000, max=80000),  # Generate a random salary
            telephone=fake.phone_number(),  # Generate a random phone number
            email=fake.email(),  # Generate a random email address
            address=fake.address(),  # Generate a random address
            city=fake.city(),  # Generate a random city
        )

        # You can continue to populate other fields with random data as needed

        self.stdout.write(self.style.SUCCESS('Successfully created staff with random data'))
