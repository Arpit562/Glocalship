import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Player } from '@lottiefiles/react-lottie-player';
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
      sessionStorage.setItem("isAdminLoggedIn", "true");
      navigate("/admin/dashboard");
    } else {
      setError("Invalid admin ID or password");
    }



    useEffect(() => {
      import("https://cdn.lordicon.com/lordicon.js");
    }, []);

  };



  return (
    <div className="admin-login-bg">
      <div className="admin-login-container">

        {/* Lordicon Avatar */}
        <div className="flex justify-center mb-6">
          <lord-icon
            src="https://cdn.lordicon.com/ljvjsnvh.json"
            trigger="hover"
            class="admin-avatar"
          ></lord-icon>
        </div>

        <h2 className="admin-login-title">Admin Login</h2>
        <p className="admin-login-subtitle">Sign in to manage parcel orders and users</p>

        <form onSubmit={handleAdminLogin} className="admin-login-form">
          <input
            type="text"
            placeholder="Admin ID"
            className="admin-login-input"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="admin-login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="admin-login-error">{error}</p>}
          <button type="submit" className="admin-login-button">Login</button>
        </form>

        <div className="admin-login-footer">
          <a href="/" className="admin-login-link">Back to Home</a>
        </div>
      </div>
    </div>

  );
};

export default AdminLogin;
