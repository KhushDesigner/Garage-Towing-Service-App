import React, { useState } from 'react';
import {
    CheckCircle,
    History,
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
    SearchX,
    Calendar,
    ChevronDown,
    Activity,
    Lock,
    ArrowRight,
    FilterX,
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

const PaymentsRevenue = () => {
    const [dateRange, setDateRange] = useState('Last 30 Days');
    const [isLedgerOpen, setIsLedgerOpen] = useState(false);

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

    return (
        <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
            {/* Page Header - Matched with CompletedRequests */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
                <div className="space-y-1">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                        Payments & Financials
                    </h1>
                    <p className="text-gray-500 font-medium mt-1 text-sm md:text-base">Real-time revenue tracking and settlement management.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex-1 text-sm md:text-base md:flex-none inline-flex items-center cursor-pointer justify-center gap-2 px-5 py-2.5 md:py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl md:rounded-2xl hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm active:scale-95 group">
                        <Download className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                        Export Report
                    </button>
                    {/* <button className="flex-1 text-sm md:text-base md:flex-none inline-flex items-center cursor-pointer justify-center gap-2 px-5 py-2.5 md:py-3 bg-indigo-600 text-white font-bold rounded-xl md:rounded-2xl hover:bg-indigo-700 transition-all shadow-indigo-200 shadow-lg active:scale-95">
                        <History className="w-4 h-4" />
                        Payout History
                    </button> */}
                </div>
            </div>

            {/* Summary Metrics - Matched Grid & Spacing */}
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

            {/* Visual Analytics - Using premium-card treatment */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Growth Matrix */}
                <div className="lg:col-span-2 premium-card p-6 md:p-8 relative overflow-hidden group">
                    <div className="flex items-center justify-between mb-8">
                        <div className="space-y-1">
                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Monthly Progress</h3>
                            <p className="text-lg font-extrabold text-gray-900">Revenue Flow & Projections</p>
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

                {/* Distribution Matrix */}
                <div className="premium-card p-6 md:p-8 flex flex-col items-center">
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

            {/* Financial Ledger Section - Using premium-card & light treatment */}
            <div className="premium-card overflow-hidden">
                <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between  gap-3 md:gap-4 bg-gray-50/30">
                    <div className="space-y-1">
                        <p className="text-base md:text-lg font-bold text-gray-800">Recent Transaction & Revenue Flow</p>
                    </div>
                    <div className="flex items-center gap-3 max-w-[400px] w-full">
                        <div className="relative group w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search TXN ID, nodes or actors..."
                                className="w-full max-w-[400px] pl-11 pr-4 py-2.5 md:py-3.5 bg-white border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm shadow-gray-100"
                            />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/80 border-b border-gray-100">
                                <th className="px-4 md:px-6 py-3 md:py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest whitespace-nowrap">Node Identify</th>
                                <th className="px-4 md:px-6 py-3 md:py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest whitespace-nowrap">Platform Actors</th>
                                <th className="px-4 md:px-6 py-3 md:py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest whitespace-nowrap text-right">Accounting Flow</th>
                                <th className="px-4 md:px-6 py-3 md:py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest whitespace-nowrap text-center">Payment Node</th>
                                <th className="px-4 md:px-6 py-3 md:py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest whitespace-nowrap text-center">Status</th>
                                <th className="px-4 md:px-6 py-3 md:py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest whitespace-nowrap text-left">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {transactions.map((txn) => (
                                <tr key={txn.id} className="hover:bg-indigo-50/20 transition-all group">
                                    <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                                        <p className="text-xs md:text-sm font-black text-gray-900 group-hover:text-indigo-600 transition-colors">{txn.id}</p>
                                    </td>
                                    <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 rounded-md bg-indigo-50 flex items-center justify-center text-indigo-600">
                                                    <User className="w-3 h-3" />
                                                </div>
                                                <span className="text-xs font-bold text-gray-700">{txn.user}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 rounded-md bg-amber-50 flex items-center justify-center text-amber-600">
                                                    <Store className="w-3 h-3" />
                                                </div>
                                                <span className="text-xs font-bold text-gray-500 truncate max-w-[150px]">{txn.partner}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 md:px-6 py-3 md:py-4 text-right whitespace-nowrap">
                                        <div className="flex flex-col items-end">
                                            <span className="text-base font-black text-gray-900">₹{txn.total.toLocaleString()}</span>
                                            <div className="flex gap-2 text-[11px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">
                                                <span className="text-indigo-500/80">Fee: ₹{txn.comm}</span>
                                                <span className="text-emerald-500/80">Ptr: ₹{txn.share}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 md:px-6 py-3 md:py-4 text-center whitespace-nowrap">
                                        <div className={clsx(
                                            "inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[10px] font-black border uppercase tracking-wider",
                                            txn.mode === 'Online' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' :
                                                txn.mode === 'Cash' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                                    'bg-amber-50 text-amber-700 border-amber-100'
                                        )}>
                                            {txn.mode === 'Online' ? <CreditCard className="w-3 h-3" /> :
                                                txn.mode === 'Cash' ? <Banknote className="w-3 h-3" /> :
                                                    <Wallet className="w-3 h-3" />}
                                            {txn.mode}
                                        </div>
                                    </td>
                                    <td className="px-4 md:px-6 py-3 md:py-4 text-center whitespace-nowrap">
                                        <StatusBadge status={txn.status} />
                                    </td>
                                    <td className="px-4 md:px-6 py-3 md:py-4 text-left whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <div className="p-1.5 bg-gray-50 rounded-lg text-gray-400">
                                                <Clock className="w-3.5 h-3.5" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-gray-700">{txn.date.split(',')[0]}</span>
                                                <span className="text-xs font-medium text-gray-400">{txn.date.split(',')[1].trim()}</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Ledger Footer */}
                <div className="px-8 py-5 bg-gray-50/50 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center md:text-left">Archive Log Index: Showing Top 5 of {1280} Flow Nodes</p>
                    <button
                        onClick={() => setIsLedgerOpen(true)}
                        className="text-indigo-600 cursor-pointer font-black text-[10px] uppercase tracking-[0.2em] hover:text-indigo-700 transition-colors underline underline-offset-8 decoration-indigo-200 decoration-2"
                    >
                        View all Transaction
                    </button>
                </div>
            </div>

            {/* Platform Transaction Archive Drawer */}
            <TransactionLedgerDrawer
                isOpen={isLedgerOpen}
                onClose={() => setIsLedgerOpen(false)}
                transactions={transactions}
            />
        </div>
    );
};

export default PaymentsRevenue;
