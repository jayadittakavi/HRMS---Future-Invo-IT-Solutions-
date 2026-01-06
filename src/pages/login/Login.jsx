import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "src/assets/App.css";
;

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateLogin = async (e) => {
    e.preventDefault();

    /* 🔐 ADMIN LOGIN → BACKEND (AS-IS from your code) */
    if (email === "admin@gmail.com") {
      try {
        const res = await fetch("http://127.0.0.1:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        const data = await res.json();

        if (res.ok) {
          localStorage.setItem("userRole", "admin");
          localStorage.setItem("token", data.token || "");
          navigate("/dashboard");
        } else {
          alert(data.message || "Admin login failed");
        }
      } catch (err) {
        alert("Backend server not reachable");
      }
      return;
    }

    /* 🔹 FRONTEND ROLE-BASED DEMO LOGINS */
    const roleMap = {
      "superadmin@gmail.com": "superadmin",
      "hr@gmail.com": "hr",
      "manager@gmail.com": "manager",
      "employee@gmail.com": "employee",
      "accountant@gmail.com": "accountant",
      "newuser@gmail.com": "newuser",
    };

    if (roleMap[email] && password === "1234") {
      localStorage.setItem("userRole", roleMap[email]);
      navigate("/dashboard");
      return;
    }

    alert("Invalid credentials");
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <br /><br /><br /><br />
        <center>
          <h2>Login to HRMS your work starts here!</h2>
        </center>
        <br />

        <form onSubmit={validateLogin}>
          <center>
            <input
              type="email"
              style={{ width: "60%" }}
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </center>

          <center>
            <input
              type="password"
              style={{ width: "60%" }}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </center>

          <center>
            <button type="submit" style={{ width: "60%" }} className="btn">
              Login
            </button>
          </center>
        </form>

        <br /><br />

        {/* Auth links */}
        <div className="auth-links">
          <a href="/forgot-password">Forgot password?</a>
          <span>
            Don&apos;t have an account?{" "}
            <a href="/signup">Sign up now</a>
          </span>
        </div>
      </div>

      <div className="login-right">
        {/* IMPORTANT: move image to /src/assets */}
        <img
          src="/src/assets/C:/Users/jaya/OneDrive/Desktop/Future Invo Project ( HRMS )/HRMS---Future-Invo-IT-Solutions-/hrms-frontend/src/assets/loginside.png"
          alt="HRMS LOGIN"
        />
      </div>
    </div>
  );
}
