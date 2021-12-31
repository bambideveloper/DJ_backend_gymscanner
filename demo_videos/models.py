from django.db import models

# Create your models here.
class Demo_Video(models.Model):

    video_url = models.CharField('URL', max_length = 250)
    video_title = models.CharField('Title', max_length = 250)
    video = models.FileField('Video', upload_to = 'video', default = 'default/video.jpg')
    class Meta:
        db_table = 'demo_video'