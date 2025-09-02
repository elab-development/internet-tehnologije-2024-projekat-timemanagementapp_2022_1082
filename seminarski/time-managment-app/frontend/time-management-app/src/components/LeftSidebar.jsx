import React from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import avatar from '../assets/avatar.jpg'

function LeftSidebar({ onAddTask, onViewChange, activeView }) {
  const { user } = useUser();
  const { signOut } = useClerk();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="fixed left-0 top-0 w-80 h-screen bg-gray-50 flex flex-col z-50">
      {/* Header sa slikom i username */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center overflow-hidden">
            {user?.profileImageUrl ? (
              <img 
                src={user.avatar} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white text-lg font-bold">
                {user?.firstName?.charAt(0) || user?.emailAddresses[0]?.emailAddress?.charAt(0) || 'U'}
              </span>
            )}
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">
              {user?.firstName && user?.lastName 
                ? `${user.firstName} ${user.lastName}`
                : user?.fullName || 'User'
              }
            </h2>
            <p className="text-sm text-gray-500">
              {user?.emailAddresses?.[0]?.emailAddress || 'No email'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation menu */}
      <div className="px-4 py-2">
        {/* Add New Task */}
        <button 
          onClick={onAddTask}
          className="w-full flex items-center space-x-3 px-2 py-2 text-gray-600 hover:bg-gray-100 rounded cursor-pointer transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
          </svg>
          <span className="text-sm">Add New Task</span>
        </button>
      </div>

      {/* Workspace sekcija */}
      <div className="px-4 mt-4">
        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">WORKSPACE</h3>
        
        {/* Home - aktivna */}
        <div 
          onClick={() => onViewChange('home')}
          className={`flex items-center space-x-3 px-2 py-2 rounded mb-1 cursor-pointer transition-colors ${
            activeView === 'home' 
              ? 'bg-blue-100 text-blue-700' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <span className="text-sm">🏠</span>
          <span className="text-sm font-medium">Home</span>
        </div>

        {/* Unfinished Tasks */}
        <div 
          onClick={() => onViewChange('unfinished')}
          className={`flex items-center space-x-3 px-2 py-2 rounded mb-1 cursor-pointer transition-colors ${
            activeView === 'unfinished' 
              ? 'bg-blue-100 text-blue-700' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <span className="text-sm">📋</span>
          <span className="text-sm">Unfinished Tasks</span>
        </div>

        {/* Finished Tasks */}
        <div 
          onClick={() => onViewChange('finished')}
          className={`flex items-center space-x-3 px-2 py-2 rounded mb-1 cursor-pointer transition-colors ${
            activeView === 'finished' 
              ? 'bg-blue-100 text-blue-700' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <span className="text-sm">📝</span>
          <span className="text-sm">Finished tasks</span>
        </div>
      </div>

      {/* Bottom sekcija */}
      <div className="mt-auto px-4 py-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 px-2 py-2 text-gray-600 hover:bg-gray-100 rounded cursor-pointer mb-1 transition-colors">
          <span className="text-sm">👥</span>
          <span className="text-sm">User info</span>
        </div>

        <div className="flex items-center space-x-3 px-2 py-2 text-gray-600 hover:bg-gray-100 rounded cursor-pointer mb-1 transition-colors">
          <span className="text-sm">🗑️</span>
          <span className="text-sm">Trash</span>
        </div>

        <button 
          onClick={handleSignOut}
          className="w-full flex items-center space-x-3 px-2 py-2 text-gray-600 hover:bg-gray-100 rounded cursor-pointer transition-colors"
        >
          <span className="text-sm">➡️</span>
          <span className="text-sm">Log out</span>
        </button>
      </div>
    </div>
  );
}

export default LeftSidebar;