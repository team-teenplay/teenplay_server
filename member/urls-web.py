from django.urls import path, include

from member.views import MemberLoginWebView, MemberJoinWebView, MypageInfoWebView, MypageDeleteWebView, \
    MypageLetterWebView, MypageWriteAPIWebView, MypageListAPIWebView, MypageDeleteAPIWebView, MypageCheckAPIWebViewMa

app_name = 'member'

urlpatterns = [
    path('login/', MemberLoginWebView.as_view(), name='login'),
    path('join/', MemberJoinWebView.as_view(), name='join'),
    path('mypage-info/', MypageInfoWebView.as_view(), name='mypage-info'),
    path('meypage-delete/', MypageDeleteWebView.as_view(), name='mypage-delete'),
    path('mypage-letter/', MypageLetterWebView.as_view(), name='mypage-letter'),
    path('mypage-apiletter/', MypageWriteAPIWebView.as_view(), name='mypage-apiletter'),
    path('mypage-letter/<int:member_id>/<int:page>/', MypageListAPIWebView.as_view(), name='mypage-apilist'),
    path('mypage-letter/<int:letter_id>/', MypageDeleteAPIWebView.as_view(), name='mypage-apidelete'),
    path('mypage-letterapi/' , MypageCheckAPIWebViewMa.as_view(), name='mypage-apicheck')
]