
import { data } from 'react-router-dom';
import axiosInstance from '../ApiClient';

export const signup = async (userData) => {
  try {
    const response = await axiosInstance.post('/register', userData); 
    return response.data;
  } catch (error) {
    // You can customize error handling here
    throw error.response?.data || { message: 'Signup failed' };
  }
};

export const Loginfn = async (data) => {
  try {
    const response = await axiosInstance.post('/login', data);
    
    // Store token BEFORE return
    localStorage.setItem('token', response.data.token);
    
    return response.data; // Now this works as expected
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};
