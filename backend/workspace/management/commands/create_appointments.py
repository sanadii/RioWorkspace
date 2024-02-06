from django.core.management.base import BaseCommand
import random
from datetime import timedelta
from django.utils import timezone

from workspace.models.staff import Staff
from workspace.models.services import Service
from workspace.models.clients import Client
from workspace.models.appointments import Appointment, AppointmentService

class Command(BaseCommand):
    help = 'Populates the database with sample data'

    def handle(self, *args, **kwargs):
        # Existing code to create staff, services, and clients...

        # Create sample appointment services
        for i in range(10):
            service = Service.objects.order_by('?').first()
            appointment_service = AppointmentService.objects.create(
                service=service,
                price=service.price,  # Assuming the price is directly taken from the service
                staff=Staff.objects.order_by('?').first()
            )

        # Create sample appointments
        for i in range(30):
            appointment_date = timezone.now() + timedelta(days=random.randint(1, 30))
            start_time = appointment_date.replace(hour=random.randint(9, 17), minute=0, second=0)
            end_time = start_time + timedelta(hours=random.randint(1, 3))

            appointment = Appointment.objects.create(
                client=Client.objects.order_by('?').first(),
                appointment_date=appointment_date,
                subject=f'Appointment Subject {i}',
                location=f'Location {i}',
                start_time=start_time,
                end_time=end_time,
                category_color=f'#{"%06x" % random.randint(0, 0xFFFFFF)}',
                staff=Staff.objects.order_by('?').first()
            )

            # Add random services to the appointment
            services = AppointmentService.objects.order_by('?')[:random.randint(1, 3)]
            for service in services:
                appointment.services.add(service)

        self.stdout.write(self.style.SUCCESS('Successfully populated the database with sample data'))
