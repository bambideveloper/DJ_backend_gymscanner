# Generated by Django 4.0 on 2022-01-12 14:48

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import trainers.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('language', '0001_initial'),
        ('masters', '0001_initial'),
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Trainer_Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250, unique=True, verbose_name='Category Name')),
                ('status', models.BooleanField(default=True, verbose_name='Status')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, verbose_name='Created_At')),
                ('image', models.ImageField(default='default/trainer_category.jpg', upload_to=trainers.models.category_logo_path)),
                ('language', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='language.language')),
            ],
            options={
                'db_table': 'trainer_category',
            },
        ),
        migrations.CreateModel(
            name='Trainers',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('certification', models.CharField(max_length=250, null=True, verbose_name='Certification Year')),
                ('logo', models.ImageField(default='default/trainer_logo.jpg', upload_to=trainers.models.trainer_logo_path)),
                ('banner', models.ManyToManyField(db_table='related_trainers_banner', to='masters.Banner')),
                ('business', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.businesses')),
                ('category', models.ManyToManyField(db_table='related_trainers_category', to='trainers.Trainer_Category')),
            ],
            options={
                'db_table': 'trainers',
            },
        ),
        migrations.CreateModel(
            name='Trainers_Bank',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250, verbose_name='Bank Name')),
                ('account_number', models.CharField(max_length=250, verbose_name='Bank Account Number')),
                ('swift_code', models.CharField(max_length=250, verbose_name='Swift Code')),
                ('account_holder_name', models.CharField(max_length=250, verbose_name='Account Holder Name')),
                ('trainer', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='trainers.trainers')),
            ],
            options={
                'db_table': 'trainer_bank',
            },
        ),
    ]
