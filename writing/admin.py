from django.contrib import admin
from .models import Project, Content

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'genre', 'owner', 'created_at', 'updated_at')
    list_filter = ('genre', 'owner')
    search_fields = ('title', 'description')

@admin.register(Content)
class ContentAdmin(admin.ModelAdmin):
    list_display = ('project', 'version', 'ai_generated', 'created_at')
    list_filter = ('ai_generated', 'project__genre')