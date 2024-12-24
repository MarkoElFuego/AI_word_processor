# writing/views.py
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from anthropic import Anthropic
from django.conf import settings
from .models import Project, GeneratedContent
from .serializers import ProjectSerializer, GeneratedContentSerializer
import json
import logging
from django.http import JsonResponse

logger = logging.getLogger(__name__)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def generate_content(request, project_id):
    """
    Endpoint za generisanje i čuvanje sadržaja za specifični projekat
    """
    try:
        project = Project.objects.get(id=project_id, owner=request.user)
        content_type = project.content_type
        prompt = request.data.get('prompt', '')
        
        if not prompt:
            return Response(
                {'error': 'Prompt je obavezan'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Sistem promptovi
        system_prompts = {
            'script': "You are a professional screenplay writer. Create engaging, natural dialogue and vivid scene descriptions.",
            'poem': "You are a skilled poet. Create evocative verses with attention to rhythm and imagery.",
            'novel': "You are a novelist. Create rich narratives with detailed character development and atmospheric descriptions."
        }
        
        system_prompt = system_prompts.get(content_type, "You are a creative writing assistant.")

        client = Anthropic(api_key=settings.ANTHROPIC_API_KEY)
        message = client.messages.create(
            model="claude-3-sonnet-20240229",
            max_tokens=50,
            messages=[{
                "role": "user",
                "content": prompt
            }],
            system=system_prompt
        )
        
        latest_version = GeneratedContent.objects.filter(project=project).order_by('-version').first()
        new_version = 1 if not latest_version else latest_version.version + 1
        
        generated_content = GeneratedContent.objects.create(
            project=project,
            content=message.content[0].text,
            prompt=prompt,
            version=new_version
        )
        
        return Response({
            'status': 'success',
            'content': generated_content.content,
            'version': generated_content.version,
            'project_id': project.id,
            'created_at': generated_content.created_at
        })
        
    except Exception as e:
        print(f"Error details: {str(e)}")
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Project.objects.filter(owner=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
    
    @action(detail=True, methods=['post'])
    def generate(self, request, pk=None):
        return generate_content(request._request, pk)
    
    @action(detail=True, methods=['get'])
    def contents(self, request, pk=None):
        """
        Pregled svih generisanih sadržaja za projekat
        """
        try:
            project = self.get_object()
            contents = GeneratedContent.objects.filter(project=project).order_by('-created_at')
            serializer = GeneratedContentSerializer(contents, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

def test_ai_generation(request):
    # Your logic for the view
    return JsonResponse({"message": "AI generation test successful"})
