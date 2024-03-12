from django.db import transaction
from django.db.models import F, Q
from django.shortcuts import render, redirect
from django.utils import timezone
from django.views import View
from rest_framework.response import Response
from rest_framework.views import APIView

from activity.models import ActivityReply
from alarm.models import Alarm
from club.models import ClubPostReply
from friend.models import Friend
from letter.models import Letter, ReceivedLetter, SentLetter
from member.models import Member, MemberFavoriteCategory, MemberProfile, MemberDeleteReason
from member.serializers import MemberSerializer
from pay.models import Pay
from teenplay_server.category import Category
from wishlist.models import WishlistReply


class MemberLoginWebView(View):
    def get(self, request):
        return render(request, 'member/web/login-web.html')


class MemberJoinWebView(View):
    def get(self, request):
        member_type = request.GET['type']
        member_email = request.GET['email']
        member_nickname = request.GET['name']
        context = {
            'member_type': member_type,
            'member_email': member_email,
            'member_nickname': member_nickname
        }
        return render(request, 'member/web/join-web.html', context=context)

    @transaction.atomic
    def post(self, request):
        data = request.POST
        marketing_agree = data.getlist('marketing_agree')
        marketing_agree = True if len(marketing_agree) else False
        privacy_agree = data.getlist('privacy_agree')
        privacy_agree = True if len(privacy_agree) else False

        data = {
            'member_email': data['member-email'],
            'member_nickname': data['member-name'],
            'member_marketing_agree': marketing_agree,
            'member_privacy_agree': privacy_agree,
            'member_type': data['member-type'],
            'member_phone': data['member-phone']
        }

        member = Member.objects.create(**data)
        member = MemberSerializer(member).data
        request.session['member'] = member
        return redirect('/')

from django.http import HttpResponse
# 자체작업 합의 후 push해야합니다.
class MypageInfoWebView(View):
    def get(self, request):
        member_id = request.session.get('member')
        if member_id is None:
            return redirect('member:login')
        else:
            member = request.session.get('member')
            member_file = MemberProfile.objects.filter(member_id=member['id'])
            member_files = list(member_file.values('profile_path').filter(status=1))
            if len(member_files) != 0:
                request.session['member_files'] = member_files
            member_file = request.session.get('member_files')

            category_session = MemberFavoriteCategory.objects.filter(member_id=member['id'])
            category_session = list(category_session.values('status', 'category_id'))
            if len(category_session) != 0:
                request.session['member_category'] = category_session
            member_category = request.session.get('member_category')

            categories = Category.objects.all()

            return render(request, 'mypage/web/my-info-web.html', { 'member': member,'categories':categories, 'member_files': member_file, 'member_category':member_category })

    @transaction.atomic
    def post(self, request):
        # 세션에서 member의 값을 가져옴
        member_data = request.session.get('member','member_files')
        file = request.FILES

        if member_data:
            member_id = member_data['id']

            try:
                # member_id에 해당하는 Member 객체를 가져옴
                member = Member.objects.get(id=member_id)
            except Member.DoesNotExist:
                # 만약 member_id에 해당하는 Member 객체가 없을 경우 에러 처리
                return HttpResponse("Member matching query does not exist.", status=404)

            data = request.POST
            if data.get('member-nickname') != '':
                member.member_nickname = data['member-nickname']
            if data.get('member-phone') != '':
                member.member_phone = data['member-phone']
            member.member_gender = data['gender']
            if data.get('member-marketing_agree') == '1':
                member.member_marketing_agree = True
            else:
                member.member_marketing_agree = False
            if data.get('member-privacy_agree') == '1':
                member.member_privacy_agree = True
            else:
                member.member_privacy_agree = False

            if 'member-age' in data and data['member-age'] != '':
                member.member_birth = data['member-age']

            selected_categories = request.POST.getlist('selected_categories')

            # 기존의 회원 관심 카테고리 가져오기
            member_categories = MemberFavoriteCategory.objects.filter(member_id=member.id)

            # 선택된 각 카테고리에 대해 처리
            # MemberFavoriteCategory.objects.filter(member_id=member.id).update(status=0)
            for category_id in selected_categories:
                # 해당 카테고리가 이미 존재하는지 확인
                category_exists = member_categories.filter(category_id=category_id).exists()

                if category_exists:
                    # 이미 존재하면 status 변경
                    target_member_category = member_categories.filter(category_id=category_id).first()

                    if target_member_category:
                        # 특정 category_id에 대한 상태를 토글
                        target_member_category.status = 1 - target_member_category.status
                        target_member_category.save()
                else:
                    # 존재하지 않으면 새로운 레코드 생성
                    MemberFavoriteCategory.objects.create(member_id=member.id, category_id=category_id, status=1)


            member.save(update_fields=['member_nickname', 'member_phone', 'member_gender', 'member_marketing_agree','member_privacy_agree', 'member_birth'])



            member_file = MemberProfile.objects.filter(member_id=member.id)



            for key in file:
                MemberProfile.objects.filter(member_id=member.id).update(status=0)
                member_file.create(member_id=member.id, profile_path=file[key])

            # 수정된 데이터를 세션에 다시 저장
            request.session['member'] = {
                'id': member.id,
                'member_birth': member.member_birth,
                'member_email': member.member_email,
                'member_nickname': member.member_nickname,
                'member_address': member.member_address,
                'member_phone': member.member_phone,
                'member_gender': member.member_gender,
                'member_marketing_agree': member.member_marketing_agree,
                'member_privacy_agree': member.member_privacy_agree,
            }
            member_files = list(member_file.values('profile_path').filter(status=1))
            if len(member_files) != 0:
                request.session['member_files'] = member_files

            category_session = MemberFavoriteCategory.objects.filter(member_id=member.id)
            category_session = list(category_session.values('status','category_id'))
            if len(category_session) != 0:
                request.session['member_category'] = category_session



            return redirect('member:mypage-info')
        else:
            # 세션 데이터에서 member가 없는 경우 에러 처리
            return HttpResponse("Session data for member is missing.", status=400)




