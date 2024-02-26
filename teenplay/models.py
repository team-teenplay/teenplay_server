from django.db import models

from club.models import Club
from teenplay_server.models import Period


class TeenPlay(Period):
    teenplay_title = models.TextField(null=False, blank=False)
    club = models.ForeignKey(Club, null=False, blank=False, on_delete=models.PROTECT)
    video_stored_name = models.TextField(null=False, blank=False)
    video_path = models.TextField(null=False, blank=False)
    thumbnail_stored_name = models.TextField(null=False, blank=False)
    thumbnail_path = models.TextField(null=False, blank=False)
    # 0: 삭제, 1: 게시중
    status = models.BooleanField(default=1, null=False, blank=False)

    class Meta:
        db_table = 'tbl_teenplay'
