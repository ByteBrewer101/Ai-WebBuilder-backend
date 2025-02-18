export const sampleresponse = `Below are the full details for each file to create or update.

<boltArtifact id="todo-list-app" title="Todo List App">
  <boltAction type="file" filePath="index.html">
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Todo List App</title>
      </head>
      <body>
        <div id="root"></div>
        <script type="module" src="/src/main.tsx"></script>
      </body>
    </html>
  </boltAction>

  <boltAction type="file" filePath="src/App.tsx">
    import React, { useState } from 'react';
    import { LucideReact } from 'lucide-react';
    import TodoItem from './components/TodoItem';

    function App() {
      const [todos, setTodos] = useState<string[]>([]);
      const [newTodo, setNewTodo] = useState<string>('');

      const addTodo = () => {
        if (newTodo.trim()) {
          setTodos([...todos, newTodo.trim()]);
          setNewTodo('');
        }
      };

      const deleteTodo = (index: number) => {
        setTodos(todos.filter((_, i) => i !== index));
      };

      return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h1 className="text-2xl font-semibold text-center mb-4">Todo List</h1>
            <div className="flex mb-4">
              <input
                type="text"
                className="flex-grow p-2 border rounded"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new task..."
              />
              <button
                className="ml-2 p-2 bg-blue-500 text-white rounded"
                onClick={addTodo}
              >
                Add
              </button>
            </div>
            <ul>
              {todos.map((todo, index) => (
                <TodoItem
                  key={index}
                  content={todo}
                  onDelete={() => deleteTodo(index)}
                />
              ))}
            </ul>
          </div>
        </div>
      );
    }

    export default App;
  </boltAction>

  <boltAction type="file" filePath="src/components/TodoItem.tsx">
    import React from 'react';
    import { Trash } from 'lucide-react';

    interface TodoItemProps {
      content: string;
      onDelete: () => void;
    }

    const TodoItem: React.FC<TodoItemProps> = ({ content, onDelete }) => {
      return (
        <li className="flex items-center justify-between p-2 border-b">
          <span>{content}</span>
          <button onClick={onDelete} className="text-red-500">
            <Trash size={18} />
          </button>
        </li>
      );
    };

    export default TodoItem;
  </boltAction>

  <boltAction type="file" filePath="tailwind.config.js">
    /** @type {import('tailwindcss').Config} */
    export default {
      content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
      theme: {
        extend: {},
      },
      plugins: [],
    };
  </boltAction>

  <boltAction type="file" filePath="src/index.css">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
  </boltAction>

  <boltAction type="file" filePath="src/main.tsx">
    import { StrictMode } from 'react';
    import { createRoot } from 'react-dom/client';
    import App from './App.tsx';
    import './index.css';

    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  </boltAction>
</boltArtifact>`;

export const sample2 = `<boltArtifact id="leetcode-frontend" title="LeetCode-like Frontend">

  <!-- Update package.json to ensure all dependencies are included -->
  <boltAction type="file" filePath="package.json">
    {
      "name": "vite-react-typescript-starter",
      "private": true,
      "version": "0.0.0",
      "type": "module",
      "scripts": {
        "dev": "vite",
        "build": "vite build",
        "lint": "eslint .",
        "preview": "vite preview"
      },
      "dependencies": {
        "lucide-react": "^0.344.0",
        "react": "^18.3.1",
        "react-dom": "^18.3.1"
      },
      "devDependencies": {
        "@eslint/js": "^9.9.1",
        "@types/react": "^18.3.5",
        "@types/react-dom": "^18.3.0",
        "@vitejs/plugin-react": "^4.3.1",
        "autoprefixer": "^10.4.18",
        "eslint": "^9.9.1",
        "eslint-plugin-react-hooks": "^5.1.0-rc.0",
        "eslint-plugin-react-refresh": "^0.4.11",
        "globals": "^15.9.0",
        "postcss": "^8.4.35",
        "tailwindcss": "^3.4.1",
        "typescript": "^5.5.3",
        "typescript-eslint": "^8.3.0",
        "vite": "^5.4.2"
      }
    }
  </boltAction>

  <!-- Create Header component -->
  <boltAction type="file" filePath="src/components/Header.tsx">
    import React from 'react';
    import { Code, Home, Trophy, User } from 'lucide-react';

    const Header: React.FC = () => {
      return (
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
            <div className="flex items-center">
              <Code className="h-8 w-8 text-blue-500" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">CodeSite</h1>
            </div>
            <nav className="flex space-x-4">
              <a href="/" className="text-gray-600 hover:text-blue-500 flex items-center">
                <Home className="h-5 w-5 mr-1" />
                Home
              </a>
              <a href="/problems" className="text-gray-600 hover:text-blue-500 flex items-center">
                <Trophy className="h-5 w-5 mr-1" />
                Problems
              </a>
            </nav>
            <div className="flex items-center">
              <User className="h-8 w-8 text-gray-600" />
            </div>
          </div>
        </header>
      );
    };

    export default Header;
  </boltAction>

  <!-- Create Sidebar component -->
  <boltAction type="file" filePath="src/components/Sidebar.tsx">
    import React from 'react';

    const Sidebar: React.FC = () => {
      return (
        <div className="w-64 bg-gray-100 h-screen p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
          <ul className="space-y-2">
            <li>
              <a href="/problems/easy" className="text-gray-600 hover:text-blue-500">
                Easy
              </a>
            </li>
            <li>
              <a href="/problems/medium" className="text-gray-600 hover:text-blue-500">
                Medium
              </a>
            </li>
            <li>
              <a href="/problems/hard" className="text-gray-600 hover:text-blue-500">
                Hard
              </a>
            </li>
          </ul>
        </div>
      );
    };

    export default Sidebar;
  </boltAction>

  <!-- Create MainContent component -->
  <boltAction type="file" filePath="src/components/MainContent.tsx">
    import React from 'react';

    const MainContent: React.FC = () => {
      return (
        <div className="flex-grow p-6 bg-white">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Welcome to CodeSite</h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">Problem 1</h2>
              <p className="text-gray-600">Description of problem 1...</p>
            </div>
           
          </div>
        </div>
      );
    };

    export default MainContent;
  </boltAction>

  <!-- Update App component -->
  <boltAction type="file" filePath="src/App.tsx">
    import React from 'react';
    import Header from './components/Header';
    import Sidebar from './components/Sidebar';
    import MainContent from './components/MainContent';

    function App() {
      return (
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex flex-1">
            <Sidebar />
            <MainContent />
          </div>
        </div>
      );
    }

    export default App;
  </boltAction>

  <!-- Shell command to run the development server -->
  <boltAction type="shell">
    npm run dev
  </boltAction>

</boltArtifact>
`;
