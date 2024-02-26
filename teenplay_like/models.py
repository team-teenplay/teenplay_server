from django.db import models

from member.models import Member
from teenplay.models import TeenPlay
from teenplay_server.models import Period


class TeenPlayLike(Period):
    teenplay = models.ForeignKey(TeenPlay, null=False, blank=False, on_delete=models.PROTECT)
    member = models.ForeignKey(Member, null=False, blank=False, on_delete=models.PROTECT)
    # # 0: 삭제, 1: 좋아요
    status = models.BooleanField(default=1, null=False, blank=False)

    class Meta:
        db_table = 'tbl_teenplay_like'
