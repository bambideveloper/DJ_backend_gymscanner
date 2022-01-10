from django.urls import path
from . views import *

urlpatterns = [
    path('feature_icon', view_feature_icon, name = 'view_feature_icon'),
    path('country', view_country, name = 'view_country'),
    path('add_feature_icon', event_add_feature, name = 'event_add_feature'),
    path('edit_feature_icon/<int:pk>', event_edit_feature, name = 'event_edit_feature'),
    path('update_feature_icon/<int:pk>', event_update_feature, name = 'event_update_feature'),
    path('delete_feature_icon/<int:pk>', event_delete_feature, name = 'event_delete_feature'),
    path('add_country', event_add_country, name = 'event_add_country'),
    path('update_country_status/<int:pk>', event_update_country_status, name = 'event_update_country_status'),
    path('update_country_ads/<int:pk>', event_update_country_ads, name = 'event_update_country_ads'),
]