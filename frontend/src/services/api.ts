import api from '@/lib/request';
import { Task, TaskFormData } from '../types/task';

// export interface ITask {
//   id: number;
//   user: string;
//   title: string;
//   description: string;
//   completed: boolean;
//   created_at: string;
//   updated_at: string;
//   due_date: string;
// }


export class TaskService {
    static async getTasks(): Promise<Task[]> {
      try {
        const response = await api.get('/api/tasks/');
        return response.data;
      } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
      }
    }
  
    static async getTask(id: number): Promise<Task> {
      try {
        const response = await api.get(`/api/tasks/${id}/`);
        return response.data;
      } catch (error) {
        console.error(`Error fetching task ${id}:`, error);
        throw error;
      }
    }
  
    static async createTask(task: TaskFormData): Promise<Task> {
      try {
        const response = await api.post('/api/tasks/', task);
        return response.data;
      } catch (error) {
        console.error('Error creating task:', error);
        throw error;
      }
    }
  
    static async updateTask(id: number, task: TaskFormData): Promise<Task> {
      try {
        const response = await api.put(`/api/tasks/${id}/`, task);
        return response.data;
      } catch (error) {
        console.error(`Error updating task ${id}:`, error);
        throw error;
      }
    }
  
    static async deleteTask(id: number): Promise<void> {
      try {
        await api.delete(`/api/tasks/${id}/`);
      } catch (error) {
        console.error(`Error deleting task ${id}:`, error);
        throw error;
      }
    }
  }
  