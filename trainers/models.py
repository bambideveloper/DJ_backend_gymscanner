from django.db import models
from language.models import Language
from users.models import Business
from masters.models import Banner

# Create your models here.
class Trainer_Category(models.Model):
    name = models.CharField('Category Name', unique = True, max_length = 250)
    language = models.ForeignKey(Language, on_delete = models.CASCADE, null = True)
    image = models.ImageField(upload_to = 'trainer/category', default = 'default/trainer_category.jpg')

    class Meta:
        db_table = 'trainer_category'

class Trainers(models.Model):
    business = models.ForeignKey(Business, on_delete = models.CASCADE)
    certification = models.CharField("Certification Year", max_length = 250,null = True)
    logo = models.ImageField(
        upload_to = 'trainers/logo',
        default = 'default/trainer_logo.jpg',
    )
    banner = models.ManyToManyField(Banner, null = True, db_table = 'related_trainers_banner')
    category = models.ManyToManyField(Trainer_Category, null = True, db_table = 'related_trainers_category')
    
    class Meta:
        db_table = 'trainers'

class Trainers_Bank(models.Model):
    trainer = models.ForeignKey(Trainers, on_delete = models.CASCADE)
    name = models.CharField('Bank Name', max_length = 250)
    account_number = models.CharField('Bank Account Number', max_length = 250)
    swift_code = models.CharField('Swift Code', max_length = 250)
    account_holder_name = models.CharField('Account Holder Name', max_length = 250)

    class Meta:
        db_table = 'trainer_bank'