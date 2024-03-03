from django.shortcuts import render
from django.views import View


class ServiceTermsView(View):
    def get(self, request):
        return render(request, 'terms/service-terms-web.html')


class RefundTermsView(View):
    def get(self, request):
        return render(request, 'terms/refund-terms-web.html')


class PrivacyTermsView(View):
    def get(self, request):
        return render(request, 'terms/privacyprovision-web.html')


class MarketingTermsView(View):
    def get(self, request):
        return render(request, 'terms/marketing-terms-web.html')


class InformationTermsView(View):
    def get(self, request):
        return render(request, 'terms/information-web.html')


class EmailTermsView(View):
    def get(self, request):
        return render(request, 'terms/email-terms-web.html')


class EBankingTermsView(View):
    def get(self, request):
        return render(request, 'terms/e-banking-terms-web.html')
