from django.db.models import F
from django.shortcuts import render, redirect
from django.views import View
from rest_framework.response import Response
from rest_framework.views import APIView

from member.models import Member
from teenplay_server.category import Category
from wishlist.models import Wishlist, WishlistReply


class WishListView(View):
    # 페이지 이동
    def get(self, request):
        return render(request, 'wishlist/web/wishlist-web.html')









