from django.shortcuts import render, redirect

from masters.models import Country, Feature
from language.models import Language
from users.models import Users, Businesses
from . models import *

# Create your views here.
def index(request):
    context = {}
    context['title'] = "Gyms"
    context['gyms'] = Gyms.objects.all()

    context['gym_section'] = "current_section"
    context['gym_index'] = "act_item"
    return render(request, 'gyms/gym.html', context )
def view_add(request):
    context = {}
    context['title'] = "Gyms"
    context['gym_section'] = "current_section"
    context['gym_add'] = "act_item"
    context['features'] = Feature.objects.all()
    context['categories'] = Gym_Category.objects.all()
    context['country_list'] = Country.objects.all()
    return render(request, 'gyms/add_gym.html', context )
def view_category(request):
    context = {}
    context['title'] = "Gym Category"
    context['gym_section'] = "current_section"
    context['gym_category'] = "act_item"
    context['categories'] = Gym_Category.objects.all()
    return render(request, 'gyms/category.html', context )
def view_reviews(request):
    context = {}
    context['title'] = "Gyms"
    context['gym_section'] = "current_section"
    context['gym_reviews'] = "act_item"
    return render(request, 'gyms/reviews.html', context )

def view_gym(request, pk):
    context = {}
    context['sel_gym'] = Gyms.objects.get(id = pk)
    context['title'] = "Gym View"
    context['gym_section'] = "current_section"
    context['gym_index'] = "act_item"
    return render(request, 'gyms/view_gym.html', context)

def view_subscription_plan(request, pk):
    context = {}
    context['sel_gym'] = Gyms.objects.get(id = pk)
    context['gym_section'] = "current_section"
    context['gym_index'] = "act_item"

    return render(request, 'gyms/subscription_plan.html', context)
def event_insert_gym(request):
    context = {}
    if request.method == "POST":
        message = 'Gym added successfully'
        user = Users.objects.create(
            email = request.POST.get("email"),
            username = request.POST.get("username"),
            fullname = request.POST.get("fullname"),
            phone = request.POST.get("phone"),
            address = request.POST.get("address"),
            country = request.POST.get("country"),
            about = request.POST.get("about")
        )

        business = Businesses.objects.create(
            user = user,
            business_type = 2, # 0: user 1: trainer 2: gym
            vendor = request.POST.get("vendor"),
            website = request.POST.get("website"),
            youtube = request.POST.get("youtube"),
            commission = request.POST.get("commission"),
        )

        gym = Gyms.objects.create(
            business = business,
            latitude = request.POST.get("latitude"),
            longitude = request.POST.get("longitude")
        )

        for feature_id in request.POST.getlist("features"):
            gym.feature.add(Feature.objects.get(id = feature_id))

        for category_id in request.POST.getlist("categories"):
            gym.category.add(Gym_Category.objects.get(id = category_id))

        days = [
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
            'sunday',
        ]

        for i in range(0, len(days)):
            Gym_Timing.objects.create(
                day = days[i],
                open_time = request.POST.get('{}_start'.format(days[i]), "00:00"),
                close_time = request.POST.get('{}_end'.format(days[i]), "00:00"),
                gym = gym
            )

        Gym_Bank.objects.create(
            gym = gym,
            name = request.POST.get("bank_name"),
            account_number = request.POST.get("bank_account"),
            swift_code = request.POST.get("swift_code"),
            account_holder_name = request.POST.get("holder_name"),
        )

        gym.save()
        context['message'] = message

    context["title"] = "Add Gym"
    context["gym_section"] = "current_section"
    context["gym_add"] = "act_item"
    context['features'] = Feature.objects.all()
    context['categories'] = Gym_Category.objects.all()
    context['country_list'] = Country.objects.all()
    return render(request, 'gyms/add_gym.html', context)
