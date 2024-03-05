from django.db.models import Count, Q
from django.shortcuts import render, redirect
from django.views import View
from rest_framework.response import Response
from rest_framework.views import APIView
from random import randint

from club.models import Club
from member.models import Member
from teenplay.models import TeenPlay, TeenPlayLike
from teenplay.serializers import TeenplaySerializer


class TeenplayMainListWebView(View):
    def get(self, request):
        if 'member' in request.session and 'id' in request.session['member']:
            id = request.session['member']['id']
        else:
            if 'member' in request.session:
                id = request.session['member'].get('id', None)
            else:
                id = None

        teenplay_count = TeenPlay.objects.all().count()
        teenplay_list = []
        for number in range(5):
            like_count = {}

            radiant_teenplay = randint(1, teenplay_count)
            teenplay = TeenPlay.objects.filter(id=radiant_teenplay, status=1).annotate(likes=Count('teenplaylike__status',filter=Q(teenplaylike__status=1))).values('video_path', 'club__club_name', 'club__club_intro','club__club_profile_path','club_id','likes')
            member_like = TeenPlayLike.objects.filter(member_id=id, teenplay_id=radiant_teenplay, status=1).exists()
            like_count['like_check']= member_like
            teenplay_like={**like_count, **teenplay[0]}
            teenplay_list.append(teenplay_like)

        context = teenplay_list
        return render(request, 'teenplay/web/teenplay-play-web.html', {'context': context})



class TeenplayMainListAPIView(APIView):
    # 해당 url 로 호출을 받으면
    def get(self, request, slideNumber):
        teenplay_count = TeenPlay.objects.all().count()

        if 'member' in request.session and 'id' in request.session['member']:
            id = request.session['member']['id']
        else:
            if 'member' in request.session:
                id = request.session['member'].get('id', None)
            else:
                id = None

        teenplay_list = []
        for number in range(3):
            like_count = {}

            radiant_teenplay = randint(1, teenplay_count)
            teenplay = TeenPlay.objects.filter(id=radiant_teenplay, status=1).annotate(
                likes=Count('teenplaylike__status', filter=Q(teenplaylike__status=1))).values('video_path','club__club_name','club__club_intro','club__club_profile_path','club_id', 'likes')
            member_like = TeenPlayLike.objects.filter(member_id=id, teenplay_id=radiant_teenplay, status=1).exists()
            like_count['like_check'] = member_like
            teenplay_like = {**like_count, **teenplay[0]}
            teenplay_list.append(teenplay_like)

        addContext = teenplay_list
        return Response(addContext)



############################################################################################################################################

# 모임에서 틴플레이 선택했을 때 가져오는 것을 사용하는 것으로 예상
# 틴플레이 좋아요 관련 클래스 생성
# 데이터를 가져와야 하기 때문에 apiview로 해야한다
# 만약 해당 맴벅 like테이블에 존재하고 해당 teenplay-id 값을 누른게 있으면 status =1이면 0으로 0이면 1로
# id 값은 세션의 값을 가져와서 넣어줘야한다
# 모두 비동기 함수를 사용해야한다.
# member teenplay , status

#모바일######################################################################################################################################
class TeenplayMainListAppView(View):
    def get(self, request):
        return render(request, 'teenplay/web/teenplay-play-web.html')


