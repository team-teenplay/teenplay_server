from django.db import models

from club.models import Club
from member.models import Member
from search.models import Like
from teenplay_server.models import Period


class TeenPlay(Period):
    teenplay_title = models.TextField(null=False, blank=False)
    club = models.ForeignKey(Club, null=False, blank=False, on_delete=models.PROTECT)
    video_path = models.ImageField(upload_to='teenplay/%Y/%m/%d')
    thumbnail_path = models.ImageField(upload_to='teenplay/%Y/%m/%d')
    # 0: 삭제, 1: 게시중
    status = models.BooleanField(default=1, null=False, blank=False)

    class Meta:
        db_table = 'tbl_teenplay'


class TeenPlayLike(Like):
    teenplay = models.ForeignKey(TeenPlay, null=False, blank=False, on_delete=models.PROTECT)
    # 0: 삭제, 1: 좋아요

    class Meta:
        db_table = 'tbl_teenplay_like'


