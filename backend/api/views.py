from django.shortcuts import render
from django.contrib.auth.models import User
from .serializer import ProfileSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics
from .models import Profile

# Create your views here.
class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'user'

    def get_queryset(self):
        user = self.request.user
        return Profile.objects.filter(user=user)
    
    def get_object(self):
        profile, __ = Profile.objects.get_or_create(user=self.request.user)
        profile.get_current_details()
        return profile
    
class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    queryset = User.objects.all()

class Leaderboard(generics.ListAPIView):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.order_by('-counter')[:10]
    permission_classes = [AllowAny]
