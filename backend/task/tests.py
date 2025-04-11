import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Task

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def create_task():
    def _create_task(title="Test Task", description="Test Description", completed=False):
        return Task.objects.create(
            title=title,
            description=description,
            completed=completed
        )
    return _create_task

@pytest.mark.django_db
class TestTaskAPI:
    
    def test_list_tasks(self, api_client, create_task):
        # Create some test tasks
        task1 = create_task("Task 1", "Description 1")
        task2 = create_task("Task 2", "Description 2")
        
        url = reverse('taskviewset-list')
        response = api_client.get(url)
        
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 2
    
    def test_create_task(self, api_client):
        url = reverse('taskviewset-list')
        data = {
            "title": "New Task",
            "description": "New Description",
            "completed": False
        }
        
        response = api_client.post(url, data=data)
        
        assert response.status_code == status.HTTP_201_CREATED
        assert Task.objects.count() == 1
        assert Task.objects.get().title == "New Task"
    
    def test_retrieve_task(self, api_client, create_task):
        task = create_task()
        
        url = reverse('taskviewset-detail', args=[task.id])
        response = api_client.get(url)
        
        assert response.status_code == status.HTTP_200_OK
        assert response.data['id'] == task.id
        assert response.data['title'] == task.title
    
    def test_update_task(self, api_client, create_task):
        task = create_task()
        
        url = reverse('taskviewset-detail', args=[task.id])
        data = {
            "title": "Updated Task",
            "description": "Updated Description",
            "completed": True
        }
        
        response = api_client.put(url, data=data)
        
        assert response.status_code == status.HTTP_200_OK
        task.refresh_from_db()
        assert task.title == "Updated Task"
        assert task.completed is True
    
    def test_delete_task(self, api_client, create_task):
        task = create_task()
        
        url = reverse('taskviewset-detail', args=[task.id])
        response = api_client.delete(url)
        
        assert response.status_code == status.HTTP_204_NO_CONTENT
        assert Task.objects.count() == 0