import math

from django.db import transaction
from django.db.models import Q, Count, F
from django.db.models.functions import Concat
from django.forms import CharField
from django.shortcuts import render, redirect
from django.views import View
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView

from activity.models import Activity
from club.models import Club, ClubPost
from member.models import AdminAccount, Member
from member.serializers import AdminAccountSerializer
from notice.models import Notice

from django.utils import timezone

from wishlist.models import Wishlist


# 관리자 로그인 페이지 이동
class AdminLoginView(View):
    def get(self, request):
        return render(request, 'admin/web/admin-login-web.html')

    def post(self, request):
        data = request.POST

        data = {
            'admin_id': data['admin_id'],
            'admin_password': data['admin_password']
        }

        admin = AdminAccount.objects.filter(**data)

        context = {'admin_data': None}

        if admin.exists():
            admin_data = AdminAccountSerializer(admin.first()).data
            context['admin_data'] = admin_data

        return render(request, 'admin/web/user-web.html', context)


# 유저 페이지 이동
class AdminUserView(View):
    def get(self, request):
        return render(request, 'admin/web/user-web.html')


# 유저 데이터 가져오기
class AdminUserAPI(APIView):
    def get(self, request, page):
        order = request.GET.get('order', 'recent')
        category = request.GET.get('category', '')
        keyword = request.GET.get('keyword', '')

        row_count = 10

        offset = (page - 1) * row_count
        limit = page * row_count

        condition = Q(status=1) | Q(status=-1)
        if category:
            condition &= Q(status=category)

        if keyword:
            condition &= Q(member_nickname__contains=keyword)

        total = Member.objects.filter(condition).all().count()

        page_count = 5

        end_page = math.ceil(page / page_count) * page_count
        start_page = end_page - page_count + 1
        real_end = math.ceil(total / row_count)
        end_page = real_end if end_page > real_end else end_page

        if end_page == 0:
            end_page = 1

        context = {
            'total': total,
            'order': order,
            'start_page': start_page,
            'end_page': end_page,
            'real_end': real_end,
            'page_count': page_count,
        }

        ordering = '-id'
        if order == 'popular':
            ordering = '-post_read_count'

        columns = [
            'id',
            'member_nickname',
            'created_date',
            'status'
        ]

        members = Member.objects.filter(condition).values(*columns).order_by(ordering)

        club_count = members.values('id').annotate(club_count=Count('club'))
        club_action_count = members.values('id').annotate(club_action_count=Count('clubmember', filter=Q(clubmember__status=1)))
        activity_count = members.values('id').annotate(activity_count=Count('activitymember', filter=Q(activitymember__status=1)))
        activity_club_count = members.values('id').annotate(activity_club_count=Count('club__activity', filter=Q(club__activity__status=1)))

        for i in range(len(list(members))):
            members[i]['club_count'] = club_count[i]['club_count']
            members[i]['club_action_count'] = club_action_count[i]['club_action_count']
            members[i]['activity_count'] = activity_count[i]['activity_count'] + activity_club_count[i]['activity_club_count']

        context['members'] = list(members[offset:limit])

        return Response(context)


class AdminUserUpdateAPI(APIView):
    def patch(self, request, member_id):
        updated_date = timezone.now()

        member = Member.objects.get(id=member_id)

        if member.status == 1:
            member.status = -1
        elif member.status == -1:
            member.status = 1

        member.updated_date = updated_date
        member.save(update_fields=['status', 'updated_date'])

        return Response('success')


# 관리자 쪽지 관리 페이지 이동
class AdminMessageView(View):
    def get(self, request):
        return render(request, 'admin/web/message-web.html')


# 관리자 틴 플레이 관리 페이지 이동
class AdminTeenplayView(View):
    def get(self, request):
        return render(request, 'admin/web/teenplay-web.html')


# 관리자 게시글 - 홍보글 관리 페이지 이동
class AdminPromoteView(View):
    def get(self, request):
        return render(request, 'admin/web/promote-web.html')


# 관리자 게시글 - 활동 모집글 관리 페이지 이동
class AdminActivityView(View):
    def get(self, request):
        return render(request, 'admin/web/activity-web.html')


# 관리자 게시글 - 위시리스트 관리 페이지 이동
class AdminWishlistView(View):
    def get(self, request):
        return render(request, 'admin/web/wishlist-web.html')


