from django.contrib import admin
from django.urls import path, include

from activity.views import ActivityCreateView

app_name = 'activity'

urlpatterns = [
    path('create/', ActivityCreateView.as_view(), name='create'),
]
