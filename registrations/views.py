from rest_framework import mixins, viewsets, permissions
from .models import Registration
from .serializers import RegistrationSerializer

class RegistrationViewSet(mixins.CreateModelMixin,
                          mixins.RetrieveModelMixin,
                          mixins.ListModelMixin,
                          viewsets.GenericViewSet):
    queryset = Registration.objects.order_by("-created_at")
    serializer_class = RegistrationSerializer

    def get_permissions(self):
        if self.action == "create":
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]
