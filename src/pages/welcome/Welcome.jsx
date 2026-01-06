import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";

export default function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      document.body.classList.add("fade-out");

      setTimeout(() => {
        navigate("/"); // Home page
      }, 1000);
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="welcome-page">
      <div className="container">
        <img src="/images/logo.jpeg" alt="HRMS Logo" className="logo-img" />

        <h1 className="white-text">
          Welcome – let’s build better workplaces
        </h1>

        <h2 className="white-text">“Manage. Engage. Grow.”</h2>
      </div>

      {/* sparkles */}
      <div className="seasoning"></div>
      <div className="seasoning"></div>
      <div className="seasoning"></div>
      <div className="seasoning"></div>
      <div className="seasoning"></div>
    </div>
  );
}
