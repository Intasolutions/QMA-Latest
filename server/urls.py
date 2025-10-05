from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from django.conf import settings
from django.conf.urls.static import static

def health(request):
    return JsonResponse({"status": "ok"})

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("api.urls")),                # /api/announcements/, /api/gallery/
    path("api/", include("registrations.urls")),      # /api/registrations/
    path("health/", health),
]

# serve media in prod via nginx; but this lets runserver/gunicorn serve if needed
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