# 위시리스트 데이터
class AdminWishlistAPI(APIView):
    def get(self, request, page):
        order = request.GET.get('order', 'recent')
        category = request.GET.get('category', '')
        type = request.GET.get('type', '')
        keyword = request.GET.get('keyword', '')
        targetId = request.GET.get('targetId', '')

        row_count = 10

        offset = (page - 1) * row_count
        limit = page * row_count

        condition = Q(member__status=1, status=1)

        if category:
            if category == '1':
                condition &= Q(is_private=1)

            elif category == '0':
                condition &= Q(is_private=0)

        if type:
            if keyword:
                if type == 'p':
                    condition &= Q(member__member_nickname__contains=keyword)

                elif type == 'w':
                    condition &= Q(wishlist_content__contains=keyword)

        if targetId:
            condition &= Q(id=targetId)

        total = Wishlist.objects.filter(condition).all().count()

        page_count = 5

        end_page = math.ceil(page / page_count) * page_count
        start_page = end_page - page_count + 1
        real_end = math.ceil(total / row_count)
        end_page = real_end if end_page > real_end else end_page

        if end_page == 0:
            end_page = 1

        context = {
            'total': total,
            'order': order,
            'start_page': start_page,
            'end_page': end_page,
            'real_end': real_end,
            'page_count': page_count,
        }

        ordering = '-id'
        if order == 'popular':
            ordering = '-post_read_count'

        columns = [
            'id',
            'wishlist_content',
            'is_private',
            'member__id',
            'member__member_nickname',
            'member__status',
            'category__category_name'
        ]

        wishlist = Wishlist.objects.filter(condition).values(*columns).order_by(ordering)

        wishlist_like = wishlist.values('member__id').annotate(wishlist_like_count=Count('wishlistlike'))
        wishlist_reply = wishlist.values('member__id').annotate(wishlist_reply_count=Count('wishlistreply'))

        for i in range(len(list(wishlist))):
            wishlist[i]['wishlist_like_count'] = wishlist_like[i]['wishlist_like_count']
            wishlist[i]['wishlist_reply_count'] = wishlist_reply[i]['wishlist_reply_count']

        context['wishlist'] = list(wishlist[offset:limit])

        return Response(context)


# 위시리스트 게시글 삭제
class AdminWishlistUpdateAPI(APIView):
    # 게시글 삭제
    def patch(self, request, wishlist_id):
        status = 0
        updated_date = timezone.now()

        wishlist = Wishlist.objects.get(id=wishlist_id)
        wishlist.status = status
        wishlist.updated_date = updated_date
        wishlist.save(update_fields=['status', 'updated_date'])

        return Response('success')


# 관리자 전체 모임 관리 페이지 이동
class AdminMeetingView(View):
    def get(self, request):
        return render(request, 'admin/web/meeting-web.html')


# 관리자 축제 관리 페이지 이동
class AdminFestivalView(View):
    def get(self, request):
        return render(request, 'admin/web/festival-list-web.html')


# 관리자 축제 작성 페이지 이동
class AdminFestivalWrite(View):
    def get(self, request):
        return render(request, 'admin/web/festival-create-web.html')


# 관리자 공지사항 관리 페이지 이동
class AdminNoticeView(View):
    def get(self, request):
        return render(request, 'admin/web/notice-list-web.html')


class AdminNoticePaginationAPI(APIView):
    def get(self, request, page):
        order = request.GET.get('order', 'recent')
        category = request.GET.get('category', '')
        keyword = request.GET.get('keyword', '')

        row_count = 10

        offset = (page - 1) * row_count
        limit = page * row_count

        condition = Q(status=1)
        if category:
            condition &= Q(notice_type=category)

        if keyword:
            condition &= Q(notice_title__contains=keyword)

        total = Notice.objects.filter(condition).all().count()

        page_count = 5

        end_page = math.ceil(page / page_count) * page_count
        start_page = end_page - page_count + 1
        real_end = math.ceil(total / row_count)
        end_page = real_end if end_page > real_end else end_page

        if end_page == 0:
            end_page = 1

        context = {
            'category': category,
            'total': total,
            'order': order,
            'start_page': start_page,
            'end_page': end_page,
            'real_end': real_end,
            'page_count': page_count,
        }

        ordering = '-id'
        if order == 'popular':
            ordering = '-post_read_count'

        columns = [
            'id',
            'notice_title',
            'created_date',
            'notice_content',
            'notice_type'
        ]

        notices = Notice.objects.filter(condition).values(*columns).order_by(ordering)

        context['notices'] = list(notices[offset:limit])

        return Response(context)


