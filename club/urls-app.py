from django.contrib import admin
from django.urls import path, include

from club.views import ClubIntroView, ClubPrPostView, ClubCreateView, ClubDetailView, ClubAPI

app_name = 'app-club'

urlpatterns = [
    path('intro/', ClubIntroView.as_view(), name='intro'),
    path('create/', ClubCreateView.as_view(), name='create'),
    path('detail/', ClubDetailView.as_view(), name='detail'),
    path('details/api/<int:club_id>', ClubAPI.as_view(), name='club-api'),
    path('pr-post-list/', ClubPrPostView.as_view(), name='pr-post-list'),
    path('pr-post-detail/', ClubPrPostView.as_view(), name='pr-post-detail'),
    path('pr-post-write/', ClubPrPostView.as_view(), name='pr-post-write'),
    path('pr-post-update/', ClubPrPostView.as_view(), name='pr-post-update'),
]
