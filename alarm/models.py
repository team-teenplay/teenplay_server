from django.db import models

from member.models import Member
from teenplay_server.models import Period


class Alarm(Period):
    target_id = models.IntegerField(null=False, blank=False)
    # 0: 읽음, 1: 안읽음
    is_read = models.BooleanField(null=False, blank=False, default=0)
    # 0: 삭제
    status = models.BooleanField(default=1, null=False, blank=False)
    #     1. 모임 홍보글 댓글 알림
    #     2. 활동 상세글 댓글 알림
    #     3. 위시리스트 댓글 알림
    #     4. 쪽지 알림
    #     5. 틴친 신청 알림
    #     6. 모임 활동 개설 알림
    #     7. 모임 공지사항 알림
    #     8. 모임 틴플레이 알림
    #     9. 모임 가입 관련 알림
    #     10. 활동 참가신청 관련 알림
    alarm_type = models.IntegerField(null=False, blank=False)
    sender = models.ForeignKey(Member, related_name='sender', null=False, blank=False, on_delete=models.PROTECT)
    receiver = models.ForeignKey(Member, related_name='receiver', null=False, blank=False, on_delete=models.PROTECT)

    class Meta:
        db_table = 'tbl_alarm'
