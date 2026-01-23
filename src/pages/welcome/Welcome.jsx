import React from 'react';
import { useNavigate } from 'react-router-dom';
import './welcome.css';
import logo from '../../assets/images/fislogo1.png'; // Adjust path as needed

const Welcome = () => {
    const navigate = useNavigate();

    const handleEnter = () => {
        // Add fade-out class to body for transition effect defined in CSS
        document.body.classList.add('fade-out');
        setTimeout(() => {
            navigate('/home');
            document.body.classList.remove('fade-out');
        }, 1000); // Match transition time in CSS (1s)
    };

    return (
        <div className="welcome-page" onClick={handleEnter} style={{ cursor: 'pointer' }}>
            <div className="container">
                <img src={logo} alt="Logo" className="img" />
                <h1 className="white-text">Future Invo Project (HRMS)</h1>
                <h2 className="white-text">Welcome to the future of HR Management</h2>
                <p className="white-text mt-4 opacity-75 small">Click anywhere to enter</p>
            </div>

            {/* Sparkles Animation */}
            <div className="seasoning"></div>
            <div className="seasoning"></div>
            <div className="seasoning"></div>
            <div className="seasoning"></div>
            <div className="seasoning"></div>
            <div className="seasoning"></div>
        </div>
    );
};

export default Welcome;
