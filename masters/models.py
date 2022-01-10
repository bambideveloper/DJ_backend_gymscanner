from django.db import models
from language.models import Language

# Create your models here.
class Country(models.Model):
    name = models.CharField('Country Name', max_length = 250, unique = True)
    country_code = models.CharField('Folder Code', max_length = 250)
    phone_code = models.CharField('Phone Code', max_length = 250)
    is_active = models.BooleanField(default = True)
    is_ads = models.BooleanField(default = True)
    created_at = models.DateTimeField(auto_now_add = True)

    class Meta:
        db_table = 'countries'

class Feature(models.Model):
    name = models.CharField('Feature Name', max_length = 250, unique = True)
    icon = models.ImageField('Feature Icon', upload_to = 'feature', default = 'default/feature_icon.jpg')
    language = models.ForeignKey(Language, on_delete = models.CASCADE, null = True)
    is_active = models.BooleanField(default = True)
    created_at = models.DateTimeField(auto_now_add = True)

    class Meta:
        db_table = 'features'

class Banner(models.Model):
    image = models.ImageField('Image Path', upload_to = 'banner', default = 'default/banner.jpg')
    class Meta:
        db_table = 'banners'