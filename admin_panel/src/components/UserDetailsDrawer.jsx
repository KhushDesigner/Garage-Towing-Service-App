import React, { useEffect, useState } from 'react';
import { X, MapPin, Car, History, CreditCard, Star, Phone, Mail, Calendar, Shield, ChevronRight } from 'lucide-react';
import StatusBadge from './StatusBadge';
import clsx from 'clsx';

const UserDetailsDrawer = ({ user, isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState('requests');

    // Handle Esc key to close
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    // Lock body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    if (!isOpen || !user) return null;

    const initials = user.name.split(' ').map(n => n[0]).join('');

    const tabs = [
        { id: 'requests', label: 'Requests', icon: History },
        { id: 'payments', label: 'Payments', icon: CreditCard },
        { id: 'vehicles', label: 'Vehicles', icon: Car },
    ];

    return (
        <>
            {/* Backdrop */}
            <div
                className="mt-0 mb-0 fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-in fade-in duration-200"
                onClick={onClose}
            ></div>

            {/* Drawer - slides up on mobile, slides from right on sm+ */}
            <div
                className={clsx(
                    "fixed z-50 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out",
                    // Mobile: bottom sheet
                    "inset-x-0 bottom-0 top-12 rounded-t-3xl",
                    // sm+: right side drawer
                    "sm:inset-y-0 sm:left-auto sm:right-0 sm:top-0 sm:rounded-none sm:max-w-xl sm:w-full",
                    isOpen
                        ? 'translate-y-0 sm:translate-x-0'
                        : 'translate-y-full sm:translate-y-0 sm:translate-x-full'
                )}
            >
                {/* Close Button / Drag Handle */}
                <div className="sm:hidden flex justify-center pt-3 pb-1">
                    <div className="w-10 h-1.5 bg-gray-300 rounded-full"></div>
                </div>
                <button
                    onClick={onClose}
                    className="z-11 absolute cursor-pointer top-3 right-4 sm:top-5 sm:right-5 z-10 p-2 sm:p-2.5 bg-white/80 backdrop-blur-sm hover:bg-gray-100 rounded-xl sm:rounded-2xl transition-all text-gray-400 hover:text-gray-900 active:scale-90 shadow-sm border border-gray-100"
                >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto">
                    {/* Profile Hero */}
                    <div className="relative bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-700 px-5 sm:px-8 pt-5 sm:pt-8 pb-14 sm:pb-16">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvc3ZnPg==')] opacity-60"></div>
                        <div className="relative flex items-center gap-4 sm:gap-5">
                            <div className="w-14 h-14 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-md rounded-2xl sm:rounded-3xl flex items-center justify-center text-white text-lg sm:text-2xl font-black shadow-lg shadow-indigo-900/30 border border-white/20 shrink-0">
                                {initials}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 sm:gap-3 mb-1 flex-wrap">
                                    <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight">{user.name}</h2>
                                    <StatusBadge status={user.status} />
                                </div>
                                <p className="text-blue-200 text-xs sm:text-sm font-bold">Customer ID: #{user.id}</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Info Card - overlapping hero */}
                    <div className="px-4 sm:px-8 -mt-8 sm:-mt-10 relative z-10">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/50 p-4 sm:p-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
                                        <Calendar className="w-4 h-4 text-amber-600" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Joined</p>
                                        <p className="text-sm font-bold text-gray-900 truncate">{user.joined || 'Jan 2024'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                                        <Phone className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Phone</p>
                                        <p className="text-sm font-bold text-gray-900 truncate">{user.phone}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                                        <Mail className="w-4 h-4 text-indigo-600" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Email</p>
                                        <p className="text-sm font-bold text-gray-900 truncate">{user.email || 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                                        <MapPin className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Location</p>
                                        <p className="text-sm font-bold text-gray-900 truncate">New Delhi, India</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Stats Row */}
                    <div className="px-4 sm:px-8 mt-5 sm:mt-6">
                        <div className="grid grid-cols-3 gap-2 sm:gap-3">
                            <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center border border-gray-100/50">
                                <p className="text-[9px] sm:text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-0.5 sm:mb-1">Requests</p>
                                <p className="text-lg sm:text-2xl font-black text-gray-900 tracking-tighter">{user.totalRequests}</p>
                            </div>
                            <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center border border-gray-100/50">
                                <p className="text-[9px] sm:text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-0.5 sm:mb-1">Spent</p>
                                <p className="text-lg sm:text-2xl font-black text-gray-900 tracking-tighter">₹{user.totalSpent}</p>
                            </div>
                            <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center border border-gray-100/50">
                                <p className="text-[9px] sm:text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-0.5 sm:mb-1">Rating</p>
                                <div className="flex items-center justify-center gap-1">
                                    <span className="text-lg sm:text-2xl font-black text-gray-900 tracking-tighter">{user.rating}</span>
                                    <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400 drop-shadow-sm" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="px-4 sm:px-8 mt-6 sm:mt-8">
                        <div className="flex gap-1 bg-gray-100 rounded-xl sm:rounded-2xl p-1">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={clsx(
                                        "flex-1 flex cursor-pointer items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-wider sm:tracking-widest transition-all active:scale-95",
                                        activeTab === tab.id
                                            ? "bg-white text-gray-900 shadow-sm"
                                            : "text-gray-400 hover:text-gray-600"
                                    )}
                                >
                                    <tab.icon className="w-3.5 h-3.5" />
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="px-4 sm:px-8 mt-5 sm:mt-6 pb-6 sm:pb-8">
                        {/* Requests Tab */}
                        {activeTab === 'requests' && (
                            <div className="space-y-3 animate-in fade-in duration-300">
                                {[
                                    { id: '#REQ-4231', date: 'Oct 24, 2023', service: 'Towing', status: 'Completed', amount: '₹1,200' },
                                    { id: '#REQ-3982', date: 'Sep 12, 2023', service: 'Garage Repair', status: 'Cancelled', amount: '₹450' },
                                    { id: '#REQ-3540', date: 'Aug 05, 2023', service: 'Flat Tire', status: 'Completed', amount: '₹350' },
                                ].map((req, i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-2xl hover:border-indigo-100 hover:bg-indigo-50/20 transition-all group cursor-pointer">
                                        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors shrink-0">
                                            <History className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-0.5">
                                                <span className="text-sm font-black text-gray-900">{req.id}</span>
                                                <StatusBadge status={req.status} />
                                            </div>
                                            <p className="text-xs font-bold text-gray-400">{req.service} · {req.date}</p>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className="text-sm font-black text-gray-900">{req.amount}</p>
                                            <ChevronRight className="w-4 h-4 text-gray-300 ml-auto mt-1 group-hover:text-indigo-600 transition-colors" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Payments Tab */}
                        {activeTab === 'payments' && (
                            <div className="space-y-3 animate-in fade-in duration-300">
                                {[
                                    { id: '#TXN-87210', amount: '₹1,200', method: 'UPI', date: 'Oct 24, 2023', methodIcon: '💳' },
                                    { id: '#TXN-86541', amount: '₹450', method: 'Cash', date: 'Sep 05, 2023', methodIcon: '💵' },
                                    { id: '#TXN-85102', amount: '₹350', method: 'UPI', date: 'Aug 05, 2023', methodIcon: '💳' },
                                ].map((txn, i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-2xl hover:border-emerald-100 hover:bg-emerald-50/20 transition-all group cursor-pointer">
                                        <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-lg shrink-0">
                                            {txn.methodIcon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-0.5">
                                                <span className="text-sm font-black text-gray-900">{txn.id}</span>
                                                <span className="text-[10px] font-black px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full uppercase tracking-widest">{txn.method}</span>
                                            </div>
                                            <p className="text-xs font-bold text-gray-400">{txn.date}</p>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className="text-sm font-black text-emerald-600">{txn.amount}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Vehicles Tab */}
                        {activeTab === 'vehicles' && (
                            <div className="space-y-3 animate-in fade-in duration-300">
                                {[
                                    { plate: 'DL 1C AB 1234', model: 'Maruti Suzuki Swift', color: 'Silver', year: '2021' },
                                    { plate: 'UP 16 XY 9876', model: 'Toyota Fortuner', color: 'Black', year: '2023' },
                                ].map((v, i) => (
                                    <div key={i} className="flex items-center gap-4 p-5 bg-white border border-gray-100 rounded-2xl hover:border-blue-100 hover:bg-blue-50/20 transition-all group">
                                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">
                                            <Car className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-black text-gray-900 tracking-tight">{v.plate}</p>
                                            <p className="text-xs font-bold text-gray-400 mt-0.5">{v.model} ({v.color}) · {v.year}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 sm:p-6 border-t border-gray-100 bg-white flex gap-2.5 sm:gap-3 shrink-0 safe-bottom">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 sm:py-3.5 px-4 bg-gray-100 text-gray-700 font-black text-[10px] sm:text-xs uppercase tracking-widest rounded-xl sm:rounded-2xl hover:bg-gray-200 transition-all active:scale-95"
                    >
                        Close
                    </button>
                    <button className="flex-1 py-3 sm:py-3.5 px-4 bg-rose-600 text-white font-black text-[10px] sm:text-xs uppercase tracking-widest rounded-xl sm:rounded-2xl hover:bg-rose-700 transition-all shadow-lg shadow-rose-100 active:scale-95 flex items-center justify-center gap-2">
                        <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        Block User
                    </button>
                </div>
            </div>
        </>
    );
};

export default UserDetailsDrawer;
