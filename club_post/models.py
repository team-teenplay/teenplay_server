from django.db import models

from club.models import Club
from member.models import Member
from teenplay_server.models import Category
from teenplay_server.period import Period


class ClubPost(Period):
    club = models.ForeignKey(Club, null=False, blank=False, on_delete=models.PROTECT)
    post_title = models.TextField(null=False, blank=False)
    post_content = models.TextField(null=False, blank=False)
    category = models.ForeignKey(Category, null=False, blank=False, on_delete=models.PROTECT)
    image_path = models.ImageField(upload_to='club_post/%Y/%m/%d')
    view_count = models.IntegerField(default=0)
    # 0: 삭제, 1: 게시중
    status = models.BooleanField(default=1, null=False, blank=False)

    class Meta:
        db_table = 'tbl_club_post'


class ClubPostReply(Period):
    club_post = models.ForeignKey(ClubPost, null=False, blank=False, on_delete=models.PROTECT)
    member = models.ForeignKey(Member, null=False, blank=False, on_delete=models.PROTECT)
    reply_content = models.TextField(null=False, blank=False)
    # 0: 삭제, 1: 게시중
    status = models.BooleanField(default=1, null=False, blank=False)

    class Meta:
        db_table = 'tbl_club_post_reply'