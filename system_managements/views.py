from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from . models import *
# Create your views here.

@login_required
def view_email_template(request):
    context = {}
    context['emails'] = Email_Template.objects.all() 
    context['title'] = "Email Template"
    context['system_management_section'] = "current_section"
    context['system_management_email'] = "act_item"
    return render(request, 'system_managements/email_template.html', context )

@login_required
def event_edit_email(request, pk):
    context = {}
    if request.method == "POST":
        message = "Email Template updated successfully"
        sel_email = Email_Template.objects.get(id = pk)
        if request.POST.get("name"):
            sel_email.name = request.POST.get("name")
        if request.POST.get("subject"):
            sel_email.subject = request.POST.get("subject")
        if request.POST.get("body"):
            sel_email.body = request.POST.get("body")
        sel_email.save()
        context['message'] = message

    context['sel_email'] = Email_Template.objects.get(id = pk)
    context['title'] = "Email Template"
    context['system_management_section'] = "current_section"
    context['system_management_email'] = "act_item"
    return render(request, 'system_managements/edit_email_template.html', context)

@login_required
def view_system_image(request):
    context = {}
    context['images'] = System_Image.objects.all()
    context['title'] = "System Image"
    context['system_management_section'] = "current_section"
    context['system_management_system'] = "act_item"
    return render(request, 'system_managements/system_image.html', context )