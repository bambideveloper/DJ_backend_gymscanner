from django.db import models
from django.utils import timezone

# Create your models here.
class Email_Template(models.Model):
    name = models.CharField('Name', max_length = 250, null = True)
    subject = models.CharField('Subject', max_length = 250, null = True)
    action = models.CharField('Action', max_length = 250, null = True)
    constants = models.CharField('Subject', max_length = 250, null = True)
    body = models.TextField('Body', null = True)
    created_at = models.DateTimeField("Created At", default = timezone.now)

    class Meta:
        db_table = 'email_template'

class System_Image(models.Model):
    page = models.CharField('Page', max_length = 250)
    image = models.ImageField('Image', upload_to = 'system_image', default = 'default/system_image.jpg')
    
    class Meta:
        db_table = 'system_image'