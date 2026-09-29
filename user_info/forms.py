from decimal import Decimal

from django import forms
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError

from .models import UserInfo


class RegistrationForm(forms.Form):
    firstname = forms.CharField(max_length=100)
    lastname = forms.CharField(max_length=100)
    phone = forms.CharField(max_length=15)
    email = forms.EmailField()
    dob = forms.DateField(widget=forms.DateInput(attrs={'type': 'date'}))
    gender = forms.ChoiceField(choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')])
    address = forms.CharField(max_length=200, widget=forms.Textarea(attrs={'rows': 2}))
    password = forms.CharField(widget=forms.PasswordInput)
    transactional_coeff = forms.DecimalField(min_value=Decimal('0.06'), max_value=Decimal('0.99'), decimal_places=2, initial=Decimal('0.06'), label='Savings rate (0.06 means 6%)')

    def clean_phone(self):
        phone = self.cleaned_data['phone'].strip()
        if UserInfo.objects.filter(phone=phone).exists() or get_user_model().objects.filter(username=phone).exists():
            raise ValidationError('This phone number is already registered.')
        return phone

    def clean_email(self):
        email = self.cleaned_data['email'].strip().lower()
        if UserInfo.objects.filter(email__iexact=email).exists() or get_user_model().objects.filter(email__iexact=email).exists():
            raise ValidationError('This email address is already registered.')
        return email

    def clean_password(self):
        password = self.cleaned_data['password']
        validate_password(password)
        return password


class ProfileForm(forms.Form):
    firstname = forms.CharField(max_length=100)
    lastname = forms.CharField(max_length=100)
    gender = forms.ChoiceField(choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')])
    address = forms.CharField(max_length=200, widget=forms.Textarea(attrs={'rows': 2}))
