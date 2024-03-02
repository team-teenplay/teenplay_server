from django.urls import path

from wishlist.views import WishListView, WishListWriteView, WishListAPI

app_name = 'wishlist'

urlpatterns = [
    path('wishlist/', WishListView.as_view(), name='list'),
    path('wishlist/', WishListWriteView.as_view(), name='write'),
    path('wishlist/', WishListAPI.as_view(), name='list-api')
]