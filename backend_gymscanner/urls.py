"""backend_gymscanner URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(('main.urls', 'main'), namespace = 'main')),
    path('users/', include(('users.urls', 'user'), namespace = 'user')),
    path('trainers/', include(('trainers.urls', 'trainer'), namespace = 'trainer')),
    path('gyms/', include(('gyms.urls', 'gym'), namespace = 'gym')),
    path('setting/', include(('setting.urls', 'setting'), namespace = 'setting')),
    path('language/', include(('language.urls', 'language'), namespace = 'language')),
    path('masters/', include(('masters.urls', 'master'), namespace = 'master')),
    path('system_managements', include(('system_managements.urls', 'system_management'), namespace = 'system_management')),
    path('orders/', include(('orders.urls', 'order'), namespace = 'order')),
    path('demo_videos/', include(('demo_videos.urls', 'demo_video'), namespace = 'demo_video')),
    path('logs/', include(('logs.urls', 'log'), namespace = 'log')),
    path('apis/', include(('apis.urls', 'api'), namespace = 'api'))
]+ static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
