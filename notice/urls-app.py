from django.contrib import admin
from django.urls import path, include

from notice.views import NoticeListAPPView

app_name = 'notice'

urlpatterns = [
    path('list/', NoticeListAPPView.as_view(), name='notice-list'),
]
