from django.db import transaction
from django.db.models import Count, Q, F, Exists, Window
from django.db.models.functions import RowNumber
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
        teenplay_count = TeenPlay.enable_objects.all().count()
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
        teenplay_count = TeenPlay.enable_objects.all().count()

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
            if displayStyle == 'none':
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

def get_teenplay_data(clubId, page, teenplayClickId, member_id):
    # # 각 인스턴스에 대해 순차 번호(행 번호)를 부여합니다.
    # # 우선 모든 값에 대해서 row_number 로 각각의 행 번호를 입력 해준다
    videos = TeenPlay.enable_objects.filter(club_id=clubId).annotate(row_number=Window(expression=RowNumber(), order_by=F('id').desc()))
    # # 선택한 틴플레이 아이디가 있으면 해당 filter 를 통해 해당 id 의 Rownum을 알아내서 page 변수를 저장합니다.
    # # 전달받은 페이지 번호가 있으면 row_number을 page로 해서 해당 비디오만 필터링하고, page가 없는경우(최초) videos에 row_number를 page로 저장하여 전달합니다.

    if not page:
        for obj in videos:
            if obj.id == teenplayClickId:
                page = obj.row_number
    else:
        for obj in videos:
            if obj.id == page:
                row_number = page

    teenplay_ids = TeenPlay.enable_objects.filter(club_id=clubId).order_by('-id').values_list('id', flat=True)
    max_count = teenplay_ids.count()

    currrent_user_like = TeenPlayLike.objects.filter(member_id=member_id, teenplay_id=teenplay_ids[page-1], status=1)

    select_teenplay = \
        TeenPlay.enable_objects.filter(club_id=clubId, id=teenplay_ids[page-1]).annotate(club_name=F('club__club_name')). \
            annotate(club_intro=F('club__club_intro')).annotate(club_profile_path=F('club__club_profile_path')). \
            annotate(teenplay_like=Count('teenplaylike__status', filter=Q(teenplaylike__status=1))). \
            annotate(member_like=Exists(currrent_user_like)).annotate(
            tp_all_count=Count('teenplaylike__status', filter=Q(teenplaylike__status=1))). \
            values('club_id', 'club_name', 'club_intro', 'club_profile_path', 'id', 'video_path', 'teenplay_like',
                   'member_like', 'tp_all_count')[0]
    select_teenplay['page'] = page
    select_teenplay['max_count'] = max_count
    return select_teenplay



# APIView
class TeenplayClubAPIView(APIView):
    def get(self, request, clubId, teenplayClickId, page):
        member_id = request.session['member']['id']
        data = get_teenplay_data(clubId, page, teenplayClickId, member_id)
        return Response(data)

# 일반 Django View
class TeenplayClubView(View):
    def get(self, request, teenplayId):
        member_id = request.session['member'].get('id')

        # get_teenplay_data 함수를 호출하여 필요한 데이터를 가져옵니다.
        teenplayClickId = teenplayId
        clubId = TeenPlay.enable_objects.get(id=teenplayClickId)
        clubId = clubId.club_id
        page = None
        # 필요한 값들을 적절히 결정하여 전달해야 합니다.
        data = get_teenplay_data(clubId, page, teenplayClickId, member_id)
        # data를 템플릿 컨텍스트에 추가
        context = {'data': data, 'member_session': {'memberSessionId': member_id}}
        return render(request, 'teenplay/web/teenplay-play-select-web.html', context)



# class TeenplayClubView(View):
#     def get(self, request, teenplayId):
#         member_id = request.session['member'].get('id')
#
#         # 실제로는 화면에서 request한 값을 받아와서 해야하나 테스트를 위해 아래쪽이 object로 검사한 데이터를 임시로 작성
#         like_count = {}
#         member_session = {}
#         teenplay = TeenPlay.enable_objects.filter(id=teenplayId).annotate(club_name= F('club__club_name')).\
#             annotate(club_intro=F('club__club_intro')).annotate(club_profile_path = F('club__club_profile_path')).\
#             annotate(teenplay_like=Count('teenplaylike__status', filter=Q(teenplaylike__status=1))).\
#             values('club_id','club_name','club_intro','club_profile_path','id', 'video_path','teenplay_like').first()
#         member_like = TeenPlayLike.objects.filter(member_id=member_id, teenplay_id=teenplayId, status=1).exists()
#         like_count['like_check'] = member_like
#         # 나중엔 실제 member의 seeion에 있는 id를 teenplay 에 넣어줘야함
#         member_session['memberSessionId'] = member_id
#         context = {**like_count, **teenplay, **member_session}
#         return render(request, 'teenplay/web/teenplay-play-select-web.html', context)

