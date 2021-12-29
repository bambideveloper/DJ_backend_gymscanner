from django.shortcuts import render

# Create your views here.
def index(request):
    context = {}
    return render(request, 'language/language.html', context )
def view_setting(request):
    context = {}
    return render(request, 'language/setting.html', context )