import React, { useState, useEffect } from 'react';
import LeftSidebar from './LeftSidebar';
import Form from './Form';
import TrashItem from './TrashItem';
import UserInfo from './UserInfo';
import { taskAPI, healthCheck } from '../services/api';
import { CSVLink } from "react-csv";

const Dashboard = () => {
  const [forms, setForms] = useState([]);               // ucitavanje svih taskova sa backenda
  const [trashedTasks, setTrashedTasks] = useState([]); // state za trash taskove
  const [activeView, setActiveView] = useState('home');   // koja sekcija je aktivna, po defaultu home 
  const [loading, setLoading] = useState(true);         // da li se trenutno taskovi ucitavaju
  const [error, setError] = useState(null);               // pamti greske ako dodje do problema sa APIjem
  const [backendStatus, setBackendStatus] = useState('checking');   // status veze sa backendom > "checking", "connected", "disconnected" 

  // Definicija CSV kolona
  const csvHeaders = [
    { label: "ID", key: "id" },
    { label: "Title", key: "title" },
    { label: "Type", key: "type" },
    { label: "Created At", key: "createdAt" },
    { label: "Finished At", key: "finishedAt" },
    { label: "Complete", key: "complete" },
    { label: "Content", key: "content" }
  ];

  // Učitaj task-ove pri pokretanju komponente i proverava da li backend radi 
  useEffect(() => {
    loadTasks();
    loadTrashedTasks(); // dodato za trash
    checkBackendHealth();
  }, []);

  // Promeni se view automatski učitaj trash taskove
  useEffect(() => {
    if (activeView === 'trash') {
      loadTrashedTasks();
    }
  }, [activeView]);

  // Proveri da li backend radi
  const checkBackendHealth = async () => {
    try {
      await healthCheck();
      setBackendStatus('connected');
      console.log('✅ Backend is connected!');
    } catch (error) {
      setBackendStatus('disconnected');
      console.error('❌ Backend is not accessible:', error.message);
    }
  };

  // Učitaj sve aktivne task-ove iz baze
  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const tasks = await taskAPI.getAllTasks();    
      
      // Konvertuj backend format u frontend format
      const convertedTasks = tasks.map(task => ({
        id: task.id,
        title: task.title || '',
        type: task.type || '',
        createdAt: task.created_at ? task.created_at.split('T')[0] : '',
        finishedAt: task.finished_at ? task.finished_at.split('T')[0] : '',
        complete: task.complete || false,
        content: task.content || ''
      }));
      
      setForms(convertedTasks); 
      console.log(`✅ Loaded ${tasks.length} tasks from database`);   
      
    } catch (error) {
      setError(error.message);
      console.error('❌ Failed to load tasks:', error);
      setForms([]);
    } finally {
      setLoading(false);
    }
  };

  // Učitaj sve obrisane task-ove iz trash-a
  const loadTrashedTasks = async () => {
    try {
      setError(null);
      
      const deletedTasks = await taskAPI.getDeletedTasks();
      
      // Konvertuj backend format u frontend format
      const convertedTrashedTasks = deletedTasks.map(task => ({
        id: task.id,
        title: task.title || '',
        type: task.type || '',
        createdAt: task.created_at ? task.created_at.split('T')[0] : '',
        finishedAt: task.finished_at ? task.finished_at.split('T')[0] : '',
        complete: task.complete || false,
        content: task.content || '',
        deletedAt: task.deleted_at ? task.deleted_at.split('T')[0] : '',
        created_at: task.created_at, // dodati za TrashItem komponentu
        deleted_at: task.deleted_at
      }));
      
      setTrashedTasks(convertedTrashedTasks);
      console.log(`✅ Loaded ${deletedTasks.length} trashed tasks from database`);
      
    } catch (error) {
      setError(error.message);
      console.error('❌ Failed to load trashed tasks:', error);
      setTrashedTasks([]);
    }
  };

  // Dodaj novi task u bazu
  const addNewTask = async () => {
    try {
      // Kreiraj prazan task u bazi
      const newTaskData = {
        title: 'New Task',
        type: 'normal',
        complete: false,
        content: 'Description of your task'
      };
      
      const createdTask = await taskAPI.createTask(newTaskData);
      console.log('✅ Created new task:', createdTask);
      
      // Reload task-ove daj mi fresh podatke
      await loadTasks();
      
    } catch (error) {
      console.error('❌ Failed to create task:', error);
      setError(error.message);
      
      // Fallback - dodaj lokalno ako API ne radi
      const fallbackTask = {
        id: Date.now(),
        title: 'New Task (Offline)',
        type: 'normal',
        createdAt: new Date().toISOString().split('T')[0],
        finishedAt: '',
        complete: false,
        content: ''
      };
      setForms([...forms, fallbackTask]);
    }
  };

  // Soft delete task (pošalji u trash)
  const removeTask = async (taskId) => {
    try {
      await taskAPI.deleteTask(taskId);
      console.log('✅ Task moved to trash:', taskId);
      
      // Ukloni iz aktivnih task-ova
      setForms(forms.filter(form => form.id !== taskId));
      
      // Učitaj ponovo trash da vidim novi task
      if (activeView === 'trash') {
        await loadTrashedTasks();
      }
      
    } catch (error) {
      console.error('❌ Failed to move task to trash:', error);
      setError(error.message);
      
      setForms(forms.filter(form => form.id !== taskId));
    }
  };

  // Vrati task iz trash-a
  const restoreTask = async (taskId) => {
    try {
      await taskAPI.restoreTask(taskId);
      console.log('✅ Task restored:', taskId);
      
      // Ukloni iz trash liste
      setTrashedTasks(trashedTasks.filter(task => task.id !== taskId));
      
      // Učitaj ponovo aktivne task-ove da vidimo vraćen task
      await loadTasks();
      
    } catch (error) {
      console.error('❌ Failed to restore task:', error);
      setError(error.message);
    }
  };

  // Trajno obriši task iz trash-a
  const permanentlyDeleteTask = async (taskId) => {
    try {
      await taskAPI.permanentlyDeleteTask(taskId);
      console.log('✅ Task permanently deleted:', taskId);
      
      // Ukloni iz trash liste
      setTrashedTasks(trashedTasks.filter(task => task.id !== taskId));
      
    } catch (error) {
      console.error('❌ Failed to permanently delete task:', error);
      setError(error.message);
      
      setTrashedTasks(trashedTasks.filter(task => task.id !== taskId));
    }
  };

  // Isprazni ceo trash
  const emptyTrash = async () => {
    if (window.confirm('Are you sure you want to permanently delete all tasks from trash? This action cannot be undone.')) {
      try {
        await taskAPI.emptyTrash();
        console.log('✅ Trash emptied successfully');
        
        // Očisti trash listu
        setTrashedTasks([]);
        
      } catch (error) {
        console.error('❌ Failed to empty trash:', error);
        setError(error.message);
      }
    }
  };

  // Ažuriraj task u bazi
  const updateTask = async (taskId, updatedData) => {
    try {
      // Konvertuj frontend format u backend format
      const backendData = {
        title: updatedData.title,
        type: updatedData.type,
        createdAt: updatedData.createdAt || null,
        finishedAt: updatedData.finishedAt || null,
        complete: updatedData.complete,
        content: updatedData.content || "" 
      };
      
      const updatedTask = await taskAPI.updateTask(taskId, backendData);
      console.log('✅ Updated task:', updatedTask);
      
      // Ažuriraj local state
      setForms(forms.map(form => 
        form.id === taskId ? { ...form, ...updatedData } : form
      ));
      
    } catch (error) {
      console.error('❌ Failed to update task:', error);
      setError(error.message);
      
      // Fallback - ažuriraj lokalno
      setForms(forms.map(form => 
        form.id === taskId ? { ...form, ...updatedData } : form
      ));
    }
  };

  const renderContent = () => {
    // Loading state
    if (loading) {
      return (
        <div className="flex-1 bg-white">
          <div className="p-6 flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Loading tasks...</h3>
              <p className="text-gray-500">Connecting to database</p>
            </div>
          </div>
        </div>
      );
    }

    // Error state
    if (error && backendStatus === 'disconnected') {
      return (
        <div className="flex-1 bg-white">
          <div className="p-6 flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Backend Connection Failed</h3>
              <p className="text-gray-500 mb-4">Make sure your backend server is running on port 3001</p>
              <button
                onClick={() => {
                  setError(null);
                  loadTasks();
                  checkBackendHealth();
                }}
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Retry Connection
              </button>
            </div>
          </div>
        </div>
      );
    }

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
                <div>
                  {/* CSV export dugme */}
                  <div className="mb-4 flex justify-end">
                    <CSVLink
                      data={forms}
                      headers={csvHeaders}
                      filename={`tasks_export_${new Date().toISOString().split('T')[0]}.csv`}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    >
                      Export Tasks to CSV
                    </CSVLink>
                  </div>
                  {/* lista taskova */}
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
      
      case 'trash':
        return (
          <div className="flex-1 bg-white">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Trash</h1>
                {trashedTasks.length > 0 && (
                  <button
                    onClick={emptyTrash}
                    className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Empty Trash
                  </button>
                )}
              </div>
              
              {trashedTasks.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🗑️</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Trash is empty</h3>
                  <p className="text-gray-500">Deleted tasks will appear here for recovery or permanent deletion.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {trashedTasks.map((taskData) => (
                    <TrashItem 
                      key={taskData.id}
                      taskData={taskData}
                      onRestore={restoreTask}
                      onPermanentDelete={permanentlyDeleteTask}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      
      case 'userinfo':
        return <UserInfo />;
      
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
        backendStatus={backendStatus}
      />
      <div className="flex-1 flex flex-col ml-80">
        {/* Backend status indicator */}
        {backendStatus !== 'connected' && (
          <div className={`px-4 py-2 text-sm font-medium ${
            backendStatus === 'checking' 
              ? 'bg-yellow-50 text-yellow-800 border-yellow-200' 
              : 'bg-red-50 text-red-800 border-red-200'
          } border-b`}>
            {backendStatus === 'checking' && '🔄 Checking backend connection...'}
            {backendStatus === 'disconnected' && '❌ Backend disconnected - Running in offline mode'}
          </div>
        )}
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;