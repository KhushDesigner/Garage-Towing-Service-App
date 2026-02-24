import React from 'react';
import MetricCard from '../components/MetricCard';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, CheckCircle, Activity, DollarSign, AlertTriangle, ArrowRight, Wrench, Truck } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { RECENT_REQUESTS_DATA } from '../utils/constants';
import DataTable from '../components/common/DataTable';

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

    const columns = [
        {
            header: 'ID',
            key: 'id',
            render: (val) => <span className="text-xs font-black whitespace-nowrap text-indigo-600 tracking-tight">{val}</span>
        },
        {
            header: 'User',
            key: 'user',
            render: (val) => <span className="text-xs font-bold whitespace-nowrap text-gray-900">{val}</span>
        },
        {
            header: 'Partner',
            key: 'partner',
            render: (val) => <span className="text-xs text-gray-500 whitespace-nowrap font-medium">{val}</span>
        },
        {
            header: 'Service',
            key: 'service',
            render: (val) => (
                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-black ${val === 'Garage' ? 'bg-violet-50 border-violet-100 text-violet-700' : 'bg-sky-50 border-sky-100 text-sky-700'}`}>
                    {val === 'Garage' ? <Wrench className="w-3 h-3" /> : <Truck className="w-3 h-3" />}
                    {val}
                </div>
            )
        },
        {
            header: 'Amount',
            key: 'amount',
            render: (val) => <span className="text-xs font-black text-gray-900 whitespace-nowrap">₹{val}</span>
        },
        {
            header: 'Status',
            key: 'status',
            render: (val) => <StatusBadge status={val} />
        }
    ];

    return (
        <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div className="space-y-1">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard Overview</h1>
                    <p className="text-gray-500 font-medium text-sm">Real-time insights into your service operations.</p>
                </div>
                <div className="bg-white border border-gray-100 px-4 py-2.5 rounded-2xl text-gray-900 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] shadow-sm flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-pulse shadow-[0_0_8px_rgba(79,70,229,0.5)]"></div>
                    {new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-4 md:gap-6">
                <MetricCard title="Total Users" value="1,240" change="+12%" trend="up" icon={Users} color="blue" />
                <MetricCard title="Total Partners" value="320" change="+5%" trend="up" icon={Truck} color="green" />
                <MetricCard title="Active Requests" value="42" change="+8%" trend="up" icon={Activity} color="indigo" />
                <MetricCard title="Completed" value="8,540" change="+15%" trend="up" icon={CheckCircle} color="emerald" />
                <MetricCard title="Revenue" value="₹12.5L" change="+10%" trend="up" icon={DollarSign} color="yellow" />
                <MetricCard title="SOS Alerts" value="3" change="-2%" trend="down" icon={AlertTriangle} color="red" />
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 2xl:grid-cols-3 gap-6">
                {/* Recent Requests Section */}
                <div className="2xl:col-span-2">
                    <DataTable
                        title="Live Operations"
                        subtitle="Real-time service request feed"
                        headerRight={
                            <Link
                                to="/live-requests"
                                className="text-indigo-600 text-xs font-bold tracking-widest hover:text-indigo-700 transition-colors flex items-center gap-2 group"
                            >
                                View All <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        }
                        columns={columns}
                        data={RECENT_REQUESTS_DATA}
                    />
                </div>

                {/* Performance Analytics Column */}
                <div className="space-y-6 flex flex-col">
                    {/* Revenue Trend */}
                    <div className="premium-card p-5 md:p-6 border border-gray-100 flex-1">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h3 className="text-base md:text-md font-black text-gray-900">Monthly Revenue</h3>
                                <p className="text-[11px] text-gray-400 font-medium mt-0.5">Growth progression</p>
                            </div>
                            <div className="flex items-center gap-1.5 text-emerald-600 font-black text-[10px] bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100">
                                <Activity className="w-3 h-3" /> UP
                            </div>
                        </div>
                        <div className="h-56">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={revenueData}>
                                    <defs>
                                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#4F46E5" />
                                            <stop offset="100%" stopColor="#4338CA" />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 9, fill: '#94A3B8', fontWeight: 900 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 9, fill: '#94A3B8', fontWeight: 900 }}
                                    />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(79, 70, 229, 0.05)' }}
                                        contentStyle={{
                                            borderRadius: '16px',
                                            border: 'none',
                                            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
                                            fontSize: '10px',
                                            fontWeight: 900,
                                            textTransform: 'uppercase'
                                        }}
                                    />
                                    <Bar dataKey="uv" fill="url(#barGradient)" radius={[8, 8, 0, 0]} barSize={24} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Service Mix */}
                    <div className="premium-card p-5 md:p-6 border border-gray-100">
                        <h3 className="text-base md:text-md font-black text-gray-900">Service Utilization</h3>
                        <div className="h-48 flex items-center justify-center relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={serviceData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={10}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {serviceData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: '16px',
                                            border: 'none',
                                            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
                                            fontSize: '10px',
                                            fontWeight: 900,
                                            textTransform: 'uppercase'
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute flex flex-col items-center">
                                <span className="text-2xl font-black text-gray-900 leading-none tracking-tighter">700</span>
                                <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest mt-1">Total Jobs</span>
                            </div>
                        </div>
                        <div className="flex justify-center gap-10 mt-8">
                            {serviceData.map((entry, index) => (
                                <div key={entry.name} className="flex flex-col items-center gap-1">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{entry.name}</span>
                                    </div>
                                    <span className="text-sm font-black text-gray-900">{Math.round((entry.value / 700) * 100)}%</span>
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
