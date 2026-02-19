import React, { useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import {
    Calendar,
    Download,
    TrendingUp,
    MapPin,
    Users,
    Star,
    ArrowUpRight,
    ChevronDown,
    Activity,
    AlertTriangle
} from 'lucide-react';

const ReportsAnalytics = () => {
    // Dummy Data for Revenue Trend
    const revenueData = [
        { name: 'Week 1', revenue: 42000 },
        { name: 'Week 2', revenue: 38000 },
        { name: 'Week 3', revenue: 55000 },
        { name: 'Week 4', revenue: 48000 },
        { name: 'Week 5', revenue: 62000 },
        { name: 'Week 6', revenue: 58000 },
    ];

    // Dummy Data for City Wise Requests
    const cityData = [
        { name: 'Mumbai', requests: 1240 },
        { name: 'Delhi', requests: 980 },
        { name: 'Bangalore', requests: 850 },
        { name: 'Pune', requests: 620 },
        { name: 'Chennai', requests: 450 },
    ];

    // Dummy Data for Cancellation Rates
    const cancellationData = [
        { name: 'Mon', rate: 4.2 },
        { name: 'Tue', rate: 3.8 },
        { name: 'Wed', rate: 5.1 },
        { name: 'Thu', rate: 4.5 },
        { name: 'Fri', rate: 6.2 },
        { name: 'Sat', rate: 3.1 },
        { name: 'Sun', rate: 2.8 },
    ];

    // Dummy Data for Partner Performance
    const partnerRankings = [
        { id: 1, name: 'Quick Fix Garage', jobs: 142, rating: 4.9, revenue: '₹84,200', growth: '+12%' },
        { id: 2, name: 'Highway Pros', jobs: 128, rating: 4.8, revenue: '₹72,500', growth: '+8%' },
        { id: 3, name: 'Metro Mechanic', jobs: 115, rating: 4.7, revenue: '₹68,900', growth: '+15%' },
        { id: 4, name: '24/7 Recovery', jobs: 98, rating: 4.6, revenue: '₹54,200', growth: '+5%' },
        { id: 5, name: 'City Garage', jobs: 82, rating: 4.5, revenue: '₹42,000', growth: '+2%' },
    ];

    const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Intelligence & Insights</h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">Deep-dive analysis of platform performance and growth metrics.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 text-gray-700 font-bold text-sm rounded-2xl hover:bg-gray-50 transition-all shadow-sm">
                        <Calendar className="w-4 h-4" /> This Month <ChevronDown className="w-4 h-4" />
                    </button>
                    <button className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white font-bold text-sm rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                        <Download className="w-4 h-4" /> Export BI Report
                    </button>
                </div>
            </div>

            {/* Top Level KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Volume', value: '42,850', trend: '+14%', icon: Activity, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Active Users', value: '12,402', trend: '+8%', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'Avg Rating', value: '4.72', trend: '+0.2', icon: Star, color: 'text-amber-600', bg: 'bg-amber-50' },
                    { label: 'Cancel Rate', value: '4.2%', trend: '-1.5%', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
                ].map((kpi, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${kpi.bg} p-3 rounded-2xl ${kpi.color}`}>
                                <kpi.icon className="w-6 h-6" />
                            </div>
                            <span className={`text-xs font-black bg-emerald-50 text-emerald-600 px-2 py-1 rounded-lg`}>{kpi.trend}</span>
                        </div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{kpi.label}</p>
                        <p className="text-3xl font-black text-gray-900 mt-1">{kpi.value}</p>
                    </div>
                ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Revenue Trend Area Chart */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-black text-gray-900 tracking-tight">Revenue Trend</h3>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Weekly Gross Revenue flow</p>
                        </div>
                        <TrendingUp className="w-6 h-6 text-blue-600 bg-blue-50 p-1 rounded-lg" />
                    </div>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2563EB" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 700, fill: '#6B7280' }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 700, fill: '#6B7280' }}
                                />
                                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', fontSize: '12px' }} />
                                <Area type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* City-wise Requests Bar Chart */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-black text-gray-900 tracking-tight">Top Performing Cities</h3>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Request volume per city</p>
                        </div>
                        <MapPin className="w-6 h-6 text-emerald-600 bg-emerald-50 p-1 rounded-lg" />
                    </div>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={cityData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 700, fill: '#6B7280' }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 700, fill: '#6B7280' }}
                                />
                                <Tooltip cursor={{ fill: 'rgba(37, 99, 235, 0.05)' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', fontSize: '12px' }} />
                                <Bar dataKey="requests" fill="#2563EB" radius={[8, 8, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Cancellation Rate Line Chart */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-black text-gray-900 tracking-tight">Cancellation Dynamics</h3>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Daily system drop-out rate (%)</p>
                        </div>
                        <AlertTriangle className="w-6 h-6 text-red-600 bg-red-50 p-1 rounded-lg" />
                    </div>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={cancellationData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 700, fill: '#6B7280' }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 700, fill: '#6B7280' }}
                                />
                                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', fontSize: '12px' }} />
                                <Line type="stepAfter" dataKey="rate" stroke="#EF4444" strokeWidth={3} dot={{ r: 4, fill: '#EF4444', strokeWidth: 2, stroke: '#fff' }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Top Partners Table Ranking */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-black text-gray-900 tracking-tight">Partner Performance Leaderboard</h3>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Ranking based on job quality & volume</p>
                        </div>
                        <Star className="w-6 h-6 text-amber-500 bg-amber-50 p-1 rounded-lg" />
                    </div>

                    <div className="flex-1 overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                                <tr>
                                    <th className="pb-4">Partner</th>
                                    <th className="pb-4 text-center">Jobs</th>
                                    <th className="pb-4 text-center">Rating</th>
                                    <th className="pb-4 text-right">Volume</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {partnerRankings.map((partner) => (
                                    <tr key={partner.id} className="group hover:bg-gray-50/50 transition-colors">
                                        <td className="py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-[10px] font-black">#{partner.id}</div>
                                                <span className="text-xs font-bold text-gray-800">{partner.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 text-center text-xs font-black text-gray-900">{partner.jobs}</td>
                                        <td className="py-4 text-center">
                                            <div className="inline-flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg">
                                                <span className="text-xs font-black text-amber-700">{partner.rating}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 text-right">
                                            <div className="flex flex-col items-end">
                                                <span className="text-xs font-black text-gray-900">{partner.revenue}</span>
                                                <span className="text-[10px] font-bold text-emerald-600">{partner.growth}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <button className="mt-6 w-full py-3 border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:bg-gray-50 transition-all">
                        View Detailed Rankings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReportsAnalytics;
