from django.shortcuts import redirect, render
from masters.models import Country
from language.models import Language
from users.models import Users
from . models import *

# Create your views here.
def index(request):
    context = {}
    context["title"] = "Trainer"
    context["trainer_section"] = "current_section"
    context["trainer_index"] = "act_item"
    context['languages'] = Language.objects.all()
    context['categories'] = Trainer_Category.objects.all()
    context['country_list'] = Country.objects.all()
    context['trainers'] = Trainers.objects.all()
    return render(request, 'trainers/trainer.html', context )

def view_add(request):
    context = {}
    context["title"] = "Add Trainer"
    context["trainer_section"] = "current_section"
    context["trainer_add"] = "act_item"
    context['languages'] = Language.objects.all()
    context['categories'] = Trainer_Category.objects.all()
    context['country_list'] = Country.objects.all()
    return render(request, 'trainers/add_trainer.html', context )

def view_category(request):
    context = {}
    context['title'] = "Trainer Category"
    context['categories'] = Trainer_Category.objects.all()
    context['trainer_section'] = "current_section"
    context['trainer_category'] = "act_item"

    return render(request, 'trainers/category.html', context )

def event_insert_trainer(request):
    context = {}
    if request.method == "POST":
        message = 'Trainer added successfully'
        user = Users.objects.create(
            email = request.POST.get("email"),
            username = request.POST.get("username"),
            fullname = request.POST.get("fullname"),
            phone = request.POST.get("phone"),
            address = request.POST.get("address"),
            country = request.POST.get("country"),
            about = request.POST.get("about")
        )

        for language_id in request.POST.getlist('languages'):
            user.language.add(Language.objects.get(id = language_id))

        business = Businesses.objects.create(
            user = user,
            business_type = 1, # if FALSE: Trainer else: Gym
            vendor = request.POST.get("vendor"),
            website = request.POST.get("website"),
            youtube = request.POST.get("youtube"),
            commission = request.POST.get("commission"),
        )

        trainer = Trainers.objects.create(
            business = business,
            certification = request.POST.get("certification"),
            logo = request.FILES.get('image_logo'),
        )

        for category_id in request.POST.getlist('categories'):
            trainer.category.add(Trainer_Category.objects.get(id = category_id))

        Trainers_Bank.objects.create(
            trainer = trainer,
            name = request.POST.get("bank_name"),
            account_number = request.POST.get("bank_account"),
            swift_code = request.POST.get("swift_code"),
            account_holder_name = request.POST.get("holder_name"),
        )

        trainer.save()
        context['message']= message

    context["title"] = "Add Trainer"
    context["trainer_section"] = "current_section"
    context["trainer_add"] = "act_item"
    context['languages'] = Language.objects.all()
    context['categories'] = Trainer_Category.objects.all()
    context['country_list'] = Country.objects.all()
    return render(request, 'trainers/add_trainer.html', context )
