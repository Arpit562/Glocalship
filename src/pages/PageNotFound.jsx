// src/pages/PageNotFound.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../PageNotFound.css";

export default function PageNotFound() {
  return (
    <div className="error-container">
      <div className="error-content">
        <h1>Oops! 404 Error</h1>
        <p>You're on the wrong route</p>

        <div className="button-image-wrapper">
          <Link to="/" className="home-btn">
           
          <button class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 h-10 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white">Go to homepage</button>
         </Link>
          <div className="error-image">
            <img src="/img/illustration/box3.png" alt="Box Illustration" />
          </div>
        </div>
      </div>

      <div className="truck-animation">
        <img src="/img/illustration/delivery.png" alt="Moving Truck" />
      </div>
    </div>
  );
}
