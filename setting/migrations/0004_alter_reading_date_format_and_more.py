# Generated by Django 4.0 on 2022-01-08 09:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('setting', '0003_rename_date_formate_reading_date_format'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reading',
            name='date_format',
            field=models.CharField(default='DD/MM/YYYY HH:MM:SS A', max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='reading',
            name='date_time_format',
            field=models.CharField(default='DD/MM/YYYY HH:MM:SS A', max_length=250, null=True),
        ),
    ]
