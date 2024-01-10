from django.shortcuts import render

# Function for rendering the index page
def index(request):
    if request.session.get('user_id') != None:
        return render(request, 'index.html', {'logged': True})
    else:
        return render(request, 'index.html')

# Function for rendering the about page
def about(request):
    if request.session.get('user_id') != None:
        return render(request, 'About-us.html', {'logged': True})
    else:
        return render(request, 'About-us.html')

# Function for rendering the profile page
def profile(request):
    if request.session.get('user_id') != None:
        return render(request, 'profile.html', {'logged': True})
    else:
        return render(request, 'profile.html')