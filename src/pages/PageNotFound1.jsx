import React from "react";
import { Link } from "react-router-dom";
import "../PageNotFound1.css";
const PageNotFound1 = () => {
    return (
       <div className="lost-page">
      <div className="lost-box">
        <div className="lost-header">
          <div className="lost-square" />
          <h3 className="lost-title">Got lost?</h3>
        </div>
        <Link to="/">
       <div className="bg-gradient-to-r #232946 text-white p-4 inline-block rounded-lg">
  <img
    src="/img/illustration/lost-terminal.png"
    alt="404 Terminal"
    className="lost-image"
  />
</div>

        </Link>
      </div>
    </div>

    );
}
export default PageNotFound1