from django.shortcuts import render
from django.views import View


class ActivityCreateView(View):
    def get(self, request):
        return render(request, 'activity/web/activity-new-web.html')

    def post(self, request):
        data = request.POST
        data = {
            'club': '',
            'activity_title': '',
            'activity_content': '',
            'recruit_start': '',
            'recruit_end': '',
            'category': '',
            'activity_intro': '',
            'activity_address_location': '',
            'activity_address_detail': '',
            'thumbnail_path': '',
            'banner_path': '',
            'activity_start': '',
            'activity_end': '',
            'festival': '',
            'pay': '',
        }