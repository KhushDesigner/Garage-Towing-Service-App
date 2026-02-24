import React, { useState } from 'react';
import {
    Calendar,
    Filter,
    Download,
    CheckCircle,
    TrendingUp,
    IndianRupee,
    Star,
    Clock,
    User,
    Store,
    CreditCard,
    LayoutGrid,
    Table as TableIcon,
    Wrench,
    Car,
    Truck,
    Wallet,
    Banknote
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import MetricCard from '../components/MetricCard';
import clsx from 'clsx';
import Button from '../components/common/Button';
import DataTable from '../components/common/DataTable';
import SearchBox from '../components/common/SearchBox';
import FilterDropdown from '../components/common/FilterDropdown';
import Pagination from '../components/common/Pagination';

const CompletedRequests = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [serviceFilter, setServiceFilter] = useState('All');
    const [viewMode, setViewMode] = useState('table');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const serviceFilterOptions = [
        { label: 'All Services', value: 'All' },
        { label: 'Towing', value: 'Towing' },
        { label: 'Flat Tire', value: 'Flat Tire' },
        { label: 'Battery', value: 'Battery' },
        { label: 'Engine', value: 'Engine' },
        { label: 'Oil Change', value: 'Oil Change' },
    ];

    // Summary Stats
    const summaryStats = [
        { label: 'Today Completed', value: '24', change: '+12%', trend: 'up', icon: CheckCircle, color: 'green' },
        { label: 'This Week', value: '184', change: '+8%', trend: 'up', icon: Calendar, color: 'blue' },
        { label: 'This Month', value: '742', change: '+5%', trend: 'up', icon: TrendingUp, color: 'indigo' },
        { label: 'Total Revenue', value: '₹4,82,500', change: '+15%', trend: 'up', icon: IndianRupee, color: 'yellow' }
    ];

    // Dummy Data
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

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const columns = [
        {
            header: 'Mission Details',
            key: 'id',
            render: (val) => (
                <div className="flex flex-col">
                    <span className="font-black text-gray-900 text-xs md:text-sm tracking-tight group-hover:text-indigo-600 transition-colors uppercase">{val}</span>
                    <div className="flex items-center gap-1.5 mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Successful</span>
                    </div>
                </div>
            )
        },
        {
            header: 'Participants',
            key: 'participants',
            render: (_, row) => (
                <div className="flex flex-col gap-1.5">
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
            header: 'Service Type',
            key: 'type',
            render: (val) => (
                <span className="inline-flex px-2.5 py-1 bg-gray-100 text-gray-900 rounded-lg text-[10px] font-black uppercase tracking-tight group-hover:bg-indigo-100 group-hover:text-indigo-700 transition-colors">
                    {val}
                </span>
            )
        },
        {
            header: 'Revenue Split',
            key: 'amount',
            align: 'right',
            render: (val, row) => (
                <div className="flex flex-col items-end">
                    <span className="text-base font-black text-gray-900">₹{val}</span>
                    <div className="flex gap-2 text-[11px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">
                        <span className="text-indigo-500/80">Fee: ₹{row.comm}</span>
                        <span className="text-emerald-500/80">Ptr: ₹{row.earn}</span>
                    </div>
                </div>
            )
        },
        {
            header: 'Payment',
            key: 'mode',
            align: 'center',
            render: (val) => (
                <div className={clsx(
                    "inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[10px] font-black border uppercase tracking-wider",
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
            header: 'Completion',
            key: 'date',
            render: (val) => (
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-gray-50 rounded-lg text-gray-400">
                        <Clock className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-700">{val.split(',')[0]}</span>
                        <span className="text-xs font-medium text-gray-400">{val.split(',')[1].trim()}</span>
                    </div>
                </div>
            )
        },
        {
            header: 'Rating',
            key: 'rating',
            align: 'right',
            render: (val) => (
                <div className="flex items-center justify-end gap-1.5">
                    <span className="font-black text-gray-900">{val}</span>
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400 drop-shadow-sm" />
                </div>
            )
        }
    ];

    return (
        <div className="space-y-6 md:space-y-8">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
                <div className="space-y-1">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                        Completed Requests
                    </h1>
                    <p className="text-gray-500 font-medium mt-1 text-sm">Review and analyze history of successful operations.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" leftIcon={<Download className="w-4 h-4 text-gray-400" />}>
                        Export Data
                    </Button>
                    <Button variant="primary">
                        Generate Report
                    </Button>
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

            {/* Controls Area */}
            <div className="bg-white p-4 md:p-6 rounded-[2rem] border border-gray-100 shadow-sm space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex flex-col sm:flex-row items-center gap-3 flex-1">
                        <SearchBox
                            value={searchQuery}
                            onSearch={(v) => { setSearchQuery(v); setCurrentPage(1); }}
                            placeholder="Search mission ID, user or partner..."
                            width="w-full lg:w-80"
                        />
                        <FilterDropdown
                            icon={<Filter className="w-4 h-4" />}
                            options={serviceFilterOptions}
                            value={serviceFilter}
                            onChange={(v) => { setServiceFilter(v); setCurrentPage(1); }}
                            width="w-full sm:w-44"
                        />
                    </div>
                    <div className="flex items-center self-end lg:self-auto bg-gray-100 p-1 rounded-2xl">
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
                </div>
            </div>

            {/* Content Area */}
            <div className="space-y-4">
                {viewMode === 'table' ? (
                    <DataTable
                        columns={columns}
                        data={paginatedRecords}
                        paginationProps={{
                            currentPage,
                            totalPages,
                            onPageChange: handlePageChange,
                            startIndex,
                            endIndex,
                            totalItems: filteredRecords.length,
                            itemsPerPage,
                            setItemsPerPage
                        }}
                    />
                ) : (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                            {paginatedRecords.map((rec) => (
                                <div key={rec.id} className="group relative p-5 bg-white border border-gray-100 rounded-[2rem] hover:border-indigo-200 transition-all shadow-sm hover:shadow-indigo-500/5 overflow-hidden">
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

                        {/* Common Pagination for Grid View */}
                        <div className="bg-white p-1 rounded-2xl border border-gray-100 shadow-sm mt-8">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                                startIndex={startIndex}
                                endIndex={endIndex}
                                totalItems={filteredRecords.length}
                                itemsPerPage={itemsPerPage}
                                setItemsPerPage={setItemsPerPage}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompletedRequests;
