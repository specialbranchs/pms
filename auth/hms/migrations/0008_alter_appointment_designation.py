# Generated by Django 4.2 on 2024-01-18 05:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('hms', '0007_appointment_designation'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='designation',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='hms.designation'),
        ),
    ]
