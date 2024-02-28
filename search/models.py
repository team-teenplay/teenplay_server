from django.db import models

from member.models import Member
from teenplay_server.models import Period


# class Search(Period):
#     pass


class RecentSearch(Period):
    member = models.ForeignKey(Member, null=False, blank=False, on_delete=models.PROTECT)
    keyword = models.TextField(null=False, blank=False)

    class Meta:
        db_table = 'tbl_recent_search'


class Like(Period):
    member = models.ForeignKey(Member, null=False, blank=False, on_delete=models.PROTECT)
    status = models.BooleanField(default=1, null=False, blank=False)

    class Meta:
        # 추상 모델을 설정(migrate 시 해당 모델의 테이블 생성X)
        abstract = True
