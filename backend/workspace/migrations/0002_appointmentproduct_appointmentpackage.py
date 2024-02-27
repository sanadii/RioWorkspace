# Generated by Django 4.2.3 on 2024-02-24 11:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('workspace', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='AppointmentProduct',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('quantity', models.PositiveIntegerField(default=1)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='workspace.product')),
                ('staff', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='workspace.staff')),
            ],
            options={
                'db_table': 'appointment_product',
            },
        ),
        migrations.CreateModel(
            name='AppointmentPackage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('package', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='workspace.package')),
                ('staff', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='workspace.staff')),
            ],
            options={
                'db_table': 'appointment_package',
            },
        ),
    ]
