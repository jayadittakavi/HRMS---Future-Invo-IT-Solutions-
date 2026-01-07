import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './welcome.css';
import logo from '../../assets/images/fislogo1.png'; // Assuming this is the main logo
import bgImage from '../../assets/images/welcom bg1.jpg';

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="welcome-container" style={{ backgroundImage: `url("${bgImage}")` }}>
      <div className="overlay">
        <div className="content fade-in-up">
          <div className="logo-wrapper">
            <img src={logo} alt="HRMS Logo" className="welcome-logo" />
          </div>
          <h1 className="welcome-title">Future Invo HRMS</h1>
          <p className="welcome-subtitle">Empowering Your Workforce</p>

          <div className="loader-line"></div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
