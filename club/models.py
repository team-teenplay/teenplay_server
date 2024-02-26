from django.db import models

from member.models import Member
from teenplay_server.models import Period


class Club(Period):
    club_name = models.TextField(null=False, blank=False)
    club_intro = models.TextField(null=False, blank=False)
    club_info = models.TextField
    member = models.ForeignKey(Member, null=False, blank=False, on_delete=models.PROTECT)
    # 0: 삭제
    status = models.BooleanField(default=1, null=False)

    class Meta:
        db_table = 'tbl_club'
