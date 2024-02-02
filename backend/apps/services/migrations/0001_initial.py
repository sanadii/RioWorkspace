# Generated by Django 4.2.3 on 2024-02-01 15:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Discount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('general_misc', models.CharField(max_length=100)),
                ('tax', models.CharField(default='Not applicable', max_length=100)),
                ('discount_type', models.CharField(choices=[('percentage', 'Percentage'), ('fixed', 'Fixed')], max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Package',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('sku', models.CharField(max_length=20)),
                ('description', models.TextField(blank=True, null=True)),
                ('cost_price', models.DecimalField(decimal_places=2, default=0.0, max_digits=10)),
                ('price', models.DecimalField(decimal_places=2, default=0.0, max_digits=10)),
                ('tax', models.CharField(default='Not applicable', max_length=100)),
                ('price_includes_tax', models.BooleanField(default=False)),
                ('validity_months', models.PositiveIntegerField(default=1)),
                ('redemption_start_date', models.DateField(blank=True, null=True)),
                ('redemption_end_date', models.DateField(blank=True, null=True)),
                ('send_email_before_expiry', models.BooleanField(default=False)),
                ('photo', models.ImageField(blank=True, null=True, upload_to='package_photos/')),
            ],
        ),
        migrations.CreateModel(
            name='ServiceCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='StaffMember',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Service',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField(blank=True, null=True)),
                ('category', models.CharField(default='No category', max_length=100)),
                ('price', models.DecimalField(decimal_places=2, default=0.0, max_digits=10)),
                ('duration_minutes', models.PositiveIntegerField(default=30)),
                ('tax', models.CharField(default='Not applicable', max_length=100)),
                ('service_colour', models.CharField(default='Choose a color', max_length=100)),
                ('resources_required', models.BooleanField(default=False)),
                ('online_booking', models.BooleanField(default=False)),
                ('is_video_call', models.BooleanField(default=False)),
                ('optional_booking_question', models.TextField(blank=True, null=True)),
                ('staff', models.ManyToManyField(blank=True, to='services.staffmember')),
            ],
        ),
        migrations.CreateModel(
            name='PackageItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('limit', models.PositiveIntegerField(default=0)),
                ('package', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='services.package')),
                ('service', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='services.service')),
            ],
        ),
        migrations.AddField(
            model_name='package',
            name='items',
            field=models.ManyToManyField(through='services.PackageItem', to='services.service'),
        ),
    ]
