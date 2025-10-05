# api/serializers.py
from rest_framework import serializers
from .models import Announcement, GalleryImage


class AnnouncementSerializer(serializers.ModelSerializer):
    date = serializers.DateField(format='%B %d, %Y')  # e.g. "August 25, 2025"
    image = serializers.ImageField(use_url=True, allow_null=True, required=False)
    pdf = serializers.FileField(use_url=True, allow_null=True, required=False)  # NEW

    class Meta:
        model = Announcement
        fields = ['id', 'title', 'date', 'description', 'image', 'pdf']


class GalleryImageSerializer(serializers.ModelSerializer):
    # Map "src" to the image field (frontend-friendly name)
    src = serializers.ImageField(source='image', use_url=True)

    class Meta:
        model = GalleryImage
        fields = ['id', 'src', 'year', 'event']
