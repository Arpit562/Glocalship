import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (loggedUser) => {
      if (loggedUser) {
        setUser(loggedUser);
        fetchUserBookings(loggedUser.uid);
      } else {
        setBookings([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserBookings = async (uid) => {
    try {
      const q = query(collection(db, "parcels"), where("userId", "==", uid));
      const querySnapshot = await getDocs(q);
      const userBookings = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBookings(userBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="card shadow-sm p-4 position-relative">
        {/* Close Button */}
        <Link to="/" className="btn-close position-absolute end-0 top-0 m-3" aria-label="Close"></Link>

        <h3 className="mb-4">📦 My Bookings</h3>

        {loading ? (
          <div className="text-muted">Loading your bookings...</div>
        ) : bookings.length === 0 ? (
          <div className="alert alert-info">No bookings found under your account.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Parcel ID</th>
                  <th>Status</th>
                  <th>Pickup Address</th>
                  <th>Drop Address</th>
                  <th>Booked At</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.parcelId}</td>
                    <td>
                      <span className={`badge ${booking.status === "Delivered" ? "bg-success" : "bg-warning text-dark"}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td>{booking.pickupAddress}</td>
                    <td>{booking.dropAddress}</td>
                    <td>{booking.createdAt?.toDate().toLocaleString() || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;
