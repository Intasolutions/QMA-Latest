# /srv/qma/api/serializers.py
from __future__ import annotations
from typing import Optional, Union
from urllib.parse import urlparse

from django.conf import settings
from rest_framework import serializers
from .models import Announcement, GalleryImage

def _to_url(request, val: Union[str, object, None]) -> Optional[str]:
    """
    Return an absolute URL for either:
      - FileField / ImageField (has .url)
      - plain string path or absolute URL
    """
    if not val:
        return None

    # Case 1: FileField / ImageField
    try:
        url = getattr(val, "url", None)
        if url:
            return request.build_absolute_uri(url) if request else url
    except Exception:
        pass

    # Case 2: string path or absolute URL
    if isinstance(val, str):
        s = val.strip()
        if not s:
            return None
        parsed = urlparse(s)
        if parsed.scheme in ("http", "https"):
            return s
        base = (settings.MEDIA_URL or "/media/").rstrip("/") + "/"
        url = base + s.lstrip("/")
        return request.build_absolute_uri(url) if request else url

    return None

class AnnouncementSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    pdf   = serializers.SerializerMethodField()
    date  = serializers.DateField(format="%B %d, %Y")

    class Meta:
        model  = Announcement
        fields = ["id", "title", "date", "description", "image", "pdf"]

    def get_image(self, obj):
        return _to_url(self.context.get("request"), getattr(obj, "image", None))

    def get_pdf(self, obj):
        return _to_url(self.context.get("request"), getattr(obj, "pdf", None))

class GalleryImageSerializer(serializers.ModelSerializer):
    src = serializers.SerializerMethodField()

    class Meta:
        model  = GalleryImage
        fields = ["id", "src", "year", "event"]

    def get_src(self, obj):
        return _to_url(self.context.get("request"), getattr(obj, "image", None))
