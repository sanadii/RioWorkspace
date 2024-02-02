from django.core.management.base import BaseCommand
from workspace.views.finance import Expense
from settings.models import OptionChoices
import random
from datetime import date, timedelta

class Command(BaseCommand):
    help = 'Create random expenses for the year 2023'

    def handle(self, *args, **kwargs):
        year = 2023
        start_date = date(year, 1, 1)
        end_date = date(year, 12, 31)
        current_date = start_date

        # Fetch the OptionChoices for status, categories, and paid_by
        status_choices = OptionChoices.objects.filter(category__name="ExpensesStatus")
        category_choices = OptionChoices.objects.filter(category__name="ExpensesCategory")
        paid_by_choices = OptionChoices.objects.filter(category__name="PaidBy")

        while current_date <= end_date:
            if current_date.weekday() != 6:  # Skip Sundays
                amount = random.uniform(50, 800)
                notes = f"Expenses for {current_date.strftime('%Y-%m-%d')}"

                # Randomly select from fetched OptionChoices
                category = random.choice(category_choices)
                paid_by = random.choice(paid_by_choices)
                status = random.choice(status_choices)

                Expense.objects.create(
                    date=current_date,
                    amount=amount,
                    notes=notes,
                    category=category,
                    paid_by=paid_by,
                    status=status
                )

            current_date += timedelta(days=1)

        self.stdout.write(self.style.SUCCESS(f'Successfully created random expenses for the year {year}'))
