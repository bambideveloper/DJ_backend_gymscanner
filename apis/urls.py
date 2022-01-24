from django.urls import path, include
from rest_framework import routers
from . views import *

router = routers.DefaultRouter()
# User Register API (Create, Read, Update, Delete)
router.register(r'user', UserViewSet, basename = 'user')
router.register(r'trainer', TrainerViewSet, basename = 'trainer')
router.register(r'gym', GymViewSet, basename = 'gym')

urlpatterns = [
    path('', include(router.urls))
]