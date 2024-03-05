from django.db import transaction
from django.shortcuts import render, redirect
from django.utils import timezone
from django.views import View
from rest_framework.views import APIView

from activity.models import Activity
from club.models import Club
from festival.models import Festival
from member.models import Member
from pay.models import Pay
from teenplay_server.category import Category


def make_datetime(date, time):
    date = date.split("/")
    date = "-".join([date[2], date[0], date[1]])
    time = time + ":00"
    datetime = timezone.datetime.strptime(date + " " + time, '%Y-%m-%d %H:%M:%S')
    return datetime


class ActivityCreateWebView(View):
    def get(self, request):
        member = request.session.get('member')
        club_id = request.GET['club_id']
        festival_id = request.GET.get('festival_id')

        club = Club.enabled_objects.filter(id=club_id).first()
        categories = Category.objects.filter(status=True)
        context = {
            'member': member,
            'club': club,
            'categories': categories,
            'festival_id': festival_id
        }
        return render(request, 'activity/web/activity-new-web.html', context=context)

    @transaction.atomic
    def post(self, request):
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

        activity = Activity.objects.create(**data)

        # 활동 상세 전까지 임시로 메인페이지로만 리다이렉트 하겠습니다.
        return redirect('/')