import React from 'react'
import avatar from '../assets/avatar.jpg'

function LeftSidebar() {
  return (
    <div className="fixed left-0 top-0 w-80 h-screen bg-gray-50 flex flex-col z-50">
      {/* Header sa logo i nazivom */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">
                <img src={avatar} alt="avatar" />
            </span>
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">Name Forname</h2>
            <p className="text-sm text-gray-500">user@gmail.com</p>
          </div>
        </div>
      </div>

      {/* Navigation menu */}
      <div className="px-4 py-2">
        {/* Quick Find */}
        <button className="w-auto flex items-center space-x-3 px-2 py-2 text-gray-600 hover:bg-gray-100 rounded cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
            </svg>
          <span className="text-sm">Add New Task</span>

        {/* SADA URADI DA KLIKOM NA DUGME DODAJE NOVI Form na delu za form */}

        </button>

      </div>

      {/* Workspace sekcija */}
      <div className="px-4 mt-4">
        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">WORKSPACE</h3>
        
        {/*Home - aktivna */}
        <div className="flex items-center space-x-3 px-2 py-1 bg-gray-200 rounded mb-1">
          <span className="text-sm">🏠</span>
          <span className="text-sm font-medium">Home</span>
        </div>

        {/* Notes */}
        <div className="flex items-center space-x-3 px-2 py-1 text-gray-600 hover:bg-gray-100 rounded cursor-pointer mb-1">
          <span className="text-sm">📋</span>
          <span className="text-sm">Unfinished Tasks</span>
        </div>

        <div className="flex items-center space-x-3 px-2 py-1 text-gray-600 hover:bg-gray-100 rounded cursor-pointer mb-1">
          <span className="text-sm">📝</span>
          <span className="text-sm">Finished tasks</span>
        </div>
      </div>

      {/* Bottom sekcija */}
      <div className="mt-auto px-4 py-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 px-2 py-1 text-gray-600 hover:bg-gray-100 rounded cursor-pointer mb-1">
          <span className="text-sm">👥</span>
          <span className="text-sm">User info</span>
        </div>

        <div className="flex items-center space-x-3 px-2 py-1 text-gray-600 hover:bg-gray-100 rounded cursor-pointer">
          <span className="text-sm">🗑️</span>
          <span className="text-sm">Trash</span>
        </div>

        <div className="flex items-center space-x-3 px-2 py-1 text-gray-600 hover:bg-gray-100 rounded cursor-pointer mb-1">
          <span className="text-sm">➡️</span>
          <span className="text-sm">Log out</span>
        </div>

      </div>
    </div>
  )
}

export default LeftSidebar;