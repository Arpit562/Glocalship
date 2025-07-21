import React from "react";
import { Link } from "react-router-dom";
import "../PageNotFound1.css";

const PageNotFound1 = () => {
  return (
    <div className="dark-404-container">
      <h1 className="dark-404-title">404</h1>
      <p className="dark-404-subtext">
        Looks like you're lost! <br />
        Go back to the <Link to="/" className="dark-home-link">Home Page</Link>
      </p>
    </div>
  );
};

export default PageNotFound1;
