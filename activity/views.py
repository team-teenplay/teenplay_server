import math

from django.db import transaction
from django.db.models import F
from django.shortcuts import render, redirect
from django.utils import timezone
from django.views import View
from rest_framework.response import Response
from rest_framework.views import APIView

from activity.models import Activity, ActivityImage, ActivityMember, ActivityReply, ActivityLike
from alarm.models import Alarm
from club.models import Club, ClubMember, ClubNotice
from festival.models import Festival
from member.models import Member, MemberProfile
from pay.models import Pay
from teenplay_server.category import Category
import re

def make_datetime(date, time):
    date = date.split("/")
    date = "-".join([date[2], date[0], date[1]])
    time = time + ":00"
    datetime = timezone.datetime.strptime(date + " " + time, '%Y-%m-%d %H:%M:%S')
    return datetime


class ActivityCreateWebView(View):
    def get(self, request):
        club_id = request.GET['club_id']
        festival_id = request.GET.get('festival_id')

        club = Club.enabled_objects.filter(id=club_id).first()
        categories = Category.objects.filter(status=True)
        context = {
            'club': club,
            'categories': categories,
            'festival_id': festival_id
        }
        return render(request, 'activity/web/activity-new-web.html', context=context)

    @transaction.atomic
    def post(self, request):
        # 우선 받아온 데이터를 정리합니다.
        data = request.POST
        club = Club.enabled_objects.get(id=data.get('club-id'))
        activity_content = data.get('activity-content')
        recruit_start = make_datetime(data.get('recruit-start-date'), data.get('recruit-start-time'))
        recruit_end = make_datetime(data.get('recruit-end-date'), data.get('recruit-end-time'))
        category = Category.objects.get(id=data.get('category'))
        thumbnail = request.FILES.get('thumbnail-path')
        banner = request.FILES.get('banner-path')
        activity_start = make_datetime(data.get('activity-start-date'), data.get('activity-start-time'))
        activity_end = make_datetime(data.get('activity-end-date'), data.get('activity-end-time'))
        festival_id = data.get('festival-id')
        festival = None
        if festival_id is not None:
            festival = Festival.objects.get(id=festival_id)
        pay_id = data.get('pay-id')
        pay = Pay.objects.filter(status=True, id=pay_id).first()

        data = {
            'club': club,
            'activity_title': data.get('activity-title'),
            'activity_content': activity_content,
            'recruit_start': recruit_start,
            'recruit_end': recruit_end,
            'category': category,
            'activity_intro': data.get('activity-intro'),
            'activity_address_location': data.get('activity-address-location'),
            'activity_address_detail': data.get('activity-address-detail'),
            'thumbnail_path': thumbnail,
            'banner_path': banner,
            'activity_start': activity_start,
            'activity_end': activity_end,
            'festival': festival,
            'pay': pay,
        }

        # 정리한 데이터로 activity 정보를 insert한 후 객체를 저장
        activity = Activity.objects.create(**data)

        # 저장한 activity 객체를 활용하여 summernote에 첨부한 이미지들을 tbl_activity_image에 저장
        summernote_images = request.FILES.getlist('files')
        saved_image_paths = []
        for summernote_image in summernote_images:
            image_data = {
                'image_path': summernote_image,
                'activity': activity
            }
            activity_image = ActivityImage.objects.create(**image_data)
            saved_image_paths.append(activity_image.image_path)

        # 이제 만들어놓은 activity에 접근하여 activity_content 속 img태그의 src를 수정
        activity = Activity.objects.get(id=activity.id)
        content = activity.activity_content
        pattern = r'src=\\"data:image\/[^;]+;base64,([^"]+)"'
        for image_path in saved_image_paths:
            replacement = f'src=\"/upload/{image_path}\"'
            content = re.sub(pattern, replacement, content, count=1)
        activity.activity_content = content
        activity.updated_date = timezone.now()
        activity.save(update_fields=['activity_content', 'updated_date'])

        # 모임 구성원 중 알림을 켜놓은 사람들을 대상으로 알림 전송
        alarmed_member_ids = ClubMember.objects.filter(status=True, club_id=club.id, alarm_status=1).values('member_id')
        for alarmed_member_id in alarmed_member_ids:
            id = alarmed_member_id.get('member_id')
            member = Member.enabled_objects.filter(id=id)
            if not member.exists():
                continue
            member = member.first()
            data = {
                'target_id': activity.id,
                'alarm_type': 6,
                'sender': Member(**request.session.get('member')),
                'receiver': member,
            }
            Alarm.objects.create(**data)

        return redirect(activity.get_absolute_url())


