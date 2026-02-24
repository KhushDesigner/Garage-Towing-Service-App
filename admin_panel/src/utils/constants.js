import {
  Users,
  Wrench,
  Activity,
  CheckCircle,
  DollarSign,
  AlertTriangle,
  BarChart,
  Settings,
  LogOut,
  MapPin,
  CreditCard,
  MessageSquare,
  FileText,
  ShieldAlert
} from 'lucide-react';

export const MENU_ITEMS = [
  { name: 'Dashboard', path: '/', icon: Activity },
  { name: 'User Management', path: '/users', icon: Users },
  { name: 'Partner Management', path: '/partners', icon: Wrench },
  { name: 'Live Requests', path: '/live-requests', icon: MapPin },
  { name: 'Completed Requests', path: '/completed-requests', icon: CheckCircle },
  { name: 'SOS Emergency Alerts', path: '/sos-alerts', icon: ShieldAlert },
  { name: 'Payments & Revenue', path: '/payments', icon: DollarSign },
  { name: 'Commission Settings', path: '/commission', icon: CreditCard },
  { name: 'Reviews & Ratings', path: '/reviews', icon: MessageSquare },
  { name: 'Dispute Management', path: '/disputes', icon: AlertTriangle },
  { name: 'Reports & Analytics', path: '/reports', icon: BarChart },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export const SERVICE_TYPES = {
  GARAGE: 'Garage',
  TOWING: 'Towing',
};

export const STATUS_COLORS = {
  Active: 'badge-primary',
  Completed: 'badge-success',
  Verified: 'badge-success',
  Cancelled: 'badge-alert',
  Blocked: 'badge-alert',
  SOS: 'badge-alert',
  Pending: 'badge-warning',
  Open: 'badge-primary',
  Resolved: 'badge-success',
};

// Dummy Data
export const USERS_DATA = [
  { id: 1, name: 'Rahul Sharma', phone: '+91 9876543210', totalRequests: 5, totalSpent: 2500, rating: 4.5, status: 'Active' },
  { id: 2, name: 'Priya Singh', phone: '+91 8765432109', totalRequests: 2, totalSpent: 1200, rating: 4.8, status: 'Active' },
  { id: 3, name: 'Amit Verma', phone: '+91 7654321098', totalRequests: 1, totalSpent: 500, rating: 3.9, status: 'Blocked' },
  { id: 4, name: 'Sneha Gupta', phone: '+91 6543210987', totalRequests: 8, totalSpent: 4500, rating: 4.9, status: 'Active' },
  { id: 5, name: 'Vikram Malhotra', phone: '+91 5432109876', totalRequests: 3, totalSpent: 1800, rating: 4.2, status: 'Active' },
];

export const PARTNERS_DATA = [
  { id: 101, name: 'Quick Fix Garage', phone: '+91 9988776655', serviceType: 'Garage', rating: 4.7, online: true, kyc: 'Verified', earnings: 15000 },
  { id: 102, name: 'City Towing Services', phone: '+91 8877665544', serviceType: 'Towing', rating: 4.9, online: true, kyc: 'Verified', earnings: 22000 },
  { id: 103, name: 'Mechanic On Wheels', phone: '+91 7766554433', serviceType: 'Garage', rating: 4.3, online: false, kyc: 'Pending', earnings: 8000 },
  { id: 104, name: 'Highway Helpers', phone: '+91 6655443322', serviceType: 'Towing', rating: 4.6, online: true, kyc: 'Verified', earnings: 19500 },
  { id: 105, name: 'Bike Doctor', phone: '+91 5544332211', serviceType: 'Garage', rating: 4.8, online: false, kyc: 'Verified', earnings: 12000 },
];

export const RECENT_REQUESTS_DATA = [
  { id: 'REQ-1001', user: 'Rahul Sharma', partner: 'Quick Fix Garage', service: 'Garage', amount: 500, payment: 'UPI', status: 'Completed', date: '2023-10-25' },
  { id: 'REQ-1002', user: 'Priya Singh', partner: 'City Towing Services', service: 'Towing', amount: 1200, payment: 'Card', status: 'Active', date: '2023-10-26' },
  { id: 'REQ-1003', user: 'Amit Verma', partner: 'Mechanic On Wheels', service: 'Garage', amount: 300, payment: 'Cash', status: 'Cancelled', date: '2023-10-24' },
  { id: 'REQ-1004', user: 'Sneha Gupta', partner: 'Highway Helpers', service: 'Towing', amount: 2000, payment: 'UPI', status: 'Active', date: '2023-10-26' },
  { id: 'REQ-1005', user: 'Vikram Malhotra', partner: 'Bike Doctor', service: 'Garage', amount: 450, payment: 'Cash', status: 'Completed', date: '2023-10-23' },
];

export const SOS_ALERTS_DATA = [
  { id: 'SOS-001', user: 'Anjali Das', location: 'MG Road, Bangalore', assigned: 'City Towing', time: '10:30 AM', status: 'Active' },
  { id: 'SOS-002', user: 'Rohan Mehta', location: 'NH-48, Near Pune', assigned: 'Highway Helpers', time: '11:15 AM', status: 'Resolved' },
];
