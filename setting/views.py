
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from . models import *
# Create your views here.
@login_required
def view_site(request):
    context = {}
    context['site'] = Site.objects.all().first()

    context['title'] = 'Site Settings'
    context['setting_section'] = "current_section"
    context['setting_site'] = "act_item"
    return render(request, 'setting/site.html', context )

@login_required
def event_add_site(request):
    context = {}

    if request.method == "POST":
        site = Site.objects.create(
            site_title = request.POST.get("site_title"),
            inquiry_email = request.POST.get("inquiry_email"),
            names_in_email = request.POST.get("names_in_email"),
            site_email = request.POST.get("site_email"),
            copyright_text = request.POST.get("copyright_text"),
        )
        site.save()

    context['title'] = 'Site Settings'
    context['site'] = Site.objects.all().first()
    context['setting_section'] = "current_section"
    context['setting_site'] = "act_item"
    return render(request, 'setting/site.html', context)

@login_required
def event_update_site(request, pk):
    context = {}

    site = Site.objects.get(id = pk)
    if request.POST.get('site_title'):
        site.site_title = request.POST.get('site_title')
    if request.POST.get('inquiry_name'):
        site.inquiry_email = request.POST.get('inquiry_email')
    if request.POST.get('names_in_email'):
        site.names_in_email = request.POST.get('names_in_email')
    if request.POST.get('site_email'):
        site.site_email = request.POST.get('site_email')
    if request.POST.get('copyright_text'):
        site.copyright_text = request.POST.get('copyright_text')

    site.save()
    context['site'] = Site.objects.all().first()
    context['title'] = 'Site Settings'
    context['setting_section'] = "current_section"
    context['setting_site'] = "act_item"
    return render(request, 'setting/site.html', context)

@login_required
def view_contact(request):
    context = {}
    context['contact'] = Contact.objects.all().first()
    context['title'] = 'Contact Us Email Settings'
    context['setting_section'] = "current_section"
    context['setting_contact'] = "act_item"
    return render(request, 'setting/contact.html', context )

@login_required
def event_add_contact(request):
    context = {}
    if request.method == "POST":
        contact = Contact.objects.create(
            email = request.POST.get("email"),
            phone_number = request.POST.get("phone_number"),
            contact_map = request.POST.get("contact_map"),
            contact_address = request.POST.get("contact_address")
        )
        contact.save()

    context['contact'] = Contact.objects.all().first()
    context['title'] = 'Contact Us Email Settings'
    context['setting_section'] = "current_section"
    context['setting_contact'] = "act_item"
    return render(request, 'setting/contact.html', context)

@login_required
def event_update_contact(request, pk):
    context = {}
    contact = Contact.objects.get(id = pk)
    if request.POST.get("email"):
        contact.email = request.POST.get("email")
    if request.POST.get("phone_number"):
        contact.email = request.POST.get("phone_number")
    if request.POST.get("contact_map"):
        contact.email = request.POST.get("contact_map")
    if request.POST.get("contact_address"):
        contact.email = request.POST.get("contact_address")
    
    contact.save()
    context['contact'] = Contact.objects.all().first()
    context['title'] = 'Contact Us Email Settings'
    context['setting_section'] = "current_section"
    context['setting_contact'] = "act_item"
    return render(request, 'setting/contact.html', context)

def view_social(request):
    context = {}
    context['social'] = Social.objects.all().first()
    context['title'] = 'Social Settings'
    context['setting_section'] = "current_section"
    context['setting_social'] = "act_item"
    return render(request, 'setting/social.html', context )

def event_add_social(request):
    context = {}
    if request.method == "POST":
        social = Social.objects.create(
            facebook_url = request.POST.get("facebook_url"),
            twitter_url = request.POST.get("twitter_url"),
            instagram_url = request.POST.get("instagram_url"),
            youtube_url = request.POST.get("youtube_url"),
        )
        social.save()
    context['social'] = Social.objects.all().first()
    context['title'] = 'Social Settings'
    context['setting_section'] = "current_section"
    context['setting_social'] = "act_item"
    return render(request, 'setting/social.html', context)
def event_update_social(request, pk):
    context = {}

    social = Social.objects.get(id = pk)
    if request.POST.get('facebook_url'):
        social.facebook_url = request.POST.get('facebook_url')
    if request.POST.get('twitter_url'):
        social.twitter_url = request.POST.get('twitter_url')
    if request.POST.get('instagram_url'):
        social.instagram_url = request.POST.get('instagram_url')
    if request.POST.get('youtube_url'):
        social.youtube_url = request.POST.get('youtube_url')

    social.save()
    context['social'] = Social.objects.all().first()
    context['title'] = 'Social Settings'
    context['setting_section'] = "current_section"
    context['setting_social'] = "act_item"
    return render(request, 'setting/social.html', context)

