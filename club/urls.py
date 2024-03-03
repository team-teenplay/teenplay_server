from django.contrib import admin
from django.urls import path, include

from club.views import ClubIntroView, ClubPrPostsView, ClubCreateView, ClubDetailView, ClubAPI

app_name = 'club'

urlpatterns = [
    path('intro/', ClubIntroView.as_view(), name='intro'),
    path('create/', ClubCreateView.as_view(), name='create'),
    path('detail/', ClubDetailView.as_view(), name='detail'),
    path('details/<int:club_id>', ClubAPI.as_view(), name='club-api'),
    path('pr-posts/', ClubPrPostsView.as_view(), name='pr-posts'),
]
