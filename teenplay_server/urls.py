"""
URL configuration for teenplay_server project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

from main.views import MainView, FooterNoticeLatestAPI
from teenplay_server.views import AdminLoginView, AdminUserView, CompanyIntroductionView, CompanyNoticeListAPI, \
    AdminMessageView, AdminTeenplayView, AdminPromoteView, AdminActivityView, AdminWishlistView, AdminMeetingView, \
    AdminFestivalView, AdminFestivalWrite, AdminNoticeView, AdminNoticeWriteView, AdminCommentView, AdminUserUpdateView

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('club/', include('club.urls-web')),
    path('clubs/', include('club.urls-web')),
    path('app/club/', include('club.urls-app')),
    path('app/clubs/', include('club.urls-app')),
    path('member/', include('member.urls-web')),
    path('app/member/', include('member.urls-app')),
    path('accounts/', include('allauth.urls')),
    path('oauth/', include('oauth.urls')),
    path('teenplay/', include('teenplay.urls-web')),
    path('app/teenplay/', include('teenplay.urls-app')),
    path('notice/', include('notice.urls-web')),
    path('app/notice/', include('notice.urls-app')),
    path('festival/', include('festival.urls-web')),
    path('app/festival/', include('festival.urls-app')),
    path('admin/login/', AdminLoginView.as_view(), name='admin-login'),
    path('admin/user/', AdminUserView.as_view(), name='admin-user'),
    path('admin/user/update/', AdminUserUpdateView.as_view(), name='admin-user-update'),
    # path('admin/users/<int:page>/', AdminUserAPI.as_view(), name='admin-user-api'),
    path('admin/message/', AdminMessageView.as_view(), name='admin-message'),
    path('admin/teenplay/', AdminTeenplayView.as_view(), name='admin-teenplay'),
    path('admin/promote/', AdminPromoteView.as_view(), name='admin-promote'),
    path('admin/activity/', AdminActivityView.as_view(), name='admin-activity'),
    path('admin/wishlist/', AdminWishlistView.as_view(), name='admin-wishlist'),
    path('admin/meeting/', AdminMeetingView.as_view(), name='admin-meeting'),
    path('admin/festival/', AdminFestivalView.as_view(), name='admin-festival'),
    path('admin/festival/write/', AdminFestivalWrite.as_view(), name='admin-festival-write'),
    path('admin/notice/', AdminNoticeView.as_view(), name='admin-notice'),
    path('admin/notice/write/', AdminNoticeWriteView.as_view(), name='admin-notice-write'),
    path('admin/comment/', AdminCommentView.as_view(), name='admin-comment'),
    path('terms/', include('terms.urls-web')),
    path('app/terms/', include('terms.urls-app')),
    path('activity/', include('activity.urls-web')),
    path('app/activity/', include('activity.urls-app')),
    path('company/', CompanyIntroductionView.as_view(), name='company'),
    path('app/company/', CompanyIntroductionView.as_view(), name='company'),
    path('company/notice/api/<int:page>/', CompanyNoticeListAPI.as_view(), name='company-api'),
    path('footer/notice/api/', FooterNoticeLatestAPI.as_view(), name='footer-notice-api'),
    path('pay/', include('pay.urls')),
    path('wishlist/', include('wishlist.urls')),
    path('', MainView.as_view())
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
