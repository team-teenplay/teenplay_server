from django.contrib import admin
from django.urls import path, include

from festival.views import FestivalListView, FestivalListAPI, FestivalDetailView, FestivalDetailAPI

app_name = 'festival'

urlpatterns = [
    # list 페이지로 이동 후 list 페이지 경로 가져오기
    path('list/', FestivalListView.as_view(), name='festival-list'),
    path('list/<int:page>', FestivalListAPI.as_view(), name='festival-list-api'),
    # detail 페이지 이동 후 detail 페이지 경로 가져오기
    path('detail/', FestivalDetailView.as_view(), name='festival-detail'),
    path('detail/<int: post>', FestivalDetailAPI.as_view(), name='festival-detail-api'),
]
