from django.db import models
from django.core.validators import MinValueValidator

class Registration(models.Model):
    class RegType(models.TextChoices):
        INDIVIDUAL = "Individual", "Individual"
        FAMILY = "Family", "Family"
        STUDENT = "Student", "Student"

    full_name = models.CharField(max_length=120)
    email = models.EmailField()
    phone = models.CharField(max_length=30)
    address = models.TextField()

    e_transfer_id = models.CharField(max_length=120)

    adults = models.PositiveIntegerField(default=0, validators=[MinValueValidator(0)])
    children = models.PositiveIntegerField(default=0, validators=[MinValueValidator(0)])

    registration_type = models.CharField(max_length=16, choices=RegType.choices)
    consent = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.full_name} – {self.registration_type} ({self.adults}+{self.children})"
