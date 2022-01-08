from django.shortcuts import render, redirect
from . models import *
# Create your views here.
def index(request):
    context = {}
    context['languages'] = Language.objects.all()
    context['title'] = "Languages"
    context['language_section'] = "current_section"
    context['language_index'] = "act_item"
    return render(request, 'language/language.html', context )
def view_setting(request):
    context = {}
    context['languages'] = Language.objects.all()
    context['title'] = "Languages Setting"
    context['language_section'] = "current_section"
    context['language_setting'] = "act_item"
    return render(request, 'language/setting.html', context )

def event_add_language(request):
    context = {}
    if request.method == "POST":
        message = "Language added successfully"
        language = Language.objects.create(
            title = request.POST.get("title"),
            code = request.POST.get("code"),
            flag = request.POST.get("flag")
        )

        language.save()
        context['message'] = message

    context['title'] = "Add Languages"
    context['language_section'] = "current_section"
    context['language_index'] = "act_item"
    return render(request, 'language/add_language.html', context)

def event_update_language(request, pk):
    language = Language.objects.get(id = pk)
    language.is_active = False if language.is_active else True
    language.save()
    return redirect("/language/")