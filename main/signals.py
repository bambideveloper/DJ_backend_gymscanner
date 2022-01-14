from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

from . models import *

@receiver(post_save, sender = User)
def create_user_employee(sender, instance, created, **kwargs):
    try:
        instance.employee.save()
    except ObjectDoesNotExist:
        Employee.objects.create(user = instance)
