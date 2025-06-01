// src/api/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
 baseURL: 'http://localhost:3000/users', 
// baseURL:import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

export default axiosInstance;
