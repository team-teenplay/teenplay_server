from django.db.models import Count, F
from django.test import TestCase

from club.models import Club, ClubMember
from member.models import Member


class ClubTestCase(TestCase):
    club_id = 4
    columns = [
        'id',
        'club_name',
        'club_intro',
        'club_info',
        'owner_id',
        'owner_name',
        'owner_email',
        'owner_phone',
        'club_profile_path',
        'club_banner_path',
        'club_member_count',
        'club_activity_count'
    ]

    # club = Club.objects.filter(id=club_id) \
    #     .annotate(
    #     owner_id=F('member__id'),
    #     owner_name=F('member__member_nickname'),
    #     owner_email=F('member__member_email'),
    #     owner_phone=F('member__member_phone'),
    #     club_member_count=Count('clubmember'),
    #     club_activity_count=Count('activity')).values(*columns)

    member = Member.objects.get(id=8)
    # club_member = ClubMember.objects.filter(member=member)
    # join_status = [
    #     '가입대기',
    #     '탈퇴',
    #     '가입중'
    # ]
    #
    # if club[0]['owner_id'] != member.id:
    #     if not club_member.exists() or not club_member.first().status:
    #         pass

    # print(club_member.first().status)