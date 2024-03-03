from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView

from member.models import Member
from pay.models import Pay


class PayCreateAPI(APIView):
    def get(self, request):
        member_id = request.GET['memberId']
        member = Member.enabled_objects.filter(id=member_id)
        if member.exists():
            pay = Pay.objects.create(member=member.first())
            pay = {
                'pay': pay
            }
            return Response(pay)

        return None
