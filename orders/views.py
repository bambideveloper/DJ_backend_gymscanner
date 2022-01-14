from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from . models import *
# Create your views here.

@login_required
def index(request):
    context = {}
    context['orders'] = Orders.objects.all()
    context['title'] = 'Orders'
    context['order_section'] = "current_section"
    return render(request, 'orders/order.html', context )

@login_required
def event_update(request, pk):
    sel_order = Orders.objects.get(id = pk)
    sel_order.status = False if sel_order.status else True
    print(sel_order.status)
    sel_order.save()
    return redirect('/orders/')

@login_required
def event_delete(request, pk):
    Orders.objects.get(id = pk).delete()
    return redirect('/orders/')