from django.shortcuts import render, redirect
from django.views import View
from rest_framework.response import Response
from rest_framework.views import APIView
from random import randint

from club.models import Club
from member.models import Member
from teenplay.models import TeenPlay
from teenplay.serializers import TeenplaySerializer


class TeenplayMainListWebView(View):
    def get(self, request):
        return render(request, 'teenplay/web/teenplay-play-web.html')


class TeenplayMainListAPIView(APIView):
    # 해당 url 로 호출을 받으면
    def get(self, reqeust):
        teenplay = TeenPlay.objects.all().count()
        radiant_teenplay = randint(1, teenplay)
        teenplay_number = radiant_teenplay

        teenplay = TeenPlay.objects.get(id=teenplay_number).values('video_path', 'club__club_name', 'club_club_intro', 'club__club_profile_path')
        print(teenplay)
        teenplay = TeenplaySerializer(teenplay).data
        return Response(teenplay)


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


