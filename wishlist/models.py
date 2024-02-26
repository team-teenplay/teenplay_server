from django.db import models

from category.models import Category
from member.models import Member
from teenplay_server.models import Period


class Wishlist(Period):
    member = models.ForeignKey(Member, null=False, blank=False, on_delete=models.PROTECT)
    # 0: 비공개, 1: 공개
    is_private = models.BooleanField(default=1, null=False, blank=False)
    wishlist_content = models.TextField(null=False, blank=False)
    category = models.ForeignKey(Category, null=False, blank=False, on_delete=models.PROTECT)
    # 0: 삭제, 1: 게시중
    status = models.BooleanField(default=1, null=False, blank=False)

    class Meta:
        db_table = 'tbl_wishlist'
