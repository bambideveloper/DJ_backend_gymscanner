from django.shortcuts import render
from . models import *
# Create your views here.
def view_site(request):
    context = {}
    context['data'] = Site.objects.all()
    if len(context['data']) > 0:
        context['has_data'] = False
    else:
        context['has_data'] = True

    context['title'] = 'Site Settings'
    context['user'] = request.user
    context['setting_section'] = "current_section"
    context['setting_site'] = "act_item"
    return render(request, 'setting/site.html', context )
def event_add_site(request):
    context = {}
    return render(request, 'setting/site.html', context)
def event_update_site(request, pk):
    context = {}
    return render(request, 'setting/site.html', context)
def view_contact(request):
    context = {}
    context['data'] = Contact.object().all()
    if len(context['data']) > 0:
        context['has_data'] = False
    else:
        context['has_data'] = True

    context['title'] = 'Contact Us Email Settings'
    context['user'] = request.user
    context['setting_section'] = "current_section"
    context['setting_contact'] = "act_item"
    return render(request, 'setting/contact.html', context )
def view_social(request):
    context = {}
    context['data'] = Social.object().all()
    if len(context['data']) > 0:
        context['has_data'] = False
    else:
        context['has_data'] = True

    context['title'] = 'Social Settings'
    context['user'] = request.user
    context['setting_section'] = "current_section"
    context['setting_social'] = "act_item"
    
    return render(request, 'setting/social.html', context )
def view_reading(request):
    context = {}
    context['data'] = Reading.object().all()
    if len(context['data']) > 0:
        context['has_data'] = False
    else:
        context['has_data'] = True

    context['title'] = 'Reading Settings'
    context['user'] = request.user
    context['setting_section'] = "current_section"
    context['setting_reading'] = "act_item"
    return render(request, 'setting/reading.html', context )
def view_email(request):
    context = {}
    context['data'] = Email.object().all()
    if len(context['data']) > 0:
        context['has_data'] = False
    else:
        context['has_data'] = True

    context['title'] = 'Email Settings'
    context['user'] = request.user
    context['setting_section'] = "current_section"
    context['setting_email'] = "act_item"
    return render(request, 'setting/email.html', context )
def view_bank(request):
    context = {}
    context['data'] = Bank.object().all()
    if len(context['data']) > 0:
        context['has_data'] = False
    else:
        context['has_data'] = True

    context['title'] = 'Bank Settings'
    context['user'] = request.user
    context['setting_section'] = "current_section"
    context['setting_bank'] = "act_item"
    return render(request, 'setting/bank.html', context )