# 수정 이후 코드
# class TeenplayClubAPIView(APIView):
#     def get(self, request, clubId, teenplayClickId, page=None):
#         member_id = request.session['member']['id']
#
#         # 각 인스턴스에 대해 순차 번호(행 번호)를 부여합니다.
#         # 우선 모든 값에 대해서 row_number 로 각각의 행 번호를 입력 해준다
#         videos = TeenPlay.enable_objects.annotate(row_number=Window(expression=RowNumber(), order_by=F('id').asc()))
#
#         # 선택한 틴플레이 아이디가 있으면 해당 filter 를 통해 해당 id 의 Rownum을 알아내서 page 변수를 저장합니다.
#         # 전달받은 페이지 번호가 있으면 row_number을 page로 해서 해당 비디오만 필터링하고, page가 없는경우(최초) videos에 row_number를 page로 저장하여 전달합니다.
#         if page:
#             video = videos.filter(row_number=page)
#         else:
#             video = videos.filter(club_id=clubId, id=teenplayClickId)
#             page = video.first().row_number
#
#         video_id = video.first().id
#
#         currrent_user_like = TeenPlayLike.objects.filter(member_id=member_id, teenplay_id=video_id, status=1)
#
#         select_teenplay = \
#         TeenPlay.enable_objects.filter(club_id=clubId, id=video_id).annotate(club_name=F('club__club_name')). \
#             annotate(club_intro=F('club__club_intro')).annotate(club_profile_path=F('club__club_profile_path')). \
#             annotate(teenplay_like=Count('teenplaylike__status', filter=Q(teenplaylike__status=1))). \
#             annotate(member_like=Exists(currrent_user_like)).annotate(
#             tp_all_count=Count('teenplaylike__status', filter=Q(teenplaylike__status=1))). \
#             values('club_id', 'club_name', 'club_intro', 'club_profile_path', 'id', 'video_path', 'teenplay_like',
#                    'member_like', 'tp_all_count')[0]
#         select_teenplay['page'] = page
#         return Response(select_teenplay)
#
#
#
class TeenPlayClubLikeAPIView(APIView):
    @transaction.atomic
    def get(self, request, teenplayId, memberSessionId, displayStyle):
        print(1)
        data = {
            'member_id': memberSessionId,
            'teenplay_id': teenplayId
        }

        likeData, checked = TeenPlayLike.objects.get_or_create(**data)
        if checked:
            totalLikeCount = TeenPlayLike.objects.filter(status=1, teenplay_id=teenplayId).count()
        else:
            if displayStyle != 'none':
                TeenPlayLike.objects.filter(status=0, teenplay_id=teenplayId, member_id=memberSessionId).update(status=1, updated_date=timezone.now())
                totalLikeCount = TeenPlayLike.objects.filter(status=1, teenplay_id=teenplayId).count()
            else:
                TeenPlayLike.objects.filter(status=1, teenplay_id=teenplayId, member_id=memberSessionId).update(status=0, updated_date=timezone.now())
                totalLikeCount = TeenPlayLike.objects.filter(status=1, teenplay_id=teenplayId).count()

        context = {
            'teenplay_id': teenplayId,
            'member_id': memberSessionId,
            'display_style': displayStyle,
            'totalLikeCount': totalLikeCount
        }

        return Response(context)




# 수정 이전 코드
# class TeenplayClubAPIView(APIView):
    # def get(self, request, clubId, page, teenplayClickId):
    #     offset = 0
    #     limit = 1
    #     page = page-1
    #
    #     club_teenplay_conut =TeenPlay.enable_objects.filter(club_id=clubId).count()
    #     club_teenplay_id_all = list(TeenPlay.enable_objects.filter(club_id=clubId).values('id').order_by('-id'))
    #
    #     # teenplay id의 인덱스 요소 찾기
    #     index_of_target = next((index for index, item in enumerate(club_teenplay_id_all) if item['id'] == teenplayClickId), None)
    #     if index_of_target is not None:
    #         real_index = index_of_target + page
    #     else:
    #         real_index = None
    #
    #     if real_index is not None and 0 <= real_index < club_teenplay_conut:
    #         currrent_user_like = TeenPlayLike.objects.filter(member_id=request.session['member']['id'],
    #                                                   teenplay_id=club_teenplay_id_all[real_index].get('id'), status=1)
    #
    #         currnet_teenplay_all_count = TeenPlayLike.objects.filter(status=1, teenplay_id=club_teenplay_id_all[real_index].get('id'))
    #
    #         select_teenplay = TeenPlay.enable_objects.filter(club_id=clubId, id=club_teenplay_id_all[real_index].get('id')).annotate(club_name=F('club__club_name')). \
    #                               annotate(club_intro=F('club__club_intro')).annotate(
    #             club_profile_path=F('club__club_profile_path')). \
    #                               annotate(teenplay_like=Count('teenplaylike__status', filter=Q(teenplaylike__status=1))).\
    #                               annotate(member_like=Exists(currrent_user_like)).annotate(tp_all_count=Count('teenplaylike__status', filter=Q(teenplaylike__status=1))).\
    #                               values('club_id', 'club_name', 'club_intro', 'club_profile_path', 'id', 'video_path','teenplay_like','member_like','tp_all_count')[offset:limit][0]
    #     else:
    #         return Response({'error': 'Invalid'})
    #     if select_teenplay:
    #         context = select_teenplay
    #     else:
    #         context = {}
    #     return Response(context)




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



