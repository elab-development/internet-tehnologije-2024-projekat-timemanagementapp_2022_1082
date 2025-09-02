import React, { useState, useEffect } from 'react';
import LeftSidebar from './LeftSidebar';
import Form from './Form';
import { taskAPI, healthCheck } from '../services/api';

const Dashboard = () => {
  const [forms, setForms] = useState([]);               // ucitavanje svih taskova sa backenda
  const [activeView, setActiveView] = useState('home');   // koja sekcija je aktivna, po defaultu home 
  const [loading, setLoading] = useState(true);         // da li se trenutno taskovi ucitavaju
  const [error, setError] = useState(null);               // pamti greske ako dodje do problema sa APIjem
  const [backendStatus, setBackendStatus] = useState('checking');   // status veze sa backendom > "checking", "connected", "disconnected"

  // Učitaj task-ove pri pokretanju komponente i proverava da li backend radi 
  useEffect(() => {
    loadTasks();
    checkBackendHealth();
  }, []);

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

  // Učitaj sve task-ove iz baze
  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const tasks = await taskAPI.getAllTasks();    // vraca sve taskove preko API-ja
      
      // Konvertuj backend format u frontend format
      const convertedTasks = tasks.map(task => ({
        id: task.id,
        title: task.title || '',
        type: task.type || '',
        createdAt: task.created_at ? task.created_at.split('T')[0] : '',
        finishedAt: task.finished_at ? task.finished_at.split('T')[0] : '',
        complete: task.complete || false,
        content: task.content || '' // dodaj content u bazu kasnije ili samo obrisi 
      }));
      
      setForms(convertedTasks); 
      console.log(`✅ Loaded ${tasks.length} tasks from database`);   // vrati taskove u konvertovanom formatu za front ako ne valja nesto pali se catch blok dole
      
    } catch (error) {
      setError(error.message);
      console.error('❌ Failed to load tasks:', error);
      
      // Fallback na prazan niz ako backend ne radi
      setForms([]);
    } finally {
      setLoading(false);
    }
  };

  // Dodaj novi task u bazu
  const addNewTask = async () => {
    try {
      // Kreiraj prazan task u bazi
      const newTaskData = {
        title: 'New Task',
        type: 'normal',
        complete: false
      };
      
      const createdTask = await taskAPI.createTask(newTaskData);
      console.log('✅ Created new task:', createdTask);
      
      // Reload task-ove da dobijemo fresh podatke
      await loadTasks();
      
    } catch (error) {
      console.error('❌ Failed to create task:', error);
      setError(error.message);
      
      // Fallback - dodaj lokalno ako API ne radi > ako je offline
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

  // Ukloni task iz baze
  const removeTask = async (taskId) => {
    try {
      await taskAPI.deleteTask(taskId);
      console.log('✅ Deleted task:', taskId);
      
      // Ukloni iz state-a
      setForms(forms.filter(form => form.id !== taskId));
      
    } catch (error) {
      console.error('❌ Failed to delete task:', error);
      setError(error.message);
      
      // Opcionalno: ipak ukloni iz UI-ja
      setForms(forms.filter(form => form.id !== taskId));
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
        complete: updatedData.complete
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