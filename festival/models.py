from django.db import models

from teenplay_server.period import Period


class Festival(Period):
    festival_title = models.TextField(null=False, blank=False)
    festival_content = models.TextField(null=False, blank=False)
    festival_price = models.FloatField()
    festival_address = models.TextField()
    festival_address_detail = models.TextField()
    festival_location = models.TextField()
    festival_start = models.DateField()
    festival_end = models.DateField()
    host_info = models.TextField()
    host_phone = models.TextField()
    provider_info = models.TextField()
    provider_url = models.TextField()
    thumbnail_path = models.ImageField(upload_to='festival/%Y/%m/%d')
    # 0: 삭제, 1: 게시중
    status = models.BooleanField(default=1, null=False, blank=False)

    class Meta:
        db_table = 'tbl_festival'
