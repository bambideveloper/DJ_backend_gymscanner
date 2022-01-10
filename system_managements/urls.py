from django.urls import path
from . views import *

urlpatterns = [
    path('email_template', view_email_template, name = 'view_email_template'),
    path('system_image', view_system_image, name = 'view_system_image'),
    path('event_edit_email/<int:pk>', event_edit_email, name = 'event_edit_email')
]