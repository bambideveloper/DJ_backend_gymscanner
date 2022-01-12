from django.urls import path
from . views import *

urlpatterns = [
    path('', index, name = 'index'),
    path('add', event_add_video, name = "event_add_video"),
    path('edit/<int:pk>', event_edit_video, name = "event_edit_video"),
    path('delete/<int:pk>', event_delete_video, name = "event_delete_video"),
]