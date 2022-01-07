from django.urls import path
from . views import *

urlpatterns = [
    # View Url
    path('', index, name = 'index'),
    path('add', view_add, name = 'view_add'),
    path('category', view_category, name = 'view_category'),

    # Event Url
    path('insert_trainer', event_insert_trainer, name = 'event_insert'),
    path('update_info/<int:pk>', event_update_trainer, name = 'event_update_info'),
    path('update_status/<int:pk>', event_update_trainer_status, name = 'event_update_status'),
    path('delete_trainer/<int:pk>', event_delete_trainer, name = 'event_delete'),

    path('insert_category', event_insert_category, name = 'event_insert_category'),
    path('update_category/<int:pk>', event_update_category, name = 'event_update_category'),
    path('edit_category/<int:pk>', event_edit_category, name = 'event_edit_category'),
    path('delete_category/<int:pk>', event_delete_category, name = 'event_delete_category')
]