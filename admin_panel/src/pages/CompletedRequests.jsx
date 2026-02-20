import React, { useState, useRef, useEffect } from 'react';
import {
    Calendar,
    Filter,
    Download,
    Search,
    CheckCircle,
    TrendingUp,
    IndianRupee,
    Star,
    ChevronLeft,
    ChevronRight,
    ArrowUpRight,
    Clock,
    User,
    Store,
    CreditCard,
    ChevronDown,
    SearchX,
    LayoutGrid,
    Table as TableIcon,
    History,
    Wrench,
    Car,
    Truck,
    Wallet,
    Banknote
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import MetricCard from '../components/MetricCard';
import clsx from 'clsx';

const CompletedRequests = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [serviceFilter, setServiceFilter] = useState('All');
    const [timeFilter, setTimeFilter] = useState('Last 7 Days');
    const [viewMode, setViewMode] = useState('table'); // table or grid
    const [filterOpen, setFilterOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const filterRef = useRef(null);

    // Close filter dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (filterRef.current && !filterRef.current.contains(e.target)) {
                setFilterOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Summary Stats
    const summaryStats = [
        { label: 'Today Completed', value: '24', change: '+12%', trend: 'up', icon: CheckCircle, color: 'green' },
        { label: 'This Week', value: '184', change: '+8%', trend: 'up', icon: Calendar, color: 'blue' },
        { label: 'This Month', value: '742', change: '+5%', trend: 'up', icon: TrendingUp, color: 'indigo' },
        { label: 'Total Revenue', value: '₹4,82,500', change: '+15%', trend: 'up', icon: IndianRupee, color: 'yellow' }
    ];

    // Dummy Data (10 Records)
    const [completedRecords] = useState([
        { id: 'REQ-9101', user: 'Rahul Sharma', partner: 'Quick Fix Garage', type: 'Towing', amount: 1500, comm: 300, earn: 1200, mode: 'Online', date: '18 Feb, 2:30 PM', rating: 4.8 },
        { id: 'REQ-9102', user: 'Sneha Gupta', partner: 'Highway Pros', type: 'Flat Tire', amount: 450, comm: 90, earn: 360, mode: 'Cash', date: '18 Feb, 1:15 PM', rating: 4.5 },
        { id: 'REQ-9103', user: 'Amit Singh', partner: 'Metro Mechanic', type: 'Battery', amount: 350, comm: 70, earn: 280, mode: 'Wallet', date: '17 Feb, 11:00 PM', rating: 5.0 },
        { id: 'REQ-9104', user: 'Priya Verma', partner: '24/7 Recovery', type: 'Engine', amount: 2800, comm: 560, earn: 2240, mode: 'Online', date: '17 Feb, 8:45 PM', rating: 4.2 },
        { id: 'REQ-9105', user: 'Vikram Das', partner: 'City Garage', type: 'Oil Change', amount: 1200, comm: 240, earn: 960, mode: 'Online', date: '17 Feb, 4:20 PM', rating: 4.7 },
        { id: 'REQ-9106', user: 'Anjali Reddy', partner: 'Quick Fix Garage', type: 'Towing', amount: 1800, comm: 360, earn: 1440, mode: 'Cash', date: '17 Feb, 10:10 AM', rating: 4.9 },
        { id: 'REQ-9107', user: 'Karan Mehra', partner: 'Highway Pros', type: 'Flat Tire', amount: 500, comm: 100, earn: 400, mode: 'Online', date: '16 Feb, 9:30 PM', rating: 3.5 },
        { id: 'REQ-9108', user: 'Sonal Jain', partner: 'Metro Mechanic', type: 'Battery', amount: 400, comm: 80, earn: 320, mode: 'Online', date: '16 Feb, 6:15 PM', rating: 4.6 },
        { id: 'REQ-9109', user: 'Deepak Rao', partner: '24/7 Recovery', type: 'Towing', amount: 2200, comm: 440, earn: 1760, mode: 'Wallet', date: '16 Feb, 2:50 PM', rating: 4.8 },
        { id: 'REQ-9110', user: 'Megha Nair', partner: 'City Garage', type: 'Brake Fix', amount: 950, comm: 190, earn: 760, mode: 'Online', date: '16 Feb, 11:20 AM', rating: 4.4 },
        { id: 'REQ-9111', user: 'Anjali Reddy', partner: 'Quick Fix Garage', type: 'Towing', amount: 1800, comm: 360, earn: 1440, mode: 'Cash', date: '17 Feb, 10:10 AM', rating: 4.9 },
        { id: 'REQ-9112', user: 'Karan Mehra', partner: 'Highway Pros', type: 'Flat Tire', amount: 500, comm: 100, earn: 400, mode: 'Online', date: '16 Feb, 9:30 PM', rating: 3.5 },
        { id: 'REQ-9113', user: 'Sonal Jain', partner: 'Metro Mechanic', type: 'Battery', amount: 400, comm: 80, earn: 320, mode: 'Online', date: '16 Feb, 6:15 PM', rating: 4.6 },
        { id: 'REQ-9114', user: 'Megha Nair', partner: 'City Garage', type: 'Brake Fix', amount: 950, comm: 190, earn: 760, mode: 'Online', date: '16 Feb, 11:20 AM', rating: 4.4 },
    ]);

    const filteredRecords = completedRecords.filter(rec => {
        const matchesSearch = rec.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            rec.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
            rec.partner.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesService = serviceFilter === 'All' || rec.type === serviceFilter;

        return matchesSearch && matchesService;
    });

    const totalPages = Math.max(1, Math.ceil(filteredRecords.length / itemsPerPage));
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredRecords.length);
    const paginatedRecords = filteredRecords.slice(startIndex, endIndex);

    // Generate page numbers with ellipsis
    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push('...');
            for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
                pages.push(i);
            }
            if (currentPage < totalPages - 2) pages.push('...');
            pages.push(totalPages);
        }
        return pages;
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
                <div className="space-y-1">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                        Completed Requests
                    </h1>
                    <p className="text-gray-500 font-medium mt-1 text-sm md:text-base">Review and analyze history of successful operations.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex-1 text-sm md:text-base md:flex-none inline-flex items-center cursor-pointer justify-center gap-2 px-5 py-2.5 md:py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl md:rounded-2xl hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm active:scale-95 group">
                        <Download className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                        Export Data
                    </button>
                    <button className="flex-1 text-sm md:text-base md:flex-none inline-flex items-center cursor-pointer justify-center gap-2 px-5 py-2.5 md:py-3 bg-indigo-600 text-white font-bold rounded-xl md:rounded-2xl hover:bg-indigo-700 transition-all shadow-indigo-200 shadow-lg active:scale-95">
                        Generate Report
                    </button>
                </div>
            </div>

            {/* Summary Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
                {summaryStats.map((stat, index) => (
                    <MetricCard
                        key={index}
                        title={stat.label}
                        value={stat.value}
                        change={stat.change}
                        trend={stat.trend}
                        icon={stat.icon}
                        color={stat.color}
                    />
                ))}
            </div>

            {/* Content Area */}
            <div className="premium-card overflow-hidden">
                {/* Search and Filters */}
                <div className="p-5 border-b border-gray-100/50 bg-gray-50/30">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full lg:w-[450px] group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search mission ID, user or partner..."
                                className="w-full pl-11 pr-4 py-2.5 md:py-3.5 bg-white border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm shadow-gray-100"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center gap-3 w-full lg:w-auto">
                            <div className="flex items-center bg-gray-100 p-1 rounded-2xl">
                                <button
                                    onClick={() => setViewMode('table')}
                                    className={clsx(
                                        "p-2 rounded-xl transition-all",
                                        viewMode === 'table' ? "bg-white text-indigo-600 shadow-sm" : "text-gray-400 hover:text-gray-600"
                                    )}
                                >
                                    <TableIcon className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={clsx(
                                        "p-2 rounded-xl transition-all",
                                        viewMode === 'grid' ? "bg-white text-indigo-600 shadow-sm" : "text-gray-400 hover:text-gray-600"
                                    )}
                                >
                                    <LayoutGrid className="w-4 h-4" />
                                </button>
                            </div>

                            <div ref={filterRef} className="relative flex-1 lg:flex-none min-w-[180px]">
                                <button
                                    onClick={() => setFilterOpen(!filterOpen)}
                                    className={clsx(
                                        "flex items-center gap-2.5 w-full bg-white border rounded-2xl px-4 py-2.5 md:py-3 shadow-sm cursor-pointer transition-all active:scale-[0.98]",
                                        filterOpen ? "border-indigo-400 ring-4 ring-indigo-500/10" : "border-gray-200 hover:border-gray-300"
                                    )}
                                >
                                    <Filter className={clsx("w-4 h-4 transition-colors", filterOpen ? "text-indigo-600" : "text-gray-400")} />
                                    <span className="text-sm font-bold text-gray-700 flex-1 text-left">{serviceFilter === 'All' ? 'All Services' : serviceFilter}</span>
                                    <ChevronDown className={clsx("w-4 h-4 text-gray-400 transition-transform duration-200", filterOpen && "rotate-180")} />
                                </button>

                                {filterOpen && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl shadow-gray-200/50 z-30 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                        {['All', 'Towing', 'Flat Tire', 'Battery', 'Engine', 'Oil Change'].map(option => (
                                            <button
                                                key={option}
                                                onClick={() => { setServiceFilter(option); setFilterOpen(false); }}
                                                className={clsx(
                                                    "flex items-center gap-3 w-full px-4 py-3 text-sm font-bold transition-all text-left",
                                                    serviceFilter === option
                                                        ? "bg-indigo-50 text-indigo-700"
                                                        : "text-gray-600 hover:bg-gray-50"
                                                )}
                                            >
                                                {option === 'All' ? 'All Services' : option}
                                                {serviceFilter === option && (
                                                    <svg className="w-4 h-4 ml-auto text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Data Section */}
                <div className="overflow-x-auto relative min-h-[400px]">
                    {filteredRecords.length > 0 ? (
                        viewMode === 'table' ? (
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/80 border-b border-gray-100">
                                        <th className="px-4 md:px-6 py-3 md:py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest whitespace-nowrap">Mission Details</th>
                                        <th className="px-4 md:px-6 py-3 md:py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest whitespace-nowrap">Participants</th>
                                        <th className="px-4 md:px-6 py-3 md:py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest whitespace-nowrap">Service Type</th>
                                        <th className="px-4 md:px-6 py-3 md:py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest whitespace-nowrap text-right">Revenue Split</th>
                                        <th className="px-4 md:px-6 py-3 md:py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest whitespace-nowrap text-center">Payment</th>
                                        <th className="px-4 md:px-6 py-3 md:py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest whitespace-nowrap">Completion</th>
                                        <th className="px-4 md:px-6 py-3 md:py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest whitespace-nowrap text-right">Rating</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {paginatedRecords.map((rec) => (
                                        <tr key={rec.id} className="hover:bg-indigo-50/20 transition-all group">
                                            <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                                                <div className="flex flex-col">
                                                    <span className="font-black text-gray-900 text-xs md:text-sm tracking-tight group-hover:text-indigo-600 transition-colors uppercase">{rec.id}</span>
                                                    <div className="flex items-center gap-1.5 mt-1">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Successful</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                                                <div className="flex flex-col gap-1.5">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-5 h-5 rounded-md bg-indigo-50 flex items-center justify-center text-indigo-600">
                                                            <User className="w-3 h-3" />
                                                        </div>
                                                        <span className="text-xs font-bold text-gray-700">{rec.user}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-5 h-5 rounded-md bg-amber-50 flex items-center justify-center text-amber-600">
                                                            <Store className="w-3 h-3" />
                                                        </div>
                                                        <span className="text-xs font-bold text-gray-500 truncate max-w-[150px]">{rec.partner}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                                                <span className="inline-flex px-2.5 py-1 bg-gray-100 text-gray-900 rounded-lg text-[10px] font-black uppercase tracking-tight group-hover:bg-indigo-100 group-hover:text-indigo-700 transition-colors">
                                                    {rec.type}
                                                </span>
                                            </td>
                                            <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                                                <div className="flex flex-col items-end">
                                                    <span className="text-base font-black text-gray-900">₹{rec.amount}</span>
                                                    <div className="flex gap-2 text-[11px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">
                                                        <span className="text-indigo-500/80">Fee: ₹{rec.comm}</span>
                                                        <span className="text-emerald-500/80">Ptr: ₹{rec.earn}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-center">
                                                <div className={clsx(
                                                    "inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[10px] font-black border uppercase tracking-wider",
                                                    rec.mode === 'Online' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' :
                                                        rec.mode === 'Cash' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                                            'bg-amber-50 text-amber-700 border-amber-100'
                                                )}>
                                                    {rec.mode === 'Online' ? <CreditCard className="w-3 h-3" /> :
                                                        rec.mode === 'Cash' ? <Banknote className="w-3 h-3" /> :
                                                            <Wallet className="w-3 h-3" />}
                                                    {rec.mode}
                                                </div>
                                            </td>
                                            <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <div className="p-1.5 bg-gray-50 rounded-lg text-gray-400">
                                                        <Clock className="w-3.5 h-3.5" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-bold text-gray-700">{rec.date.split(',')[0]}</span>
                                                        <span className="text-xs font-medium text-gray-400">{rec.date.split(',')[1].trim()}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-right text-sm">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <span className="font-black text-gray-900">{rec.rating}</span>
                                                    <Star className="w-4 h-4 fill-amber-400 text-amber-400 drop-shadow-sm" />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                                {paginatedRecords.map((rec) => (
                                    <div key={rec.id} className="group relative p-4 md:p-5 bg-white border border-gray-100 rounded-2xl md:rounded-[2rem] hover:border-indigo-200 transition-all shadow-sm hover:shadow-indigo-500/5 overflow-hidden">
                                        <div className="flex items-start justify-between mb-4 relative z-1">
                                            <div className="flex items-center gap-3">
                                                <div className="w-11 h-11 rounded-2xl bg-gray-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                                                    {rec.type.includes('Towing') ? <Truck className="w-5 h-5" /> : rec.type.includes('Battery') ? <Wrench className="w-5 h-5" /> : <Car className="w-5 h-5" />}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <p className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest">{rec.id}</p>
                                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.3)]"></span>
                                                    </div>
                                                    <h3 className="font-extrabold text-gray-900 text-sm md:text-base tracking-tight">{rec.type}</h3>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <div className="flex items-center gap-1">
                                                    <span className="text-xs font-black text-gray-900">{rec.rating}</span>
                                                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                                </div>
                                                <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-tighter mt-1">{rec.date.split(',')[0]}</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5 relative z-1">
                                            <div className="p-3 rounded-2xl bg-gray-50/80 border border-gray-100/50 group-hover:bg-indigo-50/30 group-hover:border-indigo-100/50 transition-colors">
                                                <span className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest block mb-1">Customer</span>
                                                <p className="text-xs md:text-sm font-bold text-gray-900 truncate">{rec.user}</p>
                                            </div>
                                            <div className="p-3 rounded-2xl bg-gray-50/80 border border-gray-100/50 group-hover:bg-indigo-50/30 group-hover:border-indigo-100/50 transition-colors">
                                                <span className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest block mb-1">Partner</span>
                                                <p className="text-xs md:text-sm font-bold text-gray-700 truncate">{rec.partner}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 relative z-1 border-t border-gray-100/50">
                                            <div className="flex flex-col">
                                                <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest leading-none mb-1">Revenue Earned</p>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg font-black text-gray-900 tracking-tight">₹{rec.amount}</span>
                                                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-lg border border-emerald-100/50">Fee: ₹{rec.comm}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center px-0.5 py-0.5 bg-gray-50 text-gray-600 rounded-xl text-[10px] font-black uppercase tracking-widest group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                                                <div className={clsx(
                                                    "inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[10px] font-black border uppercase tracking-wider",
                                                    rec.mode === 'Online' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' :
                                                        rec.mode === 'Cash' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                                            'bg-amber-50 text-amber-700 border-amber-100'
                                                )}>
                                                    {rec.mode === 'Online' ? <CreditCard className="w-3 h-3" /> :
                                                        rec.mode === 'Cash' ? <Banknote className="w-3 h-3" /> :
                                                            <Wallet className="w-3 h-3" />}
                                                    {rec.mode}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )
                    ) : (
                        <div className="py-24 flex flex-col items-center justify-center text-center">
                            <div className="w-20 h-20 bg-gray-50 rounded-[2.5rem] flex items-center justify-center mb-6">
                                <SearchX className="w-8 h-8 text-gray-300" />
                            </div>
                            <h3 className="text-lg font-black text-gray-900 uppercase tracking-wider">No Records Found</h3>
                            <p className="text-gray-400 font-bold max-w-xs mt-2 text-sm">We couldn't find any completed requests matching your current search or filter criteria.</p>
                            <button
                                onClick={() => { setSearchQuery(''); setServiceFilter('All'); }}
                                className="mt-8 text-indigo-600 font-black text-sm uppercase tracking-widest hover:text-indigo-700 transition-colors underline underline-offset-8 decoration-indigo-200 decoration-2"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    )}
                </div>

                {/* Pagination Footer */}
                <div className="px-4 md:px-6 py-4 md:py-5 bg-gray-50/50 border-t border-gray-100/50">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* Left: Rows per page + result info */}
                        <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto justify-between md:justify-start">
                            <div className="flex items-center gap-2.5">
                                <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Rows</span>
                                <select
                                    value={itemsPerPage}
                                    onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                                    className="appearance-none bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-black text-gray-700 cursor-pointer hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all shadow-sm"
                                >
                                    {[5, 10, 20, 50].map(n => (
                                        <option key={n} value={n}>{n}</option>
                                    ))}
                                </select>
                            </div>
                            <p className="text-xs font-bold text-gray-400">
                                <span className="text-gray-700 font-black">{startIndex + 1}–{endIndex}</span> of <span className="text-gray-700 font-black">{filteredRecords.length}</span>
                            </p>
                        </div>

                        {/* Right: Page navigation */}
                        <div className="flex items-center gap-1.5">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                className="p-2.5 md:p-3 border border-gray-200 rounded-xl md:rounded-2xl bg-white text-gray-400 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:text-indigo-600 hover:border-indigo-200 active:scale-90 shadow-sm"
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>

                            <div className="flex items-center bg-white border border-gray-200 rounded-xl md:rounded-2xl p-1 shadow-sm">
                                {getPageNumbers().map((page, i) => (
                                    page === '...' ? (
                                        <span key={`ellipsis-${i}`} className="w-8 md:w-10 h-8 md:h-10 flex items-center justify-center text-xs text-gray-300 font-black">⋯</span>
                                    ) : (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={clsx(
                                                "w-8 md:w-10 h-8 md:h-10 rounded-lg md:rounded-xl text-xs font-black transition-all active:scale-95",
                                                page === currentPage
                                                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                                                    : "text-gray-400 hover:bg-gray-50 hover:text-gray-700"
                                            )}
                                        >
                                            {page}
                                        </button>
                                    )
                                ))}
                            </div>

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                className="p-2.5 md:p-3 border border-gray-200 rounded-xl md:rounded-2xl bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:text-indigo-600 hover:border-indigo-200 active:scale-90 shadow-sm"
                                disabled={currentPage === totalPages}
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompletedRequests;
