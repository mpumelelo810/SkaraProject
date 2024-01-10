from django.db import models
from django.contrib import admin

class UserInfo(models.Model):
    firstname = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    email = models.EmailField(unique=True)
    dob = models.DateField()
    gender = models.CharField(max_length=10)
    address = models.CharField(max_length=200)
    password = models.CharField(max_length=50)
    
class ContactMessages(models.Model):
    fullname = models.CharField(max_length=200)
    email = models.CharField(max_length=150)
    subject = models.CharField(max_length=200)
    message = models.CharField(max_length=1000)

admin.site.register(UserInfo)
admin.site.register(ContactMessages)