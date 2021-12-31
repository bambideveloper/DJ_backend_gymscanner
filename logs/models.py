from django.db import models
from users.models import Users
# Create your models here.

class Logs(models.Model):
    user = models.ForeignKey(Users, on_delete = models.CASCADE, max_length = 250)
    created_at = models.DateTimeField('When', auto_now_add = True)
    where = models.CharField('Where', max_length = 250)
    field = models.CharField('What', max_length = 250)
    origin = models.CharField('From', max_length = 250)
    update = models.CharField('To', max_length = 250)

    class Meta:
        db_table = 'logs'
