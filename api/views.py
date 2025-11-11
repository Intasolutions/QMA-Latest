# /srv/qma/api/views.py
from rest_framework import viewsets, mixins
from rest_framework.permissions import AllowAny
from .models import Announcement, GalleryImage
from .serializers import AnnouncementSerializer, GalleryImageSerializer

class ReadOnlyModelViewSet(mixins.ListModelMixin,
                           mixins.RetrieveModelMixin,
                           viewsets.GenericViewSet):
    permission_classes = [AllowAny]

    def get_serializer_context(self):
        ctx = super().get_serializer_context()
        ctx["request"] = self.request
        return ctx

class AnnouncementViewSet(ReadOnlyModelViewSet):
    queryset = Announcement.objects.order_by("-date")
    serializer_class = AnnouncementSerializer

class GalleryImageViewSet(ReadOnlyModelViewSet):
    # Hide entries with empty image so UI has something to render
    queryset = (GalleryImage.objects
                .exclude(image__isnull=True)
                .exclude(image__exact="")
                .order_by("-id"))
    serializer_class = GalleryImageSerializer
