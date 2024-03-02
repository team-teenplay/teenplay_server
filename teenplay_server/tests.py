from django.test import TestCase

from member.models import AdminAccount


class AdminTests(TestCase):
    data = {
        'admin_id': 'teenplay',
        'admin_password': '1234',
        'admin_name': '관리자',
    }

    AdminAccount.objects.create(**data)
