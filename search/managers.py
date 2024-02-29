from django.db import models


class RecentSearchManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter().order_by('-id')[:6]