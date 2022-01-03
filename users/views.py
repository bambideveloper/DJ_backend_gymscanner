from django.shortcuts import render
from .models import *
from masters.models import Country

# Create your views here.
def index(request):
    # users=User.objects.filter(type="user",is_staff=False)
    context = {}
    # context["users"]=users
    context["title"] = "Users"
    context["user_section"] = "current_section"
    context["user_index"] = "act_item"
    # context["user"] = request.user
    print(context)
    return render(request, 'users/user.html', context )
def view_add(request):
    context = {}
    context["title"] = "Add Users"
    context["user_section"] = "current_section"
    context["user_add"] = "act_item"
    context["country_list"] = Country.objects.all();
    return render(request, 'users/add_user.html', context )

def event_insert(request):
    if request.method == 'POST':
        message = 'User added successfully'
        user = Users.objects.create(
            email = request.POST.get("email"),
            username = request.POST.get("username"),
            first_name = request.POST.get("first_name"),
            last_name = request.POST.get("last_name"),
            birthday = request.POST.get("birthday"),
            phone = request.POST.get("phone"),
            address = request.POST.get("address"),
            country = request.POST.get("country"),
            gender = request.POST.get("gender"),
            profile = request.FILES.get('user_profile_photo')
        )
        if request.POST.get("password") == request.POST.get("confirm_password"):
            user.set_password(request.POST.get("password"))
            user.save()
        else:
            message = 'Password do not match'
            
        context = {}
        context["title"] = "Add Users"
        context["country_list"] = Country.objects.all()
        context["user_section"] = "current_section"
        context["user"] = request.user
        context["user_add"] = "act_item"
        context["message"] = message
        return render(request, 'users/add_user.html',context )
    else:
        context = {}
        context["title"] = "Add Users"
        context["country_list"] = Country.objects.all()
        context["user_section"] = "current_section"
        context["user"] = request.user
        context["user_add"] = "act_item"
        return render(request, 'users/add_user.html',context )
def event_update(request, pk):
    context = {}
    return render(request, 'users/user.html', context )
def event_delete(request, pk):
    context = {}
    return render(request, 'users/user.html', context )