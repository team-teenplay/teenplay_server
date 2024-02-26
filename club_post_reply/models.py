from django.db import models

from club_post.models import ClubPost
from member.models import Member
from teenplay_server.models import Period


class ClubPostReply(Period):
    club_post = models.ForeignKey(ClubPost, null=False, blank=False, on_delete=models.PROTECT)
    member = models.ForeignKey(Member, null=False, blank=False, on_delete=models.PROTECT)
    reply_content = models.TextField(null=False, blank=False)
    # 0: 삭제, 1: 게시중
    status = models.BooleanField(default=1, null=False, blank=False)

    class Meta:
        db_table = 'tbl_club_post_reply'