class ActivityDetailWebView(View):
    def get(self, request):
        activity_id = request.GET['id']
        activity = Activity.objects.filter(id=activity_id).first()
        category = activity.category
        club = activity.club
        member_id = request.session['member']['id']
        activity_member_count = ActivityMember.enabled_objects.filter(activity_id=activity_id).count()
        activity_recruit_check = activity.recruit_end >= timezone.now() >= activity.recruit_start
        activity_replies = list(ActivityReply.enabled_objects.filter(activity_id=activity_id))
        # 댓글 작성자 프사
        for reply in activity_replies:
            member_profile = MemberProfile.enabled_objects.filter(member_id=reply.member_id).first()
            reply.member_profile = member_profile

        club_notices = list(ClubNotice.objects.filter(status=True, club_id=club.id).order_by('-id'))
        # 추천 활동
        recommended_activities = list(Activity.enabled_objects.exclude(id=activity_id)[0:4])

        # 각 추천활동별 참가자 수 및 관심 여부
        for recommended_activity in recommended_activities:
            member_count = ActivityMember.enabled_objects.filter(activity_id=recommended_activity.id).count()
            recommended_activity.member_count = member_count
            is_liked = ActivityLike.enabled_objects.filter(activity_id=recommended_activity, member_id=member_id).exists()
            recommended_activity.is_liked = is_liked
        # 관심 활동 여부
        is_like = ActivityLike.enabled_objects.filter(activity_id=activity_id, member_id=member_id).exists()

        context = {
            'activity': activity,
            'category': category,
            'club': club,
            'activity_member_count': activity_member_count,
            'activity_recruit_check': activity_recruit_check,
            'activity_replies': activity_replies,
            'club_notices': club_notices,
            'recommended_activities': recommended_activities,
            'is_like': is_like,
        }

        return render(request, 'activity/web/activity-detail-web.html', context)


class ActivityLikeAPI(APIView):
    def get(self, request):
        activity_id = request.GET['id']
        is_create = request.GET['is-create']
        member_id = request.session['member']['id']
        if is_create == "true":
            activity_like, created = ActivityLike.objects.get_or_create(activity_id=activity_id, member_id=member_id)
            if not created:
                activity_like.status = 1
                activity_like.updated_date = timezone.now()
                activity_like.save(update_fields=['status', 'updated_date'])
            return Response("added")

        activity_like = ActivityLike.objects.filter(activity_id=activity_id, member_id=member_id).first()
        activity_like.status = 0
        activity_like.updated_date = timezone.now()
        activity_like.save(update_fields=['status', 'updated_date'])
        return Response("deleted")


class ActivityReplyListAPI(APIView):
    def get(self, request):
        page = request.GET.get('page', 1)
        activity_id = request.GET.get('activity-id')

        row_count = 3
        offset = (page - 1) * row_count
        limit = page * row_count

        replies = ActivityReply.enabled_objects.filter(activity_id=activity_id) \
            .annotate(member_nickname=F('member__member_nickname'), \
                      member_path=F('member__member_profile__profile_path'))\
            .values('reply_content', 'id', 'member_nickname', 'created_date', 'member_id')

        return Response(replies[offset:limit])






