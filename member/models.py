from django.db import models

from member.managers import MemberManager
from teenplay_server.period import Period


class Member(Period):
    GENDER_STATUS = [
        (0, '선택안함'),
        (1, '남성'),
        (2, '여성')
    ]

    MEMBER_STATUS = [
        (-1, '정지'),
        (0, '탈퇴'),
        (1, '활동중')
    ]

    member_email = models.TextField(blank=False, null=False)
    member_nickname = models.TextField(blank=False, null=False)
    member_phone = models.TextField()
    member_address = models.TextField()
    # 0: 선택안함, 1: 남성, 2: 여성
    member_gender = models.SmallIntegerField(choices=GENDER_STATUS, default=0)
    member_birth = models.IntegerField
    # 0: 미동의, 1: 동의
    member_marketing_agree = models.BooleanField(default=0)
    # 0: 미동의, 1: 동의
    member_privacy_agree = models.BooleanField(default=0)
    # -1: 정지, 0: 탈퇴, 1: 활동중
    status = models.SmallIntegerField(choices=MEMBER_STATUS, default=1)
    # google, kakao, naver
    member_type = models.CharField(max_length=10, null=False, blank=False)

    objects = models.Manager()
    enabled_objects = MemberManager()

    class Meta:
        db_table = 'tbl_member'


class MemberProfile(Period):
    # 프사
    profile_path = models.ImageField(null=False, blank=False, upload_to='member/%Y/%m/%d')
    # 0: 프사 없음, 1: 프사 있음
    status = models.BooleanField(null=False, blank=False, default=1)

    objects = models.Manager()
    enabled_objects = MemberManager()

    class Meta:
        db_table = 'tbl_member_profile'

class AdminAccount(Period):
    admin_id = models.TextField(blank=False, null=False)
    admin_password = models.TextField(blank=False, null=False)
    admin_name = models.TextField(blank=False, null=False)

    class Meta:
        db_table: 'tbl_admin_account'
