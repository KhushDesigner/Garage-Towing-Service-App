import React, { useState } from 'react';
import {
    AlertOctagon,
    Clock,
    MapPin,
    User,
    ShieldAlert,
    Phone,
    Navigation,
    MoreVertical,
    Search,
    ChevronDown,
    Activity
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

const SOSAlerts = () => {
    // Dummy Emergency Data
    const [emergencyAlerts] = useState([
        { id: 'SOS-9901', user: 'Rahul Malhotra', location: 'Western Express Highway, Near Goregaon', partner: 'Quick Fix Garage', time: '2 mins ago', status: 'Urgent', coords: { x: 45, y: 30 } },
        { id: 'SOS-9902', user: 'Sneha Gupta', location: 'S.V. Road, Malad West', partner: 'Highway Pros', time: '5 mins ago', status: 'In Progress', coords: { x: 25, y: 55 } },
        { id: 'SOS-9903', user: 'Amit Singh', location: 'Link Road, Andheri West', partner: 'Awaiting Assignment', time: 'Just Now', status: 'Urgent', coords: { x: 65, y: 70 } }
    ]);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Urgent Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-red-200 animate-pulse">
                        <ShieldAlert className="w-7 h-7" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-gray-900 tracking-tight">SOS Emergency Alerts</h1>
                        <p className="text-sm text-red-600 font-bold flex items-center gap-1.5">
                            <Activity className="w-4 h-4" />
                            System monitoring active - Real-time priority response
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-5 py-2.5 bg-white border-2 border-red-600 text-red-600 font-black text-xs uppercase tracking-widest rounded-xl hover:bg-red-50 transition-all">
                        Alert All Partners
                    </button>
                    <button className="px-5 py-2.5 bg-red-600 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-100">
                        Incident Report
                    </button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-3xl border-2 border-red-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute right-[-20px] top-[-20px] w-32 h-32 bg-red-50 rounded-full blur-3xl opacity-50 transition-all group-hover:scale-150"></div>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-red-50 rounded-2xl text-red-600">
                            <AlertOctagon className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest leading-none">SOS Active Alerts</p>
                            <p className="text-4xl font-black text-red-600 mt-2">03</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                            <Clock className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest leading-none">Average Response Time</p>
                            <p className="text-4xl font-black text-gray-900 mt-2">08:45 <span className="text-sm font-bold text-emerald-600">(-12%)</span></p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Map Section */}
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-md overflow-hidden relative group">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-red-600" /> Live Emergency Locations
                    </h3>
                    <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1.5 text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                            VIBE UPDATING
                        </span>
                    </div>
                </div>
                <div className="h-[350px] bg-[#f8f9fa] relative overflow-hidden">
                    {/* Mock Map Texture */}
                    <div className="absolute inset-0 opacity-40 shadow-inner" style={{ backgroundSize: '60px 60px', backgroundImage: 'radial-gradient(circle, #e2e8f0 1px, transparent 1px)' }}></div>

                    {/* Pulse Rings for Alerts */}
                    {emergencyAlerts.map((alert, idx) => (
                        <div
                            key={alert.id}
                            className="absolute transition-all duration-1000"
                            style={{ left: `${alert.coords.x}%`, top: `${alert.coords.y}%` }}
                        >
                            <div className="relative flex items-center justify-center">
                                <div className="absolute w-12 h-12 bg-red-600 rounded-full animate-ping opacity-20"></div>
                                <div className="absolute w-8 h-8 bg-red-600 rounded-full animate-ping opacity-40 duration-700"></div>
                                <div className="w-5 h-5 bg-red-600 rounded-full border-4 border-white shadow-lg relative z-10"></div>

                                <div className="absolute top-full mt-2 bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-xl whitespace-nowrap z-20">
                                    {alert.user} - {alert.id}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Navigation Interface Overlay */}
                    <div className="absolute right-6 top-6 flex flex-col gap-2">
                        <button className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center text-gray-900 font-black">+</button>
                        <button className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center text-gray-900 font-black">-</button>
                    </div>
                </div>
            </div>

            {/* Emergency Requests Table */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Active Incident Queue</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 text-gray-500 font-bold text-[10px] uppercase tracking-widest border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Incident ID</th>
                                <th className="px-6 py-4">Customer Name</th>
                                <th className="px-6 py-4">Last Known Location</th>
                                <th className="px-6 py-4">Assigned Unit</th>
                                <th className="px-6 py-4">Time Elapsed</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {emergencyAlerts.map((alert) => (
                                <tr key={alert.id} className="hover:bg-red-50/10 transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></div>
                                            <span className="text-sm font-black text-gray-900">{alert.id}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-red-600 group-hover:text-white transition-colors">
                                                <User className="w-4 h-4" />
                                            </div>
                                            <span className="text-sm font-bold text-gray-800">{alert.user}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2 max-w-[200px]">
                                            <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                            <span className="text-xs font-medium text-gray-600 truncate">{alert.location}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            <Navigation className="w-3.5 h-3.5 text-blue-600" />
                                            <span className={`text-xs font-bold ${alert.partner === 'Awaiting Assignment' ? 'text-red-500 italic' : 'text-gray-900'}`}>{alert.partner}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                                            <Clock className="w-3.5 h-3.5" />
                                            {alert.time}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center">
                                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-tight shadow-sm ${alert.status === 'Urgent' ? 'bg-red-600 text-white' : 'bg-amber-100 text-amber-700'
                                                }`}>
                                                {alert.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 bg-white border border-gray-200 rounded-xl text-gray-900 hover:bg-gray-50 shadow-sm transition-all">
                                                <Phone className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 bg-red-600 text-white rounded-xl hover:bg-red-700 shadow-md transition-all">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SOSAlerts;
