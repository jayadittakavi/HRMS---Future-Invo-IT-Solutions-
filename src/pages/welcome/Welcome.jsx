import { useEffect } from "react";
import "./welcome.css";
import logo from '../../assets/images/logo.jpeg';
import bgImage from '../../assets/images/welcom bg1.jpg';

const Welcome = () => {

  useEffect(() => {
    const timer = setTimeout(() => {
      document.body.classList.add("fade-out");
      setTimeout(() => {
        window.location.href = "/login"; // Redirect to login
      }, 1000);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="welcome-page" style={{
      background: `linear-gradient(to right, rgba(65, 103, 147, 0.7), rgba(96, 103, 114, 0.7)), url("${bgImage}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div className="container">
        <img src={logo} alt="HRMS" className="img" />

        <h1 className="white-text">
          <strong>Welcome – let’s build better workplaces</strong>
        </h1>

        <h2 className="white-text">"Manage. Engage. Grow."</h2>
      </div>

      {/* seasoning sparkles */}
      <div className="seasoning"></div>
      <div className="seasoning"></div>
      <div className="seasoning"></div>
      <div className="seasoning"></div>
      <div className="seasoning"></div>
    </div>
  );
};

export default Welcome;
