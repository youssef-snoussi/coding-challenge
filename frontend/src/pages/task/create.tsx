import React from 'react';
import Head from 'next/head';
import TaskForm from '../../components/TaskFom';

const CreateTask: React.FC = () => {
  return (
    <div className="container">
      <Head>
        <title>Create Task | Task Management Tool</title>
        <meta name="description" content="Create a new task" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Create New Task</h1>
        <TaskForm />
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

export default CreateTask;