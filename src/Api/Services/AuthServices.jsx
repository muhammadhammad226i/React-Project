
import { data } from 'react-router-dom';
import axiosInstance from '../ApiClient';

export const signup = async (userData) => {
  try {
    const response = await axiosInstance.post('/register', userData); 
    return response.data;
  } catch (error) {
    
    throw error.response?.data || { message: 'Signup failed' };
  }
};

export const Loginfn = async (data) => {
  try {
    const response = await axiosInstance.post('/login', data);
    
    
    localStorage.setItem('token', response.data.token);
    
    return response.data; 
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};
