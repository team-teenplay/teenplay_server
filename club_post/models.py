from django.db import models

from category.models import Category
from club.models import Club
from teenplay_server.models import Period


class ClubPost(Period):
    club = models.ForeignKey(Club, null=False, blank=False, on_delete=models.PROTECT)
    post_title = models.TextField(null=False, blank=False)
    post_content = models.TextField(null=False, blank=False)
    category = models.ForeignKey(Category, null=False, blank=False, on_delete=models.PROTECT)
    image_stored_name = models.TextField()
    image_path = models.TextField()
    view_count = models.IntegerField(default=0)
    # 0: 삭제, 1: 게시중
    status = models.BooleanField(default=1, null=False, blank=False)

    class Meta:
        db_table = 'tbl_club_post'
