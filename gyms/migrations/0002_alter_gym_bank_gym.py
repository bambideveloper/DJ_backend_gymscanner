# Generated by Django 4.0 on 2022-01-07 13:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('gyms', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gym_bank',
            name='gym',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='gyms.gyms'),
        ),
    ]