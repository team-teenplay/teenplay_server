from django.test import TestCase

from member.models import AdminAccount
from notice.models import Notice


class AdminTests(TestCase):
    # data = {
    #     'admin_id': 'teenplay',
    #     'admin_password': '1234',
    #     'admin_name': '관리자',
    # }
    #
    # AdminAccount.objects.create(**data)

    data = {
        'notice_title': '자주묻는질문 테스트 제목 10',
        'notice_content': '자주묻는질문 테스트 내용 10',
        'notice_type': 1
    }

    Notice.objects.create(**data)
