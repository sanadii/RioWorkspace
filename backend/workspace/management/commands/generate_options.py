from django.core.management.base import BaseCommand
from settings.models import Option

class Command(BaseCommand):
    help = 'Populates default options similar to WordPress'

    def handle(self, *args, **kwargs):
        default_options = {
            'title': 'Rio Workspace',
            'tagline': 'Rio Brazil Salon',
            'url': 'http://riobrazilsalon.com',
            'email': 'info@riobrazilsalon.com',
            'membership': '0',  # 0 for false, 1 for true
            'new_user_default_role': 'subscriber',
            'site_language': 'en_US',
            'timezone': 'UTC',
            'date_format': 'F j, Y',
            'time_format': 'g:i a',
            'week_starts_on': '1',  # 1 for Monday
        }

        for name, value in default_options.items():
            Option.objects.update_or_create(name=name, defaults={'value': value})

        self.stdout.write(self.style.SUCCESS('Successfully populated options'))
