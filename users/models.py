from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.db.models.base import Model
from django.utils import timezone
from language.models import Language
# Create your models here.

GENDER_CHOICES = (
    ('1', 'Male'),
    ('2', 'Female'),
    ('3', 'Other'),
    ('4', 'Prefer Not To Say'),
)

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
    is_verified = models.BooleanField('Verification', default = False)
    gender = models.CharField('Gendor', choices=GENDER_CHOICES, max_length = 250, null = True)

    language = models.ManyToManyField(Language, null = True, db_table = 'related_users_language')
    profile = models.ImageField(
        upload_to = 'users',
        default = 'default/user.jpg'
    )

    class Meta:
        db_table = 'users'