class MypageDeleteWebView(View):
    def get(self,request):
        member_id = request.session.get('member')
        if member_id is None:
            return redirect('member:login')
        else:
            member = request.session.get('member')
            return render(request,'mypage/web/withdrawal-web.html', {'member': member})

    @transaction.atomic
    def post(self,request):
        member_data = request.session.get('member')
        text = request.POST.get("reason-text")
        number = request.POST.get("select_bum")
        MemberDeleteReason.objects.create(delete_text=text,delete_reason=number)
        member_id = member_data['id']
        member = Member.objects.get(id=member_id)
        member.status = 0
        member.save(update_fields=['status'])
        request.session.clear()
        return redirect('/')

class MypageLetterWebView(View):
    def get(self,request):
        member = request.session.get('member')
        latest_letter = Letter.objects.latest('id')  # 또는 필요한 기준으로 필터링
        return render(request, 'mypage/web/my-letter-web.html', {"member": member, 'letter_id': latest_letter.id})


class MypageWriteAPIWebView(APIView):
    @transaction.atomic
    def post(self,request):
        data = request.data

        receiver_email = data['receiver_id'].split("(")[1][:-1]
        receiver_instance = Member.objects.filter(member_email=receiver_email).first()
        receiver_id = receiver_instance.id
        # Letter 모델 생성
        letter = Letter.objects.create(
            receiver_id=receiver_id,
            letter_content=data['letter_content'],
            sender_id=request.session['member']['id']
        )

        # ReceivedLetter 모델 생성
        ReceivedLetter.objects.create(letter_id=letter.id)

        # SentLetter 모델 생성
        SentLetter.objects.create(letter_id=letter.id)
        Alarm.objects.create(target_id=letter.id, alarm_type=4, sender_id=letter.sender_id, receiver_id= letter.receiver_id)

        return Response("good")


