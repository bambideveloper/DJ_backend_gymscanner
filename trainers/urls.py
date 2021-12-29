from django.urls import path
from . views import *

urlpatterns = [
    path('', index, name = 'index'),
    path('add', view_add, name = 'view_add'),
    path('category', view_category, name = 'view_category'),
]