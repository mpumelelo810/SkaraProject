from django.db import models
from django.contrib import admin
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password




class UserInfo(models.Model):
    firstname = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    phone = models.CharField(max_length=15, unique=True, primary_key=True, error_messages={"unique": "This email address is already registered."})
    email = models.EmailField(unique=True,error_messages={"unique": "This phone number is already registered."})
    dob = models.DateField()
    gender = models.CharField(max_length=10)
    address = models.CharField(max_length=200)
    password = models.CharField(max_length=50)
    def clean(self):
        # Validate the password using Django's built-in validators
        try:
            validate_password(self.password, self)
        except ValidationError as e:
            raise ValidationError({'password': e.messages})

    def save(self, *args, **kwargs):
        # Run clean() before saving to validate the password
        self.full_clean()
        super().save(*args, **kwargs)
    

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
