from django.urls import path
from . views import *

urlpatterns = [
    path('', index, name = 'index'),
    path('setting', view_setting, name = 'view_setting'),
    path('add_language', event_add_language, name = 'event_add_language'),
    path('update_status/<int:pk>', event_update_language, name = "event_update_language" ),
]