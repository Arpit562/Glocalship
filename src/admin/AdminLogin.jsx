// src/pages/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../auth.css';

const ADMIN_ID = "admin123";
const ADMIN_PASSWORD = "admin@123";

const AdminLogin = () => {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminId === ADMIN_ID && password === ADMIN_PASSWORD) {
      // Save admin login flag in sessionStorage (or localStorage)
      sessionStorage.setItem("isAdminLoggedIn", "true");
      navigate("/admin/dashboard");
    } else {
      setError("Invalid admin ID or password");
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-image-section">
            <img
              src="/img/admin-form.jpg"
              alt="Admin Login Visual"
              className="auth-image"
            />
          </div>
          <div className="auth-form-section">
            <h2 className="auth-title">Admin Login</h2>
            <p className="auth-subtitle">Sign in to manage parcel orders and users</p>
            <form onSubmit={handleAdminLogin}>
              <input
                type="text"
                className="auth-input"
                placeholder="Admin ID"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                required
              />
              <input
                type="password"
                className="auth-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && <div className="auth-status">{error}</div>}
              <button type="submit" className="auth-btn">Login</button>
            </form>
            <div className="auth-links">
              <p><a href="/">Back to Home</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
