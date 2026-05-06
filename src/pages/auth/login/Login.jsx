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
  const isMockMode = import.meta.env.VITE_MOCK_MODE === 'true';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    
    setLoading(true);
    setError('');

    try {
      // ══════════════════════════════════════════════════════════
      // MOCK MODE — skip backend, create a fake session
      // ══════════════════════════════════════════════════════════
      if (isMockMode) {
        const mockUser = {
          firstName: "Niharika",
          lastName: "Thota",
          email: email.trim() || "test@gmail.com",
          role: "superadmin",
        };
        const mockToken = "mock-jwt-token-" + Date.now();

        // Persist to localStorage
        localStorage.setItem("token", mockToken);
        localStorage.setItem("role", mockUser.role);
        localStorage.setItem("user", JSON.stringify(mockUser));

        // Update AuthContext global state
        login(mockUser, mockToken);

        // Role-based redirect
        const r = mockUser.role;
        if (r === "superadmin")      navigate("/superadmin-dashboard");
        else if (r === "admin")      navigate("/admin-dashboard");
        else if (r === "hr")         navigate("/hr-dashboard");
        else if (r === "manager")    navigate("/manager-dashboard");
        else if (r === "employee")   navigate("/employee-dashboard");
        else                         navigate("/dashboard");
        return;  // done — skip everything below
      }

      // ══════════════════════════════════════════════════════════
      // REAL API MODE — original backend call (kept for future)
      // ══════════════════════════════════════════════════════════
      const API_URL = window.location.origin;
      const LOGIN_ENDPOINT = `${API_URL}/api/auth/login`;
      
      const payload = { 
        email: email.trim(), 
        username: email.trim(), // Some backends expect 'username' for the email field
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
      
      // EXTRACT NAME AGGRESSIVELY
      const nameData = { ...data, ...user }; 
      user.firstName = nameData.first_name || nameData.firstName || nameData.fname || '';
      user.lastName = nameData.last_name || nameData.lastName || nameData.lname || '';
      
      console.log("Final User Object for Context:", user);

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
        console.error("Login failed: Token missing in response", data);
        setError("Invalid response from server: Token missing");
      }

    } catch (err) {
      console.error('Login Error:', err);
      // In mock mode this block won't run, but guard anyway
      if (isMockMode) return;
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID";
    const REDIRECT_URI = "http://localhost:3000/oauth/google/callback";
    const SCOPE = "openid email profile";
    const AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=${SCOPE}`;
    window.location.href = AUTH_URL;
  };

  const handleOutlookLogin = () => {
    const MICROSOFT_CLIENT_ID = "YOUR_MICROSOFT_CLIENT_ID";
    const REDIRECT_URI = "http://localhost:3000/oauth/outlook/callback";
    const SCOPE = "openid profile email User.Read";
    const AUTH_URL = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${MICROSOFT_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=${SCOPE}`;
    window.location.href = AUTH_URL;
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

                <div className="login-divider my-4">
                  <span>or sign in with</span>
                </div>

                <div className="social-login-group">
                  <button type="button" className="btn social-login-btn google-btn" onClick={handleGoogleLogin}>
                    <svg className="social-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <span className="visually-hidden">Continue with Google</span>
                  </button>
                  <button type="button" className="btn social-login-btn outlook-btn" onClick={handleOutlookLogin}>
                    <svg className="social-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.88 12.04q0 .45-.11.87-.1.41-.33.74-.22.33-.58.52-.37.2-.87.2t-.85-.2q-.35-.21-.57-.55-.22-.33-.33-.75-.1-.42-.1-.86t.1-.87q.1-.42.34-.76.22-.33.58-.52.37-.2.86-.2.5 0 .86.2.35.21.57.55.22.34.32.77.1.43.1.86zM24 12v9.38q0 .46-.33.8-.33.32-.8.32H7.13q-.46 0-.8-.33-.32-.33-.32-.8V18H1q-.41 0-.7-.3-.3-.29-.3-.7V7q0-.41.3-.7Q.58 6 1 6h6.01V2.62q0-.46.33-.8.33-.32.8-.32h8.67q.46 0 .8.33.32.33.32.8V6H23q.41 0 .7.3.3.29.3.7v5.7zM8.98 7H1v10h7.98V7zM8.5 18.5q0-.2-.14-.35-.14-.14-.35-.14h-5.5q-.2 0-.35.14-.14.15-.14.35 0 .21.14.35.15.14.35.14h5.5q.2 0 .35-.14.14-.14.14-.35zm14.5-4.5H14l-2 2.5V17l-2-2.5H2v1h7.5l2 2.5V21l2-2.5H23v-1z" fill="#0078D4"/>
                      <path d="M14 6V2.62L22.33 6H14z" fill="#0078D4" opacity=".5"/>
                    </svg>
                    <span className="visually-hidden">Continue with Outlook</span>
                  </button>
                </div>

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
