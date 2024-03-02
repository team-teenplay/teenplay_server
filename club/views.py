from django.shortcuts import render, redirect
from django.views import View

from club.models import Club
from member.models import Member


class ClubIntroView(View):
    def get(self, request):
        return render(request, 'club/web/club-intro-web.html')


class ClubCreateView(View):
    def get(self, request):
        return render(request, 'club/web/club-create-web.html')

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
        club = Club.objects.get(id=request.GET['id'])

        context = {
            'club': club,
            'club_activities': list(club.activity_set.all()),
            'club_notices': list(club.clubnotice_set.all()),
            'club_teenplays': list(club.teenplay_set.all())
        }

        return render(request, 'club/web/club-detail-web.html', context)


class ClubPrPostsView(View):
    def get(self, request):
        return render(request, 'club/web/club-pr-posts-web.html')
