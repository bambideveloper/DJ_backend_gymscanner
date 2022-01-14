from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from . models import *
# Create your views here.
@login_required
def index(request):
    context = {}
    context['logs'] = Logs.objects.all()
    context['title'] = "Logs"
    context['log_section'] = "current_section"
    return render(request, 'logs/log.html', context )