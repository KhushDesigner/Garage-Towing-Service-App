import React, { useState, useEffect } from 'react';
import {
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
    CheckCircle2
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

const LiveRequests = () => {
    const [selectedRequestId, setSelectedRequestId] = useState(1);

    // Dummy Live Requests Data
    const liveRequests = [
        {
            id: 1,
            requestId: 'REQ-8821',
            userName: 'Rahul Malhotra',
            partnerName: 'Quick Fix Garage',
            serviceType: 'Towing Service',
            status: 'On the Way',
            amount: '₹1,200',
            timer: '12:45',
            location: { user: { x: 30, y: 40 }, partner: { x: 70, y: 60 } }
        },
        {
            id: 2,
            requestId: 'REQ-8822',
            userName: 'Priya Sharma',
            partnerName: 'Highway Heroes',
            serviceType: 'Flat Tire Repair',
            status: 'Accepted',
            amount: '₹450',
            timer: '05:20',
            location: { user: { x: 50, y: 30 }, partner: { x: 20, y: 20 } }
        },
        {
            id: 3,
            requestId: 'REQ-8823',
            userName: 'Amit Singh',
            partnerName: 'Metro Mechanic',
            serviceType: 'Battery Jumpstart',
            status: 'In Progress',
            amount: '₹350',
            timer: '28:10',
            location: { user: { x: 80, y: 20 }, partner: { x: 75, y: 25 } }
        },
        {
            id: 4,
            requestId: 'REQ-8824',
            userName: 'Sneha Gupta',
            partnerName: '24/7 Recovery',
            serviceType: 'Engine Breakdown',
            status: 'Reached',
            amount: '₹2,500',
            timer: '18:55',
            location: { user: { x: 40, y: 80 }, partner: { x: 40, y: 80 } }
        }
    ];

    const selectedRequest = liveRequests.find(req => req.id === selectedRequestId) || liveRequests[0];

    return (
        <div className="h-[calc(100vh-120px)] flex flex-col space-y-4">
            {/* Header Area */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">Live Service Tracking</h1>
                    <p className="text-sm text-gray-500 font-medium">Monitoring {liveRequests.length} active roadside assistance requests.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-bold border border-green-100 animate-pulse">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        System Live
                    </div>
                </div>
            </div>

            <div className="flex-1 flex gap-6 overflow-hidden">
                {/* Left: Map Container */}
                <div className="flex-1 bg-white rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
                    {/* UI Mock Map Background */}
                    <div className="absolute inset-0 bg-[#f8f9fa] opacity-50">
                        {/* Grid lines to simulate map */}
                        <div className="absolute inset-0" style={{ backgroundSize: '40px 40px', backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)' }}></div>
                    </div>

                    {/* Fake Route Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <path
                            d={`M ${selectedRequest.location.user.x}% ${selectedRequest.location.user.y}% L ${selectedRequest.location.partner.x}% ${selectedRequest.location.partner.y}%`}
                            fill="none"
                            stroke="#2563EB"
                            strokeWidth="3"
                            strokeDasharray="8,5"
                            className="drop-shadow-sm opacity-50"
                        />
                    </svg>

                    {/* User Marker */}
                    <div
                        className="absolute transition-all duration-700 ease-in-out"
                        style={{ left: `${selectedRequest.location.user.x}%`, top: `${selectedRequest.location.user.y}%`, transform: 'translate(-50%, -50%)' }}
                    >
                        <div className="relative group/marker">
                            <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-xl border border-blue-100 text-blue-600 z-10 relative">
                                <User className="w-5 h-5" />
                            </div>
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-2 bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded-lg opacity-0 group-hover/marker:opacity-100 transition-opacity whitespace-nowrap">
                                User: {selectedRequest.userName}
                            </div>
                        </div>
                    </div>

                    {/* Partner Marker */}
                    <div
                        className="absolute transition-all duration-700 ease-in-out"
                        style={{ left: `${selectedRequest.location.partner.x}%`, top: `${selectedRequest.location.partner.y}%`, transform: 'translate(-50%, -50%)' }}
                    >
                        <div className="relative group/marker">
                            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-200 text-white z-10 relative">
                                <Navigation className="w-6 h-6 animate-bounce" />
                            </div>
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-lg opacity-0 group-hover/marker:opacity-100 transition-opacity whitespace-nowrap">
                                Partner: {selectedRequest.partnerName}
                            </div>
                        </div>
                    </div>

                    {/* Map Controls Mock */}
                    <div className="absolute right-6 top-6 flex flex-col gap-2">
                        <button className="w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center text-gray-400 hover:text-blue-600 transition-all font-bold text-xl">+</button>
                        <button className="w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center text-gray-400 hover:text-blue-600 transition-all font-bold text-xl">-</button>
                    </div>

                    {/* Bottom Status Overlay */}
                    <div className="absolute bottom-6 left-6 right-6">
                        <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Estimated Arrival</p>
                                    <p className="text-lg font-black text-gray-900 mt-1">12 Minutes <span className="text-sm font-medium text-gray-400">(2.4 km)</span></p>
                                </div>
                            </div>
                            <button className="px-6 py-2.5 bg-blue-600 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
                                Call Partner
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right: Active Requests Panel */}
                <div className="w-96 flex flex-col space-y-4">
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
                        <Search className="w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Find active request..."
                            className="bg-transparent text-sm w-full focus:outline-none font-medium"
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                        {liveRequests.map((req) => (
                            <div
                                key={req.id}
                                onClick={() => setSelectedRequestId(req.id)}
                                className={`p-4 rounded-3xl border transition-all cursor-pointer group relative overflow-hidden ${selectedRequestId === req.id ? 'bg-blue-600 border-blue-600 shadow-xl shadow-blue-100 translate-x-1' : 'bg-white border-gray-100 hover:border-blue-200'}`}
                            >
                                {/* Request Header */}
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <p className={`text-[10px] font-black uppercase tracking-widest ${selectedRequestId === req.id ? 'text-blue-100' : 'text-gray-400'}`}>
                                            ID: {req.requestId}
                                        </p>
                                        <h3 className={`font-black text-sm mt-0.5 ${selectedRequestId === req.id ? 'text-white' : 'text-gray-900 group-hover:text-blue-600'}`}>
                                            {req.serviceType}
                                        </h3>
                                    </div>
                                    <div className={`${selectedRequestId === req.id ? 'text-white' : 'text-gray-400'}`}>
                                        <MoreVertical className="w-4 h-4" />
                                    </div>
                                </div>

                                {/* Participants */}
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-2">
                                        <User className={`w-3.5 h-3.5 ${selectedRequestId === req.id ? 'text-blue-200' : 'text-gray-400'}`} />
                                        <span className={`text-xs font-bold ${selectedRequestId === req.id ? 'text-white' : 'text-gray-700'}`}>{req.userName}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Wrench className={`w-3.5 h-3.5 ${selectedRequestId === req.id ? 'text-blue-200' : 'text-gray-400'}`} />
                                        <span className={`text-xs font-bold ${selectedRequestId === req.id ? 'text-white' : 'text-gray-700'}`}>{req.partnerName}</span>
                                    </div>
                                </div>

                                {/* Footer: Status & Price */}
                                <div className="flex items-center justify-between pt-3 border-t border-dashed border-white/20">
                                    <div className="flex items-center gap-3">
                                        <StatusBadge status={req.status} />
                                        <div className={`flex items-center gap-1.5 text-[10px] font-black ${selectedRequestId === req.id ? 'text-white' : 'text-blue-600'}`}>
                                            <Clock className="w-3 h-3" />
                                            {req.timer}
                                        </div>
                                    </div>
                                    <p className={`font-black text-sm ${selectedRequestId === req.id ? 'text-white' : 'text-gray-900'}`}>{req.amount}</p>
                                </div>

                                {/* Interactive Indicator */}
                                {selectedRequestId === req.id && (
                                    <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-5 h-20 bg-white/20 blur-xl rounded-full"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveRequests;
