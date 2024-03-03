from django.shortcuts import render, redirect
from django.views import View
from rest_framework.response import Response
from rest_framework.views import APIView

from member.models import AdminAccount
from member.serializers import AdminAccountSerializer
from notice.models import Notice


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

        context = {'admin_data' : None}

        if admin.exists():
            admin_data = AdminAccountSerializer(admin.first()).data
            context['admin_data'] = admin_data

        return render(request, 'admin/web/user-web.html', context)

        # url = 'admin/web/admin-login-web.html'
        #
        # if admin.exists():
        #     request.session['admin'] = AdminAccountSerializer(admin.first()).data
        #
        #     url = 'admin/web/user-web.html'
        #
        # return redirect(url)


# 관리자 유저 페이지로 이동
class AdminUserView(View):
    def get(self, request):
        return render(request, 'admin/web/user-web.html')


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

