# Generated by Django 4.0 on 2022-01-12 14:48

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Demo_Video',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('video_url', models.CharField(max_length=250, verbose_name='URL')),
                ('video_title', models.CharField(max_length=250, verbose_name='Title')),
                ('video', models.FileField(default='default/video.jpg', upload_to='video', verbose_name='Video')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, verbose_name='Created At')),
            ],
            options={
                'db_table': 'demo_video',
            },
        ),
    ]
