from django.db import models

from teenplay_server.period import Period


class Notice(Period):
    NOTICE_TYPE = [
        (0, '공지사항'),
        (1, ' 자주 묻는 질문')
    ]

    notice_title = models.TextField(null=False, blank=False)
    notice_content = models.TextField(null=False, blank=False)
    notice_type = models.SmallIntegerField(choices=NOTICE_TYPE, null=False, blank=False)
    # 0: 공지사항, 1: 자주묻는질문
    status = models.BooleanField(null=False, blank=False)

    class Meta:
        db_table = 'tbl_notice'

