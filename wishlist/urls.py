from django.urls import path

from wishlist.views import WishListView

app_name = 'wishlist'

urlpatterns = [
    path('list/', WishListView.as_view(), name='list')
]