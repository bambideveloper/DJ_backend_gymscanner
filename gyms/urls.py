from django.urls import path

from trainers.views import view_category
from . views import *

urlpatterns = [
    path('', index, name = 'index'),
    path('add', view_add, name = 'view_add'),
    path('view/<int:pk>', view_gym, name = 'view_gym'),
    path('subscription_plan/<int:pk>', view_subscription_plan, name = 'view_subscription_plan'),
    path('category', view_category, name = 'view_category'),
    path('reviews', view_reviews, name = 'view_reviews'),
    path('insert_gym', event_insert_gym, name = 'event_insert_gym'),
    path('edit_gym/<int:pk>', event_edit_gym, name = 'event_edit_gym'),
    path('update_gym_status/<int:pk>', event_update_gym_status, name = 'event_update_gym_status'),
    path('delete_gym/<int:pk>', event_delete_gym, name = 'event_delete_gym'),
    path('add_category', event_add_category, name = 'event_add_category'),
    path('edit_category/<int:pk>', event_edit_category, name = 'event_edit_category'),
    path('update_category/<int:pk>', event_update_category, name = 'event_update_category'),
    path('delete_category/<int:pk>', event_delete_category, name = 'event_delete_category'),
    path('add_subscription_plan/<int:pk>', event_add_subscription_plan, name = 'event_add_subscription_plan'),
    path('edit_subscription_plan/<int:pk>/<int:ck>', event_edit_subscription_plan, name = 'event_edit_subscription_plan'),
    path('update_subscription_plan/<int:pk>/<int:ck>', event_update_subscription_plan, name = 'event_update_subscription_plan'),
    path('delete_subscription_plan/<int:pk>/<int:ck>', event_delete_subscription_plan, name = 'event_delete_subscription_plan'),
]