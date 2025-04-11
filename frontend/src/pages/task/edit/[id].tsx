import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import TaskForm from '../../../components/TaskFom';

const EditTask: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const taskId = id ? parseInt(id as string, 10) : undefined;

  return (
    <div className="container">
      <Head>
        <title>Edit Task | Task Management Tool</title>
        <meta name="description" content="Edit an existing task" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Edit Task</h1>
        {taskId && <TaskForm taskId={taskId} />}
        {!taskId && <div>Invalid task ID</div>}
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
        }
        h1 {
          margin-bottom: 2rem;
          color: #202124;
        }
      `}</style>
    </div>
  );
};

export default EditTask;