from django.shortcuts import render, redirect
from django.views import View
from rest_framework.response import Response
from rest_framework.views import APIView
from random import randint

from club.models import Club
from member.models import Member
from teenplay.models import TeenPlayLike, TeenPlay
from teenplay.serializers import TeenplaySerializer


# 메인페이지에서 틴플레이 선택 시 random으로 선택 후 틴플레이 보여주는 작업,
# 최초 10개를 가져와서 해당 리스트에 맞게 뿌려주고 싶은데 방법이 있을까....
class TeenplayMainListView(View):
    def get(self, request):
        print(1)
        return render(request, 'teenplay/web/teenplay-play-web.html')

class TeenplayMainListAPIView(APIView):
    def get(self, reqeust):
        teenplay = TeenPlay.objects.all().count()
        radiant_teenplay = randint(1, teenplay)
        teenplay_number = radiant_teenplay

        teenplay = TeenPlay.objects.get(pk=teenplay_number)
        teenplay = TeenplaySerializer(teenplay).data
        tendata= teenplay['video_path']
        return Response(teenplay)



class TeenPlayRandomList(View):
    pass

# class TeenplayMainListView(View):
#     def get(self, request):
#         data = request.GET
#         club_info = {
#             'number': data['random'],
#             'club_name': data['club_name'],
#             'club_path': data['club_path'],
#             'club_title': data['club_title']
#         }
#
#         return render(request, 'teenplay/web/teenplay-play-web.html', club_info)
#
# class TeenPlayRandomList(View):
#     def get(self, request):
#         # 호출 시 틴플래이 랜덤으로 가져오기
#         teenplay = TeenPlay.objects.all().count()
#         radiant_teenplay = randint(0, teenplay)
#         random_number = str(radiant_teenplay)
#
#         # 랜덤으로 가져온 틴플레이의 클럽 정보 가져오기
#         teenplay_club_id = TeenPlay.objects.get(pk=radiant_teenplay).club_id
#         teenplay_club_name= Club.objects.get(id=teenplay_club_id).club_name
#         teenplay_club_path =Club.objects.get(id=teenplay_club_id).club_profile_path
#         teenplay_club_title = Club.objects.get(id=teenplay_club_id).club_intro
#
#         return redirect(f'/teenplay/all/?random={random_number}&club_name={teenplay_club_name}&club_path={teenplay_club_path}&club_title={teenplay_club_title}')


############################################################################################################################################

# 모임에서 틴플레이 선택했을 때 가져오는 것을 사용하는 것으로 예상
# 틴플레이 좋아요 관련 클래스 생성
# 데이터를 가져와야 하기 때문에 apiview로 해야한다
# 만약 해당 맴벅 like테이블에 존재하고 해당 teenplay-id 값을 누른게 있으면 status =1이면 0으로 0이면 1로
# id 값은 세션의 값을 가져와서 넣어줘야한다
# 모두 비동기 함수를 사용해야한다.
# member teenplay , status
class TeenplayListView(View):
    def get(self, request):
        return render(request, 'teenplay/web/teenplay-play-web.html')


class TeenplayLikeAPIView(APIView):
    pass

class TeenplayLikeView(View):
    def get(self, request):
        data = request.GET
        email_data ={
            data['member-email']
        }
        member = Member.objects.get(**data).values('id')
        teenplaylike = TeenPlayLike.objects.get(member_id = member)



