from django.core.management.base import BaseCommand
import random

from workspace.models.staff import Staff
from workspace.models.services import Service
from workspace.models.clients import Client

class Command(BaseCommand):
    help = 'Populates the database with sample data'

    def handle(self, *args, **kwargs):
        # Create sample staff members
        for i in range(5):
            Staff.objects.create(
                name=f'Staff Member {i}',
                position='Position {i}',
                salary=random.randint(30000, 60000),
                telephone=f'123-456-78{i}',
                email=f'staff{i}@example.com',
                city='City Name',
                normal_working_hours='9am - 5pm'
                # Add other fields as necessary
            )

        # Create sample services
        for i in range(50):
            service = Service.objects.create(
                name=f'Service {i}',
                description='Service Description',
                category='General',
                price=random.randint(100, 500),
                duration_minutes=random.choice([30, 60, 90]),
                # Add other fields as necessary
            )

        # Create sample clients
        for i in range(50):
            Client.objects.create(
                name=f'Client {i}',
                contact_number=f'987-654-32{i}',
                email=f'client{i}@example.com',
                # Add other fields as necessary
            )

        self.stdout.write(self.style.SUCCESS('Successfully populated the database with sample data'))
