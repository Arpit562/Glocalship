
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import HomePage from '@/pages/HomePage';
import Dashboard from '@/pages/Dashboard';
import TrackingPage from '@/pages/TrackingPage';
import PricingPage from '@/pages/PricingPage';
import PageNotFound from './pages/PageNotFound1'; 

import NotFound1 from '@/pages/PageNotFound1';
import Signup from '@/auth/Signup';
import Login from '@/auth/Login';
import { AuthProvider } from '@/auth/AuthProvider';
import { useAuth } from '@/auth/AuthProvider';
import AdminLogin from '@/admin/AdminLogin';
import AdminDashboard from '@/admin/AdminDashboard';
import ScrollToTop from './Top';
import './Lordicon'

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center min-h-screen text-white">Loading...</div>;
  return user ? children : <Login />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
      <ScrollToTop />
        <div className="min-h-screen">
          <Helmet>
            <title>ShipForward - International Package Forwarding from India</title>
            <meta name="description" content="Get your Indian virtual address and shop from Indian websites. We consolidate and ship your packages globally with the best rates." />
          </Helmet>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/tracking" element={<PrivateRoute><TrackingPage /></PrivateRoute>} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/  " element={<PageNotFound />} /> <Route path="*" element={<NotFound1/>} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
