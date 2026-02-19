import React, { useState, useEffect } from 'react';
import MetricCard from '../components/MetricCard';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Users, Truck, CheckCircle, Activity, DollarSign, AlertTriangle, ArrowRight } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { RECENT_REQUESTS_DATA } from '../utils/constants';

const Dashboard = () => {
    // Dummy Data for Charts
    const revenueData = [
        { name: 'Jan', uv: 4000 },
        { name: 'Feb', uv: 3000 },
        { name: 'Mar', uv: 2000 },
        { name: 'Apr', uv: 2780 },
        { name: 'May', uv: 1890 },
        { name: 'Jun', uv: 2390 },
        { name: 'Jul', uv: 3490 },
    ];

    const serviceData = [
        { name: 'Garage', value: 400 },
        { name: 'Towing', value: 300 },
    ];

    const COLORS = ['#4F46E5', '#10B981'];

    return (
        <div className="space-y-6 md:space-y-8">
            {/* Header section with responsive layout */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard Overview</h1>
                    <p className="text-gray-500 font-medium mt-1 text-sm md:text-base">Real-time insights into your service operations.</p>
                </div>
                <div className="bg-indigo-50 border border-indigo-100/50 px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-indigo-700 text-xs md:text-sm font-bold shadow-sm self-start md:self-auto">
                    {new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
            </div>

            {/* Optimized Stats Grid for all screen sizes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-4 md:gap-6">
                <MetricCard title="Total Users" value="1,240" change="+12%" trend="up" icon={Users} color="blue" />
                <MetricCard title="Total Partners" value="320" change="+5%" trend="up" icon={Truck} color="green" />
                <MetricCard title="Active Requests" value="42" change="+8%" trend="up" icon={Activity} color="indigo" />
                <MetricCard title="Completed" value="8,540" change="+15%" trend="up" icon={CheckCircle} color="emerald" />
                <MetricCard title="Revenue" value="₹12.5L" change="+10%" trend="up" icon={DollarSign} color="yellow" />
                <MetricCard title="SOS Alerts" value="3" change="-2%" trend="down" icon={AlertTriangle} color="red" />
            </div>

            {/* Responsive Charts & Tables Section */}
            <div className="grid grid-cols-1 2xl:grid-cols-3 gap-4 md:gap-6">
                {/* Recent Requests Table with better mobile handling */}
                <div className="2xl:col-span-2 premium-card overflow-hidden flex flex-col min-h-[400px]">
                    <div className="px-4 md:px-6 py-4 md:py-5 border-b border-gray-100/50 flex justify-between items-center bg-gray-50/30">
                        <h2 className="text-base md:text-lg font-bold text-gray-800">Recent Requests</h2>
                        <Link
                            to="/live-requests"
                            className="text-indigo-600 text-[10px] md:text-xs font-bold uppercase tracking-wider hover:text-indigo-700 transition-colors flex items-center gap-1 group"
                        >
                            View All <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </div>

                    <div className="relative overflow-x-auto flex-1 scrollbar-hide">
                        {/* Mobile Swipe Hint */}
                        {/* <div className="block md:hidden absolute right-4 top-2 z-10 animate-pulse">
                            <ArrowRight className="w-4 h-4 text-gray-300" />
                        </div> */}

                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100/50">
                                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-[9px] md:text-[10px] font-extrabold text-gray-400 uppercase tracking-widest whitespace-nowrap">ID</th>
                                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-[9px] md:text-[10px] font-extrabold text-gray-400 uppercase tracking-widest whitespace-nowrap">User</th>
                                    <th className="hidden md:table-cell px-4 md:px-6 py-3 md:py-4 text-left text-[9px] md:text-[10px] font-extrabold text-gray-400 uppercase tracking-widest whitespace-nowrap">Partner</th>
                                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-[9px] md:text-[10px] font-extrabold text-gray-400 uppercase tracking-widest whitespace-nowrap">Service</th>
                                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-[9px] md:text-[10px] font-extrabold text-gray-400 uppercase tracking-widest whitespace-nowrap">Amount</th>
                                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-[9px] md:text-[10px] font-extrabold text-gray-400 uppercase tracking-widest whitespace-nowrap">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100/50">
                                {RECENT_REQUESTS_DATA.map((request) => (
                                    <tr key={request.id} className="hover:bg-indigo-50/30 transition-colors group">
                                        <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm font-bold text-indigo-600 tracking-tight">{request.id}</td>
                                        <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm font-semibold text-gray-900">{request.user}</td>
                                        <td className="hidden md:table-cell px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500 font-medium group-hover:text-gray-700 transition-colors">{request.partner}</td>
                                        <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm">
                                            <span className={clsx(
                                                "px-1.5 md:px-2 py-0.5 md:py-1 rounded-md text-[9px] md:text-[10px] font-extrabold uppercase tracking-tight",
                                                request.service === 'Garage' ? 'bg-indigo-50 text-indigo-700' : 'bg-violet-50 text-violet-700'
                                            )}>
                                                {request.service}
                                            </span>
                                        </td>
                                        <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-900 font-bold tracking-tight">₹{request.amount}</td>
                                        <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                                            <StatusBadge status={request.status} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="px-4 md:px-6 py-4 border-t border-gray-100/50 bg-gray-50/10 text-center">
                        <Link
                            to="/live-requests"
                            className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-gray-500 hover:text-indigo-600 transition-colors"
                        >
                            View All Active Requests <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                {/* Grid for charts on tablet/mobile */}
                <div className="flex flex-col md:grid md:grid-cols-2 2xl:flex 2xl:flex-col gap-4 md:gap-6">
                    {/* Revenue Chart */}
                    <div className="premium-card p-4 md:p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-base md:text-lg font-bold text-gray-800">Monthly Revenue</h2>
                            <div className="flex items-center gap-1 text-emerald-600 font-bold text-[10px] md:text-xs bg-emerald-50 px-2 py-1 rounded-md">
                                <Activity className="w-3 h-3" /> Trending Up
                            </div>
                        </div>
                        <div className="h-48 md:h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={revenueData}>
                                    <defs>
                                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#6366f1" />
                                            <stop offset="100%" stopColor="#4f46e5" />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 9, fill: '#9ca3af', fontWeight: 600 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 9, fill: '#9ca3af', fontWeight: 600 }}
                                    />
                                    <Tooltip
                                        cursor={{ fill: '#f9fafb' }}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', fontSize: '10px' }}
                                    />
                                    <Bar dataKey="uv" fill="url(#barGradient)" radius={[6, 6, 0, 0]} barSize={20} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Service Distribution */}
                    <div className="premium-card p-4 md:p-6">
                        <h2 className="text-base md:text-lg font-bold text-gray-800 mb-6">Service Mix</h2>
                        <div className="h-48 md:h-64 flex items-center justify-center relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={serviceData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={55}
                                        outerRadius={75}
                                        paddingAngle={8}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {serviceData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', fontSize: '10px' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute flex flex-col items-center">
                                <span className="text-xl md:text-2xl font-black text-gray-900 leading-none">700</span>
                                <span className="text-[8px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 text-center">Total Orders</span>
                            </div>
                        </div>
                        <div className="flex justify-center gap-4 md:gap-8 mt-6">
                            {serviceData.map((entry, index) => (
                                <div key={entry.name} className="flex flex-col items-center gap-1">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full ring-4 ring-gray-50" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                        <span className="text-[10px] md:text-xs font-bold text-gray-600">{entry.name}</span>
                                    </div>
                                    <span className="text-xs md:text-sm font-black text-gray-900">{Math.round((entry.value / 700) * 100)}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
