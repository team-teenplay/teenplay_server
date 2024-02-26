from django.db import models

from club.models import Club
from member.models import Member
from teenplay_server.models import Period


class ClubMember(Period):
    STATUS = {
        (-1, '가입대기'),
        (0, '탈퇴'),
        (1, '가입중')
    }

    club = models.ForeignKey(Club, null=False, blank=False, on_delete=models.PROTECT)
    member = models.ForeignKey(Member, null=False, blank=False, on_delete=models.PROTECT)
    # 0: 알림끄기, 1: 알림켜기
    alarm_status = models.BooleanField(default=1, null=False, blank=False)
    # -1: 가입대기, 0: 탈퇴, 1: 가입중
    status = models.SmallIntegerField(choices=STATUS, default=-1, null=False, blank=False)

    class Meta:
        db_table = 'tbl_club_member'
