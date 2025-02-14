"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleresponse = void 0;
exports.sampleresponse = `Below are the full details for each file to create or update.

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
