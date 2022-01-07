# Generated by Django 4.0 on 2021-12-31 09:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('language', '0002_language_title_alter_language_flag'),
        ('users', '0002_users_last_login_users_password'),
    ]

    operations = [
        migrations.AddField(
            model_name='users',
            name='language',
            field=models.ManyToManyField(db_table='related_users_language', null=True, to='language.Language'),
        ),
        migrations.CreateModel(
            name='Business',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('business_type', models.BooleanField(default=False, verbose_name='Bussiness Type')),
                ('vendor', models.CharField(max_length=250, null=True, verbose_name='Vendor ID')),
                ('website', models.CharField(max_length=250, null=True, verbose_name='Website')),
                ('youtube', models.CharField(max_length=250, null=True, verbose_name='Youtube')),
                ('commission', models.CharField(max_length=250, null=True, verbose_name='Individual Commission')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.users')),
            ],
            options={
                'db_table': 'business',
            },
        ),
    ]