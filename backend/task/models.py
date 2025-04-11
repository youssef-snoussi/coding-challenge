from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()
# Create your models here.
class Task(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL, related_name='tasks')
    title = models.CharField(max_length=200)
    description = models.TextField()
    due_date = models.DateTimeField(null=True, blank=True)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Task'
        verbose_name_plural = 'Tasks'