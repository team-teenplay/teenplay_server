from django.urls import path

from pay.views import PayCreateAPI

app_name = 'pay'

urlpatterns = [
    path('create/', PayCreateAPI.as_view(), name='create')
]