from django.core.management.base import BaseCommand
from faker import Faker
import random

from workspace.models.staff import Staff
from workspace.models.services import Service
from workspace.models.clients import Client

class Command(BaseCommand):
    help = 'Populates the database with sample data'

    def handle(self, *args, **kwargs):
        fake = Faker()

        # Create sample staff members
        for i in range(5):
            Staff.objects.create(
                name=fake.name(),
                position=fake.job(),
                salary=random.randint(30000, 60000),
                telephone=fake.phone_number(),
                email=fake.email(),
                city=fake.city(),
                normal_working_hours=fake.time(),
                # Add other fields as necessary
            )

        # Create sample clients
        for i in range(50):
            Client.objects.create(
                name=fake.name(),
                contact_number=fake.phone_number(),
                email=fake.email(),
                address=fake.address(),
                # Add other fields as necessary
            )

        self.stdout.write(self.style.SUCCESS('Successfully populated the database with sample data'))
