# /srv/qma/registrations/serializers.py
from rest_framework import serializers
from .models import Registration


def normalize_registration_type(raw: str) -> str:
    if not isinstance(raw, str):
        return raw
    val = raw.strip().lower()

    # Build maps from Registration.registration_type choices dynamically
    field = Registration._meta.get_field("registration_type")
    choices_dict = dict(field.flatchoices)  # {code: label}

    label_to_code = {str(label).strip().lower(): code for code, label in choices_dict.items()}
    code_to_code  = {str(code).strip().lower(): code for code in choices_dict.keys()}

    aliases = {
        "family": "family", "fam": "family", "f": "family",
        "individual": "individual", "ind": "individual", "i": "individual",
        "student": "student", "stud": "student", "s": "student",
    }
    if val in aliases:
        val = aliases[val]

    if val in label_to_code:
        return label_to_code[val]
    if val in code_to_code:
        return code_to_code[val]
    return raw


# Detect which boolean field actually exists on the model: "agree" or "consent"
_field_names = {f.name for f in Registration._meta.get_fields()}
CONSENT_FIELD = "agree" if "agree" in _field_names else ("consent" if "consent" in _field_names else None)


class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
        # Base fields common to all
        _fields = [
            "id",
            "full_name",
            "email",
            "phone",
            "address",
            "e_transfer_id",
            "adults",
            "children",
            "registration_type",
            "created_at",
        ]
        if CONSENT_FIELD:
            _fields.insert(-1, CONSENT_FIELD)  # put before created_at
        fields = _fields
        read_only_fields = ["id", "created_at"]

    def to_internal_value(self, data):
        """
        Be lenient with client payloads:
          - accept `etransfer_id` as alias of `e_transfer_id`
          - accept flexible `registration_type` values and normalize them
          - accept `agree` or `consent` from the client and store into the actual model field
        """
        data = dict(data)  # shallow copy

        # etransfer_id -> e_transfer_id
        if "etransfer_id" in data and "e_transfer_id" not in data:
            data["e_transfer_id"] = data.pop("etransfer_id")

        # normalize registration_type
        if "registration_type" in data:
            data["registration_type"] = normalize_registration_type(data["registration_type"])

        # consent/agree aliasing
        if CONSENT_FIELD:
            if CONSENT_FIELD not in data:
                # prefer explicit key if provided
                if "agree" in data:
                    data[CONSENT_FIELD] = data["agree"]
                elif "consent" in data:
                    data[CONSENT_FIELD] = data["consent"]

        return super().to_internal_value(data)

    def validate(self, attrs):
        # Require at least one attendee
        if attrs.get("adults", 0) == 0 and attrs.get("children", 0) == 0:
            raise serializers.ValidationError("Please specify at least 1 adult or child.")
        return attrs
