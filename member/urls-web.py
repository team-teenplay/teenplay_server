from django.urls import path, include

from member.views import MemberLoginWebView, MemberJoinWebView, MypageInfoWebView, MypageDeleteWebView, \
    MypageLetterWebView, MypageWriteAPIWebView, MypageListAPIWebView, MypageDeleteAPIWebView, MypageCheckAPIWebViewMa, \
    MypageAlramView, MypageAlramAPIView, MypageAlramDeleteAPIView, MypageTeenchinview, MypageTeenchinAPIview, \
    MemberAlarmCountAPI, MypageTeenchindeleteview, MypageTeenchinLetterAPIview, MapagePaymentView, MypagePayListAPIVIEW, \
    MypagePayDeleteAPIVIEW, MypageReplyView, MypageReplyAPIVIEW, MypageReplyDeleteAPIVIEW, TeenChinAPI, \
    ClubAlarmManageAPI

app_name = 'member'

urlpatterns = [
    path('login/', MemberLoginWebView.as_view(), name='login'),
    path('join/', MemberJoinWebView.as_view(), name='join'),
    path('mypage-info/', MypageInfoWebView.as_view(), name='mypage-info'),
    path('mypage-delete/', MypageDeleteWebView.as_view(), name='mypage-delete'),
    path('mypage-letter/', MypageLetterWebView.as_view(), name='mypage-letter'),
    path('mypage-apiletter/', MypageWriteAPIWebView.as_view(), name='mypage-apiletter'),
    path('mypage-letter/<int:member_id>/<int:page>/', MypageListAPIWebView.as_view(), name='mypage-apilist'),
    path('mypage-letter/<int:letter_id>/', MypageDeleteAPIWebView.as_view(), name='mypage-apidelete'),
    path('mypage-letterapi/' , MypageCheckAPIWebViewMa.as_view(), name='mypage-apicheck'),
    path('mypage-alram/', MypageAlramView.as_view(), name='mypage-alram'),
    path('mypage-alram/<int:member_id>/<int:page>/',MypageAlramAPIView.as_view(), name='mypage-apialram'),
    path('mypage-alram/<int:alram_id>/', MypageAlramDeleteAPIView.as_view(), name='mypage-apideletealram'),
    path('mypage-teenchin/', MypageTeenchinview.as_view(), name='mypage-teenchin'),
    path('mypage-teenchin/<int:member_id>/<int:page>/', MypageTeenchinAPIview.as_view(), name='mypage-apiteenchin'),
    path('alarms/api/', MemberAlarmCountAPI.as_view(), name='alarms-count-api'),
    path('mypage-teenchin/<int:member_id>/<int:page>/', MypageTeenchinAPIview.as_view(), name='mypage-apiteenchin'),
    path('mypage-teenchin/<int:friend_id>/', MypageTeenchindeleteview.as_view(), name="mypage-apiteenchindelete"),
    path('mypage-teenchinapi/', MypageTeenchinLetterAPIview.as_view(), name="mypage-teenchinletter"),
    path('mypage-payment/', MapagePaymentView.as_view(), name='mapage-payment'),
    path('mypage-payment/<int:member_id>/<int:page>/', MypagePayListAPIVIEW.as_view(), name='mypage-paymentapl'),
    path('mypage-payment/<int:pay_id>/', MypagePayDeleteAPIVIEW.as_view(), name="mypage-paydelete"),
    path('mypage-reply/', MypageReplyView.as_view(), name="mypage-reply"),
    path('mypage-reply/<int:member_id>/<int:page>/', MypageReplyAPIVIEW.as_view(), name="mypage-apireply"),
    path('mypage-reply/<str:reply_id>/', MypageReplyDeleteAPIVIEW.as_view(), name="mypage-deletereply"),
    path('teenchin/api/', TeenChinAPI.as_view(), name="teenchin-api"),
    path('club-alarm/api/', ClubAlarmManageAPI.as_view(), name="club-alarm-manage-api")
]

