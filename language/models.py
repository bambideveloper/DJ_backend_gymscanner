from django.db import models

# Create your models here.
class Language(models.Model):
    langauge = models.CharField('Language', max_length = 250, unique = True)
    code = models.CharField('Code', max_length = 10, unique = True)
    flag = models.ImageField('Flag', upload_to = 'language/flags/', default = "default/flag.jpg")
    is_active = models.BooleanField('Activate', default = True)
    created_at = models.DateTimeField("Created_At", auto_now_add = True)

    class Meta:
        db_table = 'languages'
