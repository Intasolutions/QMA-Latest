# api/models.py
from django.db import models
from django.core.validators import FileExtensionValidator
from django.core.exceptions import ValidationError
from datetime import date


class Announcement(models.Model):
    title = models.CharField(max_length=200)
    date = models.DateField()
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='announcements/', blank=True, null=True)
    # NEW: optional PDF attachment
    pdf = models.FileField(
        upload_to='announcements/pdfs/',
        blank=True,
        null=True,
        validators=[FileExtensionValidator(allowed_extensions=['pdf'])]
    )

    def __str__(self):
        return f'{self.title} ({self.date})'


class GalleryImage(models.Model):
    # src -> this file (URL returned by the serializer)
    image = models.ImageField(upload_to='gallery/')
    # NEW: additional fields you wanted
    year = models.PositiveIntegerField(blank=True, null=True)
    event = models.CharField(max_length=200, blank=True)

    def clean(self):
        """
        Optional sanity checks for 'year'.
        Adjust or remove if you don't need validation.
        """
        if self.year:
            current = date.today().year
            if self.year < 1900 or self.year > current + 1:
                raise ValidationError({'year': f'Year must be between 1900 and {current + 1}.'})

    def __str__(self):
        label = self.event or self.image.name
        return f'{label} ({self.year})' if self.year else label
