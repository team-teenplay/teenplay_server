from django.urls import path, include

from member.views import MemberLoginWebView, MemberJoinWebView, MypageInfoWebView, MypageDeleteWebView

app_name = 'member'

urlpatterns = [
    path('login/', MemberLoginWebView.as_view(), name='login'),
    path('join/', MemberJoinWebView.as_view(), name='join'),
    path('mypage-info/', MypageInfoWebView.as_view(), name='mypage-info'),
    path('meypage-delete', MypageDeleteWebView.as_view(), name='mypage-delete')
]