import React, { useState, useRef, useEffect } from 'react';
import {
    Bell,
    Search,
    Menu,
    ChevronDown,
    UserCircle,
    Zap,
    CheckCircle2,
    Clock,
    ShieldCheck,
    Gavel,
    IndianRupee,
    Info,
    Lock,
    MoreHorizontal
} from 'lucide-react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

const Header = ({ sidebarOpen, toggleSidebar }) => {
    const [profileOpen, setProfileOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);

    const notificationRef = useRef(null);
    const profileRef = useRef(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setNotifOpen(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Dummy Notifications Data
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'emergency',
            title: 'SOS Alert Triggered',
            desc: 'New emergency request #REQ-9901 from NH8 Highway.',
            time: '2 min ago',
            unread: true,
            icon: Zap,
            color: 'text-red-600',
            bg: 'bg-red-50',
            border: 'border-l-red-500'
        },
        {
            id: 2,
            type: 'payment',
            title: 'Payment Received',
            desc: '₹1,240 received for Request #REQ-8821 via UPI.',
            time: '15 min ago',
            unread: true,
            icon: IndianRupee,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
            border: 'border-l-emerald-500'
        },
        {
            id: 3,
            type: 'info',
            title: 'New Service Request',
            desc: 'Towing needed for Wheel-Lift service in South Delhi.',
            time: '45 min ago',
            unread: false,
            icon: Info,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            border: 'border-l-blue-500'
        },
        {
            id: 4,
            type: 'kyc',
            title: 'Partner KYC Approved',
            desc: 'Metro Garage documents verified successfully.',
            time: '2 hrs ago',
            unread: false,
            icon: ShieldCheck,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50',
            border: 'border-l-indigo-500'
        },
        {
            id: 5,
            type: 'dispute',
            title: 'Dispute Raised',
            desc: 'User #U902 reported overcharging on REQ-8710.',
            time: '1 day ago',
            unread: false,
            icon: Gavel,
            color: 'text-amber-600',
            bg: 'bg-amber-50',
            border: 'border-l-amber-500'
        }
    ]);

    const unreadCount = notifications.filter(n => n.unread).length;

    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, unread: false })));
    };

    return (
        <header
            className={clsx(
                "fixed top-0 right-0 z-10 flex items-center justify-between px-4 md:px-6 bg-white border-b border-gray-200 shadow-sm transition-all duration-300",
                "left-0",
                sidebarOpen ? "lg:left-[var(--sidebar-width)]" : "lg:left-[80px]"
            )}
            style={{
                height: 'var(--header-height)',
            }}
        >
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
                >
                    <Menu className="w-6 h-6" />
                </button>

                <div className="relative hidden md:block group">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search for requests, partners, or users..."
                        className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-none group-hover:bg-gray-100"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4 md:gap-6">
                {/* Notifications Panel */}
                <div className="relative" ref={notificationRef}>
                    <button
                        onClick={() => {
                            setNotifOpen(!notifOpen);
                            setProfileOpen(false);
                        }}
                        className={`p-2.5 rounded-xl transition-all relative ${notifOpen ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100 text-gray-600'}`}
                    >
                        <Bell className="w-5 h-5" />
                        {unreadCount > 0 && (
                            <span className="absolute top-2 right-2 w-4 h-4 bg-red-600 text-[10px] font-black text-white rounded-full flex items-center justify-center ring-2 ring-white animate-pulse">
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    {notifOpen && (
                        <div className="fixed inset-x-4 top-[calc(var(--header-height)+8px)] md:absolute md:inset-auto md:right-0 md:mt-3 md:w-[400px] bg-white rounded-3xl shadow-2xl border border-gray-100 animate-in fade-in slide-in-from-top-4 duration-300 overflow-hidden">
                            {/* Panel Header */}
                            <div className="px-6 py-5 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                                <div>
                                    <h3 className="text-base font-black text-gray-900">Notifications</h3>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">You have {unreadCount} unread alerts</p>
                                </div>
                                <button
                                    onClick={markAllRead}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all group"
                                    title="Mark all as read"
                                >
                                    <CheckCircle2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                </button>
                            </div>

                            {/* Notifications Scroll Area */}
                            <div className="max-h-[420px] overflow-y-auto divide-y divide-gray-50">
                                {notifications.length > 0 ? (
                                    notifications.map((n) => (
                                        <div
                                            key={n.id}
                                            className={`relative px-6 py-5 hover:bg-gray-50 transition-all border-l-4 ${n.border} ${n.unread ? 'bg-blue-50/30' : ''}`}
                                        >
                                            <div className="flex gap-4">
                                                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${n.bg} ${n.color} shadow-sm`}>
                                                    <n.icon className="w-5 h-5" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <h4 className={`text-sm font-black text-gray-900 leading-tight ${n.unread ? 'pr-3' : ''}`}>
                                                            {n.title}
                                                        </h4>
                                                        {n.unread && (
                                                            <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1.5 shadow-[0_0_8px_rgba(37,99,235,0.5)]" />
                                                        )}
                                                    </div>
                                                    <p className="text-xs font-medium text-gray-500 mt-1 leading-relaxed">
                                                        {n.desc}
                                                    </p>
                                                    <div className="flex items-center gap-1.5 mt-2.5">
                                                        <Clock className="w-3 h-3 text-gray-300" />
                                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                                                            {n.time}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-6 py-20 text-center space-y-3">
                                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                                            <Bell className="w-8 h-8" />
                                        </div>
                                        <p className="text-sm font-bold text-gray-400">All caught up!</p>
                                    </div>
                                )}
                            </div>

                            {/* Panel Footer */}
                            <Link
                                to="/notifications"
                                onClick={() => setNotifOpen(false)}
                                className="w-full py-4 bg-white border-t border-gray-50 text-xs font-black text-gray-400 uppercase tracking-widest hover:text-blue-600 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                            >
                                View All Notifications <ChevronDown className="-rotate-90 w-4 h-4" />
                            </Link>
                        </div>
                    )}
                </div>

                {/* Profile Panel */}
                <div className="relative" ref={profileRef}>
                    <button
                        className={`flex items-center gap-3 p-1.5 rounded-2xl transition-all ${profileOpen ? 'bg-gray-100 active:scale-95' : 'hover:bg-gray-50'}`}
                        onClick={() => {
                            setProfileOpen(!profileOpen);
                            setNotifOpen(false);
                        }}
                    >
                        <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xs shadow-lg shadow-blue-100">
                            RA
                        </div>
                        <div className="hidden lg:block text-left pr-2">
                            <p className="text-xs font-black text-gray-900 leading-tight">Admin User</p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Super Admin</p>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${profileOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {profileOpen && (
                        <div
                            className="absolute right-0 mt-3 w-56 bg-white rounded-3xl shadow-2xl border border-gray-100 py-3 animate-in fade-in slide-in-from-top-4 duration-300 z-50"
                        >
                            <div className="px-5 py-3 border-b border-gray-50 mb-2">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Main Account</p>
                            </div>
                            <Link
                                to="/profile"
                                className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all mx-2 rounded-xl"
                                onClick={() => setProfileOpen(false)}
                            >
                                <UserCircle className="w-5 h-5 opacity-70" />
                                My Profile
                            </Link>
                            <Link
                                to="/settings"
                                className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all mx-2 rounded-xl"
                                onClick={() => setProfileOpen(false)}
                            >
                                <Lock className="w-5 h-5 opacity-70" />
                                Security Settings
                            </Link>
                            <div className="border-t border-gray-50 my-2 mx-4"></div>
                            <button className="flex w-[calc(100%-16px)] items-center gap-3 px-5 py-3 text-sm font-bold text-red-500 hover:bg-red-50 transition-all mx-2 rounded-xl">
                                <Clock className="w-5 h-5 opacity-70" />
                                Log Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
