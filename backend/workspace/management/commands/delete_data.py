from django.core.management.base import BaseCommand
from workspace.models.services import Service, ServiceCategory
from workspace.models.clients import Client
from workspace.models.staff import Staff
from workspace.models.appointments import Appointment, AppointmentService

class Command(BaseCommand):
    help = 'Deletes all data in specified Django models'

    def handle(self, *args, **kwargs):
        try:
            # Delete all data from AppointmentService
            AppointmentService.objects.all().delete()

            # Delete all data from Appointment
            Appointment.objects.all().delete()

            # Delete all data from Service
            Service.objects.all().delete()

            # Delete all data from ServiceCategory
            ServiceCategory.objects.all().delete()

            # Delete all data from Client
            Client.objects.all().delete()

            # Delete all data from Staff
            Staff.objects.all().delete()

            self.stdout.write(self.style.SUCCESS('Successfully deleted all data'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'An error occurred: {str(e)}'))
