from django.shortcuts import render, redirect
from django.views import View

from member.models import AdminAccount
from member.serializers import AdminAccountSerializer


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

