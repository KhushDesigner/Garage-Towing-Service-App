import React from 'react';
import {
    Bell,
    Zap,
    IndianRupee,
    Info,
    ShieldCheck,
    Gavel,
    Clock,
    Trash2,
    CheckCircle2,
    Filter,
    Search
} from 'lucide-react';

const NotificationsPage = () => {
    // Shared dummy data structure consistent with the Header
    const allNotifications = [
        {
            id: 1,
            type: 'emergency',
            title: 'SOS Alert Triggered',
            message: 'New emergency request #REQ-9901 from NH8 Highway.',
            time: '2 min ago',
            isRead: false,
            icon: Zap,
            color: 'text-red-600',
            bg: 'bg-red-50',
            border: 'border-l-red-500'
        },
        {
            id: 2,
            type: 'payment',
            title: 'Payment Received',
            message: '₹1,240 received for Request #REQ-8821 via UPI.',
            time: '15 min ago',
            isRead: false,
            icon: IndianRupee,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
            border: 'border-l-emerald-500'
        },
        {
            id: 3,
            type: 'info',
            title: 'New Service Request',
            message: 'Towing needed for Wheel-Lift service in South Delhi.',
            time: '45 min ago',
            isRead: true,
            icon: Info,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            border: 'border-l-blue-500'
        },
        {
            id: 4,
            type: 'kyc',
            title: 'Partner KYC Approved',
            message: 'Metro Garage documents verified successfully.',
            time: '2 hrs ago',
            isRead: true,
            icon: ShieldCheck,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50',
            border: 'border-l-indigo-500'
        },
        {
            id: 5,
            type: 'dispute',
            title: 'Dispute Raised',
            message: 'User #U902 reported overcharging on REQ-8710.',
            time: '1 day ago',
            isRead: true,
            icon: Gavel,
            color: 'text-amber-600',
            bg: 'bg-amber-50',
            border: 'border-l-amber-500'
        },
        {
            id: 6,
            type: 'info',
            title: 'System Update',
            message: 'Version 2.4.0 is now live with new route matching algorithms.',
            time: '2 days ago',
            isRead: true,
            icon: CheckCircle2,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            border: 'border-l-blue-500'
        }
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Notification Center</h1>
                    <p className="text-sm text-gray-500 font-medium">Clear history and manage your system alerts.</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-5 py-2.5 bg-white border border-gray-200 text-gray-600 font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-gray-50 transition-all flex items-center gap-2">
                        <Trash2 className="w-4 h-4" /> Clear All
                    </button>
                    <button className="px-5 py-2.5 bg-blue-600 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> Mark All Read
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search through alerts..."
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-2xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2.5 bg-gray-50 text-gray-400 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-gray-100 transition-all flex items-center gap-2">
                        <Filter className="w-3.5 h-3.5" /> All Types
                    </button>
                    <button className="px-4 py-2.5 bg-gray-50 text-gray-400 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-gray-100 transition-all flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5" /> Recent First
                    </button>
                </div>
            </div>

            {/* Notifications List */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-50">
                    {allNotifications.map((notif) => (
                        <div
                            key={notif.id}
                            className={`p-6 flex gap-6 hover:bg-gray-50/50 transition-all border-l-4 ${notif.border} ${!notif.isRead ? 'bg-blue-50/20' : ''}`}
                        >
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${notif.bg} ${notif.color} shadow-sm`}>
                                <notif.icon className="w-6 h-6" />
                            </div>

                            <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                    <h3 className={`text-base tracking-tight font-black text-gray-900 ${!notif.isRead ? 'font-black' : 'font-bold'}`}>
                                        {notif.title}
                                    </h3>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{notif.time}</span>
                                </div>
                                <p className={`text-sm leading-relaxed ${!notif.isRead ? 'text-gray-900 font-bold' : 'text-gray-500 font-medium'}`}>
                                    {notif.message}
                                </p>
                                <div className="flex items-center gap-4 pt-3">
                                    {!notif.isRead && (
                                        <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Mark as read</button>
                                    )}
                                    <button className="text-[10px] font-black text-gray-300 uppercase tracking-widest hover:text-red-500 transition-colors">Delete</button>
                                </div>
                            </div>

                            {!notif.isRead && (
                                <div className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)] mt-2" />
                            )}
                        </div>
                    ))}
                </div>

                <div className="p-8 bg-gray-50/50 text-center border-t border-gray-100">
                    <p className="text-xs font-bold text-gray-400">No more notifications to show.</p>
                </div>
            </div>
        </div>
    );
};

export default NotificationsPage;
