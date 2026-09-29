from django.db import models
from django.contrib import admin




class UserInfo(models.Model):
    firstname = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    phone = models.CharField(max_length=15, unique=True, primary_key=True)
    email = models.EmailField(unique=True)
    dob = models.DateField()
    gender = models.CharField(max_length=10)
    address = models.CharField(max_length=200)
    # Legacy column kept for migration compatibility. Authentication uses auth.User.
    password = models.CharField(max_length=50, default='disabled', editable=False)
    

class FinancialInfo(models.Model):
    phone = models.OneToOneField(UserInfo, on_delete=models.CASCADE, primary_key=True)
    savings_account_balance = models.DecimalField(max_digits=10, decimal_places=2,default=0)
    transactional_coeff = models.DecimalField(max_digits=2, decimal_places=2)

class ContactMessages(models.Model):
    fullname = models.CharField(max_length=200)
    email = models.CharField(max_length=150)
    subject = models.CharField(max_length=200)
    message = models.CharField(max_length=1000)


admin.site.register(UserInfo)
admin.site.register(FinancialInfo)
admin.site.register(ContactMessages)
