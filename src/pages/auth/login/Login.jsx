import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';
import Navbar from '../../../components/layout/Navbar';
import sideImage from '../../../assets/images/login1.jpg';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const from = location.state?.from?.pathname || null;

  // ── Check if mock mode is enabled via .env ──


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    
    setLoading(true);
    setError('');

    try {
      const LOGIN_ENDPOINT = `/api/auth/login`;
      
      const payload = { 
        email: email.trim(), 
        username: email.trim(), 
        password: password.trim()
      };
      
      console.log("Sending Login Payload:", payload); 

      const res = await fetch(LOGIN_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const responseText = await res.text();
      let data = {};
      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch (e) {
        console.error("Backend returned non-JSON response:", responseText);
        if (res.status === 401) {
          setError("Invalid credentials. Please check your email and password.");
          return;
        }
        throw new Error(`Server returned an invalid response (${res.status}).`);
      }
      
      console.log("Login Response Data:", data);

      if (res.status === 401) {
        setError(data.message || data.error || "Invalid credentials");
        return;
      }

      if (!res.ok) {
        throw new Error(data.message || data.error || data.msg || `Login failed (Status ${res.status})`);
      }

      const token = data.token || data.access_token;
      const user = data.user || { ...data };
      
      user.firstName = user.first_name || user.firstName || user.fname || '';
      user.lastName = user.last_name || user.lastName || user.lname || '';
      
      const roleValue = user.role || data.role || 'employee';

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("role", roleValue);
        localStorage.setItem("user", JSON.stringify(user));
        
        login(user, token);

        const normalizedRole = roleValue.toString().toLowerCase().replace(/[^a-z]/g, '');
        
        if (normalizedRole === "superadmin") navigate("/superadmin-dashboard");
        else if (normalizedRole === "admin") navigate("/admin-dashboard");
        else if (normalizedRole === "hr") navigate("/hr-dashboard");
        else if (normalizedRole === "manager") navigate("/manager-dashboard");
        else if (normalizedRole === "employee") navigate("/employee-dashboard");
        else navigate("/dashboard");
      } else {
        setError("Invalid response from server: Token missing");
      }

    } catch (err) {
      console.error('Login Error:', err);
      // Friendly message when backend is offline / unreachable
      if (err instanceof TypeError && err.message.toLowerCase().includes('fetch')) {
        setError('Unable to reach the server. Please check your network or contact your administrator.');
      } else {
        setError(err.message || 'Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };



  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="bg-blob blob-1"></div>
        <div className="bg-blob blob-2"></div>
        <div className="bg-blob blob-3"></div>

        <div className="card login-card">
          <div className="row g-0 h-100 w-100">
            <div className="col-lg-6 p-4 p-md-5 d-flex flex-column justify-content-center bg-white">
              <div className="mb-4">
                <h3 className="login-title text-start">Login to HRMS</h3>
              </div>

              {error && (
                <div className="alert alert-danger py-2 small" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="name@company.com"
                    required
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Password</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-control border-end-0"
                      placeholder="••••••••"
                      required
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      className="btn password-toggle-btn px-3"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <Link to="/forgot-password" name="forgot-password" className="forgot-password-link">
                    Forgot password?
                  </Link>
                </div>

                <button type="submit" className="btn login-btn" disabled={loading}>
                  {loading ? 'LOGGING IN...' : 'LOGIN'}
                </button>

                {/* Social Login Removed */}

                <div className="mt-4 text-center">
                  <span className="small text-muted">Don't have an account? </span>
                  <Link to="/signup" className="small fw-bold text-primary text-decoration-none">Create Account</Link>
                </div>


              </form>
            </div>

            <div className="col-lg-6 d-none d-lg-block p-2">
              <div className="login-image-container h-100 w-100">
                <img src={sideImage} alt="HRMS Dashboard" className="login-image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
