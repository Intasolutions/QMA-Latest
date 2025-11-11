# /srv/qma/api/admin.py
from __future__ import annotations
import os
from typing import Optional
from django.contrib import admin
from django.utils.html import format_html
from .models import Announcement, GalleryImage

def _safe_storage_path(filefield) -> Optional[str]:
    try:
        return filefield.path
    except Exception:
        return None

def _exists(filefield) -> bool:
    if not filefield or not getattr(filefield, "name", None):
        return False
    p = _safe_storage_path(filefield)
    if p is None:
        try:
            return bool(getattr(filefield, "url", ""))
        except Exception:
            return False
    try:
        return os.path.exists(p)
    except Exception:
        return False

def _safe_url(filefield) -> str:
    try:
        return getattr(filefield, "url", "") or ""
    except Exception:
        return ""

def _thumb_html(filefield, h: int = 60) -> str:
    if not _exists(filefield):
        return "—"
    u = _safe_url(filefield)
    if not u:
        return "—"
    return format_html('<img src="{}" style="height:{}px;object-fit:cover;border-radius:6px;">', u, h)

def _file_link_html(filefield, label: str = "open") -> str:
    if not _exists(filefield):
        return "—"
    u = _safe_url(filefield)
    if not u:
        return "—"
    return format_html('<a href="{}" target="_blank" rel="noopener">{}</a>', u, label)

@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display    = ("id", "event", "year", "thumb")
    list_filter     = ("year",)
    search_fields   = ("event",)
    readonly_fields = ("thumb",)
    ordering        = ("-id",)
    list_per_page   = 50

    def thumb(self, obj):
        return _thumb_html(getattr(obj, "image", None))
    thumb.short_description = "Preview"

@admin.register(Announcement)
class AnnouncementAdmin(admin.ModelAdmin):
    list_display    = ("id", "title", "date", "thumb", "pdf_link")
    list_filter     = ("date",)
    search_fields   = ("title", "description")
    readonly_fields = ("thumb", "pdf_link")
    ordering        = ("-date",)
    list_per_page   = 50

    def thumb(self, obj):
        return _thumb_html(getattr(obj, "image", None))
    thumb.short_description = "Preview"

    def pdf_link(self, obj):
        return _file_link_html(getattr(obj, "pdf", None))
    pdf_link.short_description = "PDF"
