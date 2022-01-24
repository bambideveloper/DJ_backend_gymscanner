from django.db import models
from django.contrib.auth.models import User
from uuid import uuid4
import os
from django.db.models.signals import post_save
from django.dispatch import receiver
# Create your models here.
def path_and_rename(instance, filename):
    upload_to = 'admin'
    ext = filename.split('.')[-1]
    # get filename
    if instance.pk:
        filename = '{}.{}'.format(instance.user.username, ext)
    else:
        # set filename as random string
        filename = '{}.{}'.format(uuid4().hex, ext)
    # return the whole path to the file
    return os.path.join(upload_to, filename)

class Employee(models.Model):
    user = models.OneToOneField(User, on_delete = models.CASCADE)
    photo = models.ImageField('Profile Photo', 
        upload_to = path_and_rename, 
        default = 'default/admin.jpg'
    )

    class Meta:
        db_table = 'auth_user_photo'


