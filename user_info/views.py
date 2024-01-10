from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.core.mail import send_mail
from django.contrib.auth import logout as django_logout
from django.contrib.auth.forms import PasswordChangeForm
from user_info.models import UserInfo, ContactMessages, FinancialInfo
from django.contrib.auth import authenticate, login as django_login

import random



def register(request):
    if request.method == 'POST':
        firstname = request.POST.get('firstname')
        lastname = request.POST.get('lastname')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        gender = request.POST.get('gender')
        address = request.POST.get('address')
        dob = request.POST.get('dob')
        password = request.POST.get('password')
        transactional_coeff = request.POST.get('transactional_coeff')

        user_data = UserInfo(firstname=firstname, lastname=lastname, phone=phone, email=email, dob=dob,
                             gender=gender, address=address, password=password)
        user_data.save()

        financial_info = FinancialInfo(phone=user_data, savings_account_balance=0.0, transactional_coeff=transactional_coeff)
        financial_info.save()

        sender_email = 'dlaminimpumelelo096@gmail.com'
        receiver_email = [email]
        subject = "Account Verification"
        code = random.randint(1000, 9999)
        message = f"You have registered your account. Please enter the following code into the verification page: {code}"
        send_mail(subject, message, sender_email, receiver_email)

        request.session['vcode'] = code
        request.session['phone'] = phone

        return render(request, 'verify.html')
    else:
        return render(request, 'registration.html', {'msg': ""})

def login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        try:
            user = UserInfo.objects.get(phone=username, password=password)
        except UserInfo.DoesNotExist:
            msg = "Invalid username or password"
            success = False
            return render(request, 'login.html', {'msg': msg})

        request.session['user_id'] = username
        return render(request, 'user.html', {'logged': True})
    else:
        return render(request, 'login.html', {'msg': ""})

def verify(request):
    if request.method == 'POST':
        code = request.POST.get('code')
        org_code = request.session.get('vcode')

        users = UserInfo.objects.filter(phone=request.session.get('phone'))

        # Handle the case where multiple users have the same phone number
        user = None
        if users.count() == 1:
            user = users.first()
            if code == str(org_code):
                return render(request, 'login.html', {'logged': False})
            else:
                return render(request, 'verify.html', {'msg': "Verification failed. Check the code."})
        elif users.count() > 1:
            # Handle the case where there are multiple users with the same phone number
            # You might want to implement specific logic for this scenario
            return render(request, 'verify.html', {'msg': "Multiple users found with the same phone number."})
        else:
            # Handle the case where no user is found with the provided phone number
            return render(request, 'verify.html', {'msg': "No user found with the provided phone number."})
    else:
        return render(request, 'verify.html', {'msg': ""})

@login_required
def profile_page(request):
    user = get_object_or_404(UserInfo, phone=request.session.get('user_id'))
    
    if request.method == 'POST':
        user.firstname = request.POST.get('firstname')
        user.lastname = request.POST.get('lastname')
        user.gender = request.POST.get('gender')
        user.address = request.POST.get('address')
        user.password = request.POST.get('password')

        user.save()

        msg = "Successfully updated profile."
    else:
        msg = ""

    return render(request, 'user.html', {'user_account': user, 'msg': msg, 'logged': True})

def contact(request):
    if request.method == 'POST':
        fullname = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')

        data = ContactMessages(fullname=fullname, email=email, subject=subject, message=message)
        data.save()

        return render(request, 'contact-us.html', {'msg': "Successfully sent message.", 'logged': True})
    else:
        return render(request, 'contact-us.html', {'msg': ""})


def logout(request):
    django_logout(request)
    return redirect('index')


