from django.db import models
from language.models import Language
from users.models import Users

# Create your models here.
class Trainer_Category(models.Model):
    name = models.CharField('Category Name', unique = True, max_length = 250)
    language = models.ForeignKey(Language, on_delete = models.CASCADE, null = True)
    image = models.ImageField(upload_to = 'trainer/category', default = 'default/trainer_category.jpg')

    class Meta:
        db_table = 'trainer_category'

class Trainers(models.Model):
    user = models.ForeignKey(Users, on_delete = models.CASCADE)
    vendor = models.CharField('Vendor ID', max_length = 250, null = True)
    youtube = models.CharField('Youtube', max_length = 250, null = True)
    commission = models.CharField('Individual Commission', max_length = 250, null = True)
    certification = models.CharField("Certification Year", max_length = 250,null = True)
    website = models.CharField("Website", max_length = 250, null = True)
    logo = models.ImageField(
        upload_to = 'trainers/logo',
        default = 'default/trainer_logo.jpg',
    )
    banner = models.ImageField(
        upload_to = 'trainers/banner',
        default = 'default/trainer_banner.jpg'
    )
    category = models.ManyToManyField(Trainer_Category, null = True, db_table = 'related_trainers_category')
    
    class Meta:
        db_table = 'trainers'
