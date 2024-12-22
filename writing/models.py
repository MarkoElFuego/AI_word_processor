# writing/models.py
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    content_type = models.CharField(max_length=50, default='script')  # script, poem, novel
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

   
    def __str__(self):
        return self.title
    
class GeneratedContent(models.Model):
    project = models.ForeignKey(Project, related_name='contents', on_delete=models.CASCADE)
    content = models.TextField()
    prompt = models.TextField()
    version = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
        unique_together = ['project', 'version']
    
    def __str__(self):
        return f"{self.project.title} - Version {self.version}"

