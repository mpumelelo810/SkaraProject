from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from user_info.models import UserInfo, ContactMessages
import smtplib, ssl

# Create your views here.
# Function for rendering the registration form page
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
        email = request.POST.get('email')

        user_data = UserInfo(firstname=firstname, lastname=lastname,phone=phone,email=email,dob=dob,
                         gender=gender,address=address,password=password)
        
        user_data.save()

        msg = "Successfully registered."
    else:
        msg = ""
    return render(request, 'registration.html', {'msg': msg})
    

# Function for managing user login
def login(request):
    
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = UserInfo.objects.filter(phone=username,password=password)
        
        if user.count() < 1:
            msg = "Invalid username or password"
        else:            
            # Set sessions for user
            request.session['user_id'] = username
            
            msg = "Successfully logged in."
    else:
        msg = ""
    return render(request, 'login.html', {'msg': msg})
    

def profile_page(request):    
    if request.method == 'POST':
        firstname = request.POST.get('firstname')
        lastname = request.POST.get('lastname')
        gender = request.POST.get('gender')
        address = request.POST.get('address')
        #dob = request.POST.get('dob')
        password = request.POST.get('password')

        user.firstname = firstname
        user.lastname = lastname
        user.gender = gender
        user.address = address
        user.password = password
        
        user.save()

        msg = "Successfully updated profile."
    else:
        msg = ""   
        
    if request.session.get('user_id') != None:
        user = UserInfo.objects.get(phone=request.session.get('user_id'))
        page = 'user.html'
        context = {'user_account': user, 'msg':msg}
    else:
        page = 'login.html'
        context = {'msg':'Please login before you can access your account!'}
    msg = ""
    
    port = 465  # For SSL
    smtp_server = "smtp.gmail.com"
    sender_email = "originalwfdealer@gmail.com"  # Enter your address
    receiver_email = "wisistohlophes@gmail.com"  # Enter receiver address
    password = "Khayisto03."
    message = """\
                Subject: Hi there

                This message is sent from Python."""

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
        server.ehlo()  # Can be omitted
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, message)   
            
    return render(request, page, context)


# Function for rendering the contact form page
def contact(request):
    if request.method == 'POST':
        fullname = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')

        data = ContactMessages(fullname=fullname, email=email,subject=subject,message=message)
        
        data.save()

        msg = "Successfully sent message."
    else:
        msg = ""
    return render(request, 'contact-us.html', {'msg': msg})

