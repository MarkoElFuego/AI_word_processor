# writing/admin.py
from django.contrib import admin
from .models import Project

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'content_type', 'owner', 'created_at')
    list_filter = ('content_type', 'created_at')
    search_fields = ('title', 'description')
    date_hierarchy = 'created_at'