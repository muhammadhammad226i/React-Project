import React from 'react';
import { useForm } from 'react-hook-form';
import { signup } from '../../Api/Services/AuthServices';
import { Loginfn } from '../../Api/Services/AuthServices';
import { useNavigate } from 'react-router-dom';



const Login = () => {
  const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {

      const response = await Loginfn(data);
      console.log('Login successful:', response);
      alert('Login successful!');
      reset();
      navigate('/home')
    } catch (error) {
      console.error('Login failed:', error);
      alert(error.message || 'Login failed');
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <h2>LogIn Form</h2>


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
          />
          {errors.email && <p className="text-red">{errors.email.message}</p>}

          <label htmlFor="password">Password</label>
          <input
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Minimum 6 characters' },
            })}
            id="password"
            type="password"
            placeholder="Enter password"
          />
          {errors.password && <p className="text-red">{errors.password.message}</p>}

          <button type="submit">LogIN</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
