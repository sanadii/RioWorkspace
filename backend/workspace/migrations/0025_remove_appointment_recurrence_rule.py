# Generated by Django 4.2.3 on 2024-02-14 12:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('workspace', '0024_remove_appointment_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='appointment',
            name='recurrence_rule',
        ),
    ]