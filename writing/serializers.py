from rest_framework import serializers
from .models import Project, GeneratedContent

class GeneratedContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneratedContent
        fields = ['id', 'content', 'prompt', 'version', 'created_at']
        read_only_fields = ['version', 'created_at']

class ProjectSerializer(serializers.ModelSerializer):
    contents = GeneratedContentSerializer(many=True, read_only=True)
    
    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'content_type', 'created_at', 'updated_at', 'owner', 'contents']
        read_only_fields = ['owner', 'created_at', 'updated_at']