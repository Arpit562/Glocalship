import React from "react";
import { Link } from "react-router-dom";
import "../PageNotFound1.css";
import BoxImage from "/img/illustration/box3.png";       // 🟠 Replace with your actual image path
import TruckImage from "/img/illustration/delivery.png";   // 🟠 Replace with your actual image path


const PageNotFound1 = () => {
    return (
 <>
   <div className="error-page">
      <div className="error-message">
        <h1>Something has <br/> gone wrong!</h1>
        <p>The page you are looking for doesn't exist or has been moved.</p>
        <Link to="/" className="home-link">
          Go to homepage
        </Link>
      </div>

      {/* <div className="falling-404s"> */}
        <div className="centered-404">
     <h1 style={{color:"white", fontSize:"50px"}} >404 -<br/> Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      </div>

    </div>
    {/* </div> */}
 </>
    );
}
export default PageNotFound1