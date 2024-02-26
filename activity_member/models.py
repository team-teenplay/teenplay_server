from django.db import models

from activity.models import Activity
from member.models import Member
from teenplay_server.models import Period


class ActivityMember(Period):
    STATUS = {
        (-1, '참가대기'),
        (0, '취소'),
        (1, '참가중')
    }

    member = models.ForeignKey(Member, null=False, blank=False, on_delete=models.PROTECT)
    activity = models.ForeignKey(Activity, null=False, blank=False, on_delete=models.PROTECT)
    # -1: 참가대기, 0: 취소, 1: 참가중
    status = models.BooleanField(choices=STATUS, default=0, null=False, blank=False)

    class Meta:
        db_table = 'tbl_activity_member'
