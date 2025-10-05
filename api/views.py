# C:\Users\91811\Downloads\canada\api\views.py
from rest_framework import viewsets, mixins
from rest_framework.permissions import AllowAny
from .models import Announcement, GalleryImage
from .serializers import AnnouncementSerializer, GalleryImageSerializer

class ReadOnlyModelViewSet(mixins.ListModelMixin,
                           mixins.RetrieveModelMixin,
                           viewsets.GenericViewSet):
    permission_classes = [AllowAny]

class AnnouncementViewSet(ReadOnlyModelViewSet):
    queryset = Announcement.objects.order_by('-date')
    serializer_class = AnnouncementSerializer

class GalleryImageViewSet(ReadOnlyModelViewSet):
    queryset = GalleryImage.objects.order_by('-id')
    serializer_class = GalleryImageSerializer
