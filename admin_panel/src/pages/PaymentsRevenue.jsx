import React, { useState } from 'react';
import {
    IndianRupee,
    CreditCard,
    Wallet,
    TrendingUp,
    Clock,
    Download,
    Filter,
    Search,
    ArrowUpRight,
    ArrowDownRight,
    SearchX
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar
} from 'recharts';
import StatusBadge from '../components/StatusBadge';

const PaymentsRevenue = () => {
    // Dummy Chart Data
    const revenueChartData = [
        { month: 'Jan', revenue: 45000, commission: 9000 },
        { month: 'Feb', revenue: 52000, commission: 10400 },
        { month: 'Mar', revenue: 48000, commission: 9600 },
        { month: 'Apr', revenue: 61000, commission: 12200 },
        { month: 'May', revenue: 55000, commission: 11000 },
        { month: 'Jun', revenue: 67000, commission: 13400 },
        { month: 'Jul', revenue: 72000, commission: 14400 },
    ];

    const pieData = [
        { name: 'Admin Comm (20%)', value: 14400, color: '#2563EB' },
        { name: 'Partner Share (80%)', value: 57600, color: '#10B981' },
    ];

    // Dummy Transactions Data
    const transactions = [
        { id: 'TXN-4491', user: 'Rahul Sharma', partner: 'Quick Fix Garage', total: 1500, comm: 300, share: 1200, mode: 'UPI', status: 'Completed', date: '18 Feb, 2:30 PM' },
        { id: 'TXN-4492', user: 'Sneha Gupta', partner: 'Highway Pros', total: 450, comm: 90, share: 360, mode: 'Card', status: 'Completed', date: '18 Feb, 1:15 PM' },
        { id: 'TXN-4493', user: 'Amit Singh', partner: 'Metro Mechanic', total: 350, comm: 70, share: 280, mode: 'Wallet', status: 'Pending', date: '18 Feb, 12:45 PM' },
        { id: 'TXN-4494', user: 'Priya Verma', partner: '24/7 Recovery', total: 2800, comm: 560, share: 2240, mode: 'UPI', status: 'Completed', date: '17 Feb, 8:45 PM' },
        { id: 'TXN-4495', user: 'Vikram Das', partner: 'City Garage', total: 1200, comm: 240, share: 960, mode: 'Cash', status: 'Settled', date: '17 Feb, 4:20 PM' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight text-[1.75rem]">Payments & Financials</h1>
                    <p className="text-sm text-gray-500 font-medium">Real-time revenue tracking and settlement management.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                    <Download className="w-4 h-4" /> Export Report
                </button>
            </div>

            {/* Top Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                            <IndianRupee className="w-7 h-7" />
                        </div>
                        <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg text-xs font-bold">
                            <ArrowUpRight className="w-3 h-3" /> +12%
                        </div>
                    </div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Total Revenue</p>
                    <p className="text-2xl font-black text-gray-900 mt-2">₹4,82,500</p>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
                            <TrendingUp className="w-7 h-7" />
                        </div>
                        <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg text-xs font-bold">
                            <ArrowUpRight className="w-3 h-3" /> +8%
                        </div>
                    </div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Admin Commission</p>
                    <p className="text-2xl font-black text-gray-900 mt-2">₹96,500</p>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-amber-50 rounded-2xl text-amber-600">
                            <Clock className="w-7 h-7" />
                        </div>
                    </div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Pending Settlement</p>
                    <p className="text-2xl font-black text-gray-900 mt-2">₹12,450</p>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
                            <CreditCard className="w-7 h-7" />
                        </div>
                    </div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Today's Revenue</p>
                    <p className="text-2xl font-black text-gray-900 mt-2">₹18,200</p>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Line Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Monthly Revenue Growth (6 Months)</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueChartData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2563EB" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 700, fill: '#6B7280' }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 700, fill: '#6B7280' }}
                                />
                                <Tooltip
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', fontSize: '12px' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#2563EB"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorRevenue)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Commission Pie Chart */}
                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Commission Structure Share</h3>
                    <div className="h-64 mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex flex-col gap-3 mt-4">
                        {pieData.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-xl">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-[10px] font-black text-gray-600 uppercase tracking-tight">{item.name}</span>
                                </div>
                                <span className="text-xs font-black text-gray-900">₹{item.value.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Transactions Table Section */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Recent Transactions & Revenue Flows</h3>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Find TXN, User..."
                                className="bg-gray-50 border border-gray-100 text-sm py-2 pl-9 pr-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                            />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 text-gray-500 font-bold text-[10px] uppercase tracking-widest border-b border-gray-100">
                            <tr>
                                <th className="px-8 py-5">Transaction ID</th>
                                <th className="px-8 py-5">Platform Stakeholders</th>
                                <th className="px-8 py-5 text-right">Accounting Detail</th>
                                <th className="px-8 py-5 text-center">Payment System</th>
                                <th className="px-8 py-5 text-center">Status</th>
                                <th className="px-8 py-5 text-right">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {transactions.map((txn) => (
                                <tr key={txn.id} className="hover:bg-blue-50/20 transition-all group">
                                    <td className="px-8 py-5">
                                        <p className="text-sm font-black text-gray-900">{txn.id}</p>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 bg-blue-100 text-blue-600 text-[10px] items-center justify-center flex font-black rounded-full">U</div>
                                                <span className="text-xs font-bold text-gray-800">{txn.user}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 bg-amber-100 text-amber-600 text-[10px] items-center justify-center flex font-black rounded-full">P</div>
                                                <span className="text-xs font-bold text-gray-500">{txn.partner}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <p className="text-sm font-black text-gray-900">₹{txn.total.toLocaleString()}</p>
                                        <div className="flex items-center justify-end gap-3 mt-1 text-[10px] font-black uppercase">
                                            <span className="text-blue-600">Comm: ₹{txn.comm}</span>
                                            <span className="text-emerald-600">Share: ₹{txn.share}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-center px-4">
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-[10px] font-black uppercase tracking-tight">
                                            <Wallet className="w-3 h-3" /> {txn.mode}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-center">
                                        <StatusBadge status={txn.status} />
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <span className="text-xs font-bold text-gray-400">{txn.date}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="px-8 py-5 bg-gray-50/50 flex items-center justify-between border-t border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest truncate">Showing top 5 of 1,280 transactions this month</p>
                    <div className="flex items-center gap-2">
                        <button className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-blue-600 transition-colors">View All Transactions</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentsRevenue;
