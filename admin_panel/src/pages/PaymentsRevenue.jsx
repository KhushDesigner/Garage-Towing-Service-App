import React, { useState } from 'react';
import {
    CheckCircle,
    IndianRupee,
    CreditCard,
    Wallet,
    TrendingUp,
    Clock,
    Download,
    Activity,
    User,
    Store,
    Banknote
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
} from 'recharts';
import StatusBadge from '../components/StatusBadge';
import MetricCard from '../components/MetricCard';
import TransactionLedgerDrawer from '../components/TransactionLedgerDrawer';
import clsx from 'clsx';
import Button from '../components/common/Button';
import DataTable from '../components/common/DataTable';
import SearchBox from '../components/common/SearchBox';

const PaymentsRevenue = () => {
    const [isLedgerOpen, setIsLedgerOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

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
        { id: 'TXN-4491', user: 'Rahul Sharma', partner: 'Quick Fix Garage', total: 1500, comm: 300, share: 1200, mode: 'Online', status: 'Completed', date: '18 Feb, 2:30 PM' },
        { id: 'TXN-4492', user: 'Sneha Gupta', partner: 'Highway Pros', total: 450, comm: 90, share: 360, mode: 'Card', status: 'Completed', date: '18 Feb, 1:15 PM' },
        { id: 'TXN-4493', user: 'Amit Singh', partner: 'Metro Mechanic', total: 350, comm: 70, share: 280, mode: 'Wallet', status: 'Pending', date: '18 Feb, 12:45 PM' },
        { id: 'TXN-4494', user: 'Priya Verma', partner: '24/7 Recovery', total: 2800, comm: 560, share: 2240, mode: 'Online', status: 'Completed', date: '17 Feb, 8:45 PM' },
        { id: 'TXN-4495', user: 'Vikram Das', partner: 'City Garage', total: 1200, comm: 240, share: 960, mode: 'Cash', status: 'Completed', date: '17 Feb, 4:20 PM' },
    ];

    const stats = [
        { title: 'Total Revenue', value: '₹4,82,500', change: '+12%', trend: 'up', icon: IndianRupee, color: 'blue' },
        { title: 'Admin Commission', value: '₹96,500', change: '+8%', trend: 'up', icon: TrendingUp, color: 'indigo' },
        { title: 'Pending Settlement', value: '₹12,450', change: '-2%', trend: 'down', icon: Clock, color: 'yellow' },
        { title: 'Today Revenue', value: '₹18,200', change: '+5%', trend: 'up', icon: CheckCircle, color: 'green' },
    ];

    const columns = [
        {
            header: 'Node Identify',
            key: 'id',
            render: (val) => (
                <p className="text-xs whitespace-nowrap md:text-sm font-black text-gray-900 group-hover:text-indigo-600 transition-colors uppercase">{val}</p>
            )
        },
        {
            header: 'Platform Actors',
            key: 'actors',
            render: (_, row) => (
                <div className="flex flex-col gap-1.5 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-md bg-indigo-50 flex items-center justify-center text-indigo-600">
                            <User className="w-3 h-3" />
                        </div>
                        <span className="text-xs font-bold text-gray-700">{row.user}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-md bg-amber-50 flex items-center justify-center text-amber-600">
                            <Store className="w-3 h-3" />
                        </div>
                        <span className="text-xs font-bold text-gray-500 truncate max-w-[150px]">{row.partner}</span>
                    </div>
                </div>
            )
        },
        {
            header: 'Accounting Flow',
            key: 'total',
            align: 'right',
            render: (val, row) => (
                <div className="flex flex-col items-end whitespace-nowrap">
                    <span className="text-base font-black text-gray-900">₹{val.toLocaleString()}</span>
                    <div className="flex gap-2 text-[11px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">
                        <span className="text-indigo-500/80">Fee: ₹{row.comm}</span>
                        <span className="text-emerald-500/80">Ptr: ₹{row.share}</span>
                    </div>
                </div>
            )
        },
        {
            header: 'Payment Node',
            key: 'mode',
            align: 'center',
            render: (val) => (
                <div className={clsx(
                    "inline-flex whitespace-nowrap items-center gap-1.5 px-3 py-1 rounded-xl text-[10px] font-black border uppercase tracking-wider",
                    val === 'Online' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' :
                        val === 'Cash' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                            'bg-amber-50 text-amber-700 border-amber-100'
                )}>
                    {val === 'Online' ? <CreditCard className="w-3 h-3" /> :
                        val === 'Cash' ? <Banknote className="w-3 h-3" /> :
                            <Wallet className="w-3 h-3" />}
                    {val}
                </div>
            )
        },
        {
            header: 'Status',
            key: 'status',
            align: 'center',
            render: (val) => <StatusBadge status={val} />
        },
        {
            header: 'Timestamp',
            key: 'date',
            render: (val) => (
                <div className="flex items-center gap-2 whitespace-nowrap">
                    <div className="p-1.5 bg-gray-50 rounded-lg text-gray-400">
                        <Clock className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-700">{val.split(',')[0]}</span>
                        <span className="text-xs font-medium text-gray-400">{val.split(',')[1].trim()}</span>
                    </div>
                </div>
            )
        }
    ];

    return (
        <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
                <div className="space-y-1">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                        Payments & Financials
                    </h1>
                    <p className="text-gray-500 font-medium text-sm">Real-time revenue tracking and settlement management.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" leftIcon={<Download className="w-4 h-4 text-gray-400" />}>
                        Export Report
                    </Button>
                </div>
            </div>

            {/* Summary Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
                {stats.map((stat, index) => (
                    <MetricCard
                        key={index}
                        title={stat.title}
                        value={stat.value}
                        change={stat.change}
                        trend={stat.trend}
                        icon={stat.icon}
                        color={stat.color}
                    />
                ))}
            </div>

            {/* Visual Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 premium-card p-5 md:p-6 relative overflow-hidden group">
                    <div className="flex items-center justify-between mb-8">

                        <div className="space-y-1">
                            <h3 className="text-base md:text-md font-black text-gray-900">Monthly Progress</h3>
                            <p className="text-[11px] text-gray-400 font-medium mt-0.5">Revenue Flow & Projections</p>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-xl">
                            <Activity className="w-3.5 h-3.5 text-indigo-600" />
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Live Analysis</span>
                        </div>
                    </div>

                    <div className="h-[320px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueChartData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.01} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 700, fill: '#9CA3AF' }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 700, fill: '#9CA3AF' }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: '16px',
                                        border: '1px solid #F3F4F6',
                                        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)',
                                        fontSize: '11px',
                                        fontWeight: 800
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#4F46E5"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorRevenue)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="premium-card p-5 md:p-6 flex flex-col items-center">
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6 w-full text-center">Commission Structure Share</h3>

                    <div className="h-64 mt-4 w-full relative">
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
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <p className="text-2xl font-black text-gray-900 leading-none">₹72K</p>
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Total Hub</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 mt-6 w-full">
                        {pieData.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3.5 bg-gray-50/80 rounded-2xl group hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.name}</span>
                                </div>
                                <span className="text-xs font-black text-gray-900">₹{item.value.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Financial Ledger Section */}
            <div className="space-y-4">
                <DataTable
                    title="Recent Transaction & Revenue Flow"
                    subtitle="Financial ledger overview"
                    filters={
                        <SearchBox
                            value={searchQuery}
                            onSearch={setSearchQuery}
                            placeholder="Search TXN ID, nodes or actors..."
                            width="w-full lg:w-80"
                        />
                    }
                    columns={columns}
                    data={transactions.filter(txn =>
                        txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        txn.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        txn.partner.toLowerCase().includes(searchQuery.toLowerCase())
                    )}
                />

                <div className="px-8 py-5 premium-card border-2 border-solid border-white bg-gray-50/50 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center md:text-left">Archive Log Index: Showing Top 5 of {1280} Flow Nodes</p>
                    <button
                        onClick={() => setIsLedgerOpen(true)}
                        className="text-indigo-600 cursor-pointer font-black text-[10px] uppercase tracking-[0.2em] hover:text-indigo-700 transition-colors underline underline-offset-8 decoration-indigo-200 decoration-2"
                    >
                        View all Transaction
                    </button>
                </div>
            </div>

            <TransactionLedgerDrawer
                isOpen={isLedgerOpen}
                onClose={() => setIsLedgerOpen(false)}
                transactions={transactions}
            />
        </div>
    );
};

export default PaymentsRevenue;
