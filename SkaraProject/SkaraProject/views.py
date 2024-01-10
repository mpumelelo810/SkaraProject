from django.shortcuts import render

# Function for rendering the index page
def index(request):
    return render(request, 'index.html')

# Function for rendering the about page
def about(request):
    return render(request, 'About-us.html')

# Function for rendering the contact form page
def contact(request):
    return render(request, 'contact-us.html')

# Function for rendering the profile page
def profile(request):
    return render(request, 'profile.html')