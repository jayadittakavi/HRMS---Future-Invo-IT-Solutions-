import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    // Extract token from URL hash (Google Implicit Grant uses hash)
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1));
    const token = params.get('access_token');

    if (token) {
      // Dummy user simulation as requested
      const dummyUser = {
        name: "OAuth User",
        email: "user@gmail.com",
        role: "SuperAdmin"
      };

      // Store in localStorage (as requested)
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(dummyUser));

      // Also update AuthContext state for real app integration
      login(dummyUser, token);

      // Redirect to dashboard
      navigate('/dashboard');
    } else {
      // Error handling
      alert("Login Failed. Try again.");
      navigate('/login');
    }
  }, [navigate, login]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <h2>Processing Google Login...</h2>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default GoogleCallback;