class MypageListAPIWebView(APIView):
    @transaction.atomic
    def get(self, request, member_id, page):
        status_letter = request.GET.get('status_letter')
        row_count = 10
        offset = (page - 1) * row_count
        limit = page * row_count

        # 전체 데이터 수를 세는 쿼리
        total_count = Letter.objects.filter(Q(sender_id=member_id,status=1) | Q(receiver_id=member_id,status=1)).count()

        # 전체 페이지 수 계산
        total_pages = (total_count + row_count - 1) // row_count

        # 페이지 범위에 해당하는 데이터 조회
        replies = Letter.objects.filter(Q(sender_id=member_id,status=1) | Q(receiver_id=member_id,status=1)) \
            .values('letter_content', 'created_date', 'sender__member_nickname', 'receiver__member_nickname','id')[offset:limit]

        sender = Letter.objects.filter(sender_id=member_id, status=1)  \
                      .values('letter_content', 'created_date', 'sender__member_nickname', 'receiver__member_nickname',
                              'id')[offset:limit]

        receiver = Letter.objects.filter(receiver_id=member_id, status=1) \
                      .values('letter_content', 'created_date', 'sender__member_nickname', 'receiver__member_nickname',
                              'id')[offset:limit]

        # 응답에 전체 페이지 수와 데이터 추가
        response_data = {
            'total_pages': total_pages,
            'replies': replies,

        }
        if status_letter == 'sender':
            response_data['replies'] =  Letter.objects.filter(sender_id=member_id, status=1)  \
                      .values('letter_content', 'created_date', 'sender__member_nickname', 'receiver__member_nickname',
                              'id')[offset:limit]

            response_data['total_pages'] = (Letter.objects.filter(sender_id=member_id, status=1).count() + row_count - 1)  //row_count
        elif status_letter == 'receiver':
            response_data['replies'] = Letter.objects.filter(receiver_id=member_id, status=1) \
                .values('letter_content', 'created_date', 'sender__member_nickname', 'receiver__member_nickname',
                        'id')[offset:limit]
            response_data['total_pages'] = (Letter.objects.filter(receiver_id=member_id, status=1).count() + row_count - 1)  //row_count

        else:
            response_data['replies'] = Letter.objects.filter(Q(sender_id=member_id,status=1) | Q(receiver_id=member_id,status=1)) \
            .values('letter_content', 'created_date', 'sender__member_nickname', 'receiver__member_nickname','id')[offset:limit]

            response_data['total_pages'] = (Letter.objects.filter(Q(sender_id=member_id,status=1) | Q(receiver_id=member_id,status=1)).count() + row_count - 1)  //row_count

        return Response(response_data)

class MypageDeleteAPIWebView(APIView):
    @transaction.atomic
    def delete(self, request, letter_id):
        letter = Letter.objects.filter(id=letter_id)
        letter.update(status=0)
        SentLetter.objects.filter(letter_id=letter_id).update(status=0)
        ReceivedLetter.objects.filter(letter_id=letter_id).update(status=0)

        return Response('good')

    @transaction.atomic
    def patch(self, request, letter_id):
        ReceivedLetter.objects.filter(letter_id=letter_id).update(is_read=0)

        return Response('good')


class MypageCheckAPIWebViewMa(APIView):
    @transaction.atomic
    def post(self, request):
        member_email = request.data.get('member_email')

        member = Member.enabled_objects.filter(member_email=member_email)
        if member.exists():
            member = member.first()
            data = {
                'message': f'{member.member_nickname} ({member.member_email})'
            }
        else:
            data = {
                'message': '존재하지 않는 이메일입니다.'
            }

        return Response(data)




class MypageAlramView(View):
    @transaction.atomic
    def get(self, request):
        return render(request, 'mypage/web/my-signal-web.html')


