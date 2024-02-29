from django.db import models


class WishListManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().fliter(status=True)