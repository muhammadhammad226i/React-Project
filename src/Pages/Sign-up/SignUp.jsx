import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { signup } from '../../Api/Services/AuthServices';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import "../../index.css";



const schema = yup.object().shape({
  name: yup
    .string()
    .required('Username is required')
    .matches(/^[A-Za-z ]+$/, 'Name must only contain letters')
    .min(2, 'Name must be at least 2 characters'),
  phone: yup
    .string()
    .required('Contact number is required'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[a-z]/, 'Must contain a lowercase letter')
    .matches(/[A-Z]/, 'Must contain an uppercase letter')
    .matches(/\d/, 'Must contain a number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Must contain a special character'),
});

const SignUp = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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
          <h2 className="form-title">Signup Form</h2>

          {/* Username */}
          <label htmlFor="name" className="form-label">Username</label>
          <input
            {...register('name')}
            id="name"
            type="text"
            placeholder="Enter your full name"
            className="form-input"
          />
          {errors.name && <p className="error-text">{errors.name.message}</p>}

          {/* Phone Number */}
          <label htmlFor="phone" className="form-label">Contact Number</label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneInput
                {...field}
                country={'pk'}
                onlyCountries={['pk', 'us']}
                inputProps={{
                  name: 'phone',
                  required: true,
                }}
                inputStyle={{ width: '100%', color: 'black' }}
              />
            )}
          />
          {errors.phone && <p className="error-text">{errors.phone.message}</p>}

          {/* Email */}
          <label htmlFor="email" className="form-label">Email</label>
          <input
            {...register('email')}
            id="email"
            type="email"
            placeholder="Enter your email"
            className="form-input"
          />
          {errors.email && <p className="error-text">{errors.email.message}</p>}

          {/* Password */}
          <label htmlFor="password" className="form-label">Password</label>
          <input
            {...register('password')}
            id="password"
            type="password"
            placeholder="Enter a strong password"
            className="form-input"
          />
          {errors.password && <p className="error-text">{errors.password.message}</p>}

          <button type="submit" className="submit-btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
