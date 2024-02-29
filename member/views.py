from django.shortcuts import render
from django.views import View


class MemberLoginView(View):
    def get(self, request):
        return render(request, 'member/web/login-web.html')


class MemberJoinView(View):
    def get(self, request):
        return render(request, 'member/web/join-web.html')
