from django.db import transaction, models
from django.db.models import Count, F, Q, OuterRef, Subquery, Count
from django.db.models.functions import Coalesce
from django.shortcuts import render, redirect
from django.utils import timezone
from django.views import View
from rest_framework.response import Response
from rest_framework.views import APIView

from activity.models import Activity, ActivityLike
from alarm.models import Alarm
from club.models import Club, ClubMember
from member.models import Member


class ClubIntroView(View):
    def get(self, request):
        return render(request, 'club/web/club-intro-web.html')


class ClubCreateView(View):
    def get(self, request):
        return render(request, 'club/web/club-create-web.html')

    @transaction.atomic
    def post(self, request):
        data = request.POST
        file = request.FILES

        member = Member(**request.session['member'])

        data = {
            'club_name': data['club-name'],
            'club_intro': data['club-intro'],
            'member': member,
            'club_profile_path': file['club-profile'],
            'club_banner_path': file['club-banner']
        }

        club = Club.objects.create(**data)

        return redirect(club.get_absolute_url())


class ClubDetailView(View):
    def get(self, request):
        club_id = request.GET['id']
        columns = [
            'id',
            'club_name',
            'club_intro',
            'club_info',
            'club_profile_path',
            'club_banner_path',
            'owner_id',
            'owner_name',
            'owner_email',
            'owner_phone',
        ]

        club_list = Club.objects.filter(id=club_id)\
            .annotate(
            owner_id=F('member__id'),
            owner_name=F('member__member_nickname'),
            owner_email=F('member__member_email'),
            owner_phone=F('member__member_phone')).values(*columns)\
            .annotate(club_member_count=Count('clubmember', filter=Q(clubmember__status=1)))

        club_activity_count = Club.objects.filter(id=club_id).values('id')\
            .annotate(club_activity_count=Count('activity')).first()

        club_list = list(club_list)

        club_list[0]['club_activity_count'] = club_activity_count.get('club_activity_count')

        context = {
            'club_list': club_list
        }

        return render(request, 'club/web/club-detail-web.html', context)


class ClubAPI(APIView):
    def get(self, request, club_id):
        club = Club.objects.filter(id=club_id).values().first()

        return Response(club)


class ClubMemberAPI(APIView):
    def get(self, request, member_id, club_id):
        club_members = ClubMember.objects.filter(member=member_id, club=club_id).values()

        return Response(club_members)

    @transaction.atomic
    def patch(self, request, member_id, club_id):
        # data = request.data
        member = Member.objects.get(id=member_id)
        club = Club.objects.get(id=club_id)
        club_member, created = ClubMember.objects.get_or_create(member=member, club=club)

        message = 'create-apply'
        flag = True
        alarm_type = 9

        if not created:
            if club_member.status == -1:
                club_member.status = 0
                club_member.updated_date = timezone.now()
                club_member.save(update_fields=['status', 'updated_date'])

                message = 'cancel'
                flag = False

            elif club_member.status == 0:
                club_member.status = -1
                club_member.updated_date = timezone.now()
                club_member.save(update_fields=['status', 'updated_date'])

                message = 'apply'

            elif club_member.status == 1:
                club_member.status = 0
                club_member.updated_date = timezone.now()
                club_member.save(update_fields=['status', 'updated_date'])

                message = 'quit'
                alarm_type = 10

        if flag:
            Alarm.objects.create(target_id=club_id, alarm_type=alarm_type, sender=member, receiver=club.member)

        return Response(message)


class ClubOngoingActivityAPI(APIView):
    def get(self, request, club_id):
        member = Member(**request.session['member'])
        club = Club.objects.get(id=club_id)

        ongoing_activities = list(Activity.objects.filter(club=club, activity_end__gt=timezone.now(), status=1)
                                  .values('id', 'activity_title', 'thumbnail_path', 'activity_start',)
                                  .annotate(participant_count=Count('activitymember', filter=Q(activitymember__status=1))))
        print(ongoing_activities)
        for ongoing_activity in ongoing_activities:
            ongoing_activity['is_like'] = ActivityLike.enabled_objects.filter(activity=ongoing_activity['id'], member=member).exists()

        return Response(ongoing_activities)


class ClubFinishedActivityAPI(APIView):
    def get(self, request, club_id, page):
        member = Member(**request.session['member'])

        row_count = 8
        offset = (page - 1) * row_count
        limit = page * row_count

        club = Club.objects.get(id=club_id)

        finished_activities = list(Activity.objects.filter(club=club,activity_end__lte=timezone.now(), status=1)
                                   .values('id', 'activity_title', 'thumbnail_path', 'activity_start')
                                   .annotate(participant_count=Count('activitymember', filter=Q(activitymember__status=1)))
                                   .order_by('-id'))

        for finished_activity in finished_activities:
            finished_activity['is_like'] = ActivityLike.enabled_objects.filter(activity=finished_activity['id'], member=member).exists()

        return Response(finished_activities[offset:limit])


class ClubNoticeAPI(APIView):
    def get(self, request, club_id, page):
        row_count = 4
        offset = (page - 1) * row_count
        limit = page * row_count

        club = Club.objects.get(id=club_id)

        club_notices = club.clubnotice_set.filter(status=1).values().order_by('-id')

        return Response(club_notices[offset:limit])


class ClubPrPostsView(View):
    def get(self, request):
        return render(request, 'club/web/club-pr-posts-web.html')
