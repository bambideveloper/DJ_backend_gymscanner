from django.db import models
from language.models import Language
from masters.models import Feature
from users.models import Businesses
from masters.models import Banner

# Create your models here.
DAY_CHOICES = (
    ("Monday", "Monday"),
    ("Tuesday", "Tuesday"),
    ("Wednesday", "Wednesday"),
    ("Thursday", "Thursday"),
    ("Friday", "Friday"),
    ("Saturday", "Saturday"),
    ("Sunday", "Sunday"),
)

class Gym_Category(models.Model):
    name = models.CharField('Category Name', unique = True, max_length = 250)
    language = models.ForeignKey(Language, on_delete = models.CASCADE, null = True)
    image = models.ImageField(upload_to = 'gyms/category', default = 'default/gym_category.jpg')

    class Meta:
        db_table = 'gym_category'

class Gym_Review(models.Model):
    user = models.ForeignKey(Businesses, on_delete = models.CASCADE, null = True, blank = True)
    title = models.CharField("Title", max_length = 250)
    description = models.TextField("Description")
    price = models.FloatField("Price")
    location = models.FloatField("Location")
    staff = models.FloatField("Staff")
    facility = models.FloatField("Facility")
    
    date = models.DateTimeField("Date", auto_now_add = True)
    is_active = models.BooleanField("Status", default = True)

    class Meta:
        db_table = 'gym_review'

class Gym_Description(models.Model):
    content = models.CharField('Content', max_length = 250)
    class Meta:
        db_table = 'gym_description'

class Gym_Subscription(models.Model):
    plan_type = models.CharField('Plan Type', max_length = 250)
    plan_name = models.CharField('Plan Name', max_length = 250)
    plan_validity = models.IntegerField('Plan Validity in Months')
    plan_price = models.FloatField('Plan Price')
    created_at = models.DateTimeField('Created_At', auto_now_add = True)
    status = models.BooleanField('Activation', default = True)
    description = models.ManyToManyField(Gym_Description, db_table = 'related_subscription_description')
    class Meta:
        db_table = 'gym_subscription'

class Gyms(models.Model):
    business = models.ForeignKey(Businesses, on_delete = models.CASCADE)
    
    latitude = models.CharField("Latitude", max_length = 250, null = True)
    longitude = models.CharField("Longitude", max_length = 250, null = True)

    logo = models.ImageField(
        upload_to = 'gyms/logo',
        default = 'default/gym_logo.jpg',
    )

    video = models.FileField(
        upload_to = 'gyms/video',
        default = 'default/gym_video.jpg'
    )

    banner = models.ManyToManyField(Banner, db_table = 'related_gyms_banner')
    feature = models.ManyToManyField(Feature, db_table = 'related_gyms_feature')
    category = models.ManyToManyField(Gym_Category, db_table = 'related_gyms_category')
    subscription = models.ManyToManyField(Gym_Subscription, db_table = 'related_gyms_subscription')
    review = models.ManyToManyField(Gym_Review, db_table = 'related_gyms_review')

    class Meta:
        db_table = 'gyms'

class Gym_Timing(models.Model):
    gym = models.ForeignKey(Gyms, on_delete = models.CASCADE)
    day = models.CharField("Day of Week", choices = DAY_CHOICES, max_length = 250)
    open_time = models.TimeField("Open Time", blank = True, null = True)
    close_time = models.TimeField("Close Time", blank = True, null = True)
    
    class Meta:
        db_table = 'gym_timing'

class Gym_Bank(models.Model):
    gym = models.OneToOneField(Gyms, on_delete = models.CASCADE)
    name = models.CharField('Bank Name', max_length = 250)
    account_number = models.CharField('Bank Account Number', max_length = 250)
    swift_code = models.CharField('Swift Code', max_length = 250)
    account_holder_name = models.CharField('Account Holder Name', max_length = 250)

    class Meta:
        db_table = 'gym_bank'

