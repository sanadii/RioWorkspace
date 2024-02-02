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
            AppointmentService.objects.create(
                name=f'Appointment Service {i}',
                price=random.randint(50, 200),
                staff_member=Staff.objects.order_by('?').first()
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
                staff_member=Staff.objects.order_by('?').first()
            )

            # Add random services to the appointment
            services = AppointmentService.objects.order_by('?')[:random.randint(1, 3)]
            appointment.services.set(services)

        self.stdout.write(self.style.SUCCESS('Successfully populated the database with sample data'))
