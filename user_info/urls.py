from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('verify/', views.verify, name='verify'),
    path('user/', views.profile_page, name='user'),
    path('contact/', views.contact, name='contact'),
    path('logout/',views. logout, name='logout'),
    path('profile/', views.profile_page, name='profile'),
    
    # other views ...
]
