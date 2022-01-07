# Generated by Django 4.0 on 2022-01-03 20:17

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_users_status'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='users',
            options={'ordering': ['-created_at']},
        ),
        migrations.AddField(
            model_name='users',
            name='created_at',
            field=models.DateTimeField(default=django.utils.timezone.now, verbose_name='Created At'),
        ),
    ]