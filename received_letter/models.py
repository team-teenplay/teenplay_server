from django.db import models

from letter.models import Letter
from teenplay_server.models import Period


class ReceivedLetter(Period):
    letter = models.ForeignKey(Letter, null=False, blank=False, on_delete=models.PROTECT)
    # 0: 읽음, 1: 안읽음
    is_read = models.BooleanField(null=False, blank=False, default=1)
    # 0: 삭제
    status = models.BooleanField(default=1, null=False, blank=False)

    class Meta:
        db_table = 'tbl_received_letter'