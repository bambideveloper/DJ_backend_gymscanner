from django.db import models

# Create your models here.

class Logs(models.Model):
    images=models.ImageField(upload_to = 'logs/images' )
    name = models.CharField(max_length = 250)
    post = models.CharField(max_length = 250)
    text=  models.CharField(max_length = 250)
    created_on= models.DateTimeField(auto_now_add = True)
    
    class Meta:
        db_table = 'logs'
