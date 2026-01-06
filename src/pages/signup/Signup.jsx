import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css"; // common CSS file (explained below)

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // 🔹 Frontend demo logic
    alert("Signup request sent to Super Admin for approval");

    // after signup → redirect to login
    navigate("/login");
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h2>Create an account</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn">
            Sign Up
          </button>
        </form>

        <p className="redirect-text">
          Already have an account?
          <Link to="/login"> Login here</Link>
        </p>
      </div>

      <div className="login-right">
        <img src="/images/signupbg.png" alt="Sign Up" />
      </div>
    </div>
  );
}
