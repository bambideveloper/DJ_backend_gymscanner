from django.db import models

# Create your models here.
# STATUS_CHOICES_ACTION = [
#     ('d', 'Confirm Order'),
#     ('p', 'Delete'),
#     ('v','View')
    
# ]
# STATUS_CHOICE = [
#     ('d', 'Order confirmed'),
#     ('p', 'Not confirmed'), 
# ]

class Orders(models.Model):
    gym_name = models.CharField('Gym User Name', max_length = 250)
    order_id = models.CharField('Order ID', max_length = 250)
    customer_name = models.CharField('Name', max_length = 250)
    email = models.CharField('Email', max_length = 250)
    phone = models.CharField('Phone', max_length = 250, null = True)
    start_at = models.DateField('Start Date')
    end_at = models.DateField('End Date')

    plan_type = models.CharField('Plan Type', max_length = 250)
    plan_price = models.FloatField('Plan Price', default = 0)
    gym_commission = models.FloatField('Gym Commission', default = 0)
    admin_commission = models.FloatField('Admin Commission', default = 0)
    duration = models.IntegerField('Plan Duration')
    
    status=models.BooleanField("Status", default = True)    
    # actions = models.CharField(max_length = 1, choices = STATUS_CHOICES_ACTION)

    class Meta:
        db_table = 'orders'