from django.db import models

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


    class Meta:
        db_table = 'tbl_member'

class MemberProfile(Period):
    # 프사
    profile_path = models.ImageField(null=False, blank=False, upload_to='member/%Y/%m/%d')
    # False: 프사 없음, True: 프사 있음
    status = models.BooleanField(default=True)

    class Meta:
        db_table = 'tbl_member_profile'
