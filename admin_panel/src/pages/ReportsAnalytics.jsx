import React from 'react';
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
    Area
} from 'recharts';
import {
    Calendar,
    Download,
    TrendingUp,
    MapPin,
    Users,
    Star,
    Activity,
    AlertTriangle,
    ChevronDown,
    ArrowRight
} from 'lucide-react';
import Button from '../components/common/Button';
import DataTable from '../components/common/DataTable';
import MetricCard from '../components/MetricCard';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

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

    const columns = [
        {
            header: 'Partner',
            key: 'name',
            render: (val, row) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-50 border border-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 text-[10px] font-black shrink-0">
                        #{row.id}
                    </div>
                    <span className="text-xs font-black text-gray-800 whitespace-nowrap">{val}</span>
                </div>
            )
        },
        {
            header: 'Jobs',
            key: 'jobs',
            align: 'center',
            render: (val) => <span className="text-xs font-black text-gray-900 whitespace-nowrap">{val}</span>
        },
        {
            header: 'Rating',
            key: 'rating',
            align: 'center',
            render: (val) => (
                <div className="inline-flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg border border-amber-100 whitespace-nowrap">
                    <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                    <span className="text-xs font-black text-amber-700">{val}</span>
                </div>
            )
        },
        {
            header: 'Volume',
            key: 'revenue',
            align: 'right',
            render: (val, row) => (
                <div className="flex flex-col items-end whitespace-nowrap">
                    <span className="text-xs font-black text-gray-900">{val}</span>
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-none mt-0.5">{row.growth}</span>
                </div>
            )
        }
    ];

    return (
        <div className="space-y-6 md:space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Reports & Analytics</h1>
                    <p className="text-gray-500 font-medium mt-1 text-sm">Deep-dive analysis of platform performance and growth metrics.</p>
                </div>
                <div className="flex items-center flex-col sm:flex-row gap-3">
                    <Button
                        variant="outline"
                        className="bg-white"
                        rightIcon={<ChevronDown className="w-4 h-4" />}
                    >
                        <Calendar className="w-4 h-4 mr-2" /> This Month
                    </Button>
                    <Button
                        variant="primary"
                        // className="bg-indigo-600 shadow-xl shadow-indigo-100"
                        leftIcon={<Download className="w-4 h-4" />}
                    >
                        Export BI Report
                    </Button>
                </div>
            </div>

            {/* Top Level KPIs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
                <MetricCard
                    title="Total Volume"
                    value="42,850"
                    change="+14%"
                    trend="up"
                    icon={Activity}
                    color="blue"
                />
                <MetricCard
                    title="Active Users"
                    value="12,402"
                    change="+8%"
                    trend="up"
                    icon={Users}
                    color="green"
                />
                <MetricCard
                    title="Avg Rating"
                    value="4.72"
                    change="+0.2"
                    trend="up"
                    icon={Star}
                    color="yellow"
                />
                <MetricCard
                    title="Cancel Rate"
                    value="4.2%"
                    change="-1.5%"
                    trend="down"
                    icon={AlertTriangle}
                    color="red"
                />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
                {/* Revenue Trend Area Chart */}
                <div className="premium-card p-5 md:p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-base md:text-md font-black text-gray-900">Revenue Trend</h3>
                            <p className="text-[11px] text-gray-400 font-medium mt-0.5">Weekly Gross Revenue flow</p>
                        </div>
                    </div>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 900, fill: '#94A3B8' }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 900, fill: '#94A3B8' }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: '20px',
                                        border: 'none',
                                        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
                                        fontSize: '12px',
                                        fontWeight: 900,
                                        textTransform: 'uppercase'
                                    }}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#4F46E5" strokeWidth={4} fillOpacity={1} fill="url(#colorRevenue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* City-wise Requests Bar Chart */}
                <div className="premium-card p-5 md:p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-base md:text-md font-black text-gray-900">Top Performing Cities</h3>
                            <p className="text-[11px] text-gray-400 font-medium mt-0.5">Request volume per city</p>
                        </div>
                    </div>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={cityData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 900, fill: '#94A3B8' }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 900, fill: '#94A3B8' }}
                                />
                                <Tooltip
                                    cursor={{ fill: 'rgba(79, 70, 229, 0.05)' }}
                                    contentStyle={{
                                        borderRadius: '20px',
                                        border: 'none',
                                        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
                                        fontSize: '12px',
                                        fontWeight: 900,
                                        textTransform: 'uppercase'
                                    }}
                                />
                                <Bar dataKey="requests" fill="#4F46E5" radius={[10, 10, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Cancellation Rate Line Chart */}
                <div className="premium-card p-5 md:p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-base md:text-md font-black text-gray-900">Cancellation Dynamics</h3>
                            <p className="text-[11px] text-gray-400 font-medium mt-0.5">Daily system drop-out rate (%)</p>
                        </div>
                    </div>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={cancellationData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 900, fill: '#94A3B8' }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 900, fill: '#94A3B8' }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: '20px',
                                        border: 'none',
                                        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
                                        fontSize: '12px',
                                        fontWeight: 900,
                                        textTransform: 'uppercase'
                                    }}
                                />
                                <Line
                                    type="stepAfter"
                                    dataKey="rate"
                                    stroke="#F43F5E"
                                    strokeWidth={4}
                                    dot={{ r: 6, fill: '#F43F5E', strokeWidth: 3, stroke: '#fff' }}
                                    activeDot={{ r: 8, strokeWidth: 0 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Top Partners Ranking */}
                <div className='lg:col-span-3'>
                    <DataTable
                        columns={columns}
                        data={partnerRankings}
                        title="Performance Ranking"
                        subtitle="Partner leaderboard by quality"
                        headerRight={
                            <Link
                                to="/partner-management"
                                className="text-indigo-600 text-xs font-bold tracking-widest hover:text-indigo-700 transition-colors flex items-center gap-2 group"
                            >
                                View Full Detailed Rankings <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default ReportsAnalytics;
