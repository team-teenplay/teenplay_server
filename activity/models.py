from django.db import models

from category.models import Category
from club.models import Club
from festival.models import Festival
from pay.models import Pay
from teenplay_server.models import Period


class Activity(Period):
    club = models.ForeignKey(Club, null=False, blank=False, on_delete=models.PROTECT)
    activity_title = models.TextField(null=False, blank=False)
    activity_content = models.TextField(null=False, blank=False)
    recruit_start = models.DateTimeField(null=False, blank=False)
    recruit_end = models.DateTimeField(null=False, blank=False)
    category = models.ForeignKey(Category, null=False, blank=False, on_delete=models.PROTECT)
    activity_intro = models.TextField()
    activity_address_location = models.TextField()
    activity_address_detail = models.TextField()
    thumbnail_stored_name = models.TextField()
    thumbnail_path = models.TextField()
    activity_start = models.DateTimeField(null=False, blank=False)
    activity_end = models.DateTimeField(null=False, blank=False)
    festival = models.ForeignKey(Festival, null=False, blank=False, on_delete=models.PROTECT)
    pay = models.ForeignKey(Pay, null=False, blank=False, on_delete=models.PROTECT)
    # 0: 삭제, 1: 활동중
    status = models.BooleanField(default=1, null=False, blank=False)

    class Meta:
        db_table = 'tbl_activity'
