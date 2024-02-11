from django.core.management.base import BaseCommand
from workspace.models.staff import Staff

class Command(BaseCommand):
    help = 'Create sample staff'

    def handle(self, *args, **options):
        # List of staff names with default salary value
        staff_data = [
            {"name": "Laura", "salary": 1000.00},
            {"name": "Sanad", "salary": 800.00},
            {"name": "Sheryl", "salary": 1200.00},
            {"name": "Neia", "salary": 900.00},
            {"name": "Coney", "salary": 1100.00},
            {"name": "Gana", "salary": 950.00},
            {"name": "Ethiopia", "salary": 850.00},
            {"name": "Ludimila", "salary": 1050.00},
            {"name": "Indiana", "salary": 1000.00},
            {"name": "Sandra", "salary": 900.00},
            {"name": "Maritess", "salary": 1100.00},
            {"name": "Ma Bilita", "salary": 850.00},
            {"name": "Erica", "salary": 950.00},
            {"name": "Catarine", "salary": 1000.00},
            {"name": "Jane", "salary": 950.00},
            {"name": "Larissa", "salary": 900.00},
            {"name": "Ana Paula", "salary": 1050.00},
            {"name": "Receptionist", "salary": 850.00},
            {"name": "Pamela", "salary": 1000.00}
        ]

        for staff_info in staff_data:
            # Create a staff instance for each staff info
            staff, created = Staff.objects.get_or_create(name=staff_info["name"], salary=staff_info["salary"])

            if created:
                self.stdout.write(self.style.SUCCESS(f'Successfully created staff: {staff_info["name"]}'))
            else:
                self.stdout.write(self.style.WARNING(f'Staff already exists: {staff_info["name"]}'))
