from django.contrib import admin
from django.urls import path, include

from teenplay.views import TeenplayMainListAPIView, TeenplayMainListWebView, TeenPlayLikeAPIView, TeenplayClubView, \
    TeenplayClubAPIView, TeenPlayClubLikeAPIView

app_name = 'teenplay'

urlpatterns = [
    path('all/', TeenplayMainListWebView.as_view(), name='teenplay-main-list'),
    path('all/new/api/<int:slideNumber>/', TeenplayMainListAPIView.as_view()),
    path('all/like/api/<int:emptyValue>/<int:memberSessionId>/<str:displayStyle>/', TeenPlayLikeAPIView.as_view()),
    path('club/select/<int:teenplayId>', TeenplayClubView.as_view(), name='teenplay-club-select-list'),
    path('club/select/api/<int:clubId>/<int:page>/', TeenplayClubAPIView.as_view()),
    path('club/select/like/api/<int:emptyValue>/<int:memberSessionId>/<str:displayStyle>/', TeenPlayClubLikeAPIView.as_view()),
]


# 실제로 예상하는 url
# 틴플레이 접근 방식은 총 2가지가 있다.


