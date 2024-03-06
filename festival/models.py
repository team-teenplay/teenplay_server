from django.db import models

from festival.managers import FestivalManager
from teenplay_server.period import Period


class Festival(Period):
    festival_title = models.TextField(null=False, blank=False)
    festival_content = models.TextField(null=False, blank=False)
    festival_price = models.FloatField(null=True)
    festival_address = models.TextField(null=True)
    festival_address_detail = models.TextField(null=True)
    festival_location = models.TextField(null=True)
    festival_start = models.DateField(null=True)
    festival_end = models.DateField(null=True)
    host_info = models.TextField(null=True)
    host_phone = models.TextField(null=True)
    provider_info = models.TextField(null=True)
    provider_url = models.TextField(null=True)
    thumbnail_path = models.ImageField(upload_to='festival/%Y/%m/%d', null=False, blank=False)
    # 0: 삭제, 1: 게시중
    status = models.BooleanField(default=1, null=False, blank=False)

    object = models.Manager()
    enabled_objects = FestivalManager()

    class Meta:
        db_table = 'tbl_festival'
