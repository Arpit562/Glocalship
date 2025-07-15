// src/pages/Login.js
import React, { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import '../auth.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus("Logging in...");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-image-section">
            <img
              src="https://www.dropoff.com/wp-content/webp-express/webp-images/uploads/2023/02/Delivery-as-a-service-3-1536x900.jpeg.webp"
              alt="Login visual"
              className="auth-image"
            />
          </div>
          <div className="auth-form-section">
            <h2 className="auth-title">Sign In</h2>
            <p className="auth-subtitle">Access your parcel delivery dashboard</p>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                className="auth-input"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="auth-input"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {status && <div className="auth-status">{status}</div>}
              <button type="submit" className="auth-btn">Login</button>
            </form>
            <div className="auth-links">
              <p>New user? <Link to="/signup">Signup</Link></p>
              <p>Login as Admin? <Link to="/admin/login">Click here</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