def view_reading(request):
    context = {}
    context['reading'] = Reading.objects.all().first()
    context['title'] = 'Reading Settings'
    context['setting_section'] = "current_section"
    context['setting_reading'] = "act_item"
    return render(request, 'setting/reading.html', context )
def event_add_reading(request):
    context = {}
    if request.method == "POST":
        reading = Reading.objects.create(
            date_time_format = request.POST.get("date_time_format"),
            date_format = request.POST.get("date_format"),
            records_per_page = request.POST.get("records_per_page"),
            record_views = request.POST.get("record_views"),
        )
        reading.save()

    context['reading'] = Reading.objects.all().first()
    context['title'] = 'Reading Settings'
    context['setting_section'] = "current_section"
    context['setting_reading'] = "act_item"
    return render(request, 'setting/reading.html', context)
def event_update_reading(request, pk):
    context = {}
    site = Site.objects.get(id = pk)
    if request.POST.get('date_time_format'):
        site.date_time_format = request.POST.get('date_time_format')
    if request.POST.get('date_format'):
        site.date_format = request.POST.get('date_format')
    if request.POST.get('records_per_page'):
        site.records_per_page = request.POST.get('records_per_page')
    if request.POST.get('record_views'):
        site.record_views = request.POST.get('record_views')

    site.save()

    context['reading'] = Reading.objects.all().first()
    context['title'] = 'Reading Settings'
    context['setting_section'] = "current_section"
    context['setting_reading'] = "act_item"
    return render(request, 'setting/reading.html', context)

def view_email(request):
    context = {}
    context['email'] = Email.objects.all().first()
    context['title'] = 'Email Settings'
    context['setting_section'] = "current_section"
    context['setting_email'] = "act_item"
    return render(request, 'setting/email.html', context )
def event_add_email(request):
    context = {}
    if request.method == "POST":
        email = Email.objects.create(
            host = request.POST.get("host"),
            time_out = request.POST.get("time_out"),
            client = request.POST.get("client"),
            port = request.POST.get("port"),
            password = request.POST.get("password"),
            username = request.POST.get("username"),
        )
        email.save()
    context['email'] = Email.objects.all().first()
    context['title'] = 'Email Settings'
    context['setting_section'] = "current_section"
    context['setting_email'] = "act_item"
    return render(request, 'setting/email.html', context)
def event_update_email(request, pk):
    context = {}
    email = Email.objects.get(id = pk)
    if request.POST.get('host'):
        email.host = request.POST.get('host')
    if request.POST.get('time_out'):
        email.time_out = request.POST.get('time_out')
    if request.POST.get('client'):
        email.client = request.POST.get('client')
    if request.POST.get('port'):
        email.port = request.POST.get('port')
    if request.POST.get('password'):
        email.password = request.POST.get('password')
    if request.POST.get('username'):
        email.username = request.POST.get('username')

    email.save()

    context['email'] = Email.objects.all().first()
    context['title'] = 'Email Settings'
    context['setting_section'] = "current_section"
    context['setting_email'] = "act_item"
    return render(request, 'setting/email.html', context)

def view_bank(request):
    context = {}
    context['bank'] = Bank.objects.all().first()
    context['title'] = 'Bank Settings'
    context['setting_section'] = "current_section"
    context['setting_bank'] = "act_item"
    return render(request, 'setting/bank.html', context )
def event_add_bank(request):
    context = {}
    if request.method == "POST":
        bank = Bank.objects.create(
            bank_name = request.POST.get("bank_name"),
            bank_account = request.POST.get("bank_account"),
            bank_swift_code = request.POST.get("bank_swift_code"),
            account_holder_name = request.POST.get("account_holder_name"),
        )
        bank.save()

    context['bank'] = Bank.objects.all().first()
    context['title'] = 'Bank Settings'
    context['setting_section'] = "current_section"
    context['setting_bank'] = "act_item"
    return render(request, 'setting/bank.html', context)
def event_update_bank(request, pk):
    context = {}
    bank = Bank.objects.get(id = pk)
    if request.POST.get('bank_name'):
        bank.bank_name = request.POST.get('bank_name')
    if request.POST.get('bank_account'):
        bank.bank_account = request.POST.get('bank_account')
    if request.POST.get('bank_swift_code'):
        bank.bank_swift_code = request.POST.get('bank_swift_code')
    if request.POST.get('account_holder_name'):
        bank.account_holder_name = request.POST.get('account_holder_name')
    
    bank.save()
    context['bank'] = Bank.objects.all().first()
    context['title'] = 'Bank Settings'
    context['setting_section'] = "current_section"
    context['setting_bank'] = "act_item"
    return render(request, 'setting/bank.html', context)