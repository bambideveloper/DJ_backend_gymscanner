from django.urls import path
from . views import *

urlpatterns = [
    path('feature_icon', view_feature_icon, name = 'view_feature_icon'),
    path('country', view_country, name = 'view_country'),
    path('add_feature_icon', view_add_feature, name = 'add_feature'),
    path('add_country', view_add_country, name = 'add_country')
]