# Generated by Django 4.2.3 on 2024-03-23 08:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('settings', '0003_option'),
    ]

    operations = [
        migrations.AddField(
            model_name='option',
            name='autoload',
            field=models.BooleanField(default=True),
        ),
    ]
