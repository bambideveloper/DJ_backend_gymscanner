from django.db import models

# Create your models here.
STATUS_CHOICES_ACTION = [
    ('d', 'Confirm Order '),
    ('p', 'Delete'),
    ('v','View')
    
]
STATUS_CHOICE = [
    ('d', 'Order confirmed'),
    ('p', 'Not confirmed'), 
]

class Order(models.Model):
    order_number = models.IntegerField(default = 0)
    customer_name = models.CharField(max_length = 250)
    email = models.CharField(max_length = 250)
    gym_name = models.CharField(max_length = 250)
    plan_type= models.CharField(max_length = 250)
    price_kwd = models.FloatField()
    admin_commission = models.IntegerField(default = 0)
    order_date= models.DateTimeField()
    status=models.CharField(max_length = 1, choices = STATUS_CHOICE)    
    actions = models.CharField(max_length = 1, choices = STATUS_CHOICES_ACTION)

    class Meta:
        db_table = 'orders'