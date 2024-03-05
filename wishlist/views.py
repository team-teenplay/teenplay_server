from django.db.models import F
from django.shortcuts import render, redirect
from django.views import View
from rest_framework.response import Response
from rest_framework.views import APIView

from member.models import Member
from teenplay_server.category import Category
from wishlist.models import Wishlist, WishlistReply


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
    def get(self, request, page):
        # 페이지당 3개의 게시물 보여주기
        row_count = 3
        offset = (page - 1) * row_count
        limit = page * row_count
        columns = [
            'wishlist_content',
            'member_name',
            'category_name'
        ]
        # REST
        wishlists = Wishlist.objects.annotate(member_name=F("member__member_nickname"), category_name=F("category__category_name")).values(*columns)[offset:limit]
        # 더이상 게시물이 없을 때 더보기 버튼 삭제하기 연산
        has_next = Wishlist.objects.filter()[limit:limit + 1].exists()
        wishlist_info = {
            'wishlist': wishlists,
            'hasNext': has_next,
        }
        return Response(wishlist_info)







