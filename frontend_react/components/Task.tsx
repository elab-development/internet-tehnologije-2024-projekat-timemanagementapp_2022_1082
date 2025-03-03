"use client";

import React from 'react';

interface TaskProps {
  title: string;
  description: string;
  status: 'u toku' | 'završeno';
  onComplete?: () => void; // Opciona funkcija za označavanje taska kao završenog
}

const Task: React.FC<TaskProps> = ({ title, description, status, onComplete }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
      <div className="flex items-center justify-between mt-4">
        <span
          className={`text-sm px-2 py-1 rounded-full ${
            status === 'u toku'
              ? 'text-blue-600 bg-blue-100'
              : 'text-green-600 bg-green-100'
          }`}
        >
          {status === 'u toku' ? 'U toku' : 'Završeno'}
        </span>
        <button
          onClick={onComplete}
          className={`${
            status === 'u toku'
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-700 cursor-not-allowed'
          } px-4 py-2 rounded-lg transition-colors`}
          disabled={status === 'završeno'}
        >
          {status === 'u toku' ? 'Označi kao završeno' : 'Završeno'}
        </button>
      </div>
    </div>
  );
};

export default Task;