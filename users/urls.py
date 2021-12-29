from django.urls import path
from . views import *

urlpatterns = [
    path('', index, name = 'index'),
    path('add', view_add, name = 'view_add'),

    path('insert', event_insert, name = 'event_insert'),
    path('delete/<int:pk>', event_delete, name = 'event_delete'),
    path('update/<int:pk>', event_update, name = 'event_update'),
]