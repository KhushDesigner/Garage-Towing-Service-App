import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from './layouts/Layout';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import PartnerManagement from './pages/PartnerManagement';
import LiveRequests from './pages/LiveRequests';
import CompletedRequests from './pages/CompletedRequests';
import SOSAlerts from './pages/SOSAlerts';
import PaymentsRevenue from './pages/PaymentsRevenue';
import CommissionSettings from './pages/CommissionSettings';
import ReviewsRatings from './pages/ReviewsRatings';
import DisputeManagement from './pages/DisputeManagement';
import ReportsAnalytics from './pages/ReportsAnalytics';
import Settings from './pages/Settings';
import AdminProfile from './pages/AdminProfile';
import NotificationsPage from './pages/NotificationsPage';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import './index.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Admin Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="partners" element={<PartnerManagement />} />
          <Route path="live-requests" element={<LiveRequests />} />
          <Route path="completed-requests" element={<CompletedRequests />} />
          <Route path="sos-alerts" element={<SOSAlerts />} />
          <Route path="payments" element={<PaymentsRevenue />} />
          <Route path="commission" element={<CommissionSettings />} />
          <Route path="reviews" element={<ReviewsRatings />} />
          <Route path="disputes" element={<DisputeManagement />} />
          <Route path="reports" element={<ReportsAnalytics />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="notifications" element={<NotificationsPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
