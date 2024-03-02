from django.contrib import admin
from django.urls import path, include

from club.views import ClubIntroView, ClubPrPostsView, ClubCreateView, ClubDetailView

app_name = 'club'

urlpatterns = [
    path('intro/', ClubIntroView.as_view(), name='intro'),
    path('create/', ClubCreateView.as_view(), name='create'),
    path('detail/', ClubDetailView.as_view(), name='detail'),
    path('pr-posts/', ClubPrPostsView.as_view(), name='pr-posts'),
]
