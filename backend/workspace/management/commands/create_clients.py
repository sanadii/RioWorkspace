from django.core.management.base import BaseCommand
from faker import Faker
import random
from datetime import datetime

from workspace.models.staff import Staff
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
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                mobile=fake.phone_number(),
                email=fake.email(),
                occupation=fake.job(),
                customer_type=random.choice(['Regular', 'VIP', 'New']),
                date_of_birth=fake.date_of_birth(minimum_age=18, maximum_age=70)
            )

        self.stdout.write(self.style.SUCCESS('Successfully populated the database with sample data'))
