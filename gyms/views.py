from django.shortcuts import render

# Create your views here.
def index(request):
    context = {}
    return render(request, 'gyms/gym.html', context )
def view_add(request):
    context = {}
    return render(request, 'gyms/gyms.html', context )
def view_category(request):
    context = {}
    return render(request, 'gyms/gyms.html', context )
def view_reviews(request):
    context = {}
    return render(request, 'gyms/gyms.html', context )