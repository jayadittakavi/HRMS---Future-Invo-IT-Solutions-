import { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // frontend demo (backend later)
    alert("Password reset link has been sent to: " + email);

    setEmail("");
  };

  return (
    <div className="forgot-container">
      <div className="box">
        <h2>Forgot Password</h2>
        <p>Enter your email — we’ll send a reset link.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit">Send Reset Link</button>
        </form>

        <Link className="back" to="/login">
          ⬅ Back to Login
        </Link>
      </div>
    </div>
  );
}
