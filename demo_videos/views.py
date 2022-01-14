from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect

from demo_videos.models import Demo_Video

# Create your views here.
@login_required
def index(request):
    context = {}
    context['videos'] = Demo_Video.objects.all()
    context['title'] = "Demo Videos"
    context['demo_video_section'] = "current_section"
    return render(request, 'demo_videos/demo_video.html', context)

@login_required
def event_add_video(request):
    context = {}

    if request.method == "POST":
        message = "Demo Video added successfully"
        Demo_Video.objects.create(
            video_url = request.POST.get('url'),
            video_title = request.POST.get('title'),
            video = request.FILES.get('video'),
        )
        context['message'] = message

    context['title'] = "Demo Videos"
    context['demo_video_section'] = "current_section"
    return render(request, 'demo_videos/add_demo_video.html', context)

@login_required
def event_edit_video(request, pk):
    context = {}
    context['sel_video'] = Demo_Video.objects.get(id = pk)
    context['title'] = "Demo Videos"
    context['demo_video_section'] = "current_section"
    return render(request, 'demo_videos/edit_demo_video.html', context)

@login_required
def event_delete_video(request, pk):
    Demo_Video.objects.get(id = pk).delete()
    return redirect('/demo_videos/')