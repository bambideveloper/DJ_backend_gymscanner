from django.shortcuts import render
from . models import *
# Create your views here.
def index(request):
    context = {}
    context['logs'] = Logs.objects.all()
    context['title'] = "Logs"
    context['log_section'] = "current_section"
    return render(request, 'logs/log.html', context )