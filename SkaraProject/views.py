from django.shortcuts import render
from user_info.views import profile_page


def index(request):
    return render(request, 'react/index.html')


def about(request):
    return render(request, 'About-us.html')


def profile(request):
    return profile_page(request)
