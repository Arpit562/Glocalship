// src/pages/Signup.jsx
import React, { useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import '../auth.css';
function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setStatus("Creating account...");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName,
        email,
        createdAt: serverTimestamp(),
      });

     
      navigate("/");
    } catch (error) {
      setStatus("Signup failed: " + error.message);
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-image-section">
            <img
              src="https://calflavins.ie/wp-content/uploads/2022/12/New-delivery-services-pop-up-amid-social-distancing-era.jpg"
              alt="Signup visual"
              className="auth-image"
            />
          </div>
          <div className="auth-form-section">
            <h2 className="auth-title">Sign Up</h2>
            <p className="auth-subtitle">Create your account to start booking and tracking parcels</p>
            <form onSubmit={handleSignup}>
              <input
                type="text"
                className="auth-input"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <input
                type="email"
                className="auth-input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              {status && <div className="auth-status">{status}</div>}
              <button type="submit" className="auth-btn">Signup</button>
            </form>
            <div className="auth-links">
              <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
