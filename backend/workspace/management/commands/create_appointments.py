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
        # Define time range for appointments
        one_week_ago = timezone.now() - timedelta(weeks=1)
        thirty_days_from_now = timezone.now() + timedelta(days=30)

        # Create sample appointment services
        for i in range(50):  # Adjust the range as needed
            service = Service.objects.order_by('?').first()
            staff_member = Staff.objects.order_by('?').first()

            service_start = timezone.now() + timedelta(days=random.randint(-7, 30))
            service_end = service_start + timedelta(minutes=service.duration)

            services = AppointmentService.objects.create(
                service=service,
                price=service.price,
                start=service_start,
                end=service_end,
                duration=service.duration,
                staff=staff_member
            )

        # Create sample appointments
        for i in range(30):
            # Generate a random date
            random_date = timezone.now() + timedelta(days=random.randint(-7, 7))

            # Set specific time range (10 AM to 8 PM)
            random_hour = random.randint(10, 19)  # 19 is used because range is exclusive at the end
            random_minute = random.randint(0, 59)
            random_start = random_date.replace(hour=random_hour, minute=random_minute, second=0, microsecond=0)

            # Calculate random end time based on duration
            duration = timedelta(hours=random.randint(1, 3))
            random_end = random_start + duration

            # Ensure the appointment is within the specified time range
            if one_week_ago <= random_start <= thirty_days_from_now and random_end.hour < 20:
                appointment = Appointment.objects.create(
                    client=Client.objects.order_by('?').first(),
                    start=random_start,
                    end=random_end,
                    status=random.randint(1, 6)  # Assign a random status
                )

                # Add random services to the appointment
                services_to_add = AppointmentService.objects.order_by('?')[:random.randint(1, 3)]
                appointment.services.add(*services_to_add)

        self.stdout.write(self.style.SUCCESS('Successfully populated the database with sample data'))
