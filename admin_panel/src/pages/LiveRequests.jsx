import React, { useState, useEffect } from 'react';
import {
    ArrowLeft,
    MapPin,
    Navigation,
    Clock,
    User,
    Wrench,
    Phone,
    MoreVertical,
    Search,
    Car,
    AlertCircle,
    CheckCircle2,
    Shield,
    Activity,
    ChevronRight,
    Filter,
    Layers,
    Maximize2,
    MousePointer2
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import Button from '../components/common/Button';
import SearchBox from '../components/common/SearchBox';

const LiveRequests = () => {
    const [selectedRequestId, setSelectedRequestId] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [isMapExpanding, setIsMapExpanding] = useState(false);
    const [showMapOnMobile, setShowMapOnMobile] = useState(false);

    // Dummy Live Requests Data
    const liveRequests = [
        {
            id: 1,
            requestId: 'REQ-8821',
            userName: 'Rahul Malhotra',
            userPhone: '+91 98765 43210',
            partnerName: 'Quick Fix Garage',
            partnerPhone: '+91 87654 32109',
            serviceType: 'Towing Service',
            status: 'On the Way',
            amount: '₹1,200',
            timer: '12:45',
            priority: 'High',
            location: { user: { x: 30, y: 40 }, partner: { x: 70, y: 60 } }
        },
        {
            id: 2,
            requestId: 'REQ-8822',
            userName: 'Priya Sharma',
            userPhone: '+91 91234 56789',
            partnerName: 'Highway Heroes',
            partnerPhone: '+91 99887 76655',
            serviceType: 'Flat Tire Repair',
            status: 'Accepted',
            amount: '₹450',
            timer: '05:20',
            priority: 'Normal',
            location: { user: { x: 50, y: 30 }, partner: { x: 20, y: 20 } }
        },
        {
            id: 3,
            requestId: 'REQ-8823',
            userName: 'Amit Singh',
            userPhone: '+91 90000 11111',
            partnerName: 'Metro Mechanic',
            partnerPhone: '+91 88888 22222',
            serviceType: 'Battery Jumpstart',
            status: 'In Progress',
            amount: '₹350',
            timer: '28:10',
            priority: 'Normal',
            location: { user: { x: 80, y: 20 }, partner: { x: 75, y: 25 } }
        },
        {
            id: 4,
            requestId: 'REQ-8824',
            userName: 'Sneha Gupta',
            userPhone: '+91 95555 44444',
            partnerName: '24/7 Recovery',
            partnerPhone: '+91 93333 22222',
            serviceType: 'Engine Breakdown',
            status: 'Reached',
            amount: '₹2,500',
            timer: '18:55',
            priority: 'Critical',
            location: { user: { x: 40, y: 80 }, partner: { x: 40, y: 80 } }
        }
    ];

    const filteredRequests = liveRequests.filter(req =>
        req.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.requestId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.serviceType.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const selectedRequest = liveRequests.find(req => req.id === selectedRequestId) || liveRequests[0];

    const renderMapContent = () => (
        <>
            {/* UI Mock Map Background - More Professional Dark Grid */}
            <div className="absolute inset-0 bg-[#0f172a]">
                <div className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `linear-gradient(#475569 1px, transparent 1px), linear-gradient(90deg, #475569 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }}>
                </div>
                <div className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `linear-gradient(#475569 0.5px, transparent 0.5px), linear-gradient(90deg, #475569 0.5px, transparent 0.5px)`,
                        backgroundSize: '10px 10px'
                    }}>
                </div>

                {/* Abstract Map Elements */}
                <div className="absolute top-1/4 left-1/3 w-32 h-64 bg-slate-800/50 rounded-lg transform -rotate-12 border border-slate-700/50"></div>
                <div className="absolute bottom-1/4 right-1/4 w-48 h-32 bg-slate-800/50 rounded-full blur-2xl opacity-30"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-indigo-500/5 rounded-full pointer-events-none"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-indigo-500/5 rounded-full pointer-events-none"></div>
            </div>

            {/* Fake Route Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                    <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
                        <stop offset="50%" stopColor="#6366f1" stopOpacity="1" />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
                    </linearGradient>
                </defs>
                <path
                    d={`M ${selectedRequest.location.user.x}% ${selectedRequest.location.user.y}% L ${selectedRequest.location.partner.x}% ${selectedRequest.location.partner.y}%`}
                    fill="none"
                    stroke="url(#routeGradient)"
                    strokeWidth="3"
                    strokeDasharray="8,5"
                />
            </svg>

            {/* Markers */}
            <div
                className="absolute transition-all duration-700 ease-in-out z-20"
                style={{ left: `${selectedRequest.location.user.x}%`, top: `${selectedRequest.location.user.y}%`, transform: 'translate(-50%, -50%)' }}
            >
                <div className="relative group/user">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-2xl flex items-center justify-center shadow-xl border border-indigo-100 text-indigo-600 relative z-10">
                        <User className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    {/* Label Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-white rounded-xl shadow-xl whitespace-nowrap opacity-0 group-hover/user:opacity-100 transition-all duration-300 translate-y-2 group-hover/user:translate-y-0">
                        <p className="text-[10px] font-black text-gray-400 uppercase leading-none mb-1">Customer</p>
                        <p className="text-xs font-black text-gray-900 leading-none">{selectedRequest.userName}</p>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white"></div>
                    </div>
                </div>
            </div>

            <div
                className="absolute transition-all duration-1000 ease-in-out z-20"
                style={{ left: `${selectedRequest.location.partner.x}%`, top: `${selectedRequest.location.partner.y}%`, transform: 'translate(-50%, -50%)' }}
            >
                <div className="relative group/partner">
                    <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-pulse scale-150"></div>
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl text-white relative z-10 overflow-hidden">
                        <Navigation className="w-6 h-6 md:w-7 md:h-7 relative z-10 animate-bounce" />
                    </div>
                    {/* Label Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-indigo-600 rounded-xl shadow-xl whitespace-nowrap opacity-0 group-hover/partner:opacity-100 transition-all duration-300 translate-y-2 group-hover/partner:translate-y-0">
                        <p className="text-[10px] font-black text-indigo-200 uppercase leading-none mb-1">Partner</p>
                        <p className="text-xs font-black text-white leading-none">{selectedRequest.partnerName}</p>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-indigo-600"></div>
                    </div>
                </div>
            </div>

            {/* Map UI Elements */}
            <div className="absolute top-4 left-4 md:top-8 md:left-8 flex flex-col gap-3 z-30">
                <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700 p-1 rounded-xl md:rounded-2xl flex items-center gap-1 shadow-2xl">
                    <button className="px-3 py-1.5 md:px-4 md:py-2 bg-indigo-600 rounded-lg md:rounded-xl text-white text-[10px] md:text-xs font-bold transition-all">
                        Professional
                    </button>
                    <button className="px-3 py-1.5 md:px-4 md:py-2 hover:bg-slate-800 rounded-lg md:rounded-xl text-slate-400 text-[10px] md:text-xs font-bold transition-all">
                        Satellite
                    </button>
                </div>
            </div>

            <div className="absolute top-4 right-4 md:top-8 md:right-8 flex flex-col gap-3 z-30">
                <div className="hidden md:flex flex-col bg-slate-900/80 backdrop-blur-xl border border-slate-700 p-1 rounded-2xl shadow-2xl">
                    <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white font-bold text-xl">+</button>
                    <div className="h-px bg-slate-700 mx-2"></div>
                    <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white font-bold text-xl">-</button>
                </div>
                <button
                    onClick={() => setIsMapExpanding(!isMapExpanding)}
                    className="w-10 h-10 md:w-12 md:h-12 bg-slate-900/80 backdrop-blur-xl border border-slate-700 flex items-center justify-center text-slate-400 hover:text-indigo-400 rounded-xl md:rounded-2xl shadow-2xl transition-all"
                >
                    <Maximize2 className="w-5 h-5" />
                </button>
            </div>

            {/* Bottom Status Glassmorphism Pane */}
            <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 z-30">
                <div
                    className="bg-slate-900/80 backdrop-blur-2xl border border-white/10 p-4 md:p-6 rounded-2xl md:rounded-[2rem] shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4"
                >

                    <div className="flex items-center gap-4 md:gap-6 w-full sm:w-auto">
                        <div className="p-3 md:p-4 bg-indigo-600/10 rounded-xl md:rounded-2xl border border-indigo-500/20 text-indigo-400">
                            <Clock className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2 mb-1">
                                <p className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest leading-none">Arrival Metrics</p>
                                <span className="text-[10px] md:text-xs font-black text-indigo-400 uppercase tracking-widest leading-none hidden sm:inline">{selectedRequest.status}</span>
                            </div>
                            <div className="flex items-end gap-3">
                                <p className="text-2xl md:text-3xl font-black text-white tracking-tight">12 <span className="text-indigo-400 font-medium text-lg">Mins</span></p>
                                <p className="text-slate-400 font-bold text-xs md:text-sm mb-1 hidden sm:flex items-center gap-1">
                                    <Navigation className="w-3.5 h-3.5" /> 2.4 KM
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <Button
                            variant="dark"
                            className="p-3 md:p-3.5 flex-1 sm:flex-none shadow-none"
                            onClick={() => window.open(`tel:${selectedRequest.partnerPhone}`)}
                        >
                            <Phone className="w-5 h-5" />
                        </Button>
                        <Button
                            variant="primary"
                            className="px-6 md:px-8 py-3 md:py-4 flex-3 sm:flex-none shadow-none"
                            rightIcon={<ChevronRight className="w-4 h-4 hidden md:block" />}
                        >
                            Emergency Override
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <div className="space-y-6 md:space-y-8 lg:h-[calc(100vh-145px)] flex flex-col space-y-4">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
                <div className="space-y-1">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Live Operations</h1>
                    <p className="text-gray-500 font-medium mt-1 text-sm">Tracking {liveRequests.length} active service missions.</p>
                </div>
                <div className="flex items-center gap-2 px-3 md:px-4 py-2 bg-emerald-50 text-emerald-700 rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-wider border border-emerald-100/50 shadow-sm shadow-emerald-100">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                    Relay System: Active
                </div>
            </div>


            <div className="flex-1 flex flex-col lg:flex-row gap-4 lg:gap-6 overflow-hidden relative">
                {/* Desktop: Map Container (visible only on lg screens) */}
                <div
                    className="hidden lg:flex lg:flex-1 relative bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-sm overflow-hidden group transition-all duration-500"
                >
                    {renderMapContent()}
                </div>

                {/* Mobile: Map Popup Layer */}
                {showMapOnMobile && (
                    <div
                        className="fixed inset-0 z-[100] bg-slate-900 lg:hidden flex flex-col"
                    >
                        {/* Mobile Modal Header/Bar */}
                        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-slate-900/80 to-transparent z-[110] flex items-center px-6 pointer-events-none">
                            <button
                                onClick={() => setShowMapOnMobile(false)}
                                className="p-2 md:p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl md:rounded-2xl text-white pointer-events-auto active:scale-95 transition-all shadow-2xl"
                            >
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex-1 relative">
                            {renderMapContent()}
                        </div>
                    </div>
                )}

                {/* Always visible: Active Requests Panel (Main view on mobile) */}
                <div
                    className="w-full lg:w-[420px] flex flex-col space-y-4 lg:space-y-6 flex-1 lg:flex-none"
                >
                    {/* Search & Filters */}
                    <div className="space-y-3">
                        <SearchBox
                            placeholder="Search mission ID, user..."
                            value={searchQuery}
                            onSearch={setSearchQuery}
                        />
                    </div>

                    <div className="flex-1 p-0.5 overflow-y-auto lg:pr-3 lg:-mr-3 space-y-4 custom-scrollbar">
                        {filteredRequests.map((req, index) => (
                            <div
                                key={req.id}
                                onClick={() => {
                                    setSelectedRequestId(req.id);
                                    setShowMapOnMobile(true);
                                }}
                                className={`group relative p-4 md:p-5 rounded-2xl md:rounded-[2rem] border transition-all cursor-pointer overflow-hidden ${selectedRequestId === req.id
                                    ? 'bg-indigo-600 border-indigo-600 shadow-sm ring-4 ring-indigo-50'
                                    : 'bg-white border-gray-100 hover:border-indigo-200 shadow-sm'
                                    }`}
                            >
                                <div className="flex items-start justify-between mb-4 relative z-1">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center transition-colors ${selectedRequestId === req.id ? 'bg-white/20 text-white' : 'bg-gray-50 text-indigo-600'}`}>
                                            {req.serviceType.includes('Towing') ? <Car className="w-5 h-5 md:w-6 md:h-6" /> : <Wrench className="w-5 h-5 md:w-6 md:h-6" />}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className={`text-[10px] md:text-xs font-black uppercase tracking-widest ${selectedRequestId === req.id ? 'text-indigo-100' : 'text-gray-400'}`}>
                                                    #{req.requestId}
                                                </p>
                                                {req.priority === 'Critical' && <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>}
                                            </div>
                                            <h3 className={`font-black text-sm md:text-base leading-tight mt-0.5 ${selectedRequestId === req.id ? 'text-white' : 'text-gray-900'}`}>
                                                {req.serviceType}
                                            </h3>
                                        </div>
                                    </div>
                                    <MousePointer2 className={`w-4 h-4 ${selectedRequestId === req.id ? 'text-white' : 'text-gray-300'}`} />
                                </div>

                                <div className="grid grid-cols-2 gap-2 md:gap-3 mb-4 md:mb-5 relative z-1">
                                    <div className={`p-2 md:p-3 rounded-xl md:rounded-2xl ${selectedRequestId === req.id ? 'bg-white/10' : 'bg-gray-50'}`}>
                                        <span className={`text-[10px] md:text-xs font-black uppercase block mb-0.5 ${selectedRequestId === req.id ? 'text-indigo-200' : 'text-gray-400'}`}>User</span>
                                        <p className={`text-xs md:text-sm font-bold truncate ${selectedRequestId === req.id ? 'text-white' : 'text-gray-900'}`}>{req.userName}</p>
                                    </div>
                                    <div className={`p-2 md:p-3 rounded-xl md:rounded-2xl ${selectedRequestId === req.id ? 'bg-white/10' : 'bg-gray-50'}`}>
                                        <span className={`text-[10px] md:text-xs font-black uppercase block mb-0.5 ${selectedRequestId === req.id ? 'text-indigo-200' : 'text-gray-400'}`}>Partner</span>
                                        <p className={`text-xs md:text-sm font-bold truncate ${selectedRequestId === req.id ? 'text-white' : 'text-gray-900'}`}>{req.partnerName}</p>
                                    </div>
                                </div>

                                <div className={`flex items-center justify-between pt-4 relative z-1 border-t ${selectedRequestId === req.id ? 'border-white/20' : 'border-gray-50'}`}>
                                    <div className="flex items-center gap-2 md:gap-3">
                                        <div className={`px-2 md:px-3 py-1 md:py-1.5 rounded-lg md:rounded-xl text-[10px] font-black uppercase ${selectedRequestId === req.id ? 'bg-white text-indigo-600' : 'bg-indigo-50 text-indigo-600'}`}>
                                            {req.status}
                                        </div>
                                        <div className={`flex items-center gap-1 text-xs font-bold ${selectedRequestId === req.id ? 'text-white' : 'text-gray-500'}`}>
                                            <Clock className="w-3 h-3" />
                                            {req.timer}
                                        </div>
                                    </div>
                                    <p className={`font-black text-base md:text-lg ${selectedRequestId === req.id ? 'text-white' : 'text-gray-900'}`}>{req.amount}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveRequests;
