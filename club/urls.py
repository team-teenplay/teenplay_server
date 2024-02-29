from django.contrib import admin
from django.urls import path, include

from club.views import ClubIntroView

app_name = 'club'

urlpatterns = [
    path('web/club-intro-web/', ClubIntroView.as_view(), name='club-intro-web'),
]