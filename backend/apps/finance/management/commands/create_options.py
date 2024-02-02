from django.core.management.base import BaseCommand
from apps.settings.models import OptionCategory, OptionChoices

class Command(BaseCommand):
    help = 'Add predefined choices to the database'

    def handle(self, *args, **kwargs):
        categories = [
            {
                "name": "TransactionStatus",
                "description": "Status for financial transactions",
                "config": "transaction_status",
                "choices": [
                    ('Cash', 'Cash', 'badge bg-info'),
                    ('Credit', 'Credit', 'badge bg-primary'),
                    ('Link', 'Link', 'badge bg-success'),
                    ('Others', 'Others', 'badge bg-warning'),
                ]
            },
            {
                "name": "ExpensesStatus",
                "description": "Status for expenses",
                "config": "expenses_status",
                "choices": [
                    ('Pending', 'Pending', 'badge bg-info'),
                    ('Paid', 'Paid', 'badge bg-success'),
                ]
            },
            {
                "name": "RevenueStatus",
                "description": "Status for daily revenue",
                "config": "daily_revenue_status",
                "choices": [
                    ('Pending', 'Pending', 'badge bg-info'),
                    ('Reviewed', 'Reviewed', 'badge bg-primary'),
                    ('Declined', 'Declined', 'badge bg-danger'),
                ]
            },
            {
                "name": "ExpensesCategory",
                "description": "Categories for expenses",
                "config": "expenses_category",
                "choices": [
                    ('Utilities', 'Utilities', 'badge bg-info'),
                    ('Salon Supplies', 'Salon Supplies', 'badge bg-primary'),
                    ('Beauty Products', 'Beauty Products', 'badge bg-success'),
                    ('Business Licensing', 'Business Licensing', 'badge bg-warning'),
                    ('Construction/Remodeling', 'Construction/Remodeling', 'badge bg-info'),
                    ('Advertisement Expenses', 'Advertisement Expenses', 'badge bg-primary'),
                    ('Professional Services', 'Professional Services', 'badge bg-success'),
                    ('Office Supplies', 'Office Supplies', 'badge bg-warning'),
                    ('Travel and Transportation', 'Travel and Transportation', 'badge bg-info'),
                    ('Miscellaneous', 'Miscellaneous', 'badge bg-primary'),
                ]
            },
            {
                "name": "PaidBy",
                "description": "Methods of payment",
                "config": "paid_by",
                "choices": [
                    ('Sanad', 'Sanad', 'badge bg-info'),
                    ('Laura', 'Laura', 'badge bg-primary'),
                    ('Other', 'Other', 'badge bg-success'),
                ]
            },
        ]

        for category_data in categories:
            category, created = OptionCategory.objects.get_or_create(
                name=category_data["name"],
                defaults={
                    "description": category_data["description"],
                }
            )

            for choice in category_data["choices"]:
                OptionChoices.objects.get_or_create(
                    category=category,
                    name=choice[0],
                    value=choice[1],
                    config=choice[2],  # Assign badge class
                )

        self.stdout.write(self.style.SUCCESS('Successfully added predefined choices'))
