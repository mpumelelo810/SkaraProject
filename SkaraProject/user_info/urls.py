from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('account/', views.profile_page, name='account'),
    path('contact/', views.contact, name='contact'),
    # other views ...
]
