from django.db.models import F
from django.shortcuts import render
from django.views import View
from rest_framework.response import Response
from rest_framework.views import APIView

from wishlist.models import Wishlist, WishlistReply, WishlistTag


class WishListView(View):
    # 페이지 이동
    def get(self, request):
        return render(request, 'wishlist/web/wishlist-web.html')


# 위시리스트 작성
class WishListWriteAPI(APIView):
    def post(self, request):
        data = request.data
        data = {
            'wishlist_content': data['wishlist-content'],
            'category': data['category'],
            'member_id': request.session['member']['id']
        }

        Wishlist.objects.create(**data)
        return Response('success')


# 위시리스트 리스트 보여주기
class WishListAPI(APIView):
    def get(self, request, page):
        # 페이지당 3개의 게시물 보여주기
        row_count = 3
        offset = (page - 1) * row_count
        limit = page * row_count
        category = request.GET.get('category')

        columns = [
            'wishlist_content',
            'member_id',
            'member_name',
            'category_name',
            'created_date',
            'id'
        ]

        if category:
            wishlists = Wishlist.enabled_objects.filter(category_id = category).annotate(member_name=F("member__member_nickname"),category_name=F("category__category_name")).values(*columns)
        else:
            wishlists = Wishlist.enabled_objects.annotate(member_name=F("member__member_nickname"),category_name=F("category__category_name")).values(*columns)

        return Response(wishlists[offset:limit])


# 댓글 작성
class ReplyWriteAPI(APIView):
    def post(self, request):
        data = request.data
        data = {
            'reply_content': data['reply_content'],
            'wishlist_id': data['wishlist_id'],
            'member_id': request.session['member']['id']
        }

        WishlistReply.objects.create(**data)
        return Response('success')


# 댓글 리스트 보여주기
class ReplyListAPI(APIView):
    def get(self, request):
        wishlist_id = request.GET.get('id')

        columns = [
            'wishlist_id',
            'member_id',
            'member_name',
            'reply_content',
            'created_date'
        ]

        replies = WishlistReply.enabled_objects.filter(wishlist_id=wishlist_id).annotate(member_name=F("member__member_nickname")).values(*columns)

        return Response(replies)


# 태그 리스트 보여주기
class TagListAPI(APIView):
    def get(self, request):
        wishlist_id = request.GET.get('id')

        columns = [
            'wishlist_id',
            'tag_name',
        ]

        tags = WishlistTag.enabled_objects.filter(wishlist_id=wishlist_id).values(*columns)

        return Response(tags)