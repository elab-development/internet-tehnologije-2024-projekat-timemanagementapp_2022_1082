import React, { useState } from 'react';
import LeftSidebar from './LeftSidebar';
import Form from './Form';

const Dashboard = () => {
  const [forms, setForms] = useState([]); // niz koji cuva sve taskove
  const [activeView, setActiveView] = useState('home'); // pomocu njega menjamo sekcije na stranici > 'home' / 'unfinished' / 'finished'

  const addNewTask = () => {
    const newForm = {
      id: Date.now(),
      title: '',
      type: '',
      createdAt: '',
      finishedAt: '',
      complete: false,
      content: ''
    };
    setForms([...forms, newForm]);
  };

  const removeTask = (taskId) => {
    setForms(forms.filter(form => form.id !== taskId));
  };

  const updateTask = (taskId, updatedData) => {
    setForms(forms.map(form => 
      form.id === taskId ? { ...form, ...updatedData } : form
    ));
  };

  const renderContent = () => {
    switch(activeView) {
      case 'home':
        return (
          <div className="flex-1 bg-white">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Task Management</h1>
              {forms.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h3>
                  <p className="text-gray-500 mb-6">Get started by creating your first task</p>
                  <button
                    onClick={addNewTask}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Add New Task
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {forms.map((formData) => (
                    <Form 
                      key={formData.id}
                      formData={formData}
                      onUpdate={(updatedData) => updateTask(formData.id, updatedData)}
                      onRemove={() => removeTask(formData.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      case 'unfinished':
        const unfinishedTasks = forms.filter(task => !task.complete);
        return (
          <div className="flex-1 bg-white">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Unfinished Tasks</h1>
              {unfinishedTasks.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">✨</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">All tasks completed!</h3>
                  <p className="text-gray-500">Great job! You have no unfinished tasks.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {unfinishedTasks.map((formData) => (
                    <Form 
                      key={formData.id}
                      formData={formData}
                      onUpdate={(updatedData) => updateTask(formData.id, updatedData)}
                      onRemove={() => removeTask(formData.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      case 'finished':
        const finishedTasks = forms.filter(task => task.complete);
        return (
          <div className="flex-1 bg-white">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Finished Tasks</h1>
              {finishedTasks.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📋</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No completed tasks</h3>
                  <p className="text-gray-500">Completed tasks will appear here.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {finishedTasks.map((formData) => (
                    <Form 
                      key={formData.id}
                      formData={formData}
                      onUpdate={(updatedData) => updateTask(formData.id, updatedData)}
                      onRemove={() => removeTask(formData.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      default:
        return (
          <div className="flex-1 bg-white">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <LeftSidebar 
        onAddTask={addNewTask}
        onViewChange={setActiveView}
        activeView={activeView}
      />
      <div className="flex-1 flex flex-col ml-80">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;