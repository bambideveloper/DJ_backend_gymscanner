from django.db import models

# Create your models here.
DAY_CHOICES = (
    ("old_format", "%Y-%m-%dT%H:%M:%S.%fZ"),
    ("new_format", "%d-%m-%Y %H:%M:%S"),
)

class Site(models.Model):
    site_title = models.CharField(max_length = 250)
    inquiry_email = models.CharField(max_length = 250)
    names_in_email = models.CharField(max_length = 250)
    site_email = models.CharField(max_length = 250)
    copyright_text = models.CharField(max_length = 250)

    class Meta:
        db_table = 'setting_site'

class Contact(models.Model):
    email = models.CharField(max_length = 250)
    phone_number = models.IntegerField()
    contact_map = models.CharField(max_length = 250)
    contact_address = models.CharField(max_length = 250)

    class Meta:
        db_table = 'setting_contact'

class Social(models.Model):
    facebook_url = models.CharField(max_length = 250)
    twitter_url = models.CharField(max_length = 250)
    instagram_url = models.CharField(max_length = 250)
    youtube_url = models.CharField(max_length = 250)

    class Meta:
        db_table = 'setting_social'

class Reading(models.Model):
    date_time_format = models.DateTimeField( auto_now = False, auto_now_add = False)
    date_formate = models.DateTimeField( auto_now = False, auto_now_add = False)
    records_per_page = models.IntegerField(default = 0)
    record_views = models.IntegerField(default = 0)

    class Meta:
        db_table = 'setting_reading'

class Email(models.Model):
    host = models.CharField(max_length = 250)
    time_out = models.CharField(max_length = 250)
    client= models.FloatField()
    port = models.FloatField()
    password = models.CharField(max_length = 50)
    username = models.CharField(max_length = 250)

    class Meta:
        db_table = 'setting_email'

class Bank(models.Model):
    bank_name = models.CharField(max_length = 250)
    bank_account=  models.FloatField()
    bank_swift_code = models.FloatField()
    account_holder_name= models.CharField(max_length = 250)

    class Meta:
        db_table = 'setting_bank'