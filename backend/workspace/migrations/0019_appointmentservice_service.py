# Generated by Django 4.2.3 on 2024-02-11 02:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('workspace', '0018_remove_appointmentservice_service'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointmentservice',
            name='service',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='workspace.service'),
            preserve_default=False,
        ),
    ]
