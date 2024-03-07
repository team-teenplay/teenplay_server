from django.urls import path

from wishlist.views import WishListView, WishListAPI, WishListWriteAPI, WishListCategoryAPI

app_name = 'wishlist'

urlpatterns = [
    path('main/', WishListView.as_view(), name='main'),
    path('write/', WishListWriteAPI.as_view(), name='main'),
    path('list/<int:page>/', WishListAPI.as_view(), name='list'),
    path('<str:category>/<int:page>/', WishListCategoryAPI.as_view(), name='category_list'),
]