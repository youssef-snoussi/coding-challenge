import React from 'react';
import Head from 'next/head';
import TaskList from '../components/TaskList';


const Home: React.FC = () => {
    return (
      <div className="container">
        <Head>
          <title>Task Management Tool</title>
          <meta name="description" content="A simple task management tool" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <main>
          <h1>Task Management Tool</h1>
          <TaskList />
        </main>
  
        <footer>
          <p>Task Management Tool - Built with Next.js and Django</p>
        </footer>
  
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
          footer {
            width: 100%;
            height: 60px;
            border-top: 1px solid #eaeaea;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #f8f9fa;
          }
        `}</style>
  
        <style jsx global>{`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
              Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
          }
          * {
            box-sizing: border-box;
          }
        `}</style>
      </div>
    );
  };
  
  export default Home;