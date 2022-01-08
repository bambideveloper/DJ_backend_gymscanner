from django.urls import path
from . views import *

urlpatterns = [
    path('site', view_site, name = 'view_site'),
    path('contact', view_contact, name = 'view_contact'),
    path('social', view_social, name = 'view_social'),
    path('reading', view_reading, name = 'view_reading'),
    path('email', view_email, name = 'view_email'),
    path('bank', view_bank, name = 'view_bank'),

    path('add_site', event_add_site, name = 'add_site'),
    path('update_site/<int:pk>', event_update_site, name = 'update_site'),
    path('add_contact', event_add_contact, name = 'add_contact'),
    path('update_contact/<int:pk>', event_update_contact, name = 'update_contact'),
    path('add_social', event_add_social, name = 'add_social'),
    path('update_social/<int:pk>', event_update_social, name = 'update_social'),
    path('add_reading', event_add_reading, name = 'add_reading'),
    path('update_reading/<int:pk>', event_update_reading, name = 'update_reading'),
    path('add_email', event_add_email, name = 'add_email'),
    path('update_email/<int:pk>', event_update_email, name = 'update_email'),
    path('add_bank', event_add_bank, name = 'add_bank'),
    path('update_bank/<int:pk>', event_update_bank, name = 'update_bank'),
]