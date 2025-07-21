// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import '../auth.css';


const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    // Check if admin is logged in
    if (sessionStorage.getItem("isAdminLoggedIn") !== "true") {
      navigate("/admin/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const q = query(collection(db, "parcels"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        let allOrders = [];
        querySnapshot.forEach((doc) => {
          allOrders.push({ id: doc.id, ...doc.data() });
        });
        setOrders(allOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("isAdminLoggedIn");
    navigate("/admin/login");
  };

  // Filter orders by search
  const filteredOrders = orders.filter(order => {
    const q = search.toLowerCase();
    return (
      (order.fullName && order.fullName.toLowerCase().includes(q)) ||
      (order.parcelId && order.parcelId.toLowerCase().includes(q)) ||
      (order.phone && order.phone.includes(q))
    );
  });

  return (
    <div className="auth-bg" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #232946 0%, #1a223f 100%)' }}>
      <div className="auth-container" style={{ maxWidth: 1300, width: '100%' }}>
        <div className="auth-card" style={{ flexDirection: 'column', width: '100%', minHeight: 600, boxShadow: '0 8px 32px 0 rgba(31,38,135,0.25)', background: 'rgba(34,40,49,0.85)', border: '1.5px solid #232946', backdropFilter: 'blur(8px)' }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 24,
            borderBottom: '1.5px solid #232946',
            marginBottom: 24,
            flexWrap: 'wrap',
            gap: 16
          }}>
            {/* Admin Dashboard */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              flex: 1,
              minWidth: 250
            }}>
            
              <h2 style={{
                margin: 0,
                padding: '0.5rem 1rem',
                fontSize: '2rem',
                letterSpacing: 1,
                borderBottom: '2px solid #3b82f6',
                color: '#fff'
              }}>
                Admin Dashboard
              </h2>
            </div>

            {/* Profile Button */}
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              flex: 1,
              minWidth: 200
            }}>
              <button
                style={{
                  maxWidth: 160,
                  padding: '0.7rem 1.2rem',
                  background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
                  fontWeight: 600,
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
                onClick={() => setShowProfile(v => !v)}
              >
                <span style={{ marginRight: 8 }}>Admin</span>
                <svg width="18" height="18" fill="#fff" style={{ verticalAlign: 'middle' }}>
                  <circle cx="9" cy="7" r="4" />
                  <ellipse cx="9" cy="15" rx="6" ry="3" />
                </svg>
              </button>

              {/* Dropdown */}
              {showProfile && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: 48,
                  background: '#232946',
                  color: '#fff',
                  borderRadius: 12,
                  boxShadow: '0 4px 24px #0002',
                  minWidth: 180,
                  zIndex: 10,
                  padding: 16,
                  border: '1px solid #3b82f6'
                }}>
                  <div style={{ fontWeight: 600, marginBottom: 8 }}>Admin</div>
                  <button
                    style={{
                      width: '100%',
                      padding: '0.6rem',
                      margin: '4px 0',
                      background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
                      border: 'none',
                      color: '#fff',
                      borderRadius: 6,
                      cursor: 'pointer'
                    }}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                  <button
                    style={{
                      width: '100%',
                      padding: '0.6rem',
                      marginTop: 8,
                      background: 'transparent',
                      color: '#b8c1ec',
                      border: '1px solid #3b82f6',
                      borderRadius: 6,
                      cursor: 'pointer'
                    }}
                    onClick={() => setShowProfile(false)}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div style={{
            marginBottom: 24,
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
            <input
              type="text"
              placeholder="Search by Name, Parcel ID, or Phone..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                maxWidth: 320,
                width: '100%',
                background: '#161b22',
                border: '1.5px solid #3b82f6',
                color: '#fff',
                fontSize: 16,
                padding: '0.6rem 1rem',
                borderRadius: 8
              }}
            />
          </div>

          {/* Table or Empty State */}
          <div style={{ overflowX: 'auto', width: '100%', flex: 1 }}>
            {filteredOrders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <img src="/public/img/illustration/bestdeal.svg" alt="No Orders" style={{ width: 180, marginBottom: 24, opacity: 0.8 }} />
                <div className="auth-title" style={{ fontSize: 24, color: '#b8c1ec' }}>No orders found</div>
                <div className="auth-subtitle">Try adjusting your search or check back later.</div>
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, background: 'rgba(34,40,49,0.98)', borderRadius: 16, overflow: 'hidden', color: '#fff', fontSize: 15, boxShadow: '0 2px 16px #3b82f633' }}>
                <thead style={{ background: 'rgba(35,41,70,0.98)', position: 'sticky', top: 0, zIndex: 2 }}>
                  <tr>
                    <th style={{ padding: '14px 10px', color: '#b8c1ec', fontWeight: 700, background: 'rgba(35,41,70,0.98)', position: 'sticky', top: 0 }}>Order ID</th>
                    <th style={{ padding: '14px 10px', color: '#b8c1ec', fontWeight: 700 }}>Full Name</th>
                    <th style={{ padding: '14px 10px', color: '#b8c1ec', fontWeight: 700 }}>Phone</th>
                    <th style={{ padding: '14px 10px', color: '#b8c1ec', fontWeight: 700 }}>Pickup Address</th>
                    <th style={{ padding: '14px 10px', color: '#b8c1ec', fontWeight: 700 }}>Drop Address</th>
                    <th style={{ padding: '14px 10px', color: '#b8c1ec', fontWeight: 700 }}>Description</th>
                    <th style={{ padding: '14px 10px', color: '#b8c1ec', fontWeight: 700 }}>Weight (kg)</th>
                    <th style={{ padding: '14px 10px', color: '#b8c1ec', fontWeight: 700 }}>Status</th>
                    <th style={{ padding: '14px 10px', color: '#b8c1ec', fontWeight: 700 }}>Parcel ID</th>
                    <th style={{ padding: '14px 10px', color: '#b8c1ec', fontWeight: 700 }}>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, idx) => (
                    <tr key={order.id} style={{ borderBottom: '1px solid #232946', background: idx % 2 === 0 ? 'rgba(35,41,70,0.85)' : 'rgba(34,40,49,0.85)', transition: 'background 0.2s' }}>
                      <td style={{ padding: '12px 10px', fontWeight: 600, color: '#8b5cf6' }}>{order.parcelId || "N/A"}</td>
                      <td style={{ padding: '12px 10px' }}>{order.fullName}</td>
                      <td style={{ padding: '12px 10px' }}>{order.phone}</td>
                      <td style={{ padding: '12px 10px', maxWidth: 180, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{order.pickupAddress}</td>
                      <td style={{ padding: '12px 10px', maxWidth: 180, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{order.dropAddress}</td>
                      <td style={{ padding: '12px 10px', maxWidth: 160, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{order.description}</td>
                      <td style={{ padding: '12px 10px' }}>{order.weight}</td>
                      <td style={{ padding: '12px 10px' }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '4px 12px',
                          borderRadius: 8,
                          fontWeight: 600,
                          fontSize: 13,
                          background: order.status === 'Delivered' ? 'linear-gradient(90deg,#22c55e,#16a34a)' : order.status === 'Pending' ? 'linear-gradient(90deg,#fbbf24,#f59e42)' : 'linear-gradient(90deg,#3b82f6,#8b5cf6)',
                          color: '#fff',
                          boxShadow: '0 1px 4px #0002',
                          letterSpacing: 0.2
                        }}>{order.status}</span>
                      </td>
                      <td style={{ padding: '12px 10px', color: '#3b82f6', fontWeight: 500 }}>{order.parcelId}</td>
                      <td style={{ padding: '12px 10px', color: '#b8c1ec' }}>{order.createdAt?.toDate ? order.createdAt.toDate().toLocaleString() : "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;


