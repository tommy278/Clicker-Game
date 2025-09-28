from django.urls import path
from . import views

urlpatterns = [
    path('profile/', views.ProfileView.as_view(), name='profile-list'),
    path('leaderboard/', views.Leaderboard.as_view(), name='leaderboard'),
]