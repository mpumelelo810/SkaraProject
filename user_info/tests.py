from decimal import Decimal
from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from .models import FinancialInfo, UserInfo


class AccountFlowTests(TestCase):
    def test_registration_login_and_profile_access(self):
        response = self.client.get(reverse('user'))
        self.assertRedirects(response, reverse('login') + '?next=' + reverse('user'))

        response = self.client.post(reverse('register'), {
            'firstname': 'Test', 'lastname': 'Person', 'phone': '76000001',
            'email': 'test@example.invalid', 'dob': '2000-01-01',
            'gender': 'Other', 'address': 'Test address',
            'password': 'UncommonSecurePass123!', 'transactional_coeff': '0.06',
        })
        self.assertRedirects(response, reverse('user'))
        self.assertTrue(get_user_model().objects.get(username='76000001').check_password('UncommonSecurePass123!'))
        self.assertEqual(UserInfo.objects.get(phone='76000001').password, 'disabled')
        self.assertEqual(FinancialInfo.objects.get(phone_id='76000001').transactional_coeff, Decimal('0.06'))
        self.assertContains(self.client.get(reverse('user')), 'Test Person')

        self.client.post(reverse('logout'))
        self.assertRedirects(self.client.get(reverse('user')), reverse('login') + '?next=' + reverse('user'))
        self.assertRedirects(self.client.post(reverse('login'), {'username': '76000001', 'password': 'UncommonSecurePass123!'}), reverse('user'))

    def test_contact_and_public_pages(self):
        for name in ('index', 'about', 'register', 'login', 'contact'):
            self.assertEqual(self.client.get(reverse(name)).status_code, 200)
        response = self.client.post(reverse('contact'), {
            'name': 'Visitor', 'email': 'visitor@example.invalid',
            'subject': 'Hello', 'message': 'Can I learn more?',
        })
        self.assertContains(response, 'Your message was saved.')

# Create your tests here.
