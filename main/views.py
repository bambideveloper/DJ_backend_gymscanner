from django.shortcuts import render,redirect
from django.contrib import messages
from django.contrib.auth import login,logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib.auth.hashers import check_password
from django.core.exceptions import ObjectDoesNotExist

from . models import *
from users.models import *
from trainers.models import *
from gyms.models import *
from orders.models import *

# Create your views here.
@login_required
def index(request):
    context={}
    context["gym_count"] = Gyms.objects.all().count()
    context['user_count'] = Users.objects.filter(businesses__business_type = 0).count()
    context['trainer_count'] = Trainers.objects.all().count()
    context['order_count'] = Orders.objects.all().count()
    context["title"] = "Dashboard"
    context["dashboard_section"] = "current_section"
    context["user"] = request.user
    return render(request, 'index.html',context)
@login_required
def admin_logout(request):
    logout(request)
    messages.info(request, "Logged out successfully!")
    return redirect("/login")
@login_required
def admin_profile(request):
    context={}
    if request.method=="POST":
        if request.POST.get("name"):
            request.user.username = request.POST.get("name")
        if request.POST.get("email"):
            request.user.email = request.POST.get("email")
        if request.FILES.get("auth_profile_photo"):
            request.user.employee.photo = request.FILES.get("auth_profile_photo")
        request.user.save()
        request.user.employee.save()

        if request.FILES.get("auth_profile_photo"):
            request.user.employee.photo = request.FILES.get("auth_profile_photo")

    context["title"] = "Dashboard"
    context["dashboard_section"] = "current_section"
    context['user']=request.user
    return render(request, 'auth/profile.html',context)

@login_required
def admin_change(request):
    context = {}
    if request.method=="POST":
        message = "Password changed successfully"
        if check_password(request.POST.get('old_password'), request.user.password):
            if request.POST.get("new_password") == request.POST.get("confirm_password"):
                request.user.set_password(request.POST.get("new_password"))
                request.user.save()
            else:
                message="New password do not match"
        else:
            message = "Old password is incorrect"
        context['message'] = message   
    context["title"] = "Dashboard"
    context["dashboard_section"] = "current_section"
    context['user'] = request.user    
    return render(request, 'auth/change_password.html', context)

def admin_login(request):
    if request.user.is_authenticated:
        return redirect('/')
    if request.method == 'POST':
        print('POST request')
        if request.method == "POST":
            email = request.POST.get('email')
            password = request.POST.get('password')
            stay = request.POST.get('login_page_stay_signed')
            if stay == "on":
                print("stay active")
            print("stay ==>> ",stay)
            user =  User.objects.filter(email = email, is_staff = True, is_active = True)
            if user.exists():
                user = user[0]
                if check_password(password, user.password):
                    login(request, user,)
                    request.user.employee.save()
                    if request.GET.get('next', False):
                        return redirect(request.GET.get('next'))
                    else:
                        return redirect('/')
                else:
                    print("password wrong")
                    return render(request=request, template_name='auth/login.html', context={"error": "Invalid Password."})
            else:
                print("username is not registered")
                return render(request=request, template_name='auth/login.html', context={"error":"Invalid Email"})
        else:
            return render(request = request, template_name = 'auth/login.html',)
    else:
        return render(request = request, template_name = 'auth/login.html',)