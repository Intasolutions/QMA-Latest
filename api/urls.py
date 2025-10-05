# C:\Users\91811\Downloads\canada\api\urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AnnouncementViewSet, GalleryImageViewSet

router = DefaultRouter()
router.register(r'announcements', AnnouncementViewSet, basename='announcements')
router.register(r'gallery',       GalleryImageViewSet, basename='gallery')

urlpatterns = [
    path('', include(router.urls)),
]
