from rest_framework import serializers
from .models import Registration

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
        fields = [
            "id", "full_name", "email", "phone", "address",
            "e_transfer_id", "adults", "children", "registration_type",
            "consent", "created_at",
        ]
        read_only_fields = ["id", "created_at"]

    def validate(self, attrs):
        if attrs.get("adults", 0) == 0 and attrs.get("children", 0) == 0:
            raise serializers.ValidationError("Please specify at least 1 adult or child.")
        return attrs
