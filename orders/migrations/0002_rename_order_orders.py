# Generated by Django 4.0 on 2022-01-03 14:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Order',
            new_name='Orders',
        ),
    ]
