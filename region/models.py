from django.db import models

from teenplay_server.models import Period


class Region(Period):
    region = models.TextField(null=False, blank=False)
    # 0: 삭제
    status = models.BooleanField(null=False, blank=False, default=1)

    class Meta:
        db_table = 'tbl_region'
