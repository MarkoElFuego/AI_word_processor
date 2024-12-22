from django.db import models
from django.contrib.auth.models import User

class Project(models.Model):
    GENRE_CHOICES = [
        ('SCRIPT', 'Screenplay'),
        ('NOVEL', 'Novel'),
        ('POEM', 'Poetry'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    genre = models.CharField(max_length=10, choices=GENRE_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='projects')

    def __str__(self):
        return self.title

class Content(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='contents')
    text = models.TextField()
    ai_generated = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    version = models.IntegerField(default=1)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.project.title} - Version {self.version}"