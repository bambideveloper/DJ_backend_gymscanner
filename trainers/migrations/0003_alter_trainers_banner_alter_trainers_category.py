# Generated by Django 4.0 on 2022-01-08 07:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('masters', '0001_initial'),
        ('trainers', '0002_trainer_category_created_at_trainer_category_status_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trainers',
            name='banner',
            field=models.ManyToManyField(db_table='related_trainers_banner', to='masters.Banner'),
        ),
        migrations.AlterField(
            model_name='trainers',
            name='category',
            field=models.ManyToManyField(db_table='related_trainers_category', to='trainers.Trainer_Category'),
        ),
    ]
