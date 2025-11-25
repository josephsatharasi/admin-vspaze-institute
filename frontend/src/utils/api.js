import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only redirect on 401 if we have a response (backend is running)
    // Don't redirect on network errors (backend not running)
    if (error.response?.status === 401 && error.response?.data) {
      localStorage.removeItem('token');
      localStorage.removeItem('vspaze_auth');
      localStorage.removeItem('student_auth');
      localStorage.removeItem('teacher_auth');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;
