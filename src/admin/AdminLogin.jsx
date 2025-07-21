// src/pages/AdminLogin.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  };

 

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-500 px-4 py-8">
      <div className="bg-white rounded-3xl shadow-2xl flex  max-w-4xl overflow-hidden flex-col items-center px-8 py-12">cd

        {/* Lordicon Avatar */}
        <div className="mb-4">
          <lord-icon
            src="https://cdn.lordicon.com/ljvjsnvh.json"
            trigger="hover"
            style={{ width: "80px", height: "80px" }}
          ></lord-icon>
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Admin Login</h2>
        <p className="text-gray-600 mb-6 text-center">Sign in to manage parcel orders and users</p>

        {/* Form */}
        <form onSubmit={handleAdminLogin} className="w-full max-w-md space-y-5">
          <input
            type="text"
            placeholder="Admin ID"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl   focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
          />

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6">
          <a href="/" className="text-blue-600 font-medium hover:underline">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
