from django.urls import path
from . views import *

urlpatterns = [
    path('', index, name = 'dashboard'),
    path('login', admin_login, name = 'login'),
    path('logout', admin_logout, name = 'logout'),
    path('profile', admin_profile, name = 'profile'),
    path('change', admin_change, name = 'change')
]