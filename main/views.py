from django.shortcuts import render
from django.views import View


class MainView(View):
    def get(self, request):
        # 아직 로직 작성 안하고 띄우기만 하겠습니다.
        return render(request, 'main/web/main-web.html')
