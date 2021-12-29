from django.shortcuts import render

# Create your views here.
def view_feature_icon(request):
    context = {}
    return render(request, 'masters/features_icon/features_icon.html', context )
def view_add_feature(request):
    context = {}
    return render(request, 'masters/features_icon/add_features_icon.html', context)
def view_country(request):
    context = {}
    return render(request, 'masters/country/country.html', context )
def view_add_country(request):
    context = {}
    return render(request, 'masters/country/add_country.html', context)
