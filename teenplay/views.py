from django.db import transaction
from django.db.models import Count, Q, F
from django.shortcuts import render, redirect
from django.utils import timezone
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
        member, id = self.session_member_info(request)
        context = self.main_random_list(id)
        return render(request, 'teenplay/web/teenplay-play-web.html', {'context': context, 'member': member})

    def session_member_info(self, request):
        if 'member' in request.session and 'id' in request.session['member']:
            id = request.session['member']['id']
            member = request.session['member']
        else:
            if 'member' in request.session:
                id = request.session['member'].get('id', None)
            else:
                id = None
                member = None
        return member, id

    def main_random_list(self, id):
        teenplay_count = TeenPlay.objects.all().count()
        teenplay_list = []
        for number in range(5):
            like_count = {}

            radiant_teenplay = randint(1, teenplay_count)
            teenplay = TeenPlay.objects.filter(id=radiant_teenplay, status=1).annotate(
                likes=Count('teenplaylike__status', filter=Q(teenplaylike__status=1))).values('id', 'video_path',
                                                                                              'club__id',
                                                                                              'club__club_name',
                                                                                              'club__club_intro',
                                                                                              'club__club_profile_path',
                                                                                              'club_id', 'likes')
            member_like = TeenPlayLike.objects.filter(member_id=id, teenplay_id=radiant_teenplay, status=1).exists()
            like_count['like_check'] = member_like
            teenplay_like = {**like_count, **teenplay[0]}
            teenplay_list.append(teenplay_like)

        context = teenplay_list
        return context

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
                likes=Count('teenplaylike__status', filter=Q(teenplaylike__status=1))).values('id', 'video_path','club__club_name','club__club_intro','club__club_profile_path','club_id', 'likes')
            member_like = TeenPlayLike.objects.filter(member_id=id, teenplay_id=radiant_teenplay, status=1).exists()
            like_count['like_check'] = member_like
            teenplay_like = {**like_count, **teenplay[0]}
            teenplay_list.append(teenplay_like)

        context = teenplay_list
        return Response(context)

class TeenPlayLikeAPIView(APIView):
    @transaction.atomic
    def get(self, request, emptyValue, memberSessionId, displayStyle):

        data = {
            'member_id': memberSessionId,
            'teenplay_id': emptyValue
        }

        likeData, checked = TeenPlayLike.objects.get_or_create(**data)
        if checked:
            totalLikeCount = TeenPlayLike.objects.filter(status=1, teenplay_id=emptyValue).count()
        else:
            if displayStyle== 'none':
                TeenPlayLike.objects.filter(status=0, teenplay_id=emptyValue, member_id=memberSessionId).update(status=1, updated_date=timezone.now())
                totalLikeCount = TeenPlayLike.objects.filter(status=1, teenplay_id=emptyValue).count()
            else:
                TeenPlayLike.objects.filter(status=1, teenplay_id=emptyValue, member_id=memberSessionId).update(status=0, updated_date=timezone.now())
                totalLikeCount = TeenPlayLike.objects.filter(status=1, teenplay_id=emptyValue).count()

        context = {
            'teenplay_id': emptyValue, # teenplay_id
            'member_id': memberSessionId,
            'display_style': displayStyle,
            'totalLikeCount': totalLikeCount
        }

        return Response(context)



class TeenplayClubView(View):
    def get(self, request):

        # data = request.GET
        # context = {
        #     'idex_number': data['idexNumber'],
        #     'teenplay_id': data['teenplayId'],
        #     'member_id': request.session.member.member_id, # 이런 식으로 session에 있는 id 가져올것
        #     'display_style': data['displayStyle'],
        #     'totalLikeCount': data['totalLikeCount']
        # }

        # 실제로는 화면에서 request한 값을 받아와서 해야하나 테스트를 위해 아래쪽이 object로 검사한 데이터를 임시로 작성
        like_count = {}
        member_session = {}
        teenplay = TeenPlay.enable_objects.filter(id=1).annotate(club_name= F('club__club_name')).\
            annotate(club_intro=F('club__club_intro')).annotate(club_profile_path = F('club__club_profile_path')).\
            annotate(teenplay_like=Count('teenplaylike__status', filter=Q(teenplaylike__status=1))).\
            values('club_id','club_name','club_intro','club_profile_path','id', 'video_path','teenplay_like').first()
        member_like = TeenPlayLike.objects.filter(member_id=3, teenplay_id=1, status=1).exists()
        like_count['like_check'] = member_like
        # 나중엔 실제 member의 seeion에 있는 id를 teenplay 에 넣어줘야함
        member_session['memberSessionId'] = 3
        context = {**like_count, **teenplay, **member_session}
        return render(request, 'teenplay/web/teenplay-play-select-web.html', context)

