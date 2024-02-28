from django.shortcuts import render
from django.views import View


class ClubIntroView(View):
    def get(self, request):
        return render(request, 'club/web/')
