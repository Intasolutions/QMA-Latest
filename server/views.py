# /srv/qma/server/views.py
from django.http import JsonResponse, HttpRequest
from django.views.decorators.csrf import ensure_csrf_cookie

def health(request: HttpRequest) -> JsonResponse:
    return JsonResponse({"status": "ok"})

@ensure_csrf_cookie
def csrf_ok(request: HttpRequest) -> JsonResponse:
    """
    Sets the 'csrftoken' cookie on GET so the SPA can POST with X-CSRFToken.
    """
    return JsonResponse({"detail": "ok"})
