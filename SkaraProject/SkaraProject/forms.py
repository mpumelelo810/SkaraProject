from django import forms
from .models import User

class RegistrationForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['firstname', 'lastname', 'phone', 'email', 'dob', 'gender', 'address', 'password']
