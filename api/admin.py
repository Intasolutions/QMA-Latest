# api/admin.py
from django.contrib import admin
from .models import Announcement, GalleryImage


@admin.register(Announcement)
class AnnouncementAdmin(admin.ModelAdmin):
    list_display = ("title", "date", "image", "pdf")
    list_filter = ("date",)
    search_fields = ("title", "description")
    ordering = ("-date",)


@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ("event", "year", "image")
    list_filter = ("year",)
    search_fields = ("event",)
    ordering = ("-id",)
