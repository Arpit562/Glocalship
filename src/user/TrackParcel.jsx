import React, { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

function TrackParcel({ onClose }) {
  const [parcelId, setParcelId] = useState("");
  const [parcelData, setParcelData] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setParcelData(null);

    try {
      const q = query(collection(db, "parcels"), where("parcelId", "==", parcelId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("❌ Parcel ID not found. Please check and try again.");
        return;
      }

      querySnapshot.forEach((doc) => {
        setParcelData(doc.data());
      });
    } catch (err) {
      console.error("Error tracking parcel:", err);
      setError("⚠️ Failed to fetch parcel info.");
    }
  };

  const handleClose = () => {
    setParcelData(null);
    setParcelId("");
    setError("");
    onClose(); // close the modal
  };

  return (
    <div>
      <section id="hero" className="hero section dark-background">
        <div className="container" >
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="hero-content"  data-aos-delay="100">
                <div className="hero-tag">
                  <i className="bi bi-rocket-takeoff"></i>
                  <span>Innovative Solutions</span>
                </div>
                <h1>
                  Achieving <span className="highlight">Outstanding Results</span> for Your Growth
                </h1>
                <p className="lead">
                  Our dedicated team provides exceptional service to help you reach your business goals effectively.
                </p>
                <ul className="hero-features">
                  <li><i className="bi bi-check-circle"></i> Streamlined operational processes</li>
                  <li><i className="bi bi-check-circle"></i> Enhanced customer engagement strategies</li>
                  <li><i className="bi bi-check-circle"></i> Data-driven decision support</li>
                </ul>
                <div className="hero-cta">
                  <a href="#services" className="btn btn-primary">Explore Our Services</a>
                  <a href="tel:+15559876543" className="btn btn-link">
                    <i className="bi bi-telephone"></i> +1 (555) 987-6543
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="hero-image-wrapper"  data-aos-delay="300">
                <img
                  src="assets/img/about/about-square-13.webp"
                  alt="Hero Visual"
                  className="img-fluid hero-image"
                />
                <div className="stat-card top-right">
                  <div className="stat-value">18.9K</div>
                  <div className="stat-label">Improved market presence</div>
                  <div className="stat-icon">
                    <i className="bi bi-graph-up-arrow"></i>
                  </div>
                </div>
                <div className="stat-card bottom-left">
                  <div className="stat-value">+450%</div>
                  <div className="stat-label">Increased lead generation</div>
                  <div className="stat-icon">
                    <i className="bi bi-graph-up"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content p-3">
            <div className="modal-header justify-content-between" >
              <h5 className="modal-title">📦 Track Your Parcel</h5>
              <Link to="/">
                <button type="button" className="btn-close" onClick={handleClose}></button>
              </Link>
            </div>

            <div className="modal-body">
              {!parcelData && (
                <form onSubmit={handleSearch}>
                  <div className="mb-3">
                    <label className="form-label">Parcel ID</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Parcel ID (e.g. ORD-123ABC)"
                      value={parcelId}
                      onChange={(e) => setParcelId(e.target.value.toUpperCase())}
                      required
                    />
                  </div>
                  <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary">Track Parcel</button>
                    <Link to="/">
                      <button type="button" className="btn btn-secondary" onClick={handleClose}>Cancel</button>
                    </Link>
                  </div>
                </form>
              )}

              {error && <div className="alert alert-danger mt-3">{error}</div>}

              {parcelData && (
                <div className="mt-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5>📄 Parcel Details</h5>
                    <button className="btn btn-outline-secondary btn-sm" onClick={handleClose}>Close</button>
                  </div>
                  <hr />
                  <p><strong>Status:</strong> {parcelData.status}</p>
                  <p><strong>Name:</strong> {parcelData.fullName}</p>
                  <p><strong>Phone:</strong> {parcelData.phone}</p>
                  <p><strong>Pickup:</strong> {parcelData.pickupAddress}</p>
                  <p><strong>Drop:</strong> {parcelData.dropAddress}</p>
                  <p><strong>Description:</strong> {parcelData.description}</p>
                  <p><strong>Weight:</strong> {parcelData.weight} kg</p>
                  {parcelData.imageUrl && (
                    <div className="mt-3">
                      <img
                        src={parcelData.imageUrl}
                        alt="Parcel"
                        className="img-fluid rounded border"
                        style={{ maxHeight: 300 }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackParcel;
