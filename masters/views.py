from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect

from masters.models import Country, Feature

# Create your views here.
@login_required
def view_feature_icon(request):
    context = {}
    context['features'] = Feature.objects.all()
    context['title'] = "Feature Icon"
    context['master_section'] = "current_section"
    context['master_feature_icon'] = "act_item"
    return render(request, 'masters/features_icon/features_icon.html', context )

@login_required
def event_add_feature(request):
    context = {}
    if request.method == "POST":
        message = "Feature Icon added successfully"
        feature = Feature.objects.create(
            name = request.POST.get('name'),
            icon = request.FILES.get('icon')
        )
        feature.save()
        context['message'] = message

    context['title'] = "Feature Icon"
    context['master_section'] = "current_section"
    context['master_feature_icon'] = "act_item"
    return render(request, 'masters/features_icon/add_features_icon.html', context)

@login_required
def event_edit_feature(request, pk):
    context = {}

    if request.method == "POST":
        message = "Feature Icon updated successfully"
        sel_feature = Feature.objects.get(id = pk)
        if request.POST.get("name"):
            sel_feature.name = request.POST.get("name")
        if request.FILES.get("icon"):
            sel_feature.icon = request.FILES.get("icon")
        sel_feature.save()
        context['message'] = message
    context['title'] = "Feature Icon"
    context['sel_feature'] = Feature.objects.get(id = pk)
    context['master_section'] = "current_section"
    context['master_feature_icon'] = "act_item"
    return render(request, 'masters/features_icon/edit_features_icon.html', context)

@login_required
def event_update_feature(request, pk):
    sel_feature = Feature.objects.get(id = pk)
    sel_feature.is_active = False if sel_feature.is_active else True
    sel_feature.save()
    return redirect('/masters/feature_icon')

@login_required
def event_delete_feature(request, pk):
    Feature.objects.get(id = pk).delete()
    return redirect('/masters/feature_icon')

@login_required
def view_country(request):
    context = {}
    context['country_list'] = Country.objects.all()
    context['title'] = "Country"
    context['master_section'] = "current_section"
    context['master_country'] = "act_item"
    return render(request, 'masters/country/country.html', context )

@login_required
def event_add_country(request):
    context = {}
    if request.method == "POST":
        message = "Country added successfully"
        country = Country.objects.create(
            name = request.POST.get('name'),
            phone_code = request.POST.get('phone_code'),
            country_code = request.POST.get('country_code'),
        )

        country.save()
        context['message'] = message
    
    context['title'] = "Country"
    context['master_section'] = "current_section"
    context['master_country'] = "act_item"
    return render(request, 'masters/country/add_country.html', context)

@login_required
def event_update_country_status(request, pk):
    sel_country = Country.objects.get(id = pk)
    sel_country.is_active = False if sel_country.is_active else True
    sel_country.save()
    return redirect('/masters/country')
    
@login_required
def event_update_country_ads(request, pk):
    sel_country = Country.objects.get(id = pk)
    sel_country.is_ads = False if sel_country.is_ads else True
    sel_country.save()
    return redirect('/masters/country')