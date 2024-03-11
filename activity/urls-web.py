from django.contrib import admin
from django.urls import path, include

from activity.views import ActivityCreateWebView, ActivityDetailWebView, ActivityLikeAPI, ActivityReplyAPI, \
    ActivityLikeCountAPI, ActivityListWebView, ActivityListAPI

app_name = 'activity'

urlpatterns = [
    path('create/', ActivityCreateWebView.as_view(), name='create-web'),
    path('detail/', ActivityDetailWebView.as_view(), name='detail-web'),
    path('replies/api/', ActivityReplyAPI.as_view(), name='reply-api'),
    path('like/', ActivityLikeAPI.as_view(), name='like-api'),
    path('likes/api/', ActivityLikeCountAPI.as_view(), name='like-count-api'),
    path('list/', ActivityListWebView.as_view(), name='list-web'),
    path('lists/api/', ActivityListAPI.as_view(), name='lists-api')
]
