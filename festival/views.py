from django.shortcuts import render
from django.views import View
from rest_framework.views import APIView

from festival.models import Festival


# web-festival 페이지 이동
class FestivalListWebView(View):
    def get(self, request):
        return render(request, 'festival/web/festival-web.html')


class FestivalListWebAPI(APIView):
    def get(self, request, page):
        # post_count = 3
        #
        # offset = (page - 1) * post_count
        # limit = page * post_count
        #
        # posts = Post.enabled_objects.annotate()
        #
        # has_next = Festival.enabled_objects.filter()[limit:limit + 1].exists()
        #
        # post_info = {
        #     'fe'
        # }
        #
        # return Response

        pass


# web-festival-detail 페이지 이동
class FestivalDetailtWebView(View):
    def get(self, request):
        return render(request, 'festival/web/festival-detail-web.html')


class FestivalDetailtWebAPI(APIView):
    def get(self, request, post):
        pass


class FestivalListAppView(View):
    pass

class FestivalListAppAPI(View):
    pass

class FestivalDetailAppView(View):
    pass

class FestivalDetailAppAPI(View):
    pass