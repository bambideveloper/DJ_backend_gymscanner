from django.urls import path
from . views import *

urlpatterns = [
    # View Url
    path('', index, name = 'index'),
    path('add', view_add, name = 'view_add'),

    # Event Url
    path('insert', event_insert, name = 'event_insert'),
    path('delete/<int:pk>', event_delete, name = 'event_delete'),
    path('update_info/<int:pk>', event_update_info, name = 'event_update_info'),
    path('update_status/<int:pk>', event_update_status, name = 'event_update_status'),
]