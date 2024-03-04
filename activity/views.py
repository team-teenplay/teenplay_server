from django.shortcuts import render, redirect
from django.views import View

from club.models import Club
from member.models import Member


class ActivityCreateView(View):
    def get(self, request):
        member = request.session.get('member')
        club_id = request.GET['club_id']
        club = Club.objects.filter(id=club_id).values('id', 'club_name')
        context = {
            'member': member,
            'club': list(club)[0]
        }
        return render(request, 'activity/web/activity-new-web.html', context=context)

    def post(self, request):
        data = request.POST
        data = {
            'club': '',
            'activity_title': '',
            'activity_content': '',
            'recruit_start': '',
            'recruit_end': '',
            'category': '',
            'activity_intro': '',
            'activity_address_location': '',
            'activity_address_detail': '',
            'thumbnail_path': '',
            'banner_path': '',
            'activity_start': '',
            'activity_end': '',
            'festival': '',
            'pay': '',
        }