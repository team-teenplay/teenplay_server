from django.db import transaction, models
from django.db.models import Count, F, Q, OuterRef, Subquery, Count
from django.db.models.functions import Coalesce
from django.shortcuts import render, redirect
from django.utils import timezone
from django.views import View
from rest_framework.response import Response
from rest_framework.views import APIView

from activity.models import Activity
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

        club_activity_count = Club.objects.filter(id=club_id).values('id').annotate(club_activity_count=Count('activity')).first()
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
    def get(self, request):
        club_members = ClubMember.objects.filter(member=request.GET['member_id'], club=request.GET['club_id']).values()

        return Response(club_members)

    @transaction.atomic
    def patch(self, request):
        data = request.data
        member = Member.objects.get(id=data['member_id'])
        club = Club.objects.get(id=data['club_id'])
        club_member, created = ClubMember.objects.get_or_create(member=member, club=club)

        if created:
            return Response('create-apply')

        if club_member.status == -1:
            club_member.status = 0
            club_member.updated_date = timezone.now()
            club_member.save(update_fields=['status', 'updated_date'])
            return Response('cancel')

        if club_member.status == 0:
            club_member.status = -1
            club_member.updated_date = timezone.now()
            club_member.save(update_fields=['status', 'updated_date'])
            return Response('apply')

        if club_member.status == 1:
            club_member.status = 0
            club_member.updated_date = timezone.now()
            club_member.save(update_fields=['status', 'updated_date'])
            return Response('quit')


class ClubActivityAPI(APIView):
    def get(self, request):
        club = Club.objects.get(id=request.GET['club_id'])
        columns = [
            'id',
            'activity_title',
            'thumbnail_path',
            'activity_start',
        ]

        # finished_activities = club.activity_set.filter(activity_end__lte=timezone.now(), status=1).values(*columns)\
        #     .annotate(participant_count=Count('activitymember', filter=Q(activitymember__status=1)))\
        #     .order_by('-id')

        ongoing_activities = club.activity_set.filter(activity_end__gt=timezone.now(), status=1).values(*columns)\
            .annotate(participant_count=Count('activitymember', filter=Q(activitymember__status=1)))\

        club_activities = {
            'finished_activities': finished_activities,
            'ongoing_activities': ongoing_activities
        }

        return Response(club_activities)


class ClubFinishedActivityAPI(APIView):
    def get(self, request):
        club = Club.objects.get(id=request.GET['club_id'])
        columns = [
            'id',
            'activity_title',
            'thumbnail_path',
            'activity_start',
        ]

        finished_activities = club.activity_set.filter(activity_end__lte=timezone.now(), status=1).values(*columns) \
            .annotate(participant_count=Count('activitymember', filter=Q(activitymember__status=1))) \
            .order_by('-id')

        return Response(finished_activities)


class ClubNoticeAPI(APIView):
    def get(self, request):
        club = Club.objects.get(id=request.GET['club_id'])
        club_notices = club.clubnotice_set.filter(status=1).values().order_by('-id')

        return Response(club_notices)


class ClubPrPostsView(View):
    def get(self, request):
        return render(request, 'club/web/club-pr-posts-web.html')