class MypageAlramAPIView(APIView):
    @transaction.atomic
    def get(self, request, member_id, page):
        row_count = 5
        offset = (page - 1) * row_count
        limit = page * row_count

        alram = Alarm.objects.filter(receiver_id=member_id, status =1).values('id','alarm_type','receiver_id','created_date')[offset:limit]


        return Response(alram)

class MypageAlramDeleteAPIView(APIView):
    @transaction.atomic
    def delete(self, request, alram_id):
        Alarm.objects.filter(id= alram_id).update(status = 0)
        print(Alarm)


        return Response('good')

class MypageTeenchinview(View):
    def get(self, request):
        return  render(request, 'mypage/web/my-teenchin-web.html')

class MypageTeenchinAPIview(APIView):
    def get(self, request, member_id, page):
        row_count = 2
        offset = (page - 1) * row_count
        limit = page * row_count


        teenchin = Friend.objects.filter(receiver_id=member_id).values('id', 'is_friend')[offset:limit]

        return Response(teenchin)


class MemberAlarmCountAPI(APIView):
    def get(self, request):
        member_id = request.GET.get('member-id')
        alarm_count = Alarm.enabled_objects.filter(receiver_id=member_id).count()

        return Response(alarm_count)

class MypageTeenchinAPIview(APIView):
    def get(self, request, member_id, page):
        status_letter = request.GET.get('status_teenchin')
        search_text = request.GET.get('search')[:-1]

        row_count = 9
        offset = (page - 1) * row_count
        limit = page * row_count


        teenchin = Friend.objects.filter(Q(sender_id=member_id, is_friend= 1) | Q(receiver_id=member_id, is_friend= 1)| Q(sender_id=member_id, is_friend= -1)| Q(receiver_id=member_id, is_friend= -1))\
                       .values('id', 'is_friend','sender_id','receiver_id','sender__member_nickname','receiver__member_nickname',)[offset:limit]

        if status_letter == 'case-a/':
            teenchin = Friend.objects.filter(Q(sender_id=member_id,is_friend= 1) | Q(receiver_id=member_id,is_friend=1)).values('id', 'is_friend','sender_id','receiver_id','sender__member_nickname','receiver__member_nickname',)[offset:limit]
            if search_text:
                teenchin = Friend.objects.filter(Q(receiver_id=member_id,is_friend= 1,sender__member_nickname__icontains=search_text) | Q(receiver_id=member_id,is_friend= 1,sender__member_email__icontains=search_text) | Q(sender_id=member_id,is_friend= 1,receiver__member_nickname__icontains=search_text) | Q(sender_id=member_id,is_friend= 1,receiver__member_email__icontains=search_text)).values('id', 'is_friend','sender_id','receiver_id','sender__member_nickname','receiver__member_nickname',)[offset:limit]

        elif status_letter == 'case-b/':
            teenchin = Friend.objects.filter(Q(sender_id=member_id, is_friend= -1)).values('id', 'is_friend','sender_id','receiver_id','sender__member_nickname','receiver__member_nickname',)[offset:limit]
            if search_text:
                teenchin = Friend.objects.filter(Q(sender_id=member_id, is_friend=-1,receiver__member_nickname__icontains=search_text) | Q(sender_id=member_id, is_friend=-1,receiver__member_email__icontains=search_text)).values('id', 'is_friend',
                                                                                              'sender_id',
                                                                                              'receiver_id',
                                                                                              'sender__member_nickname',
                                                                                              'receiver__member_nickname', )[offset:limit]

        elif status_letter == 'case-c/':
            teenchin = Friend.objects.filter(Q(receiver_id=member_id,is_friend= -1)).values('id', 'is_friend','sender_id','receiver_id','sender__member_nickname','receiver__member_nickname',)[offset:limit]
            if search_text:
                teenchin = Friend.objects.filter(Q(receiver_id=member_id, is_friend=-1, sender__member_nickname__icontains=search_text) | Q(receiver_id=member_id, is_friend=-1, sender__member_email__icontains=search_text)).values('id', 'is_friend',
                                                                                                'sender_id',
                                                                                                'receiver_id',
                                                                                                'sender__member_nickname',
                                                                                                'receiver__member_nickname', )[
                           offset:limit]

        else:
            teenchin = Friend.objects.filter(
                Q(sender_id=member_id, is_friend=1) | Q(receiver_id=member_id, is_friend=1) | Q(sender_id=member_id,is_friend=-1) | Q(receiver_id=member_id, is_friend=-1)) \
                           .values('id', 'is_friend', 'sender_id', 'receiver_id', 'sender__member_nickname','receiver__member_nickname', )[offset:limit]
            if search_text:
                teenchin = Friend.objects.filter(
                Q(sender_id=member_id, is_friend=1, receiver__member_nickname__icontains=search_text) | Q(sender_id=member_id, is_friend=1, receiver__member_email__icontains=search_text) | Q(receiver_id=member_id, is_friend=1, sender__member_email__icontains=search_text) |Q(receiver_id=member_id, is_friend=1, sender__member_nickname__icontains=search_text) | Q(sender_id=member_id,is_friend=-1, receiver__member_email__icontains=search_text) | Q(sender_id=member_id,is_friend=-1, receiver__member_nickname__icontains=search_text) | Q(receiver_id=member_id, is_friend=-1 ,sender__member_email__icontains=search_text) | Q(receiver_id=member_id, is_friend=-1 ,sender__member_nickname__icontains=search_text)) \
                           .values('id', 'is_friend', 'sender_id', 'receiver_id', 'sender__member_nickname','receiver__member_nickname', )[offset:limit]


        return Response(teenchin)
