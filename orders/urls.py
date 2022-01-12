from django.urls import path
from . views import *

urlpatterns = [
    path('', index, name = 'index'),
    path('update/<int:pk>', event_update, name = 'event_update'),
    path('delete/<int:pk>', event_update, name = 'event_delete'),
]