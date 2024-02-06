# management/commands/populate_resources.py
from django.core.management.base import BaseCommand
from workspace.models.resources import Resource

class Command(BaseCommand):
    help = 'Create sample resources'

    def handle(self, *args, **options):
        # List of resource names
        resource_names = ["Spa Room", "Makeup Room"]

        for name in resource_names:
            # Create a resource instance for each name
            resource, created = Resource.objects.get_or_create(name=name)

            if created:
                self.stdout.write(self.style.SUCCESS(f'Successfully created resource: {name}'))
            else:
                self.stdout.write(self.style.WARNING(f'Resource already exists: {name}'))
