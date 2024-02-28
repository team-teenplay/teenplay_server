from django.db import models

from teenplay_server.models import Period


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
    # 프사
    profile_path = models.ImageField(upload_to='member/%Y/%m/%d')

    class Meta:
        db_table = 'tbl_member'

