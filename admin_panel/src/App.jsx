import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import './index.css';

const PlaceholderPage = ({ title }) => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-gray-800 mb-4">{title}</h1>
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
      <p className="text-gray-500">The {title} page is currently under development.</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
