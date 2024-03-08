from django.contrib import admin
from django.urls import path, include

from activity.views import ActivityCreateWebView, ActivityDetailWebView, ActivityLikeAPI, ActivityReplyAPI, \
    ActivityLikeCountAPI, ActivityListWebView

app_name = 'activity'

urlpatterns = [
    path('create/', ActivityCreateWebView.as_view(), name='create'),
    path('detail/', ActivityDetailWebView.as_view(), name='detail'),
    path('replies/api/', ActivityReplyAPI.as_view(), name='reply-api'),
    path('like/', ActivityLikeAPI.as_view(), name='like'),
    path('likes/api/', ActivityLikeCountAPI.as_view(), name='like-count'),
    path('list/', ActivityListWebView.as_view(), name='list')
]
