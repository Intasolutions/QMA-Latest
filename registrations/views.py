from rest_framework import mixins, viewsets, permissions, authentication
from .models import Registration
from .serializers import RegistrationSerializer

class CsrfExemptSessionAuthentication(authentication.SessionAuthentication):
    def enforce_csrf(self, request):
        return  # disable CSRF for this API only

class RegistrationViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Registration.objects.order_by("-id")
    serializer_class = RegistrationSerializer
    authentication_classes = [CsrfExemptSessionAuthentication]

    def get_permissions(self):
        # allow anonymous preflight and create
        if self.action == "create" or self.request.method in ("OPTIONS", "HEAD"):
            return [permissions.AllowAny()]
        # protect reads
        if self.action in ("list", "retrieve"):
            return [permissions.IsAdminUser()]
        # default: be permissive (nothing else is exposed)
        return [permissions.AllowAny()]
