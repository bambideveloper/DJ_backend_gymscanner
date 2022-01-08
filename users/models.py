from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.utils import timezone
from language.models import Language
from uuid import uuid4
import os
# Create your models here.

GENDER_CHOICES = (
    ('Male', 'Male'),
    ('Female', 'Female'),
    ('Other', 'Other'),
    ('Prefer Not To Say', 'Prefer Not To Say'),
)

def path_and_rename(instance, filename):
    upload_to = 'users'
    ext = filename.split('.')[-1]
    # get filename
    if instance.pk:
        filename = '{}.{}'.format(instance.username, ext)
    else:
        # set filename as random string
        filename = '{}.{}'.format(uuid4().hex, ext)
    # return the whole path to the file
    return os.path.join(upload_to, filename)

class Users(AbstractBaseUser):
    email = models.EmailField('Email Address', unique = True)
    password = models.CharField('Password', max_length = 128, null = True)
    username = models.CharField('User Name', unique = True, max_length = 250)
    fullname = models.CharField('Full Name', max_length = 250)
    first_name = models.CharField('First Name', max_length = 250, null = True)
    last_name = models.CharField('Last Name', max_length = 250, null = True)
    birthday = models.DateTimeField('Date of Birthday', default = timezone.now, null = True)
    phone = models.CharField('Phone Number', max_length = 250, null = True)
    address = models.CharField('Address', max_length = 250, null = True)
    country = models.CharField('Country', max_length = 250, null = True)
    about = models.TextField('About User', null = True)
    status = models.BooleanField('Activate', default = True)
    is_verified = models.BooleanField('Verification', default = False)
    gender = models.CharField('Gendor', choices = GENDER_CHOICES, max_length = 250, null = True)
    created_at = models.DateTimeField('Created At', default = timezone.now)

    language = models.ManyToManyField(Language, db_table = 'related_users_language')

    profile = models.ImageField(
        upload_to = path_and_rename,
        default = 'default/user.jpg'
    )

    USERNAME_FIELD = 'username'
    def get_fullname(self):
        return self.first_name + " " + self.last_name
    class Meta:
        db_table = 'users'
        ordering = ['-created_at']

class Businesses(models.Model):
    user = models.ForeignKey(Users, on_delete = models.CASCADE)
    business_type = models.IntegerField('Bussiness Type', default = 0)
    vendor = models.CharField('Vendor ID', max_length = 250, null = True)
    website = models.CharField("Website", max_length = 250, null = True)
    youtube = models.CharField('Youtube', max_length = 250, null = True)
    commission = models.CharField('Individual Commission', max_length = 250, null = True)
    
    class Meta:
        db_table = 'businesses'
