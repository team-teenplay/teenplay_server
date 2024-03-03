from django.shortcuts import render
from django.views import View


class ActivityCreateView(View):
    def get(self, request):
        return render(request, 'activity/web/activity-new-web.html')
    def post(self, request):
        pass