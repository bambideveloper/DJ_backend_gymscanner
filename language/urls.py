from django.urls import path
from . views import *

urlpatterns = [
    path('', index, name = 'index'),
    path('setting', view_setting, name = 'view_setting'),
]