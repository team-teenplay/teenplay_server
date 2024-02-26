from django.db import models

from teenplay_server.models import Period
from wishlist.models import Wishlist


class WishlistTag(Period):
    tag_name = models.TextField(null=False, blank=False)
    wishlist = models.ForeignKey(Wishlist, null=False, blank=False, on_delete=models.PROTECT)
    # 0: 삭제
    status = models.BooleanField(default=1, null=False, blank=False)

    class Meta:
        db_table = 'tbl_wishlist_tag'
