"use client";

import React, { useState } from 'react';

interface NavLink {
  text: string;
  href: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const Tasks: React.FC = () => {
  const navLinks: NavLink[] = [
    { text: "Početna", href: "/home" },
    { text: "Kalendar", href: "/calendar" },
    { text: "Zadaci", href: "/tasks" },
    { text: "Analitika", href: "/stats" },
  ];

  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: newTaskTitle,
        description: newTaskDescription,
        completed: false
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
      setNewTaskDescription('');
    }
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="flex min-h-screen rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300">
      {/* Vertikalni NavBar - leva strana */}
      <aside className="w-54 bg-white shadow-lg rounded-r-2xl">
        <div className="p-6">
          <h1 className="text-2xl text-center font-bold text-blue-600">TimeFlow</h1>
        </div>
        <nav className="mt-6">
          <ul>
            {navLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="flex px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 rounded-lg mx-2"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Tasks Content - desna strana */}
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Moji <span className='text-blue-600'>Zadaci</span></h2>
          
          {/* Task List */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Lista zadataka</h3>
            
            {tasks.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Nema zadataka. Dodaj novi zadatak ispod.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {tasks.map((task) => (
                  <div 
                    key={task.id} 
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200 flex flex-col"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTaskCompletion(task.id)}
                          className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <h4 className={`font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                          {task.title}
                        </h4>
                      </div>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-200"
                      >
                        Obriši
                      </button>
                    </div>
                    <p className={`text-sm mt-1 ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                      {task.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Add New Task Form */}
          <div className="bg-white rounded-xl shadow-md p-6 max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-center text-gray-700 mb-4">Dodaj novi zadatak</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="taskTitle" className="block text-sm font-medium text-gray-700 mb-1">
                  Naslov
                </label>
                <input
                  type="text"
                  id="taskTitle"
                  className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Unesi naslov zadatka..."
                />
              </div>
              <div>
                <label htmlFor="taskDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Opis
                </label>
                <textarea
                  id="taskDescription"
                  rows={3}
                  className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                  placeholder="Unesi opis zadatka..."
                ></textarea>
              </div>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                onClick={addTask}
              >
                Dodaj zadatak
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Tasks;