class MypageTeenchindeleteview(APIView):
    @transaction.atomic
    def delete(self, request, friend_id):
        print(friend_id)
        Friend.objects.filter(id= friend_id).update(is_friend = 0)

        return Response('good')

    @transaction.atomic
    def patch(self, request, friend_id):
        Friend.objects.filter(id= friend_id).update(is_friend = 1)

        return Response('good')

class MypageTeenchinLetterAPIview(APIView):
    @transaction.atomic
    def post(self, request):
        data = request.data

        receiver_id = data['receiver_id']
        letter = Letter.objects.create(
            receiver_id=receiver_id,
            letter_content=data['letter_content'],
            sender_id=request.session['member']['id']
        )
        ReceivedLetter.objects.create(letter_id=letter.id)

        # SentLetter 모델 생성
        SentLetter.objects.create(letter_id=letter.id)
        Alarm.objects.create(target_id=letter.id, alarm_type=4, sender_id=letter.sender_id, receiver_id= letter.receiver_id)

        return Response("good")

class MapagePaymentView(View):
    def get(self, request):
        return  render(request, 'mypage/web/my-payment-web.html')

class MypagePayListAPIVIEW(APIView):

    def get(self, request, member_id, page):
        row_count = 1
        offset = (page - 1) * row_count
        limit = page * row_count

        pay = Pay.objects.filter(member_id=member_id, status=1).values('id', 'created_date','member__club__club_name','member__club__club_profile_path','member__club__club_intro','activity__activity_title')[offset:limit]

        return Response(pay)

class MypagePayDeleteAPIVIEW(APIView):
    @transaction.atomic
    def delete(self, request, pay_id):
        Pay.objects.filter(id=pay_id).update(status=0)

        return Response('good')

class MypageReplyView(View):
    def get(self,request):
        return render(request, 'mypage/web/my-reply-web.html')


