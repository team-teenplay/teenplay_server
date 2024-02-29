from allauth.socialaccount.models import SocialAccount
from django.shortcuts import render, redirect
from django.views import View


class OAuthLoginView(View):
    def get(self, request):
        user = SocialAccount.objects.get(user=request.user)
        provider = user.provider
        data = user.extra_data
        return render(request, 'member/web/join-web.html')
