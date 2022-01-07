# Generated by Django 4.0 on 2021-12-31 09:33

from django.db import migrations, models


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
            ],
            options={
                'db_table': 'demo_video',
            },
        ),
    ]