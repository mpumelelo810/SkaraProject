from django.test import TestCase
from django.urls import reverse


class PublicPageTests(TestCase):
    def test_homepage_serves_react_entrypoint(self):
        response = self.client.get(reverse('index'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'id="root"')
