import math
import datetime

from django.db import models
from member.models import Member
from teenplay_server.models import Category, Like
from teenplay_server.period import Period
from wishlist.managers import WishlistManager


class Wishlist(Period):
    member = models.ForeignKey(Member, null=False, blank=False, on_delete=models.PROTECT)
    # 0: 비공개, 1: 공개
    is_private = models.BooleanField(default=1, null=False, blank=False)
    wishlist_content = models.TextField(null=False, blank=False)
    category = models.ForeignKey(Category, null=False, blank=False, on_delete=models.PROTECT)
    # 0: 삭제, 1: 게시중
    status = models.BooleanField(default=1, null=False, blank=False)

    objects = models.Manager()
    enabled_objects = WishlistManager()

    class Meta:
        db_table = 'tbl_wishlist'

    def change_date_format(self):
        now = datetime.datetime.now()
        create_date = self.created_date
        gap = math.floor((now - create_date).seconds / 60)

        if gap < 1:
            return "방금 전"

        if gap < 60:
            return f"{gap}분 전"

        gap = math.floor(gap / 60)

        if gap < 24:
            return f"{gap}시간 전"

        gap = math.floor(gap / 24)

        if gap < 31:
            return f"{gap}일 전"

        gap = math.floor(gap / 31)

        if gap < 12:
            return "${gap}개월 전"

        gap = math.floor(gap / 12)
        return f"{gap}년 전"


class WishListLike(Like):
    wishlist = models.ForeignKey(Wishlist, null=False, blank=False, on_delete=models.PROTECT)
    # 0: 삭제, 1: 좋아요

    class Meta:
        db_table = 'tbl_wishlist_like'


class WishlistReply(Period):
    wishlist = models.ForeignKey(Wishlist, null=False, blank=False, on_delete=models.PROTECT)
    member = models.ForeignKey(Member, null=False, blank=False, on_delete=models.PROTECT)
    reply_content = models.TextField(null=False, blank=False)
    # 0: 삭제, 1: 게시중
    status = models.BooleanField(default=1, null=False, blank=False)

    objects = models.Manager()
    enabled_objects = WishlistManager()

    class Meta:
        db_table = 'tbl_wishlist_reply'


class WishlistTag(Period):
    tag_name = models.TextField(null=False, blank=False)
    wishlist = models.ForeignKey(Wishlist, null=False, blank=False, on_delete=models.PROTECT)
    # 0: 삭제
    status = models.BooleanField(default=1, null=False, blank=False)

    objects = models.Manager()
    enabled_objects = WishlistManager()

    class Meta:
        db_table = 'tbl_wishlist_tag'
