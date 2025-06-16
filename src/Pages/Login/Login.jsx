import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Loginfn } from '../../Api/Services/AuthServices';

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await Loginfn(data);

      if (response?.user && response?.token) {
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
        alert('Login successful!');
        reset();
        navigate('/home');
      } else {
        alert('Invalid login response from server.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert(error?.response?.data?.message || error.message || 'Login failed');
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <h2 className="form-title">Login Form</h2>

          <label htmlFor="email">Email</label>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email format',
              },
            })}
            id="email"
            type="email"
            placeholder="Enter email"
            className="white-placeholder"
          />
          {errors.email && <p className="error-text">{errors.email.message}</p>}

          <label htmlFor="password">Password</label>
          <input
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            id="password"
            type="password"
            placeholder="Enter password"
            className="white-placeholder"
          />
          {errors.password && <p className="error-text">{errors.password.message}</p>}

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
