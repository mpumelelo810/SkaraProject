from django import forms

from user_info.models import ContactMessages
from .models import User

class RegistrationForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['firstname', 'lastname', 'phone', 'email', 'dob', 'gender','transactional_coeff', 'address', 'password']
class ContactMessageForm(forms.ModelForm):
    class Meta:
        model = ContactMessages
        fields = ['message']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['message'].required = True