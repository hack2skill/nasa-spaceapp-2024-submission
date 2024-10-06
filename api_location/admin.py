from django.contrib import admin
from .models import Location

@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ('place_name', 'latitude', 'longitude')  # Fields to display in the list view
    search_fields = ('place_name',)  # Add search capability on place_name
    list_filter = ('latitude', 'longitude')  # Optional: filter options for latitude and longitude

    # Optionally customize the form layout if desired
    fieldsets = (
        (None, {
            'fields': ('place_name', 'latitude', 'longitude')
        }),
    )
