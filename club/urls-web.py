from django.contrib import admin
from django.urls import path, include

from club.views import ClubIntroView, ClubCreateView, ClubDetailView, ClubAPI, ClubMemberAPI, \
    ClubNoticeAPI, ClubOngoingActivityAPI, ClubFinishedActivityAPI, ClubPrPostWriteView, ClubPrPostDetailView, \
    ClubPrPostView

app_name = 'club'

urlpatterns = [
    path('intro/', ClubIntroView.as_view(), name='intro'),
    path('create/', ClubCreateView.as_view(), name='create'),
    path('detail/', ClubDetailView.as_view(), name='detail'),
    path('detail/api/<int:club_id>', ClubAPI.as_view(), name='club-api'),
    path('club-member/api/<int:member_id>/<int:club_id>/', ClubMemberAPI.as_view(), name='club-member-api'),
    path('club-ongoing-activity/api/<int:club_id>/', ClubOngoingActivityAPI.as_view(), name='club-ongoing-activity-api'),
    path('club-finished-activity/api/<int:club_id>/<int:page>/', ClubFinishedActivityAPI.as_view(), name='club-finished-activity-api'),
    path('club-notice/api/<int:club_id>/<int:page>/', ClubNoticeAPI.as_view(), name='club-notice-api'),
    path('pr-post-list/', ClubPrPostView.as_view(), name='pr-post-list'),
    path('pr-post-detail/', ClubPrPostDetailView.as_view(), name='pr-post-detail'),
    path('pr-post-write/', ClubPrPostWriteView.as_view(), name='pr-post-write'),
    path('pr-post-update/', ClubPrPostView.as_view(), name='pr-post-update'),

]
