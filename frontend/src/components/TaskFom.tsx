'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { TaskFormData } from '../types/task';
import { TaskService } from '../services/api';

interface TaskFormProps {
  taskId?: number;  // Optional for edit mode
}

const TaskForm: React.FC<TaskFormProps> = ({ taskId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<TaskFormData>();
  const isEditMode = !!taskId;

  useEffect(() => {
    if (isEditMode) {
      // Fetch task data for edit mode
      const fetchTask = async () => {
        try {
          setLoading(true);
          const task = await TaskService.getTask(taskId);
          setValue('title', task.title);
          setValue('description', task.description);
          setValue('completed', task.completed);
          setError(null);
        } catch (err) {
          setError('Failed to fetch task');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      
      fetchTask();
    }
  }, [taskId, isEditMode, setValue]);

  const onSubmit = async (data: TaskFormData) => {
    try {
      setLoading(true);
      if (isEditMode) {
        await TaskService.updateTask(taskId, data);
      } else {
        await TaskService.createTask(data);
      }
      router.push('/');
    } catch (err) {
      setError(`Failed to ${isEditMode ? 'update' : 'create'} task`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode) return <div>Loading task...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="task-form-container">
      <h2>{isEditMode ? 'Edit Task' : 'Create New Task'}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            {...register('title', { required: 'Title is required' })}
          />
          {errors.title && <p className="error-message">{errors.title.message}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            {...register('description')}
            rows={4}
          />
        </div>
        
        <div className="form-group checkbox">
          <label htmlFor="completed">
            <input
              id="completed"
              type="checkbox"
              {...register('completed')}
            />
            Mark as completed
          </label>
        </div>
        
        <div className="form-actions">
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Processing...' : isEditMode ? 'Update Task' : 'Create Task'}
          </button>
          <button 
            type="button" 
            onClick={() => router.push('/')}
            className="cancel-btn"
          >
            Cancel
          </button>
        </div>
      </form>
      
      <style jsx>{`
        .task-form-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .form-group {
          margin-bottom: 20px;
        }
        label {
          display: block;
          margin-bottom: 5px;
          font-weight: 500;
        }
        input[type="text"], textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
        }
        .checkbox label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: normal;
        }
        .form-actions {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }
        button {
          padding: 10px 16px;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
        }
        .submit-btn {
          background-color: #34a853;
          color: white;
        }
        .cancel-btn {
          background-color: #dadce0;
          color: #202124;
        }
        .error {
          color: #ea4335;
          font-weight: bold;
        }
        .error-message {
          color: #ea4335;
          margin-top: 5px;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};

export default TaskForm;