class MypageReplyAPIVIEW(APIView):
    def get(self, request, member_id, page):
        status_reply = request.GET.get('status_reply')
        row_count = 10
        offset = (page - 1) * row_count
        limit = page * row_count
        print(status_reply)


        total_count = 0

        total_count += WishlistReply.objects.filter(member_id=member_id, status=1).count()
        total_count += ActivityReply.objects.filter(member_id=member_id, status=1).count()
        total_count += ClubPostReply.objects.filter(member_id=member_id, status=1).count()

        # 전체 페이지 수 계산
        total_pages = (total_count + row_count - 1) // row_count
        reply = []

        reply += WishlistReply.objects.filter(member_id=member_id, status=1).values('id','reply_content','created_date','wishlist_id','wishlist__wishlist_content')
        reply += ActivityReply.objects.filter(member_id=member_id, status=1).values('id', 'reply_content','created_date','activity_id', 'activity__activity_title')
        reply += ClubPostReply.objects.filter(member_id=member_id, status=1).values('id', 'reply_content','created_date','club_post_id','club_post__post_title')

        response_data = {
            'total_pages': total_pages,
            'reply': reply[offset:limit],

        }

        if status_reply == 'wish':
            response_data['reply'] = WishlistReply.objects.filter(member_id=member_id, status=1).values('id','reply_content','created_date','wishlist_id','wishlist__wishlist_content')[offset:limit]
            response_data['total_pages'] = (WishlistReply.objects.filter(member_id=member_id, status=1).count() + row_count - 1)  //row_count
            print(response_data['total_pages'])

        elif status_reply == 'post':
            response_data['reply'] = ClubPostReply.objects.filter(member_id=member_id, status=1).values('id', 'reply_content','created_date','club_post_id','club_post__post_title')[offset:limit]
            response_data['total_pages'] = (ClubPostReply.objects.filter(member_id=member_id, status=1).count()+ row_count - 1)  //row_count

        elif status_reply == 'ac':
            response_data['reply'] = ActivityReply.objects.filter(member_id=member_id, status=1).values('id', 'reply_content','created_date','activity_id', 'activity__activity_title')[offset:limit]
            response_data['total_pages'] = (ActivityReply.objects.filter(member_id=member_id, status=1).count()+ row_count - 1)  //row_count

        else:

            total_count = 0

            total_count += WishlistReply.objects.filter(member_id=member_id, status=1).count()
            total_count += ActivityReply.objects.filter(member_id=member_id, status=1).count()
            total_count += ClubPostReply.objects.filter(member_id=member_id, status=1).count()

            # 전체 페이지 수 계산
            total_pages = (total_count + row_count - 1) // row_count
            print(total_pages)

            reply = []

            reply += WishlistReply.objects.filter(member_id=member_id, status=1).values('id', 'reply_content',
                                                                                        'created_date', 'wishlist_id',
                                                                                        'wishlist__wishlist_content')
            reply += ActivityReply.objects.filter(member_id=member_id, status=1).values('id', 'reply_content',
                                                                                        'created_date', 'activity_id',
                                                                                        'activity__activity_title')
            reply += ClubPostReply.objects.filter(member_id=member_id, status=1).values('id', 'reply_content',
                                                                                        'created_date', 'club_post_id',
                                                                                        'club_post__post_title')

            response_data = {
                'total_pages': total_pages,
                'reply': reply[offset:limit],

            }

        return Response(response_data)

class MypageReplyDeleteAPIVIEW(APIView):
    @transaction.atomic
    def delete(self, request, reply_id):
        if reply_id.startswith('a'):
            ActivityReply.objects.filter(id=int(reply_id[1:])).update(status=0)
        elif reply_id.startswith('w'):
            WishlistReply.objects.filter(id=int(reply_id[1:])).update(status=0)
        elif reply_id.startswith('p'):
            ClubPostReply.objects.filter(id=int(reply_id[1:])).update(status=0)

        return Response('good')


