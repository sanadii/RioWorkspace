# Generated by Django 4.2.3 on 2024-02-21 09:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('settings', '0001_initial'),
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
            name='Appointment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_time', models.DateTimeField()),
                ('end_time', models.DateTimeField()),
                ('status', models.IntegerField(blank=True, choices=[(1, 'pencilled-in'), (2, 'not-started'), (3, 'arrived'), (4, 'started'), (5, 'finished'), (6, 'did-not-show'), (7, 'cancelled')], default=1, null=True)),
            ],
            options={
                'db_table': 'appointment',
            },
        ),
        migrations.CreateModel(
            name='AppointmentService',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('start_time', models.DateTimeField()),
                ('end_time', models.DateTimeField()),
                ('duration', models.PositiveIntegerField(default=30)),
            ],
            options={
                'db_table': 'appointment_service',
            },
        ),
        migrations.CreateModel(
            name='Client',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_added', models.DateTimeField(auto_now_add=True)),
                ('first_name', models.CharField(blank=True, max_length=100, null=True)),
                ('last_name', models.CharField(blank=True, max_length=100, null=True)),
                ('mobile', models.CharField(blank=True, max_length=15, null=True)),
                ('email', models.EmailField(blank=True, max_length=254, null=True)),
                ('occupation', models.CharField(blank=True, max_length=100, null=True)),
                ('date_of_birth', models.DateField(blank=True, null=True)),
                ('city', models.CharField(blank=True, max_length=100, null=True)),
            ],
            options={
                'db_table': 'client',
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
            name='Invoice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('account_type', models.CharField(choices=[('revenue', 'Revenue')], max_length=100)),
                ('invoice_type', models.CharField(choices=[('appointment', 'Appointment'), ('product', 'Product'), ('package', 'Package')], max_length=100)),
                ('description', models.TextField()),
                ('quantity', models.PositiveIntegerField(default=1)),
                ('unit_price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('total_amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('is_paid', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('appointment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='workspace.appointment')),
            ],
            options={
                'db_table': 'invoice',
            },
        ),
        migrations.CreateModel(
            name='Package',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('sku', models.CharField(blank=True, max_length=50, null=True, unique=True)),
                ('description', models.TextField()),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('validity_months', models.PositiveIntegerField(default=1)),
                ('redemption_start_date', models.DateField(blank=True, null=True)),
                ('redemption_end_date', models.DateField(blank=True, null=True)),
                ('send_expiry_email', models.BooleanField(default=False)),
                ('photo', models.ImageField(blank=True, null=True, upload_to='packages/')),
            ],
            options={
                'verbose_name': 'Package',
                'verbose_name_plural': 'Packages',
                'db_table': 'Package',
            },
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('sku_handle', models.CharField(max_length=100)),
                ('barcode', models.CharField(max_length=100)),
                ('description', models.TextField(blank=True, null=True)),
                ('category', models.CharField(default='None', max_length=100)),
                ('tags', models.CharField(default='None', max_length=100)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('stock', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'product',
            },
        ),
        migrations.CreateModel(
            name='Resource',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('minimize_switching', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Service',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField(blank=True, null=True)),
                ('price', models.DecimalField(decimal_places=2, default=0.0, max_digits=10)),
                ('duration', models.PositiveIntegerField(default=30)),
                ('service_colour', models.CharField(default='Choose a color', max_length=100)),
                ('resources_required', models.BooleanField(default=False)),
                ('online_booking', models.BooleanField(default=False)),
                ('optional_booking_question', models.TextField(blank=True, null=True)),
                ('order', models.PositiveIntegerField(default=0)),
                ('deleted', models.BooleanField(default=False)),
            ],
            options={
                'db_table': 'service',
            },
        ),
        migrations.CreateModel(
            name='ServiceCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField(blank=True, null=True)),
                ('order', models.PositiveIntegerField(default=0)),
            ],
            options={
                'db_table': 'service_category',
            },
        ),
        migrations.CreateModel(
            name='Staff',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('position', models.CharField(max_length=100)),
                ('salary', models.DecimalField(decimal_places=2, max_digits=10)),
                ('active', models.BooleanField(default=True)),
                ('bookable', models.BooleanField(default=True)),
                ('commissionable', models.BooleanField(default=False)),
                ('additional_information', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='workspace.additionalinformation')),
                ('contact_information', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='workspace.contactinformation')),
                ('services', models.ManyToManyField(related_name='staff_members', to='workspace.service')),
            ],
            options={
                'db_table': 'staff',
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
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('transaction_type', models.CharField(choices=[('cash', 'Cash'), ('credit', 'Credit'), ('link', 'Link'), ('others', 'Others')], max_length=100)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('transaction_date', models.DateTimeField(auto_now_add=True)),
                ('invoice', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='workspace.invoice')),
            ],
            options={
                'db_table': 'transaction',
            },
        ),
        migrations.CreateModel(
            name='StaffAccess',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pin_number', models.CharField(max_length=4)),
                ('calendar_access', models.CharField(choices=[('all', 'All calendars'), ('view_only', 'All calendars (view only)')], default='view_only', max_length=20)),
                ('hide_prices_on_calendar', models.BooleanField(default=False)),
                ('dashboard_access', models.CharField(choices=[('full_access', 'Full access'), ('some_access', 'Some access'), ('no_access', 'No access')], default='no_access', max_length=20)),
                ('view_and_raise_sales', models.BooleanField(default=False)),
                ('can_process_refunds', models.BooleanField(default=False)),
                ('can_void_payments', models.BooleanField(default=False)),
                ('can_edit_prices_on_sale', models.BooleanField(default=False)),
                ('customer_access', models.CharField(choices=[('no_access', 'No access to customer information (customer name only)'), ('contact_details_only', 'Access to customer contact details and notes only'), ('full_access', 'Access to all customer database')], default='no_access', max_length=20)),
                ('allow_contact_details_access', models.BooleanField(default=False)),
                ('allow_block_customers', models.BooleanField(default=False)),
                ('allow_adjust_rewards', models.BooleanField(default=False)),
                ('access_sent_messages', models.BooleanField(default=False)),
                ('access_sms_campaigns', models.BooleanField(default=False)),
                ('setup_access', models.CharField(choices=[('full_access', 'Full access'), ('some_access', 'Some access'), ('no_access', 'No access')], default='no_access', max_length=11)),
                ('staff', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='workspace.staff')),
            ],
        ),
        migrations.AddField(
            model_name='staff',
            name='working_hours',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='workspace.workinghours'),
        ),
        migrations.CreateModel(
            name='ServiceProvider',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('employee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='workspace.staff')),
                ('service', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='workspace.appointmentservice')),
            ],
            options={
                'db_table': 'service_provider',
            },
        ),
        migrations.AddField(
            model_name='service',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='workspace.servicecategory'),
        ),
        migrations.CreateModel(
            name='Revenue',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('cash', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('credit', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('link', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('others', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('notes', models.TextField()),
                ('is_closed', models.BooleanField(default=False)),
                ('status', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='daily_revenue_status_choices', to='settings.optionchoices')),
            ],
            options={
                'db_table': 'finance_revenue',
            },
        ),
        migrations.CreateModel(
            name='ResourceItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('resource', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='items', to='workspace.resource')),
            ],
        ),
        migrations.CreateModel(
            name='PackageItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('visit_limit', models.PositiveIntegerField()),
                ('package', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='workspace.package')),
                ('service', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='items', to='workspace.service')),
            ],
            options={
                'verbose_name': 'Package Item',
                'verbose_name_plural': 'Package Items',
                'db_table': 'Package_item',
            },
        ),
        migrations.CreateModel(
            name='Expense',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('notes', models.TextField()),
                ('category', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='expenses_category_choices', to='settings.optionchoices')),
                ('paid_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='expenses_paid_by_choices', to='settings.optionchoices')),
                ('status', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='expenses_status_choices', to='settings.optionchoices')),
            ],
            options={
                'db_table': 'finance_expense',
            },
        ),
        migrations.CreateModel(
            name='Commission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('percentage', models.DecimalField(decimal_places=2, max_digits=5)),
                ('client', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='workspace.client')),
                ('employee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='workspace.staff')),
            ],
            options={
                'db_table': 'finance_commission',
            },
        ),
        migrations.CreateModel(
            name='ClientNotification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('allow_email', models.BooleanField(default=True)),
                ('allow_sms', models.BooleanField(default=True)),
                ('client', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='workspace.client')),
            ],
            options={
                'db_table': 'client_notification_settings',
            },
        ),
        migrations.CreateModel(
            name='ClientAdditionalInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mobile_alt', models.CharField(blank=True, max_length=15, null=True)),
                ('referred_by', models.CharField(blank=True, max_length=100, null=True)),
                ('status', models.IntegerField(blank=True, choices=[(1, 'Low'), (2, 'Medium'), (3, 'High')], default=1, null=True)),
                ('vip', models.BooleanField(default=False)),
                ('blocked', models.BooleanField(default=False)),
                ('client', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='workspace.client')),
            ],
            options={
                'db_table': 'client_additional_info',
            },
        ),
        migrations.AddField(
            model_name='appointmentservice',
            name='resources',
            field=models.ManyToManyField(blank=True, to='workspace.resourceitem'),
        ),
        migrations.AddField(
            model_name='appointmentservice',
            name='service',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='workspace.service'),
        ),
        migrations.AddField(
            model_name='appointmentservice',
            name='staff',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='workspace.staff'),
        ),
        migrations.AddField(
            model_name='appointment',
            name='client',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='workspace.client'),
        ),
        migrations.AddField(
            model_name='appointment',
            name='services',
            field=models.ManyToManyField(related_name='appointments', to='workspace.appointmentservice'),
        ),
    ]
