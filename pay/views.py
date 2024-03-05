from django.db import transaction
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView

from member.models import Member
from pay.models import Pay
from pay.serializers import PaySerializer


class PayCreateAPI(APIView):

    @transaction.atomic
    def get(self, request):
        member_id = request.GET['memberId']
        member = Member.enabled_objects.filter(id=member_id)
        if member.exists():
            pay = Pay.objects.create(member=member.first())
            pay = PaySerializer(pay).data
            pay = {
                'pay': pay
            }
            print(pay)
            return Response(pay)

        return None
