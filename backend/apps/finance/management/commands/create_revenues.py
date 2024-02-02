from django.core.management.base import BaseCommand
from apps.finance.models import DailyRevenue
from apps.settings.models import OptionChoices
import random
from datetime import date, timedelta

class Command(BaseCommand):
    help = 'Create daily revenues for a specified date range'

    def handle(self, *args, **kwargs):
        start_date = date(2024, 1, 1)
        end_date = date(2024, 1, 31)
        current_date = start_date

        # Fetch the OptionChoices for status
        status_choices = OptionChoices.objects.filter(category__name="RevenueStatus")

        while current_date <= end_date:
            is_closed = current_date.weekday() == 6 or current_date in [date(2023, 12, 24), date(2023, 12, 25)]

            # Randomly select from fetched OptionChoices
            status = random.choice(status_choices)

            if not is_closed:
                amount = random.uniform(50, 800)
                notes = f"Daily revenue for {current_date.strftime('%Y-%m-%d')}"
                DailyRevenue.objects.create(
                    date=current_date,
                    cash=amount,
                    credit=amount,
                    link=amount,
                    others=amount,
                    notes=notes,
                    status=status,
                    is_closed=is_closed
                )
            else:
                DailyRevenue.objects.create(
                    date=current_date,
                    status=status,
                    is_closed=is_closed
                )

            current_date += timedelta(days=1)

        self.stdout.write(self.style.SUCCESS('Successfully created daily revenues'))
