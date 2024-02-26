from django.db import models

from activity.models import Activity
from teenplay_server.models import Period


class ActivityImage(Period):
    activity = models.ForeignKey(Activity, null=False, blank=False, on_delete=models.PROTECT)
    image_stored_name = models.TextField()
    image_path = models.TextField()
    # 0: 삭제
    status = models.BooleanField(default=1, null=False, blank=False)

    class Meta:
        db_table = 'tbl_activity_image'
