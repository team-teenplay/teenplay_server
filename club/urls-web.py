from django.contrib import admin
from django.urls import path, include

from club.views import ClubIntroView, ClubPrPostsView, ClubCreateView, ClubDetailView, ClubAPI, ClubMemberAPI, \
    ClubNoticeAPI, ClubActivityAPI

app_name = 'club'

urlpatterns = [
    path('intro/', ClubIntroView.as_view(), name='intro'),
    path('create/', ClubCreateView.as_view(), name='create'),
    path('detail/', ClubDetailView.as_view(), name='detail'),
    path('detail/api/<int:club_id>', ClubAPI.as_view(), name='club-api'),
    path('club-member/api/', ClubMemberAPI.as_view(), name='club-member-api'),
    path('club-activity/api/', ClubActivityAPI.as_view(), name='club-activity-api'),
    path('club-notice/api/', ClubNoticeAPI.as_view(), name='club-notice-api'),
    path('pr-post-list/', ClubPrPostsView.as_view(), name='pr-post-list'),
    path('pr-post-detail/', ClubPrPostsView.as_view(), name='pr-post-detail'),
    path('pr-post-write/', ClubPrPostsView.as_view(), name='pr-post-write'),
    path('pr-post-update/', ClubPrPostsView.as_view(), name='pr-post-update'),
]
