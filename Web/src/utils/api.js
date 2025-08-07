import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Chat Session API calls
export const chatAPI = {
  // Get all chat sessions
  getSessions: async () => {
    const response = await api.get('/api/model/chat/session');
    return response.data;
  },

  // Create new chat session
  createSession: async (projectName) => {
    const response = await api.post('/api/model/chat/session', { projectName });
    return response.data;
  },

  // Get chat history for a session
  getChatHistory: async (sessionId) => {
    const response = await api.get(`/api/model/chat/history/${sessionId}`);
    return response.data;
  },

  // Send message to chat session
  sendMessage: async (sessionId, message) => {
    const response = await api.post(`/api/model/chat/${sessionId}`, { message });
    return response.data;
  },
};

export default api;
