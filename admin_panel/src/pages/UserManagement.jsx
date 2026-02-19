import React, { useState, useRef, useEffect } from 'react';
import {
    Search,
    Filter,
    Download,
    MoreVertical,
    Eye,
    Star,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    Mail,
    Phone,
    Calendar,
    ArrowUpRight,
    SearchX
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import UserDetailsDrawer from '../components/UserDetailsDrawer';
import clsx from 'clsx';

const statusOptions = [
    { value: 'All', label: 'All Status', dot: 'bg-gray-400' },
    { value: 'Active', label: 'Active Customers', dot: 'bg-emerald-500' },
    { value: 'Blocked', label: 'Blocked Access', dot: 'bg-rose-500' },
];

const UserManagement = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [selectedUser, setSelectedUser] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [filterOpen, setFilterOpen] = useState(false);
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

    // Realistic Demo Data (10 Rows)
    const [users] = useState([
        { id: 1001, name: 'Rahul Sharma', email: 'rahul.s@example.com', phone: '+91 98765 43210', totalRequests: 12, totalSpent: '12,500', rating: 4.8, status: 'Active', joined: '12 Jan 2024' },
        { id: 1002, name: 'Priya Singh', email: 'priya.singh@example.com', phone: '+91 87654 32109', totalRequests: 5, totalSpent: '4,200', rating: 4.5, status: 'Active', joined: '25 Jan 2024' },
        { id: 1003, name: 'Amit Verma', email: 'amit.v@example.com', phone: '+91 76543 21098', totalRequests: 2, totalSpent: '1,500', rating: 3.2, status: 'Blocked', joined: '02 Feb 2024' },
        { id: 1004, name: 'Sneha Gupta', email: 'sneha.g@example.com', phone: '+91 65432 10987', totalRequests: 24, totalSpent: '45,800', rating: 4.9, status: 'Active', joined: '15 Feb 2024' },
        { id: 1005, name: 'Vikram Malhotra', email: 'vikram.m@example.com', phone: '+91 54321 09876', totalRequests: 8, totalSpent: '7,400', rating: 4.1, status: 'Active', joined: '18 Feb 2024' },
        { id: 1006, name: 'Anjali Das', email: 'anjali.das@example.com', phone: '+91 99887 76655', totalRequests: 15, totalSpent: '18,200', rating: 4.7, status: 'Active', joined: '22 Feb 2024' },
        { id: 1007, name: 'Sanjeev Kumar', email: 'sanjeev.k@example.com', phone: '+91 88776 65544', totalRequests: 1, totalSpent: '500', rating: 2.5, status: 'Blocked', joined: '25 Feb 2024' },
        { id: 1008, name: 'Megha Reddy', email: 'megha.r@example.com', phone: '+91 77665 54433', totalRequests: 9, totalSpent: '9,100', rating: 4.3, status: 'Active', joined: '28 Feb 2024' },
        { id: 1009, name: 'Kushal Taneja', email: 'kushal.t@example.com', phone: '+91 66554 43322', totalRequests: 4, totalSpent: '3,800', rating: 4.6, status: 'Active', joined: '01 Mar 2024' },
        { id: 1010, name: 'Pooja Hegde', email: 'pooja.h@example.com', phone: '+91 55443 32211', totalRequests: 11, totalSpent: '11,400', rating: 4.4, status: 'Active', joined: '05 Mar 2024' },
    ]);

    const handleViewDetails = (user) => {
        setSelectedUser(user);
        setIsDrawerOpen(true);
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.phone.includes(searchQuery) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesFilter = filterStatus === 'All' ||
            (filterStatus === 'Active' && user.status === 'Active') ||
            (filterStatus === 'Blocked' && user.status === 'Blocked');

        return matchesSearch && matchesFilter;
    });

    const totalPages = Math.max(1, Math.ceil(filteredUsers.length / itemsPerPage));
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredUsers.length);
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

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
        <div className="space-y-6 md:space-y-8">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
                <div className="space-y-1">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">User Management</h1>
                    <p className="text-gray-500 font-medium mt-1 text-sm md:text-base">Manage, track, and monitor platform customer activities.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex-1 text-sm md:text-base md:flex-none inline-flex items-center cursor-pointer justify-center gap-2 px-5 py-2.5 md:py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl md:rounded-2xl hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm active:scale-95 group">
                        <Download className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                        Export Data
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="premium-card overflow-hidden">
                {/* Search and Filters */}
                <div className="p-5 border-b border-gray-100/50 bg-gray-50/30">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full lg:w-[450px] group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search by name, email or phone number..."
                                className="w-full pl-11 pr-4 py-2.5 md:py-3.5 bg-white border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm shadow-gray-100"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-3 w-full lg:w-auto">
                            <div ref={filterRef} className="relative flex-1 lg:flex-none min-w-[210px]">
                                <button
                                    onClick={() => setFilterOpen(!filterOpen)}
                                    className={clsx(
                                        "flex items-center gap-2.5 w-full bg-white border rounded-2xl px-4 py-2.5 shadow-sm cursor-pointer transition-all active:scale-[0.98]",
                                        filterOpen ? "border-indigo-400 ring-4 ring-indigo-500/10" : "border-gray-200 hover:border-gray-300"
                                    )}
                                >
                                    <Filter className={clsx("w-4 h-4 transition-colors", filterOpen ? "text-indigo-600" : "text-gray-400")} />
                                    {/* <span className={clsx("w-2 h-2 rounded-full", statusOptions.find(o => o.value === filterStatus)?.dot)}></span> */}
                                    <span className="text-sm font-bold text-gray-700 flex-1 text-left">{statusOptions.find(o => o.value === filterStatus)?.label}</span>
                                    <ChevronDown className={clsx("w-4 h-4 text-gray-400 transition-transform duration-200", filterOpen && "rotate-180")} />
                                </button>

                                {/* Custom Dropdown */}
                                {filterOpen && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl shadow-gray-200/50 z-30 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                        {statusOptions.map(option => (
                                            <button
                                                key={option.value}
                                                onClick={() => { setFilterStatus(option.value); setFilterOpen(false); setCurrentPage(1); }}
                                                className={clsx(
                                                    "flex items-center gap-3 w-full px-4 py-3.5 text-sm font-bold transition-all text-left",
                                                    filterStatus === option.value
                                                        ? "bg-indigo-50 text-indigo-700"
                                                        : "text-gray-600 hover:bg-gray-50"
                                                )}
                                            >
                                                <span className={clsx("w-2.5 h-2.5 rounded-full ring-2 ring-offset-1", option.dot, filterStatus === option.value ? "ring-indigo-300" : "ring-transparent")}></span>
                                                {option.label}
                                                {filterStatus === option.value && (
                                                    <svg className="w-4 h-4 ml-auto text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="hidden md:flex items-center gap-1.5 px-4 py-3 bg-indigo-50 border border-indigo-100/50 rounded-2xl">
                                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                                <span className="text-xs font-black text-indigo-700 uppercase tracking-widest">Live Updates</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="overflow-x-auto relative min-h-[400px]">
                    {filteredUsers.length > 0 ? (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/80 border-b border-gray-100">
                                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-[9px] md:text-[10px] font-extrabold text-gray-400 uppercase tracking-widest whitespace-nowrap w-24">ID</th>
                                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-[9px] md:text-[10px] font-extrabold text-gray-400 uppercase tracking-widest whitespace-nowrap">Customer Profile</th>
                                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-[9px] md:text-[10px] font-extrabold text-gray-400 uppercase tracking-widest whitespace-nowrap hidden xl:table-cell">Contact Details</th>
                                    <th className="px-4 md:px-6 py-3 md:py-4 text-center text-[9px] md:text-[10px] font-extrabold text-gray-400 uppercase tracking-widest whitespace-nowrap">Requests</th>
                                    <th className="px-4 md:px-6 py-3 md:py-4 text-center text-[9px] md:text-[10px] font-extrabold text-gray-400 uppercase tracking-widest whitespace-nowrap hidden md:table-cell">Total Spent</th>
                                    <th className="px-4 md:px-6 py-3 md:py-4 text-center text-[9px] md:text-[10px] font-extrabold text-gray-400 uppercase tracking-widest whitespace-nowrap hidden lg:table-cell">Rating</th>
                                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-[9px] md:text-[10px] font-extrabold text-gray-400 uppercase tracking-widest whitespace-nowrap">Status</th>
                                    <th className="px-4 md:px-6 py-3 md:py-4 text-right text-[9px] md:text-[10px] font-extrabold text-gray-400 uppercase tracking-widest whitespace-nowrap">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {paginatedUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-indigo-50/20 transition-all group">
                                        <td className="px-4 md:px-6 py-3 md:py-4">
                                            <span className="text-xs md:text-sm font-bold text-indigo-600 tracking-tight">#{user.id}</span>
                                        </td>
                                        <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2.5 md:gap-3">
                                                <div className="relative">
                                                    <div className="w-10 h-10 md:w-11 md:h-11 bg-white border border-gray-200 rounded-xl md:rounded-2xl flex items-center justify-center text-indigo-600 font-black md:text-base shadow-sm group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all duration-300">
                                                        {user.name[0]}
                                                    </div>
                                                    <div className={clsx(
                                                        "absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm",
                                                        user.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'
                                                    )}></div>
                                                </div>
                                                <div>
                                                    <div className="font-black text-gray-900 text-xs md:text-sm tracking-tight">{user.name}</div>
                                                    <div className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Joined {user.joined}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-6 py-3 md:py-4 hidden xl:table-cell">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                                                    <Phone className="w-3 h-3 text-gray-300" /> {user.phone}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                                                    <Mail className="w-3 h-3 text-gray-300" /> {user.email}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-6 py-3 md:py-4 text-center">
                                            <span className="inline-flex items-center px-2.5 py-1 bg-gray-100 text-gray-900 rounded-lg text-xs font-black tracking-tight group-hover:bg-indigo-100 group-hover:text-indigo-700 transition-colors">
                                                {user.totalRequests}
                                            </span>
                                        </td>
                                        <td className="px-4 md:px-6 py-3 md:py-4 text-center hidden md:table-cell">
                                            <div className="text-xs md:text-sm font-black text-gray-900 tracking-tighter">₹{user.totalSpent}</div>
                                        </td>
                                        <td className="px-6 py-5 hidden lg:table-cell">
                                            <div className="flex items-center justify-center gap-1.5">
                                                <span className="text-xs md:text-sm font-black text-gray-900">{user.rating}</span>
                                                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 drop-shadow-sm" />
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-6 py-3 md:py-4">
                                            <StatusBadge status={user.status} />
                                        </td>
                                        <td className="px-4 md:px-6 py-3 md:py-4 text-right">
                                            <button
                                                onClick={() => handleViewDetails(user)}
                                                className="inline-flex cursor-pointer items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-900 text-xs font-black uppercase md:tracking-widest rounded-xl hover:text-indigo-600 hover:border-indigo-600 transition-all shadow-sm active:scale-95 group/btn"
                                            >
                                                Details
                                                <ArrowUpRight className="w-3.5 h-3.5 opacity-40 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="py-24 flex flex-col items-center justify-center text-center">
                            <div className="w-20 h-20 bg-gray-50 rounded-[2.5rem] flex items-center justify-center mb-6">
                                <SearchX className="w-8 h-8 text-gray-300" />
                            </div>
                            <h3 className="text-lg font-black text-gray-900 uppercase tracking-wider">No Results Found</h3>
                            <p className="text-gray-400 font-bold max-w-xs mt-2 text-sm">We couldn't find any users matching your current search or filter criteria.</p>
                            <button
                                onClick={() => { setSearchQuery(''); setFilterStatus('All'); }}
                                className="mt-8 text-indigo-600 font-black text-xs uppercase tracking-[0.2em] hover:text-indigo-700 transition-colors underline underline-offset-8 decoration-indigo-200 decoration-2"
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
                                <span className="text-gray-700 font-black">{startIndex + 1}–{endIndex}</span> of <span className="text-gray-700 font-black">{filteredUsers.length}</span>
                            </p>
                        </div>

                        {/* Right: Page navigation */}
                        <div className="flex items-center gap-1.5">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="p-2.5 md:p-3 border border-gray-200 rounded-xl md:rounded-2xl bg-white text-gray-400 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:text-indigo-600 hover:border-indigo-200 active:scale-90 shadow-sm"
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
                                disabled={currentPage === totalPages}
                                className="p-2.5 md:p-3 border border-gray-200 rounded-xl md:rounded-2xl bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:text-indigo-600 hover:border-indigo-200 active:scale-90 shadow-sm"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Side Drawer */}
            <UserDetailsDrawer
                user={selectedUser}
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            />
        </div>
    );
};

export default UserManagement;
