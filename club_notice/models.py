from django.db import models

from club.models import Club
from teenplay_server.models import Period


class ClubNotice(Period):
    club = models.ForeignKey(Club, null=False, blank=False, on_delete=models.PROTECT)
    notice_title = models.TextField(null=False, blank=False)
    notice_content = models.TextField(null=False, blank=False)
    # 0: 삭제, 1: 게시중
    status = models.BooleanField(default=1, null=False, blank=False)

    class Meta:
        db_table = 'tbl_club_notice'
