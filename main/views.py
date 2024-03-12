from django.db.models import Q
from django.shortcuts import render, redirect
from django.utils import timezone
from django.views import View
from rest_framework.response import Response
from rest_framework.views import APIView

from activity.models import Activity
from notice.models import Notice
from search.models import RecentSearch


class MainView(View):
    def get(self, request):
        # 아직 로직 작성 안하고 띄우기만 하겠습니다.
        return render(request, 'main/web/main-web.html')


# 푸터에서 최신 공지사항 1개 띄우기
class FooterNoticeLatestAPI(APIView):
    def get(self, request):
        notices = Notice.objects.filter(status=True).values()
        notices = {
            'notices': notices
        }
        return Response(notices)


# 최근 검색어
class RecentSearchKeywordAPI(APIView):
    def get(self, request):
        member_id = request.session.get('member').get('id')
        keywords = list(RecentSearch.enabled_objects.filter(member_id=member_id).values().order_by('-id')[:6])

        return Response(keywords)

    def delete(self, request):
        id = request.data.get('id')
        recent_search = RecentSearch.enabled_objects.filter(id=id)
        if recent_search.exists():
            recent_search = recent_search.first()
            recent_search.status = 0
            recent_search.updated_date = timezone.now()
            recent_search.save(update_fields=['status', 'updated_date'])

        return Response("success")


# 최근 검색어 전체 삭제
class RecentSearchKeywordDeleteAllAPI(APIView):
    def get(self, request):
        member_id = request.session.get('member').get('id')
        recent_searches = RecentSearch.enabled_objects.filter(member_id=member_id)
        for recent_search in recent_searches:
            recent_search.status = 0
            recent_search.updated_date = timezone.now()
            recent_search.save(update_fields=['status', 'updated_date'])

        return Response("success")


# 검색어 입력 시마다 활동 검색결과 동적으로 출력
class RealTimeSearchAPI(APIView):
    def get(self, request):
        keyword = request.GET.get('keyword')
        condition = Q(activity_title__icontains=keyword)
        found_activities = list(Activity.enabled_objects.filter(condition).values('id', 'activity_title')[:5])

        return Response(found_activities)