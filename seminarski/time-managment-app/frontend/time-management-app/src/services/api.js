import axios from 'axios'; // salje HTTP zahtev sa frontenda (React) ka backendu (Express)

// Base URL za tvoj backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Axios instance sa default config-om
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 sekundi timeout
});

// Interceptor za error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    
    if (error.code === 'ECONNREFUSED') {
      console.error('Backend server is not running!');
    }
    
    return Promise.reject(error);
  }
);

// Task API funkcije
export const taskAPI = {
  // GET /api/tasks - Dobij sve aktivne task-ove
  getAllTasks: async () => {
    try {
      const response = await api.get('/tasks');
      return response.data; // Vraća niz task-ova
    } catch (error) {
      throw new Error(`Failed to fetch tasks: ${error.message}`);
    }
  },

  // GET /api/tasks/trash/all - Dobij sve obrisane task-ove
  getDeletedTasks: async () => {
    try {
      const response = await api.get('/tasks/trash/all');
      return response.data; // Vraća niz obrisanih task-ova
    } catch (error) {
      throw new Error(`Failed to fetch deleted tasks: ${error.message}`);
    }
  },

  // GET /api/tasks/:id - Dobij jedan task
  getTaskById: async (id) => {
    try {
      const response = await api.get(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch task ${id}: ${error.message}`);
    }
  },

  // POST /api/tasks - Kreiraj novi task
  createTask: async (taskData) => {
    try {
      const response = await api.post('/tasks', taskData);
      return response.data; // Vraća kreiran task sa ID-om
    } catch (error) {
      throw new Error(`Failed to create task: ${error.message}`);
    }
  },

  // PUT /api/tasks/:id - Ažuriraj postojeći task
  updateTask: async (id, taskData) => {
    try {
      const response = await api.put(`/tasks/${id}`, taskData);
      return response.data; // Vraća ažuriran task
    } catch (error) {
      throw new Error(`Failed to update task ${id}: ${error.message}`);
    }
  },

  // DELETE /api/tasks/:id - Soft delete task (pošalji u trash)
  deleteTask: async (id) => {
    try {
      const response = await api.delete(`/tasks/${id}`);
      return response.data; // Vraća poruku o uspešnom brisanju
    } catch (error) {
      throw new Error(`Failed to delete task ${id}: ${error.message}`);
    }
  },

  // POST /api/tasks/:id/restore - Vrati task iz trash-a
  restoreTask: async (id) => {
    try {
      const response = await api.post(`/tasks/${id}/restore`);
      return response.data; // Vraća vraćen task
    } catch (error) {
      throw new Error(`Failed to restore task ${id}: ${error.message}`);
    }
  },

  // DELETE /api/tasks/:id/permanent - Trajno obriši task
  permanentlyDeleteTask: async (id) => {
    try {
      await api.delete(`/tasks/${id}/permanent`);
      return true; // Uspešno trajno obrisano
    } catch (error) {
      throw new Error(`Failed to permanently delete task ${id}: ${error.message}`);
    }
  },

  // DELETE /api/tasks/trash/empty - Isprazni ceo trash
  emptyTrash: async () => {
    try {
      const response = await api.delete('/tasks/trash/empty');
      return response.data; // Vraća broj obrisanih task-ova
    } catch (error) {
      throw new Error(`Failed to empty trash: ${error.message}`);
    }
  }
};

// User Info API funkcije
export const userInfoAPI = {
  // GET /api/user-info/stats - Daj mi statistike korisnika
  getUserStats: async () => {
    try {
      const response = await api.get('/user-info/stats');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch user stats: ${error.message}`);
    }
  }
};

// Health check funkcija
export const healthCheck = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    throw new Error(`Backend health check failed: ${error.message}`);
  }
};

export default api;