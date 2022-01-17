# Generated by Django 4.0 on 2022-01-17 08:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='OTP',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=4, verbose_name='Code')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.users')),
            ],
            options={
                'db_table': 'otps',
            },
        ),
    ]
