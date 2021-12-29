from django.urls import path

from trainers.views import view_category
from . views import *

urlpatterns = [
    path('', index, name = 'index'),
    path('add', view_add, name = 'view_add'),
    path('category', view_category, name = 'view_category'),
    path('reviews', view_reviews, name = 'view_reviews'),
]