from django.contrib import admin
from django.urls import path, include

from teenplay.views import TeenplayMainListAPIView, TeenplayMainListWebView, TeenPlayLikeApiView, TeenplayClubView, TeenplayClubAPIView

app_name = 'teenplay'

urlpatterns = [
    path('all/', TeenplayMainListWebView.as_view(), name='teenplay-main-list'),
    path('all/new/api/<int:slideNumber>/', TeenplayMainListAPIView.as_view(), name='teenplay-main-list-new'),
    path('all/like/api/<int:emptyValue>/<int:memberSessionId>/<str:displayStyle>/', TeenPlayLikeApiView.as_view(), name='teenplay-like-new'),
    path('club/select/', TeenplayClubView.as_view(), name='teenplay-club-list'),
    path('club/select/api/<int:clubId>/<int:page>/', TeenplayClubAPIView.as_view())

]


# 실제로 예상하는 url
# 틴플레이 접근 방식은 총 2가지가 있다.


