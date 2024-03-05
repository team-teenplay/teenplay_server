from django.shortcuts import render
from django.views import View
from rest_framework.response import Response
from rest_framework.views import APIView

from notice.models import Notice


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

