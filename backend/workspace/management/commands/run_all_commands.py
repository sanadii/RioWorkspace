from django.core.management.base import BaseCommand
from django.core.management import call_command
from account.models import User

class Command(BaseCommand):
    help = 'Run multiple custom commands'

    def handle(self, *args, **options):
        # Delete all data in the database
        call_command('flush', '--noinput')

        # Create a superuser (adjust username, email, and password as needed)
        User.objects.create_superuser('sanad', 'esanad@gmail.com', 'I4ksb@11782')

        # Settings
        call_command('create_options')

        # Finance
        call_command('create_revenues')
        call_command('create_expenses')

        # Call the individual commands here
        call_command('create_staff')
        call_command('create_services')


        call_command('create_clients')
        call_command('create_appointments')

        # Optionally, you can print a success message
        self.stdout.write(self.style.SUCCESS('Successfully ran all custom commands'))
