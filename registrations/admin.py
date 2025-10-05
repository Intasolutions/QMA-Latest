from django.contrib import admin
from .models import Registration

@admin.register(Registration)
class RegistrationAdmin(admin.ModelAdmin):
    list_display = (
        "full_name", "email", "phone", "registration_type",
        "adults", "children", "consent", "created_at",
    )
    list_filter = ("registration_type", "consent", "created_at")
    search_fields = ("full_name", "email", "phone", "e_transfer_id")
    readonly_fields = ("created_at", "updated_at")
