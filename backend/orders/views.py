from django.shortcuts import render

# Create your views here.
# orders/views.py
from rest_framework import viewsets
from .models import OrderDetailStyle
from .serializers import OrderDetailStyleSerializer

class OrderDetailStyleViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Order Detail Styles to be viewed or edited.
    Provides full CRUD functionality.
    """
    queryset = OrderDetailStyle.objects.all()
    serializer_class = OrderDetailStyleSerializer
    
    # Optional: You can add permission classes, filtering, pagination settings here
    # from rest_framework.permissions import IsAuthenticated
    # permission_classes = [IsAuthenticated]