import React, { useState } from 'react';
import {
    Calendar,
    Filter,
    Download,
    Search,
    CheckCircle,
    TrendingUp,
    TrendingDown,
    IndianRupee,
    Star,
    ChevronLeft,
    ChevronRight,
    ArrowUpRight
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

const CompletedRequests = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [serviceFilter, setServiceFilter] = useState('All');

    // Summary Stats
    const summaryStats = [
        { label: 'Today Completed', value: '24', trend: '+12%', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'This Week', value: '184', trend: '+8%', icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'This Month', value: '742', trend: '+5%', icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { label: 'Total Revenue', value: '₹4,82,500', trend: '+15%', icon: IndianRupee, color: 'text-amber-600', bg: 'bg-amber-50' }
    ];

    // Dummy Data (10 Records)
    const completedRecords = [
        { id: 'REQ-9101', user: 'Rahul Sharma', partner: 'Quick Fix Garage', type: 'Towing', amount: 1500, comm: 300, earn: 1200, mode: 'Online', date: '18 Feb, 2:30 PM', rating: 4.8 },
        { id: 'REQ-9102', user: 'Sneha Gupta', partner: 'Highway Pros', type: 'Flat Tire', amount: 450, comm: 90, earn: 360, mode: 'Cash', date: '18 Feb, 1:15 PM', rating: 4.5 },
        { id: 'REQ-9103', user: 'Amit Singh', partner: 'Metro Mechanic', type: 'Battery', amount: 350, comm: 70, earn: 280, mode: 'Wallet', date: '17 Feb, 11:00 PM', rating: 5.0 },
        { id: 'REQ-9104', user: 'Priya Verma', partner: '24/7 Recovery', type: 'Engine', amount: 2800, comm: 560, earn: 2240, mode: 'Online', date: '17 Feb, 8:45 PM', rating: 4.2 },
        { id: 'REQ-9105', user: 'Vikram Das', partner: 'City Garage', type: 'Oil Change', amount: 1200, comm: 240, earn: 960, mode: 'Online', date: '17 Feb, 4:20 PM', rating: 4.7 },
        { id: 'REQ-9106', user: 'Anjali Reddy', partner: 'Quick Fix Garage', type: 'Towing', amount: 1800, comm: 360, earn: 1440, mode: 'Cash', date: '17 Feb, 10:10 AM', rating: 4.9 },
        { id: 'REQ-9107', user: 'Karan Mehra', partner: 'Highway Pros', type: 'Flat Tire', amount: 500, comm: 100, earn: 400, mode: 'Online', date: '16 Feb, 9:30 PM', rating: 3.5 },
        { id: 'REQ-9108', user: 'Sonal Jain', partner: 'Metro Mechanic', type: 'Battery', amount: 400, comm: 80, earn: 320, mode: 'Online', date: '16 Feb, 6:15 PM', rating: 4.6 },
        { id: 'REQ-9109', user: 'Deepak Rao', partner: '24/7 Recovery', type: 'Towing', amount: 2200, comm: 440, earn: 1760, mode: 'Wallet', date: '16 Feb, 2:50 PM', rating: 4.8 },
        { id: 'REQ-9110', user: 'Megha Nair', partner: 'City Garage', type: 'Brake Fix', amount: 950, comm: 190, earn: 760, mode: 'Online', date: '16 Feb, 11:20 AM', rating: 4.4 }
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-900">Completed Requests</h1>
                    <p className="text-sm text-gray-500 font-medium">Review and analyze history of successful operations.</p>
                </div>
                <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
                    <Download className="w-4 h-4" />
                    Download Full Report
                </button>
            </div>

            {/* Summary Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {summaryStats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${stat.bg} p-3 rounded-xl transition-colors`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg text-xs font-bold">
                                <ArrowUpRight className="w-3 h-3" />
                                {stat.trend}
                            </div>
                        </div>
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                        <h2 className="text-2xl font-black text-gray-900 mt-1">{stat.value}</h2>
                    </div>
                ))}
            </div>

            {/* Advanced Filters Section */}
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by Request ID, User or Partner..."
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <select className="bg-transparent text-sm font-bold text-gray-700 focus:outline-none cursor-pointer">
                            <option>Last 7 Days</option>
                            <option>This Month</option>
                            <option>Custom Range</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                        <Filter className="w-4 h-4 text-gray-400" />
                        <select className="bg-transparent text-sm font-bold text-gray-700 focus:outline-none cursor-pointer">
                            <option>All Services</option>
                            <option>Towing</option>
                            <option>Repair</option>
                            <option>Battery</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Request Details</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Stakeholders</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Type</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Accounting</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Payment</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date / Time</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Rating</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50/50">
                            {completedRecords.map((rec) => (
                                <tr key={rec.id} className="hover:bg-blue-50/20 transition-all">
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-gray-900">{rec.id}</span>
                                            <span className="text-[10px] font-bold text-blue-600 mt-0.5">COMPLETED</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                                <span className="text-xs font-bold text-gray-700">{rec.user}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                                <span className="text-xs font-bold text-gray-500">{rec.partner}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-lg text-[10px] font-black uppercase tracking-tight">
                                            {rec.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="flex flex-col items-end">
                                            <span className="text-sm font-black text-gray-900">₹{rec.amount}</span>
                                            <div className="flex gap-2 text-[10px] font-bold text-gray-400 mt-1">
                                                <span>Adm: ₹{rec.comm}</span>
                                                <span>Prt: ₹{rec.earn}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black border uppercase ${rec.mode === 'Online' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                                                rec.mode === 'Cash' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                    'bg-amber-50 text-amber-600 border-amber-100'
                                            }`}>
                                            {rec.mode}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="text-xs font-bold text-gray-600">{rec.date}</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-1">
                                            <span className="text-xs font-black text-gray-900">{rec.rating}</span>
                                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Table Footer */}
                <div className="px-6 py-4 bg-gray-50/50 flex items-center justify-between border-t border-gray-100">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Page 1 of 74 (742 Records)</p>
                    <div className="flex gap-2">
                        <button className="p-2 border border-gray-200 rounded-lg hover:bg-white text-gray-400 transition-all"><ChevronLeft className="w-4 h-4" /></button>
                        <button className="w-8 h-8 rounded-lg bg-blue-600 text-white text-xs font-bold shadow-md shadow-blue-100">1</button>
                        <button className="w-8 h-8 rounded-lg text-gray-500 text-xs font-bold hover:bg-white border border-transparent hover:border-gray-200 transition-all">2</button>
                        <button className="w-8 h-8 rounded-lg text-gray-500 text-xs font-bold hover:bg-white border border-transparent hover:border-gray-200 transition-all">3</button>
                        <button className="p-2 border border-gray-200 rounded-lg hover:bg-white text-gray-400 transition-all"><ChevronRight className="w-4 h-4" /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompletedRequests;
