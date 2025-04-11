// import { ITask } from '@/services/task-service';

// type Props = {tasks: ITask[]};

// export default function TaskList ({tasks}: Props) {
//     return (
//         <div>
//         {tasks.map((task) => (
//             <div key={task.id}>
//             <h2>{task.title}</h2>
//             <p>{task.description}</p>
//             </div>
//         ))}
//         </div>
//     );
// };

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Task } from '../types/task';
import { TaskService } from '../services/api';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await TaskService.getTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await TaskService.deleteTask(id);
        fetchTasks(); // Refresh the list
      } catch (err) {
        setError('Failed to delete task');
        console.error(err);
      }
    }
  };

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="task-list">
      <h2>Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks available. Create a new one!</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className={task.completed ? 'completed' : ''}>
              <div className="task-item">
                <div className="task-info">
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <p className="status">
                    Status: {task.completed ? 'Completed' : 'Pending'}
                  </p>
                </div>
                <div className="task-actions">
                  <Link href={`/task/${task.id}`}>
                    <button className="view-btn">View</button>
                  </Link>
                  <button 
                    className="delete-btn" 
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="create-new">
        <Link href="/task/create">
          <button className="create-btn">Create New Task</button>
        </Link>
      </div>
      
      <style jsx>{`
        .task-list {
          max-width: 800px;
          margin: 0 auto;
        }
        ul {
          list-style-type: none;
          padding: 0;
        }
        .task-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          margin-bottom: 10px;
          border-radius: 5px;
          background-color: #f8f9fa;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .completed .task-item {
          background-color: #e8f5e9;
        }
        .task-info {
          flex: 1;
        }
        .task-actions {
          display: flex;
          gap: 10px;
        }
        button {
          padding: 8px 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .view-btn {
          background-color: #4285f4;
          color: white;
        }
        .delete-btn {
          background-color: #ea4335;
          color: white;
        }
        .create-btn {
          background-color: #34a853;
          color: white;
          padding: 10px 16px;
          font-size: 16px;
          margin-top: 20px;
        }
        .error {
          color: #ea4335;
          font-weight: bold;
        }
        .status {
          font-style: italic;
          color: #555;
        }
        .create-new {
          margin-top: 20px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default TaskList;