from django.db import models

from member.models import Member
from teenplay_server.models import Category
from teenplay_server.period import Period


class Club(Period):
    club_name = models.TextField(null=False, blank=False)
    club_intro = models.TextField(null=False, blank=False)
    club_info = models.TextField()
    member = models.ForeignKey(Member, null=False, blank=False, on_delete=models.PROTECT)
    club_profile_path = models.ImageField(upload_to='club/%Y/%m/%d')
    club_banner_path = models.ImageField(upload_to='club/%Y/%m/%d')
    # 0: 삭제
    status = models.BooleanField(default=1, null=False)

    class Meta:
        db_table = 'tbl_club'

    def get_absolute_url(self):
        return f'/club/detail/?id={self.id}'


class ClubMember(Period):
    CLUB_MEMBER_STATUS = [
        (-1, '가입대기'),
        (0, '탈퇴'),
        (1, '가입중')
    ]

    club = models.ForeignKey(Club, null=False, blank=False, on_delete=models.PROTECT)
    member = models.ForeignKey(Member, null=False, blank=False, on_delete=models.PROTECT)
    # 0: 알림끄기, 1: 알림켜기
    alarm_status = models.BooleanField(default=1, null=False, blank=False)
    # -1: 가입대기, 0: 탈퇴, 1: 가입중
    status = models.SmallIntegerField(choices=CLUB_MEMBER_STATUS, default=-1, null=False, blank=False)

    class Meta:
        db_table = 'tbl_club_member'


class ClubNotice(Period):
    club = models.ForeignKey(Club, null=False, blank=False, on_delete=models.PROTECT)
    notice_title = models.TextField(null=False, blank=False)
    notice_content = models.TextField(null=False, blank=False)
    # 0: 삭제, 1: 게시중
    status = models.BooleanField(default=1, null=False, blank=False)

    class Meta:
        db_table = 'tbl_club_notice'


class ClubPost(Period):
    club = models.ForeignKey(Club, null=False, blank=False, on_delete=models.PROTECT)
    post_title = models.TextField(null=False, blank=False)
    post_content = models.TextField(null=False, blank=False)
    category = models.ForeignKey(Category, null=False, blank=False, on_delete=models.PROTECT)
    image_path = models.ImageField(upload_to='club_post/%Y/%m/%d')
    view_count = models.IntegerField(default=0)
    # 0: 삭제, 1: 게시중
    status = models.BooleanField(default=1, null=False, blank=False)

    class Meta:
        db_table = 'tbl_club_post'


class ClubPostReply(Period):
    club_post = models.ForeignKey(ClubPost, null=False, blank=False, on_delete=models.PROTECT)
    member = models.ForeignKey(Member, null=False, blank=False, on_delete=models.PROTECT)
    reply_content = models.TextField(null=False, blank=False)
    # 0: 삭제, 1: 게시중
    status = models.BooleanField(default=1, null=False, blank=False)

    class Meta:
        db_table = 'tbl_club_post_reply'