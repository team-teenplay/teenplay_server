from django.db import models

from letter.models import Letter
from teenplay_server.models import Period


class SentLetter(Period):
    letter = models.ForeignKey(Letter, null=False, blank=False, on_delete=models.PROTECT)
    # 0: 삭제
    status = models.BooleanField(default=1, null=False, blank=False)

    class Meta:
        db_table = 'tbl_sent_letter'
