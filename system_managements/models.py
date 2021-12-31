from django.db import models

# Create your models here.
class Email_Template(models.Model):
    name = models.CharField('Name', max_length = 250)
    subject = models.CharField('Subject', max_length = 250)
    action = models.CharField('Action', max_length = 250)
    constants = models.CharField('Subject', max_length = 250)
    body = models.TextField('Body')

    class Meta:
        db_table = 'email_template'

class System_Image(models.Model):
    page = models.CharField('Page', max_length = 250)
    logo = models.ImageField('Logo', upload_to = 'system_image', default = 'default/system_image.jpg')
    
    class Meta:
        db_table = 'system_image'