from django.shortcuts import render, redirect
from django.views import View
from rest_framework.views import APIView

from member.models import Member
from teenplay_server.models import Category
from wishlist.models import Wishlist


class WishListView(View):
    # 페이지 이동
    def get(self, request):
        return render(request, 'wishlist/web/wishlist-web.html')


class WishListWriteView(View):
    # 게시글 작성
    def post(self, request):
        pass


class WishListUpdateView(View):
    # 게시글 수정
    def post(self, request):
        pass


class WishListDeleteView(View):
    # 게시글 삭제
    def get(self, request):
        pass


class WishListReplyView(View):
    # 댓글 작성
    def get(self, request):
        pass


class WishListReplyUpdateView(View):
    # 댓글 수정
    def post(self, request):
        pass


class WishListReplyDeleteView(View):
    # 댓글 삭제
    def get(self, request):
        pass


class WishListLikeView(View):
    # 게시글 좋아요
    def get(self, request):
        pass


class WishListTagSearch(View):
    # 태그 검색시
    pass


class WishListCategorySearch(View):
    # 카테고리 버튼 눌렀을 때
    pass


class WishListAPI(APIView):
    # 페이지에 wishlist 데이터 보내기
    def get(self, request):
        # 한 페이지에 게시글 5개 더보기 눌렀을 때 5개씩 추가로 보여주기
        pass






