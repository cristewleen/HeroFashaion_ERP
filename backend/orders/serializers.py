# orders/serializers.py
from rest_framework import serializers
from .models import OrderDetailStyle

class OrderDetailStyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderDetailStyle
        fields = '__all__'  # This exposes all fields from the model in the API