import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Task } from '../../types/task';
import { TaskService } from '../../services/api';

const TaskDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        try {
          setLoading(true);
          const taskId = parseInt(id as string, 10);
          const data = await TaskService.getTask(taskId);
          setTask(data);
        } catch (err) {
          setError('Failed to fetch task');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchTask();
    }
  }, [id]);

  const handleDelete = async () => {
    if (task && window.confirm('Are you sure you want to delete this task?')) {
      try {
        await TaskService.deleteTask(task.id);
        router.push('/');
      } catch (err) {
        setError('Failed to delete task');
        console.error(err);
      }
    }
  };

  if (loading) return <div className="container"><div>Loading task...</div></div>;
  if (error) return <div className="container"><div className="error">{error}</div></div>;
  if (!task) return <div className="container"><div>Task not found</div></div>;

  return (
    <div className="container">
      <Head>
        <title>{task.title} | Task Management Tool</title>
        <meta name="description" content={`Details for task: ${task.title}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Task Details</h1>
        
        <div className="task-detail">
          <div className="header">
            <h2>{task.title}</h2>
            <span className={`status ${task.completed ? 'completed' : 'pending'}`}>
              {task.completed ? 'Completed' : 'Pending'}
            </span>
          </div>
          
          <div className="description">
            <h3>Description</h3>
            <p>{task.description || 'No description provided.'}</p>
          </div>
          
          <div className="meta">
            <p><strong>Created:</strong> {new Date(task.created_at).toLocaleString()}</p>
            <p><strong>Last Updated:</strong> {new Date(task.updated_at).toLocaleString()}</p>
          </div>
          
          <div className="actions">
            <Link href={`/task/edit/${task.id}`}>
              <button className="edit-btn">Edit Task</button>
            </Link>
            <button className="delete-btn" onClick={handleDelete}>Delete Task</button>
            <Link href="/">
              <button className="back-btn">Back to List</button>
            </Link>
          </div>
        </div>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
        }
        main {
          padding: 2rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 800px;
          margin: 0 auto;
        }
        h1 {
          margin-bottom: 2rem;
          color: #202124;
        }
        .task-detail {
          width: 100%;
          background-color: #f8f9fa;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid #eaeaea;
        }
        .status {
          padding: 6px 12px;
          border-radius: 16px;
          font-size: 14px;
          font-weight: 500;
        }
        .completed {
          background-color: #e8f5e9;
          color: #34a853;
        }
        .pending {
          background-color: #fef7e0;
          color: #fbbc04;
        }
        .description {
          margin-bottom: 20px;
        }
        .meta {
          font-size: 14px;
          color: #5f6368;
          margin-bottom: 20px;
        }
        .actions {
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
        .edit-btn {
          background-color: #4285f4;
          color: white;
        }
        .delete-btn {
          background-color: #ea4335;
          color: white;
        }
        .back-btn {
          background-color: #dadce0;
          color: #202124;
        }
        .error {
            color: #ea4335;
            font-weight: bold;
          }
        `}</style>
      </div>
    );
  };
  
  export default TaskDetail;