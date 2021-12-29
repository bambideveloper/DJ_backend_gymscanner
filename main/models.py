from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Employee(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    photo = models.ImageField('Profile Photo', upload_to = 'admin', default = 'default/admin.jpg')

    class Meta:
        db_table = 'auth_user_photo'
