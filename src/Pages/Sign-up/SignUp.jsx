import React from 'react';
import { useForm } from 'react-hook-form';
import { signup } from '../../Api/Services/AuthServices';

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await signup(data);
      console.log('Signup successful:', response);
      alert('Signup successful!');
      reset();
    } catch (error) {
      console.error('Signup failed:', error);
      alert(error.message || 'Signup failed');
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <h2>Signup Form</h2>

          <label htmlFor="name">Username</label>
          <input
            {...register('name', { required: 'Username is required' })}
            id="name"
            type="text"
            placeholder="Enter username"
          />
          {errors.name && <p className="text-red">{errors.name.message}</p>}

          <label htmlFor="phone">Contact Number</label>
          <input
            {...register('phone', { required: 'Contact number is required' })}
            id="phone"
            type="text"
            placeholder="Enter contact number"
          />
          {errors.phone && <p className="text-red">{errors.phone.message}</p>}

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

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
