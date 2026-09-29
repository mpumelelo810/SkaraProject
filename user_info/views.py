from django.contrib import messages
from django.contrib.auth import authenticate, get_user_model, login as auth_login, logout as auth_logout
from django.contrib.auth.decorators import login_required
from django.db import transaction
from django.shortcuts import get_object_or_404, redirect, render
from django.views.decorators.http import require_POST

from .forms import ProfileForm, RegistrationForm
from .models import ContactMessages, FinancialInfo, UserInfo


def register(request):
    if request.user.is_authenticated:
        return redirect('user')
    form = RegistrationForm(request.POST or None)
    if request.method == 'POST' and form.is_valid():
        data = form.cleaned_data
        with transaction.atomic():
            auth_user = get_user_model().objects.create_user(
                username=data['phone'], email=data['email'], password=data['password'],
                first_name=data['firstname'], last_name=data['lastname'],
            )
            profile = UserInfo.objects.create(
                firstname=data['firstname'], lastname=data['lastname'],
                phone=data['phone'], email=data['email'], dob=data['dob'],
                gender=data['gender'], address=data['address'],
            )
            FinancialInfo.objects.create(phone=profile, transactional_coeff=data['transactional_coeff'])
        auth_login(request, auth_user)
        return redirect('user')
    return render(request, 'registration.html', {'form': form})


def login(request):
    if request.user.is_authenticated:
        return redirect('user')
    if request.method == 'POST':
        user = authenticate(request, username=request.POST.get('username', '').strip(), password=request.POST.get('password', ''))
        if user is not None:
            auth_login(request, user)
            return redirect('user')
        messages.error(request, 'Invalid phone number or password.')
    return render(request, 'login.html')


@login_required
def profile_page(request):
    profile = get_object_or_404(UserInfo, phone=request.user.username)
    form = ProfileForm(request.POST or None, initial={
        'firstname': profile.firstname, 'lastname': profile.lastname,
        'gender': profile.gender, 'address': profile.address,
    })
    if request.method == 'POST' and form.is_valid():
        for field, value in form.cleaned_data.items():
            setattr(profile, field, value)
        profile.save(update_fields=['firstname', 'lastname', 'gender', 'address'])
        messages.success(request, 'Your profile was updated.')
        return redirect('user')
    financial = FinancialInfo.objects.filter(phone=profile).first()
    return render(request, 'user.html', {'user_account': profile, 'financial_info': financial, 'form': form})


def verify(request):
    # The old emailed-code screen is retired; registration now uses Django auth.
    return redirect('login')


def contact(request):
    if request.method == 'POST':
        fullname = request.POST.get('name', '').strip()
        email = request.POST.get('email', '').strip()
        subject = request.POST.get('subject', '').strip()
        message = request.POST.get('message', '').strip()
        if not all([fullname, email, subject, message]):
            return render(request, 'contact-us.html', {'msg': 'Please complete all fields.'})
        ContactMessages.objects.create(fullname=fullname, email=email, subject=subject, message=message)
        return render(request, 'contact-us.html', {'msg': 'Your message was saved.'})
    return render(request, 'contact-us.html')


@require_POST
def logout(request):
    auth_logout(request)
    return redirect('index')
