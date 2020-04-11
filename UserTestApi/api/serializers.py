from rest_framework import serializers

from .models import User


class UserSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField(required=False)
    email = serializers.EmailField(
        required=True
    )
    password = serializers.CharField(min_length=2, write_only=True)
    country = serializers.CharField()

    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'country']
        extra_kwargs = {'password': {'write_only': True}}