def event_edit_gym(request, pk):
    context = {}
    if (request.method == "POST"):
        message = "Trainers updated successfully"
        sel_gym = Gyms.objects.get(id = pk)
        if request.POST.get("email"):
            sel_gym.business.user.email = request.POST.get("email")
        if request.POST.get("fullname"):
            sel_gym.business.user.fullname = request.POST.get("fullname")
        if request.POST.get("username"):
            sel_gym.business.user.username = request.POST.get("username")
        if request.POST.get("phone"):
            sel_gym.business.user.phone = request.POST.get("phone")
        if request.POST.get("address"):
            sel_gym.business.user.address = request.POST.get("address")
        if request.POST.get("country"):
            sel_gym.business.user.country = request.POST.get("country")
        if request.POST.get("latitude"):
            sel_gym.latitude = request.POST.get("latitude")
        if request.POST.get("longitude"):
            sel_gym.longitude = request.POST.get("longitude")
        if request.POST.get("about"):
            sel_gym.business.user.about = request.POST.get("about")
        if request.POST.get("website"):
            sel_gym.business.website = request.POST.get("website")
        if request.POST.get("vendor"):
            sel_gym.business.vendor = request.POST.get("vendor")
        if request.POST.get("youtube"):
            sel_gym.business.youtube = request.POST.get("youtube")
        if request.POST.get("commission"):
            sel_gym.business.commission = request.POST.get("commission")
        if request.FILES.get('logo'):
            sel_gym.logo = request.FILES.get('logo')
        if request.FILES.get('video'):
            sel_gym.video = request.FILES.get('video')
        
        sel_gym.feature.clear()
        for feature_id in request.POST.getlist('features'):
            sel_gym.feature.add(Feature.objects.get(id = feature_id))
        sel_gym.category.clear()
        for category_id in request.POST.getlist('categories'):
            sel_gym.category.add(Gym_Category.objects.get(id = category_id))

        if request.POST.get("bank_name"):
            sel_gym.gym_bank.name = request.POST.get("bank_name")
        if request.POST.get("bank_account"):
            sel_gym.gym_bank.account_number = request.POST.get("bank_account")
        if request.POST.get("swift_code"):
            sel_gym.gym_bank.swift_code = request.POST.get("swift_code")
        if request.POST.get("holder_name"):
            sel_gym.gym_bank.account_holder_name = request.POST.get("holder_name")

        sel_gym.business.user.save()
        sel_gym.business.save()
        sel_gym.save()
        sel_gym.gym_bank.save()
        
        days = [
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
            'sunday',
        ]

        Gym_Timing.objects.filter(gym = sel_gym).delete()
        
        for i in range(0, len(days)):
            Gym_Timing.objects.create(
                day = days[i],
                open_time = request.POST.get('{}_start'.format(days[i]), "00:00"),
                close_time = request.POST.get('{}_end'.format(days[i]), "00:00"),
                gym = sel_gym
            )

        context['message'] = message

    sel_gym = context['sel_gym'] = Gyms.objects.get(id = pk)
    times = sel_gym.gym_timing_set.all()
    gym_time_day = {}
    gym_time = {}
    for time in times:
        if (str(time.open_time) != "00:00:00" and str(time.close_time) != "00:00:00"):
            gym_time_day[time.day] = "checked"
            gym_time[time.day] = time
        else:
            gym_time_day[time.day] = ""
            gym_time[time.day] = {"open_time": "00:00", "close_time": "00:00"}

    context["title"] = "Edit Gym"
    context["gym_section"] = "current_section"
    context["gym_index"] = "act_item"
    context["gym_time_day"] = gym_time_day
    context["gym_time"] = gym_time
    context['features'] = Feature.objects.all()
    context['categories'] = Gym_Category.objects.all()
    context['country_list'] = Country.objects.all()
    return render(request, 'gyms/edit_gym.html', context)
def event_update_gym_status(request, pk):
    sel_gym = Gyms.objects.get(id = pk)
    sel_gym.business.user.status = False if sel_gym.business.user.status else True
    sel_gym.business.user.save()
    return redirect('/gyms/')
def event_delete_gym(request, pk):
    sel_gym = Users.objects.filter(businesses__gyms__id = pk)
    sel_gym.delete()
    return redirect('/gyms/')

def event_add_category(request):
    context = {}
    if request.method == "POST":
        message = "Gym category added successfully"
        gym_category = Gym_Category.objects.create(
            name = request.POST.get('name'),
            image = request.FILES.get('file_image')
        )

        if request.POST.get("radio_demo"):
            gym_category.language = Language.objects.get(id = request.POST.get('radio_demo'))
        
        gym_category.save()
        context['message'] = message

    context['title'] = "Add Gym Category"
    context['gym_section'] = "current_section"
    context['gym_category'] = "act_item"
    context['languages'] = Language.objects.all()
    return render(request, 'gyms/add_category.html', context)
def event_update_category(request, pk):
    sel_category = Gym_Category.objects.get(id = pk)
    sel_category.status = False if sel_category.status else True
    sel_category.save()
    return redirect('/gyms/category')
def event_edit_category(request, pk):
    context = {}
    if request.method == "POST":
        message = "Category updated successfully"
        sel_category = Gym_Category.objects.get(id = pk)
        if request.POST.get("name"):
            sel_category.name = request.POST.get("name")
        if request.FILES.get('file_image'):
            sel_category.image = request.FILES.get('file_image')
        if request.POST.get('radio_demo'):
            sel_category.language = Language.objects.get(id = request.POST.get("radio_demo"))
        sel_category.save()
        context['message'] = message
    context['title'] = "Edit Gym Category"
    context['sel_category'] = Gym_Category.objects.get(id = pk)
    context['gym_section'] = "current_section"
    context['gym_category'] = "act_item"
    context['languages'] = Language.objects.all()
    return render(request, 'gyms/edit_category.html', context)
def event_delete_category(request, pk):
    sel_category = Gym_Category.objects.get(id = pk)
    sel_category.delete()
    return redirect('/gyms/category')

def event_add_subscription_plan(request, pk):
    context = {}
    context['sel_gym'] = Gyms.objects.get(id = pk)
    context['gym_section'] = "current_section"
    context['gym_index'] = "act_item"
    return render(request, 'gyms/add_subscription.html', context)

def event_edit_subscription_plan(request, pk, ck):
    context = {}
    return render(request, 'gyms/subscription_plan.html', context)

def event_update_subscription_plan(request, pk, ck):
    context = {}
    return render(request, 'gyms/subscription_plan.html', context)

def event_delete_subscription_plan(request, pk, ck):
    context = {}
    return render(request, 'gyms/subscription_plan.html', context)