from django.urls import path, include

from member.views import MemberLoginView, MemberJoinView

app_name = 'member'

urlpatterns = [
    path('login/', MemberLoginView.as_view(), name='login'),
    path('join/', MemberJoinView.as_view(), name='join')
]