class TeenChinAPI(APIView):
    def get(self, request):
        member_id = request.session.get('member').get('id')
        teenchin_id = request.GET.get('teenchin-id')
        send_friend = Friend.objects.filter(sender_id=member_id, receiver_id=teenchin_id)
        receive_friend = Friend.objects.filter(receiver_id=member_id, sender_id=teenchin_id)
        teenchin_status = 0
        if send_friend.exists():
            send_friend = send_friend.first()
            teenchin_status = send_friend.is_friend
        elif receive_friend.exists():
            receive_friend = receive_friend.first()
            teenchin_status = receive_friend.is_friend

        return Response({'teenchinStatus': teenchin_status})

    def post(self, request):
        member_id = request.session.get('member').get('id')
        teenchin_id = request.data.get('teenchinId')

        # 혹시 이미 친구인데 넘어왔을 경우 바로 return
        send_friend = Friend.objects.filter(sender_id=member_id, receiver_id=teenchin_id, is_friend=1)
        if send_friend.exists():
            return Response("already exists")
        receive_friend = Friend.objects.filter(sender_id=teenchin_id, receiver_id=member_id, is_friend=1)
        if receive_friend.exists():
            return Response("already exists")

        # 먼저 상태가 0인 컬럼이 있는지 검사(sender와 receiver가 다르므로 두 번 해야한다)
        send_friend = Friend.objects.filter(sender_id=member_id, receiver_id=teenchin_id, is_friend=0)
        if send_friend.exists():
            send_friend = send_friend.first()
            send_friend.is_friend = -1
            send_friend.updated_date = timezone.now()
            send_friend.save(update_fields=['is_friend', 'updated_date'])
            # 알람 추가
            # alarm_data = {
            #     'target_id': member_id,
            #     'alarm_type':
            # }
            # alarm, created = Alarm.objects.get_or_create()
            return Response("success")
        receive_friend = Friend.objects.filter(sender_id=teenchin_id, receiver_id=member_id, is_friend=0)
        if receive_friend.exists():
            receive_friend = receive_friend.first()
            receive_friend.is_friend = -1
            receive_friend.updated_date = timezone.now()
            receive_friend.save(update_fields=['is_friend', 'updated_date'])
            return Response("success")
        # 없다면 새로 생성
        Friend.objects.create(sender_id=member_id, receiver_id=teenchin_id)
        return Response("success")

    def patch(self, request):
        member_id = request.session.get('member').get('id')
        teenchin_id = request.data.get('teenchinId')

        # 혹시 이미 친구인데 넘어왔을 경우 바로 return
        send_friend = Friend.objects.filter(sender_id=member_id, receiver_id=teenchin_id, is_friend=1)
        if send_friend.exists():
            return Response("already exists")
        receive_friend = Friend.objects.filter(sender_id=teenchin_id, receiver_id=member_id, is_friend=1)
        if receive_friend.exists():
            return Response("already exists")

        send_friend = Friend.objects.filter(sender_id=member_id, receiver_id=teenchin_id, is_friend=-1)
        if send_friend.exists():
            send_friend = send_friend.first()
            send_friend.is_friend = 0
            send_friend.updated_date = timezone.now()
            send_friend.save(update_fields=['is_friend', 'updated_date'])
            return Response("success")
        receive_friend = Friend.objects.filter(sender_id=teenchin_id, receiver_id=member_id, is_friend=-1)
        if receive_friend.exists():
            receive_friend = receive_friend.first()
            receive_friend.is_friend = 0
            receive_friend.updated_date = timezone.now()
            receive_friend.save(update_fields=['is_friend', 'updated_date'])
            return Response("success")

        return Response("fail")

    def delete(self, request):
        member_id = request.session.get('member').get('id')
        teenchin_id = request.data.get('teenchinId')
        send_friend = Friend.objects.filter(sender_id=member_id, receiver_id=teenchin_id, is_friend=1)
        if send_friend.exists():
            send_friend = send_friend.first()
            send_friend.is_friend = 0
            send_friend.updated_date = timezone.now()
            send_friend.save(update_fields=['is_friend', 'updated_date'])
            return Response("success")
        receive_friend = Friend.objects.filter(sender_id=teenchin_id, receiver_id=member_id, is_friend=1)
        if receive_friend.exists():
            receive_friend = receive_friend.first()
            receive_friend.is_friend = 0
            receive_friend.updated_date = timezone.now()
            receive_friend.save(update_fields=['is_friend', 'updated_date'])
            return Response("success")

        return Response("fail")