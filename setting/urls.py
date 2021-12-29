from django.urls import path
from . views import *

urlpatterns = [
    path('site', view_site, name = 'view_site'),
    path('add_site', event_add_site, name = 'add_site'),
    path('update_site/<int:pk>', event_update_site, name = 'update_site'),
    path('contact', view_contact, name = 'view_contact'),
    path('social', view_social, name = 'view_social'),
    path('reading', view_reading, name = 'view_reading'),
    path('email', view_email, name = 'view_email'),
    path('bank', view_bank, name = 'view_bank'),
]