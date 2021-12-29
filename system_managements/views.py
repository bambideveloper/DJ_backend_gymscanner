from django.shortcuts import render

# Create your views here.
def view_email_template(request):
    context = {}
    return render(request, 'system_managements/email_template.html', context )
def view_system_image(request):
    context = {}
    return render(request, 'system_managements/system_image.html', context )