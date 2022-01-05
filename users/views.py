from django.shortcuts import redirect, render
from .models import *
from masters.models import Country

# Create your views here.
def index(request):
    context = {}
    context["users"]= Users.objects.all()
    context["title"] = "Users"
    context["user_section"] = "current_section"
    context["user_index"] = "act_item"
    context["user"] = request.user
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
def event_update_info(request, pk):
    if request.method == "POST":
        message = 'User updated successfully'
        user = Users.objects.get(id = pk)
        if request.POST.get("email"):
            user.email = request.POST.get("email")
        if request.POST.get("username"):
            user.username = request.POST.get("username")
        if request.POST.get("first_name"):
            user.first_name = request.POST.get("first_name")
        if request.POST.get("last_name"):
            user.last_name = request.POST.get("last_name")
        if request.POST.get("birthday"):
            user.birthday = request.POST.get("birthday")
        if request.POST.get("phone"):
            user.phone = request.POST.get("phone")
        if request.POST.get("address"):
            user.address = request.POST.get("address")
        if request.POST.get("country"):
            user.country = request.POST.get("country")
        if request.POST.get("radio_demo_inline"):
            user.gender = request.POST.get("radio_demo_inline")
        if request.FILES.get('user_profile'):
            user.profile = request.FILES.get('user_profile')

        if request.POST.get("password") == request.POST.get("confirm_password"):
            user.set_password(request.POST.get("password"))
            user.save()
        else:
            message = 'Password do not match'
        
        context = {}
        context['sel_user'] = Users.objects.get(id = pk)
        context['title'] = "Edit User"
        context['country_list'] = Country.objects.all();
        context['user_section'] = "current_section"
        context['user_index'] = "act_item"
        context["message"] = message
        return render(request, 'users/edit_user.html', context )
    else:
        context = {}
        context['sel_user'] = Users.objects.get(id = pk)
        context['title'] = "Edit User"
        context['country_list'] = Country.objects.all();
        context['user_section'] = "current_section"
        context['user_index'] = "act_item"
        return render(request, 'users/edit_user.html', context )
def event_update_status(request, pk):
    sel_user = Users.objects.get(id = pk)
    sel_user.status = False if sel_user.status else True
    sel_user.save()
    return redirect('/users/')
def event_delete(request, pk):
    Users.objects.filter(id = pk).delete()
    return redirect('/users/')