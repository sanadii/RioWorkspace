from django.core.management.base import BaseCommand
from django.core.management import call_command
from django.contrib.auth import get_user_model
from workspace.models.appointments import AppointmentService, Appointment

UserModel = get_user_model()

class Command(BaseCommand):
    help = 'Run multiple custom commands with selective data refresh'

    def add_arguments(self, parser):
        parser.add_argument('--refresh-all', action='store_true', help='Refresh all data in the database')
        parser.add_argument('--refresh-appointments', action='store_true', help='Refresh all appointment data')

    def handle(self, *args, **options):
        if options['refresh_all']:
            call_command('flush', '--noinput')
            self.stdout.write(self.style.SUCCESS('All data deleted'))

            # Recreate data
            call_command('create_options')
            call_command('create_revenues')
            call_command('create_expenses')
            call_command('create_staff')
            call_command('create_services')
            call_command('create_resources')
            call_command('create_clients')
            call_command('create_appointments')

            # Create a superuser
            UserModel.objects.create_superuser('sanad', 'esanad@gmail.com', 'I4ksb@11782')
            self.stdout.write(self.style.SUCCESS('All data refreshed and superuser created'))

        if options['refresh_appointments']:
            self.stdout.write(self.style.WARNING('Refreshing appointment data...'))
            AppointmentService.objects.all().delete()
            Appointment.objects.all().delete()
            call_command('create_appointments')
            self.stdout.write(self.style.SUCCESS('New appointment data created'))
