from django.db import transaction
from django.db.models import F, Q, Count, Exists
from django.shortcuts import render
from django.utils import timezone
from django.views import View
from rest_framework.response import Response
from rest_framework.views import APIView

from wishlist.models import Wishlist, WishlistReply, WishlistTag, WishListLike


class WishListView(View):
    # 페이지 이동
    def get(self, request):
        return render(request, 'wishlist/web/wishlist-web.html')


# 위시리스트 작성
class WishListWriteAPI(APIView):
    def post(self, request):
        data = request.data
        member_id = request.session['member']['id']
        is_private = data['is_private']
        wishlist_content = data['wishlist_content']
        category_id = data['category_id']
        tag_names = data['tag_name']

        # Wishlist 생성
        wishlist = Wishlist.objects.create(member_id=member_id, is_private=is_private, wishlist_content=wishlist_content, category_id=category_id)
        # WishlistTag 확인 및 생성
        for tag_name in tag_names:
            WishlistTag.objects.create(tag_name=tag_name, wishlist_id=wishlist.id)

        return Response('success')


# 위시리스트 리스트 보여주기
class WishListAPI(APIView):
    def get(self, request, page):
        # id 검사
        if 'member' in request.session and 'id' in request.session['member']:
            id = request.session['member']['id']
        else:
            if 'member' in request.session:
                id = request.session['member'].get('id', None)
            else:
                id = None

        # 위시리스트
        # 페이지당 3개의 게시물 보여주기
        row_count = 3
        offset = (page - 1) * row_count
        limit = page * row_count

        category = request.GET.get('category', '100')
        keyword = request.GET.get('keyword', '없음')

        condition = Q()
        if category != '100':
            condition &= Q(category_id=category)
        if keyword != '없음':
            condition &= Q(wishlisttag__tag_name__contains=keyword)

        # print(condition)

        columns = [
            'wishlist_content',
            'member_id',
            'member_name',
            'category_name',
            'created_date',
            'id',
            'member_email',
            'member_path',
            'like_on',
            'like_total',
            'reply_total'
        ]

        wishlists = Wishlist.enabled_objects.filter(condition).annotate(
            member_name=F("member__member_nickname"),
            category_name=F("category__category_name"),
            member_email=F('member__member_email'),
            member_path=F('member__memberprofile__profile_path'),
            like_on=Count('wishlistlike__id', filter=Q(wishlistlike__status=1) & Q(wishlistlike__member_id=id)),
            like_total=Count('wishlistlike__id', filter=Q(wishlistlike__status=1)),
            reply_total=Count('wishlistreply__id', filter=Q(wishlistreply__status=1))

        ).values(*columns).order_by('-created_date')[offset:limit]

        # wishlists = Wishlist.enabled_objects.filter(condition).annotate(
        #     member_name=F("member__member_nickname"),
        #     category_name=F("category__category_name"),
        #     member_email=F('member__member_email'),
        #     member_path=F('member__memberprofile__profile_path'),
        #     like_count=Count('wishlistlike__id', filter=Q(wishlistlike__status=1))
        # ).values(*columns)[offset:limit]

        # 태그
        wishlist_ids = [item['id'] for item in wishlists]
        tag_info_by_wishlist = {}

        for wishlist_id in wishlist_ids:
            tag_info = WishlistTag.objects.filter(wishlist_id=wishlist_id).values_list('tag_name', flat=True)
            tag_info_by_wishlist[wishlist_id] = list(tag_info)

        data = {
            'wishlists': wishlists,
            'tags': tag_info_by_wishlist
        }

        return Response(data)


# 위시리스트 수정/삭제
class WishListActionAPI(APIView):
    def post(self, request, wishlist_id):
        wishlist = Wishlist.objects.get(id=wishlist_id)
        wishlist.status = 0

        wishlist.save(update_fields=['status'])

        return Response('success')

    def patch(self, request, wishlist_id):
        data = request.data
        is_private = data['is_private']
        wishlist_content = data['wishlist_content']
        category_id = data['category_id']
        updated_date = timezone.now()
        tag_names = data['tag_name']

        wishlist = Wishlist.objects.get(id=wishlist_id)
        wishlist.is_private = is_private
        wishlist.wishlist_content = wishlist_content
        wishlist.category_id = category_id
        wishlist.updated_date = updated_date

        tag = WishlistTag.objects.get(wishlist_id=wishlist_id)
        tag.tag_names = tag_names

        wishlist.save(update_fields=['wishlist_content', 'updated_date'])
        tag.save(update_fields=['tag_name'])

        return Response('success')


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
            'created_date',
            'member_email',
            'id',
            'member_path'
        ]

        replies = WishlistReply.enabled_objects.filter(wishlist_id=wishlist_id).annotate(member_name=F("member__member_nickname"),member_email=F('member__member_email'), member_path=F('member__memberprofile__profile_path')).values(*columns)

        return Response(replies)


# 댓글 수정/삭제
class ReplyActionAPI(APIView):
    def post(self, request, reply_id):
        reply = WishlistReply.objects.get(id=reply_id)
        # print(reply)
        reply.status = 0

        reply.save(update_fields=['status'])

        return Response('success')

    def patch(self, request, reply_id):
        data = request.data
        reply_content = data['reply_content']
        updated_date = timezone.now()

        reply = WishlistReply.objects.get(id=reply_id)
        reply.reply_content = reply_content
        reply.updated_date = updated_date

        reply.save(update_fields=['reply_content', 'updated_date'])

        return Response('success')


class WishlistLikeAPIView(APIView):
    @transaction.atomic
    def get(self, request, wishlist_id, memberId, displayStyle):

        data = {
            'member_id': memberId,
            'wishlist_id': wishlist_id
        }

        likeData, checked = WishListLike.objects.get_or_create(**data)
        if checked:
            totalLikeCount = WishListLike.objects.filter(status=1, wishlist_id=wishlist_id).count()
        else:
            if displayStyle== 'none':
                WishListLike.objects.filter(status=0, wishlist_id=wishlist_id, member_id=memberId).update(status=1, updated_date=timezone.now())
                totalLikeCount = WishListLike.objects.filter(status=1, wishlist_id=wishlist_id).count()
            else:
                WishListLike.objects.filter(status=1, wishlist_id=wishlist_id, member_id=memberId).update(status=0, updated_date=timezone.now())
                totalLikeCount = WishListLike.objects.filter(status=1, wishlist_id=wishlist_id).count()

        context = {
            'wishlist_id': wishlist_id,
            'member_id': memberId,
            'display_style': displayStyle,
            'totalLikeCount': totalLikeCount
        }

        return Response(context)
