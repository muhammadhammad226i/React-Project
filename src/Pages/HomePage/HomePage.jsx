import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../index.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (!storedUser || !token) {
      navigate('/login');
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  if (!user) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1>Welcome {user.name} 👋</h1>
        <p>This is your dashboard</p>
      </header>

      <main className="user-info-card">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone || 'Not provided'}</p>
        <p className="success-msg">You are logged in successfully!</p>
      </main>

      <footer className="homepage-footer">
        &copy; {new Date().getFullYear()} Student Portal
      </footer>
    </div>
  );
};

export default HomePage;
