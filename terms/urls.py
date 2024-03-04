from django.urls import path

from terms.views import ServiceTermsView, RefundTermsView, PrivacyTermsView, MarketingTermsView, InformationTermsView, \
    EmailTermsView, EBankingTermsView

app_name = 'terms'

urlpatterns = [
    path('service/', ServiceTermsView.as_view(), name='service'),
    path('refund/', RefundTermsView.as_view(), name='refund'),
    path('privacy/', PrivacyTermsView.as_view(), name='privacy'),
    path('marketing/', MarketingTermsView.as_view(), name='marketing'),
    path('information/', InformationTermsView.as_view(), name='information'),
    path('email/', EmailTermsView.as_view(), name='email'),
    path('e-banking/', EBankingTermsView.as_view(), name='e-banking')
]