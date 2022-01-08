from django.db import models

# Create your models here.
DAY_CHOICES = (
    ("old_format", "%Y-%m-%dT%H:%M:%S.%fZ"),
    ("new_format", "%d-%m-%Y %H:%M:%S"),
)

class Site(models.Model):
    site_title = models.CharField(max_length = 250, null = True)
    inquiry_email = models.CharField(max_length = 250, null = True)
    names_in_email = models.CharField(max_length = 250, null = True)
    site_email = models.CharField(max_length = 250, null = True)
    copyright_text = models.CharField(max_length = 250, null = True)

    class Meta:
        db_table = 'setting_site'

class Contact(models.Model):
    email = models.CharField(max_length = 250, null = True)
    phone_number = models.IntegerField(null = True)
    contact_map = models.CharField(max_length = 250, null = True)
    contact_address = models.CharField(max_length = 250, null = True)

    class Meta:
        db_table = 'setting_contact'

class Social(models.Model):
    facebook_url = models.CharField(max_length = 250, null = True)
    twitter_url = models.CharField(max_length = 250, null = True)
    instagram_url = models.CharField(max_length = 250, null = True)
    youtube_url = models.CharField(max_length = 250, null = True)

    class Meta:
        db_table = 'setting_social'

class Reading(models.Model):
    date_time_format = models.CharField(max_length = 250, default = "DD/MM/YYYY HH:MM:SS A", null = True)
    date_format = models.CharField(max_length = 250, default = "DD/MM/YYYY HH:MM:SS A", null = True)
    records_per_page = models.IntegerField(default = 0, null = True)
    record_views = models.IntegerField(default = 0, null = True)

    class Meta:
        db_table = 'setting_reading'

class Email(models.Model):
    host = models.CharField(max_length = 250, null = True)
    time_out = models.CharField(max_length = 250, null = True)
    client= models.FloatField(null = True)
    port = models.FloatField(null = True)
    password = models.CharField(max_length = 50, null = True)
    username = models.CharField(max_length = 250, null = True)

    class Meta:
        db_table = 'setting_email'

class Bank(models.Model):
    bank_name = models.CharField(max_length = 250, null = True)
    bank_account=  models.FloatField(null = True)
    bank_swift_code = models.FloatField(null = True)
    account_holder_name= models.CharField(max_length = 250, null = True)

    class Meta:
        db_table = 'setting_bank'