# 공지사항 삭제
class AdminNoticeUpdateAPI(APIView):
    # 게시글 삭제
    def patch(self, request, notice_id):
        status = 0
        updated_date = timezone.now()

        notice = Notice.objects.get(id=notice_id)
        notice.status = status
        notice.updated_date = updated_date
        notice.save(update_fields=['status', 'updated_date'])

        return Response('success')


# 관리자 공지사항 작성 페이지 이동
class AdminNoticeWriteView(View):
    def get(self, request):
        return render(request, 'admin/web/notice-create-web.html')

    @transaction.atomic
    def post(self, request):
        data = request.POST

        data = {
            'notice_title': data['notice_title'],
            'notice_content': data['notice_content'],
            'notice_type': data['selection']
        }

        Notice.objects.create(**data)
        return redirect('/admin/notice/')


# 관리자 댓글 관리 페이지 이동
class AdminCommentView(View):
    def get(self, request):
        return render(request, 'admin/web/comment-web.html')


# 관리자 댓글 데이터
class AdminCommentAPI(APIView):
    def get(self, request, page):
        order = request.GET.get('order', 'recent')
        category = request.GET.get('category', '')
        type = request.GET.get('type', '')
        keyword = request.GET.get('keyword', '')

        row_count = 10

        offset = (page - 1) * row_count
        limit = page * row_count

        # condition = Q(status=1) | Q(status=-1)
        #
        # if category:
        #     condition &= Q(status=category)
        #
        # if type:
        #     if keyword:
        #         # 작성자
        #         if type == 'w':
        #             condition &= Q(member_nickname__contains=keyword)
        #
        #         # 포스트
        #         elif type == 'p':
        #             condition &= Q(activityreply__activity__activity_title__contains=keyword) & Q(wishlistreply__wishlist__wishlist_content__contains=keyword) & Q(clubpostreply__club_post__post_title__contains=keyword)

        columns = [
            'member_name',
            'title',
            'created_date',
            'reply',
            'member_status'
        ]

        activities = Activity.objects \
            .annotate(
            member_name=F('activityreply__member__member_nickname'),
            title=F('activityreply__activity__activity_title'),
            created=F('activityreply__created_date'),
            reply=F('activityreply__reply_content'),
            member_status=F('activityreply__member__status')
        ) \
            .values(*columns)

        wishes = Wishlist.objects \
            .annotate(
            member_name=F('wishlistreply__member__member_nickname'),
            title=F('wishlistreply__wishlist__wishlist_content'),
            created=F('wishlistreply__created_date'),
            reply=F('wishlistreply__reply_content'),
            member_status=F('wishlistreply__member__status')
        ) \
            .values(*columns)

        club_posts = ClubPost.objects \
            .annotate(
            member_name=F('clubpostreply__member__member_nickname'),
            title=F('clubpostreply__club_post__post_title'),
            created=F('clubpostreply__created_date'),
            reply=F('clubpostreply__reply_content'),
            member_status=F('clubpostreply__member__status')
        ) \
            .values(*columns)

        total = activities.union(wishes).union(club_posts).count()

        # total = Member.objects.filter(condition).all().count()
        # total = activities.union(wishes).union(club_posts).order_by('-created_date')

        page_count = 5

        end_page = math.ceil(page / page_count) * page_count
        start_page = end_page - page_count + 1
        real_end = math.ceil(total / row_count)
        end_page = real_end if end_page > real_end else end_page

        if end_page == 0:
            end_page = 1

        context = {
            'total': total,
            'order': order,
            'start_page': start_page,
            'end_page': end_page,
            'real_end': real_end,
            'page_count': page_count,
        }

        ordering = '-id'
        if order == 'popular':
            ordering = '-post_read_count'

        comment = activities.union(wishes).union(club_posts)
        # comment = activities.union(wishes).union(club_posts).order_by('-created_date')
        print(comment)

        context['comment'] = list(comment[offset:limit])

        return Response(context)

# ----------------------------------------------------------------------------------------------------------------------


# 회사 소개 페이지 이동
class CompanyIntroductionView(View):
    def get(self, request):
        return render(request, 'company-info/web/company-info-web.html')


# 회사 소개에서 공지사항 띄우기
class CompanyNoticeListAPI(APIView):
    def get(self, request, page):
        row_count = 7
        offset = (page - 1) * row_count
        limit = page * row_count

        notices = Notice.objects.filter(status=True).values()[offset:limit]

        has_next = Notice.objects.filter(status=True)[limit:limit+1].exists()

        total = Notice.objects.filter(status=True).count()

        notice_info = {
            'notices': notices,
            'hasNext': has_next,
            'total': total
        }

        return Response(notice_info)

