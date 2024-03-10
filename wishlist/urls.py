from django.urls import path

from wishlist.views import WishListView, WishListAPI, WishListWriteAPI, ReplyWriteAPI, ReplyListAPI, TagListAPI

app_name = 'wishlist'

urlpatterns = [
    path('main/', WishListView.as_view(), name='main'),
    path('write/', WishListWriteAPI.as_view(), name='write'),
    path('list/<int:page>/', WishListAPI.as_view(), name='list'),
    path('reply/write/', ReplyWriteAPI.as_view(), name='apply-write'),
    path('reply/list/', ReplyListAPI.as_view(), name='apply-list'),
    path('tag/list/<int:page>/', TagListAPI.as_view(), name='tag-list'),
]