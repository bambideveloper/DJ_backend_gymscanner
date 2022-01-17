from django.urls import path, include
from rest_framework import routers
from . views import RegisterViewSet

router = routers.DefaultRouter()

router.register(r'register', RegisterViewSet, basename = 'register')

urlpatterns = [
    # User API (Create, Read, Update, Delete)
    path('', include(router.urls))
    # path('v1/register', user_insert, name = 'register'),
    # path('v1/getOTP', get_OTP, name = 'get_OTP'),
    # path('v1/login', user_delete, name = 'login'),
    # path('v1/forget', forget_passwor, name = 'forget'),
]