from django.db import models

from activity.models import Activity
from member.models import Member
from teenplay_server.models import Period


class ActivityLike(Period):
    member = models.ForeignKey(Member, null=False, blank=False, on_delete=models.PROTECT)
    activity = models.ForeignKey(Activity, null=False, blank=False, on_delete=models.PROTECT)
    # 0: 삭제, 1: 좋아요
    status = models.BooleanField(default=1, null=False, blank=False)

    class Meta:
        db_table = 'tbl_activity_like'