# 최초 선택 시 teenplay 선택한 id를 보여줘야 하고 위 아래로 내리는 경우 fetch 통신이 이루어져야 함
# 위로 올리면 page --
# 아래로 내리면 page ++
# page -1 > lenght == 0 이면 스크롤 되면 안되고
# page +1 > lenght == 0 이면 스크롤 되면 안됨

class TeenplayClubAPIView(APIView):
    def get(self, request, clubId, page):

        row_count = 1
        limit = (page-1) * row_count
        index_limit= limit+1
        club_teenplay_conut =TeenPlay.enable_objects.all().count()
        print(page)
        print(club_teenplay_conut)
        print(index_limit)

        if index_limit != club_teenplay_conut:
            select_teenplay = TeenPlay.enable_objects.filter(club_id=clubId).annotate(club_name=F('club__club_name')). \
                                  annotate(club_intro=F('club__club_intro')).annotate(
                club_profile_path=F('club__club_profile_path')). \
                                  annotate(
                teenplay_like=Count('teenplaylike__status', filter=Q(teenplaylike__status=1))). \
                                  values('club_id', 'club_name', 'club_intro', 'club_profile_path', 'id', 'video_path',
                                         'teenplay_like')[limit:limit + 1][0]
        else:
            select_teenplay = {}
        print(select_teenplay)


        print('+'*20)
        like_count = {}
        member_session = {}
        if 'id' in select_teenplay:
            member_like = TeenPlayLike.objects.filter(member_id=3, teenplay_id=select_teenplay['id'], status=1).exists()
        else:
            member_like = 'false'
        print(member_like)
        print('+' * 20)
        like_count['like_check'] = member_like
        member_session['memberSessionId'] = 3
        context = {**like_count, **select_teenplay, **member_session}
        print(context)
        return Response(context)


class TeenPlayClubLikeAPIView(APIView):
    @transaction.atomic
    def get(self, request, emptyValue, memberSessionId, displayStyle):

        data = {
            'member_id': memberSessionId,
            'teenplay_id': emptyValue
        }

        likeData, checked = TeenPlayLike.objects.get_or_create(**data)
        if checked:
            totalLikeCount = TeenPlayLike.objects.filter(status=1, teenplay_id=emptyValue).count()
        else:
            if displayStyle== 'none':
                TeenPlayLike.objects.filter(status=0, teenplay_id=emptyValue, member_id=memberSessionId).update(status=1, updated_date=timezone.now())
                totalLikeCount = TeenPlayLike.objects.filter(status=1, teenplay_id=emptyValue).count()
            else:
                TeenPlayLike.objects.filter(status=1, teenplay_id=emptyValue, member_id=memberSessionId).update(status=0, updated_date=timezone.now())
                totalLikeCount = TeenPlayLike.objects.filter(status=1, teenplay_id=emptyValue).count()

        context = {
            'teenplay_id': emptyValue, # teenplay_id
            'member_id': memberSessionId,
            'display_style': displayStyle,
            'totalLikeCount': totalLikeCount
        }

        return Response(context)


#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

# 모임에서 틴플레이 선택했을 때 가져오는 것을 사용하는 것으로 예상
# 틴플레이 좋아요 관련 클래스 생성
# 데이터를 가져와야 하기 때문에 apiview로 해야한다
# 만약 해당 맴벅 like테이블에 존재하고 해당 teenplay-id 값을 누른게 있으면 status =1이면 0으로 0이면 1로
# id 값은 세션의 값을 가져와서 넣어줘야한다
# 모두 비동기 함수를 사용해야한다.
# member teenplay , status

#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
class TeenplayMainListAppView(View):
    def get(self, request):
        return render(request, 'teenplay/web/teenplay-play-web.html')



