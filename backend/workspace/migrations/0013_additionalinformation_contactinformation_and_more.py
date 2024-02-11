# Generated by Django 4.2.3 on 2024-02-08 16:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('workspace', '0012_remove_appointment_appointment_date_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='AdditionalInformation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('online_booking_interval', models.PositiveIntegerField(default=15)),
                ('reset_online_booking_time_after_break', models.BooleanField(default=True)),
                ('online_booking_enabled', models.BooleanField(default=True)),
                ('show_on_mini_website', models.BooleanField(default=True)),
                ('alias_nickname', models.CharField(blank=True, max_length=100, null=True)),
                ('reference_number_type', models.CharField(blank=True, max_length=100, null=True)),
                ('job_title', models.CharField(blank=True, max_length=100, null=True)),
                ('bio', models.TextField(blank=True, null=True)),
                ('message_for_confirmation_reminder_emails', models.TextField(blank=True, null=True)),
                ('calendar_sync_enabled', models.BooleanField(default=False)),
            ],
            options={
                'db_table': 'staff_info',
            },
        ),
        migrations.CreateModel(
            name='ContactInformation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('telephone', models.CharField(blank=True, max_length=15, null=True)),
                ('sms_number', models.CharField(blank=True, max_length=15, null=True)),
                ('email', models.EmailField(blank=True, max_length=254, null=True)),
                ('address', models.CharField(blank=True, max_length=255, null=True)),
                ('city', models.CharField(blank=True, max_length=100, null=True)),
            ],
            options={
                'db_table': 'staff_contact',
            },
        ),
        migrations.CreateModel(
            name='WorkingHours',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('normal_working_hours', models.CharField(blank=True, max_length=255, null=True)),
                ('monday_working_hours', models.CharField(blank=True, max_length=255, null=True)),
                ('tuesday_working_hours', models.CharField(blank=True, max_length=255, null=True)),
                ('wednesday_working_hours', models.CharField(blank=True, max_length=255, null=True)),
                ('thursday_working_hours', models.CharField(blank=True, max_length=255, null=True)),
                ('friday_working_hours', models.CharField(blank=True, max_length=255, null=True)),
                ('saturday_working_hours', models.CharField(blank=True, max_length=255, null=True)),
                ('sunday_working_hours', models.CharField(blank=True, max_length=255, null=True)),
                ('working_on_sunday', models.BooleanField(default=True)),
            ],
            options={
                'db_table': 'staff_work',
            },
        ),
        migrations.RemoveField(
            model_name='staff',
            name='address',
        ),
        migrations.RemoveField(
            model_name='staff',
            name='alias_nickname',
        ),
        migrations.RemoveField(
            model_name='staff',
            name='bio',
        ),
        migrations.RemoveField(
            model_name='staff',
            name='calendar_sync_enabled',
        ),
        migrations.RemoveField(
            model_name='staff',
            name='city',
        ),
        migrations.RemoveField(
            model_name='staff',
            name='email',
        ),
        migrations.RemoveField(
            model_name='staff',
            name='friday_working_hours',
        ),
        migrations.RemoveField(
            model_name='staff',
            name='job_title',
        ),
        migrations.RemoveField(
            model_name='staff',
            name='message_for_confirmation_reminder_emails',
        ),
        migrations.RemoveField(
            model_name='staff',
            name='monday_working_hours',
        ),
        migrations.RemoveField(
            model_name='staff',
            name='normal_working_hours',
        ),
        migrations.RemoveField(
            model_name='staff',
            name='online_booking_enabled',
        ),
        migrations.RemoveField(
            model_name='staff',
            name='online_booking_interval',
        ),
        migrations.RemoveField(
            model_name='staff',
            name='reference_number_type',
        ),
        migrations.RemoveField(
            model_name='staff',
            name='reset_online_booking_time_after_break',
        ),
        migrations.RemoveField(
            model_name='staff',
            name='saturday_working_hours',
        ),
        migrations.RemoveField(
            model_name='staff',
            name='show_on_mini_website',
        ),
        migrations.RemoveField(
            model_name='staff',
            name='sms_number',
        ),
        migrations.RemoveField(
            model_name='staff',
            name='sunday_working_hours',
        ),
        migrations.RemoveField(
            model_name='staff',
            name='telephone',
        ),
        migrations.RemoveField(
            model_name='staff',
            name='thursday_working_hours',
        ),
        migrations.RemoveField(
            model_name='staff',
            name='tuesday_working_hours',
        ),
        migrations.RemoveField(
            model_name='staff',
            name='wednesday_working_hours',
        ),
        migrations.RemoveField(
            model_name='staff',
            name='working_on_sunday',
        ),
        migrations.AddField(
            model_name='staff',
            name='additional_information',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='workspace.additionalinformation'),
        ),
        migrations.AddField(
            model_name='staff',
            name='contact_information',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='workspace.contactinformation'),
        ),
        migrations.AddField(
            model_name='staff',
            name='working_hours',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='workspace.workinghours'),
        ),
    ]
