from django.contrib.auth.models import AbstractUser
# from django.utils.translation import ugettext_lazy as _
from django.db import models


class User(AbstractUser):
    username = models.CharField(blank=True, null=True, max_length=60)
    email = models.EmailField(unique=True)
    country = models.CharField(max_length=50)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email
