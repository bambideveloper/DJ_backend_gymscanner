from django.db import models
from django.utils import timezone
from uuid import uuid4
import os
from language.models import Language
from users.models import Businesses
from masters.models import Banner

# Create your models here.

def trainer_logo_path(instance, filename):
    upload_to = 'trainers/logo' 
    ext = filename.split('.')[-1]
    # get filename
    if instance.pk:
        filename = '{}.{}'.format(instance.business.user.username, ext)
    else:
        # set filename as random string
        filename = '{}.{}'.format(uuid4().hex, ext)
    # return the whole path to the file
    return os.path.join(upload_to, filename)

def category_logo_path(instance, filename):
    upload_to = 'trainers/category' 
    ext = filename.split('.')[-1]
    # get filename
    if instance.pk:
        filename = '{}.{}'.format(instance.name, ext)
    else:
        # set filename as random string
        filename = '{}.{}'.format(uuid4().hex, ext)
    # return the whole path to the file
    return os.path.join(upload_to, filename)

class Trainer_Category(models.Model):
    name = models.CharField('Category Name', unique = True, max_length = 250)
    language = models.ForeignKey(Language, on_delete = models.CASCADE, null = True)
    status = models.BooleanField("Status", default = True)
    created_at = models.DateTimeField("Created_At", default = timezone.now)
    image = models.ImageField(
        upload_to = category_logo_path, 
        default = 'default/trainer_category.jpg'
    )

    class Meta:
        db_table = 'trainer_category'

class Trainers(models.Model):
    business = models.ForeignKey(Businesses, on_delete = models.CASCADE)
    certification = models.CharField("Certification Year", max_length = 250,null = True)
    logo = models.ImageField(
        upload_to = trainer_logo_path,
        default = 'default/trainer_logo.jpg',
    )
    banner = models.ManyToManyField(Banner, db_table = 'related_trainers_banner')
    category = models.ManyToManyField(Trainer_Category, db_table = 'related_trainers_category')
    
    class Meta:
        db_table = 'trainers'

class Trainers_Bank(models.Model):
    trainer = models.OneToOneField(Trainers, on_delete = models.CASCADE)
    name = models.CharField('Bank Name', max_length = 250)
    account_number = models.CharField('Bank Account Number', max_length = 250)
    swift_code = models.CharField('Swift Code', max_length = 250)
    account_holder_name = models.CharField('Account Holder Name', max_length = 250)

    class Meta:
        db_table = 'trainer_bank'