def event_update_trainer(request, pk):
    context = {}

    if (request.method == "POST"):
        message = "Trainers updated successfully"
        sel_trainer = Trainers.objects.get(id = pk)
        if request.POST.get("email"):
            sel_trainer.business.user.email = request.POST.get("email")
        if request.POST.get("fullname"):
            sel_trainer.business.user.fullname = request.POST.get("fullname")
        if request.POST.get("username"):
            sel_trainer.business.user.username = request.POST.get("username")
        if request.POST.get("birthday"):
            sel_trainer.business.user.birthday = request.POST.get("birthday")
        if request.POST.get("phone"):
            sel_trainer.business.user.phone = request.POST.get("phone")
        if request.POST.get("address"):
            sel_trainer.business.user.address = request.POST.get("address")
        if request.POST.get("country"):
            sel_trainer.business.user.country = request.POST.get("country")
        if request.POST.get("about"):
            sel_trainer.business.user.about = request.POST.get("about")
        if request.POST.get("website"):
            sel_trainer.business.website = request.POST.get("website")
        if request.POST.get("vendor"):
            sel_trainer.business.vendor = request.POST.get("vendor")
        if request.POST.get("youtube"):
            sel_trainer.business.youtube = request.POST.get("youtube")
        if request.POST.get("commission"):
            sel_trainer.business.commission = request.POST.get("commission")
        if request.POST.get("certification"):
            sel_trainer.certification = request.POST.get("certification")
        if request.FILES.get('image_logo'):
            sel_trainer.logo = request.FILES.get('image_logo')
        
        sel_trainer.business.user.language.clear()
        for language_id in request.POST.getlist('languages'):
            sel_trainer.business.user.language.add(Language.objects.get(id = language_id))
        sel_trainer.category.clear()
        for category_id in request.POST.getlist('categories'):
            sel_trainer.category.add(Trainer_Category.objects.get(id = category_id))

        if request.POST.get("bank_name"):
            sel_trainer.trainers_bank.name = request.POST.get("bank_name")
        if request.POST.get("bank_account"):
            sel_trainer.trainers_bank.account_number = request.POST.get("bank_account")
        if request.POST.get("swift_code"):
            sel_trainer.trainers_bank.swift_code = request.POST.get("swift_code")
        if request.POST.get("holder_name"):
            sel_trainer.trainers_bank.account_holder_name = request.POST.get("holder_name")

        sel_trainer.business.user.save()
        sel_trainer.business.save()
        sel_trainer.save()
        sel_trainer.trainers_bank.save()
        
        context['message'] = message

    context['sel_trainer'] = Trainers.objects.get(id = pk)
    context['trainer_languages'] = context['sel_trainer'].business.user.language.all()
    context['trainer_categories'] = context['sel_trainer'].category.all()
    context["title"] = "Edit Trainer"
    context["trainer_section"] = "current_section"
    context["trainer_index"] = "act_item"
    context['languages'] = Language.objects.all()
    context['categories'] = Trainer_Category.objects.all()
    context['country_list'] = Country.objects.all()
    return render(request, 'trainers/edit_trainer.html', context)
def event_update_trainer_status(request, pk):
    sel_trainer = Trainers.objects.get(id = pk)
    sel_trainer.business.user.status = False if sel_trainer.business.user.status else True
    sel_trainer.business.user.save()
    return redirect('/trainers/')
def event_delete_trainer(request, pk):
    sel_trainer = Users.objects.filter(businesses__trainers__id = pk)
    sel_trainer.delete()
    return redirect('/trainers/')
def event_insert_category(request):
    context = {}

    if request.method == "POST":
        message = "Category added successfully"
        trainer_category = Trainer_Category.objects.create(
            name = request.POST.get('name'),
            image = request.FILES.get('file_image')
        )
        # language = Language.objects.get(id = request.POST.get('radio_demo'))
        if request.POST.get("radio_demo"):
            trainer_category.language = Language.objects.get(id = request.POST.get('radio_demo'))
        
        trainer_category.save()
        context['message'] = message
    
    context["title"] = "Add Trainer Category"
    context["languages"] = Language.objects.all()
    context["trainer_section"] = "current_section"
    context["trainer_category"] = "act_item"
    return render(request, 'trainers/add_category.html', context)
def event_edit_category(request, pk):
    context = {}
    if request.method == "POST":
        message = "Category updated successfully"
        sel_category = Trainer_Category.objects.get(id = pk)
        if request.POST.get("name"):
            sel_category.name = request.POST.get("name")
        if request.FILES.get('image'):
            sel_category.image = request.FILES.get('image')
        if request.POST.get("radio_demo"):
            sel_category.language = Language.objects.get(id = request.POST.get("radio_demo"))
        
        sel_category.save()
        context["message"] = message
    context["sel_category"] = Trainer_Category.objects.get(id = pk)
    print(context["sel_category"].language)
    context["title"] = "Edit Trainer Category"
    context["languages"] = Language.objects.all()
    context["trainer_section"] = "current_section"
    context["trainer_category"] = "act_item"
    return render(request, 'trainers/edit_category.html', context)
def event_update_category(request, pk):
    trainer_category = Trainer_Category.objects.get(id = pk)
    trainer_category.status = False if trainer_category.status else True
    trainer_category.save()
    return redirect("/trainers/category")
def event_delete_category(request, pk):
    Trainer_Category.objects.get(id = pk).delete()    
    return redirect("/trainers/category")