from django.db.models import F
from django.test import TestCase

from activity.models import Activity
from club.models import ClubPost
from member.models import AdminAccount
from notice.models import Notice
from wishlist.models import Wishlist


class AdminTests(TestCase):
    columns = [
        'member_name',
        'title',
        'created_date',
        'reply',
        'member_status'
    ]

    activities = Activity.objects \
        .annotate(
        member_name=F('activityreply__member__member_nickname'),
        title=F('activityreply__activity__activity_title'),
        created=F('activityreply__created_date'),
        reply=F('activityreply__reply_content'),
        member_status=F('activityreply__member__status')
    ) \
        .values(*columns)

    wishes = Wishlist.objects \
        .annotate(
        member_name=F('wishlistreply__member__member_nickname'),
        title=F('wishlistreply__wishlist__wishlist_content'),
        created=F('wishlistreply__created_date'),
        reply=F('wishlistreply__reply_content'),
        member_status=F('wishlistreply__member__status')
    ) \
        .values(*columns)

    club_posts = ClubPost.objects \
        .annotate(
        member_name=F('clubpostreply__member__member_nickname'),
        title=F('clubpostreply__club_post__post_title'),
        created=F('clubpostreply__created_date'),
        reply=F('clubpostreply__reply_content'),
        member_status=F('clubpostreply__member__status')
    ) \
        .values(*columns)

    comment = activities.union(wishes).union(club_posts).order_by('-created_date')
    print(len(comment))
    # results = list(members.values('id', 'member_nickname', 'status') \
    #     .annotate(activity_title=F('activityreply__activity__activity_title'),
    #               activity_reply=F('activityreply__reply_content'),
    #               activity_reply_created=F('activityreply__created_date')).filter(
    #     activity_title__isnull=False))
    #
    # wishlists = members.values('id', 'member_nickname', 'status') \
    #     .annotate(wishlist_title=F('wishlistreply__wishlist__wishlist_content'),
    #               wishlist_reply=F('wishlistreply__reply_content'),
    #               wishlist_reply_created=F('wishlistreply__created_date')).filter(wishlist_title__isnull=False)
    #
    # club_posts = members.values('id', 'member_nickname', 'status') \
    #     .annotate(club_post_title=F('clubpostreply__club_post__post_title'),
    #               club_post_reply=F('clubpostreply__reply_content'),
    #               club_post_reply_created=F('clubpostreply__created_date')).filter(club_post_title__isnull=False)
    # data = {
    #     'admin_id': 'teenplay',
    #     'admin_password': '1234',
    #     'admin_name': '관리자',
    # }
    #
    # AdminAccount.objects.create(**data)

    # data = {
    #     'notice_title': '자주묻는질문 테스트 제목 10',
    #     'notice_content': '자주묻는질문 테스트 내용 10',
    #     'notice_type': 1
    # }
    #
    # Notice.objects.create(**data)
