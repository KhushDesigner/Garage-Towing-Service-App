import React, { useState, useRef, useEffect } from 'react';
import {
    Search,
    Filter,
    Download,
    Eye,
    Star,
    Wifi,
    WifiOff,
    IndianRupee,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    SearchX,
    Wrench,
    Truck,
    ArrowUpRight,
    ShieldCheck
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import PartnerDetailsDrawer from '../components/PartnerDetailsDrawer';
import clsx from 'clsx';

const serviceOptions = [
    { value: 'All', label: 'All Services', icon: Wrench },
    { value: 'Garage', label: 'Garage Only', icon: Wrench },
    { value: 'Towing', label: 'Towing Only', icon: Truck },
];

const statusOptions = [
    { value: 'All', label: 'All Status', dot: 'bg-gray-400' },
    { value: 'Online', label: 'Online Providers', dot: 'bg-emerald-500' },
    { value: 'Offline', label: 'Offline Providers', dot: 'bg-gray-300' },
];

const kycOptions = [
    { value: 'All', label: 'All KYC', dot: 'bg-gray-400' },
    { value: 'Verified', label: 'KYC Verified', dot: 'bg-emerald-500' },
    { value: 'Pending', label: 'KYC Pending', dot: 'bg-amber-500' },
];

const PartnerManagement = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [serviceFilter, setServiceFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [kycFilter, setKycFilter] = useState('All');
    const [selectedPartner, setSelectedPartner] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Filter dropdown states
    const [serviceDropOpen, setServiceDropOpen] = useState(false);
    const [statusDropOpen, setStatusDropOpen] = useState(false);
    const [kycDropOpen, setKycDropOpen] = useState(false);

    const serviceRef = useRef(null);
    const statusRef = useRef(null);
    const kycRef = useRef(null);

    // Close dropdowns on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (serviceRef.current && !serviceRef.current.contains(e.target)) setServiceDropOpen(false);
            if (statusRef.current && !statusRef.current.contains(e.target)) setStatusDropOpen(false);
            if (kycRef.current && !kycRef.current.contains(e.target)) setKycDropOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Realistic Partner Data
    const [partners] = useState([
        { id: 'PRT-101', name: 'Quick Fix Garage', phone: '+91 99887 76655', serviceType: 'Garage', rating: 4.7, online: true, kyc: 'Verified', earnings: 154200, jobs: 312, joined: '12 Jan 2024' },
        { id: 'PRT-102', name: 'City Towing Services', phone: '+91 88776 65544', serviceType: 'Towing', rating: 4.9, online: true, kyc: 'Verified', earnings: 242000, jobs: 482, joined: '08 Nov 2023' },
        { id: 'PRT-103', name: 'Mechanic On Wheels', phone: '+91 77665 54433', serviceType: 'Garage', rating: 3.8, online: false, kyc: 'Pending', earnings: 45000, jobs: 67, joined: '20 Feb 2024' },
        { id: 'PRT-104', name: 'Highway Helpers', phone: '+91 66554 43322', serviceType: 'Towing', rating: 4.6, online: true, kyc: 'Verified', earnings: 195800, jobs: 390, joined: '15 Dec 2023' },
        { id: 'PRT-105', name: 'Bike Doctor', phone: '+91 55443 32211', serviceType: 'Garage', rating: 4.8, online: false, kyc: 'Verified', earnings: 120500, jobs: 214, joined: '03 Mar 2024' },
        { id: 'PRT-106', name: '24/7 Car Rescue', phone: '+91 91234 56789', serviceType: 'Towing', rating: 4.2, online: true, kyc: 'Pending', earnings: 89000, jobs: 145, joined: '28 Jan 2024' },
        { id: 'PRT-107', name: 'Metro Motors', phone: '+91 82345 67890', serviceType: 'Garage', rating: 4.5, online: true, kyc: 'Verified', earnings: 312000, jobs: 578, joined: '10 Sep 2023' },
        { id: 'PRT-108', name: 'Express Towing', phone: '+91 73456 78901', serviceType: 'Towing', rating: 3.5, online: false, kyc: 'Pending', earnings: 28000, jobs: 42, joined: '14 Mar 2024' },
    ]);

    const filteredPartners = partners.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesService = serviceFilter === 'All' || p.serviceType === serviceFilter;
        const matchesStatus = statusFilter === 'All' || (statusFilter === 'Online' ? p.online : !p.online);
        const matchesKyc = kycFilter === 'All' || p.kyc === kycFilter;
        return matchesSearch && matchesService && matchesStatus && matchesKyc;
    });

    const totalPages = Math.max(1, Math.ceil(filteredPartners.length / itemsPerPage));
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredPartners.length);
    const paginatedPartners = filteredPartners.slice(startIndex, endIndex);

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

    const handleViewPartner = (partner) => {
        setSelectedPartner(partner);
        setIsDrawerOpen(true);
    };

    // Summary stats


    // Custom dropdown component
    const FilterDropdown = ({ options, value, onChange, isOpen, setIsOpen, ref, icon: Icon }) => (
        <div ref={ref} className="relative flex-1 lg:flex-none min-w-[180px]">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={clsx(
                    "flex items-center gap-2.5 w-full bg-white border rounded-2xl px-4 py-2.5 shadow-sm cursor-pointer transition-all active:scale-[0.98]",
                    isOpen ? "border-indigo-400 ring-4 ring-indigo-500/10" : "border-gray-200 hover:border-gray-300"
                )}
            >
                {Icon && <Icon className={clsx("w-4 h-4 transition-colors", isOpen ? "text-indigo-600" : "text-gray-400")} />}
                <span className="text-sm font-bold text-gray-700 flex-1 text-left">{options.find(o => o.value === value)?.label}</span>
                <ChevronDown className={clsx("w-4 h-4 text-gray-400 transition-transform duration-200", isOpen && "rotate-180")} />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl shadow-gray-200/50 z-30 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    {options.map(option => (
                        <button
                            key={option.value}
                            onClick={() => { onChange(option.value); setIsOpen(false); setCurrentPage(1); }}
                            className={clsx(
                                "flex items-center gap-3 w-full px-4 py-3.5 text-sm font-bold transition-all text-left",
                                value === option.value
                                    ? "bg-indigo-50 text-indigo-700"
                                    : "text-gray-600 hover:bg-gray-50"
                            )}
                        >
                            {option.dot && (
                                <span className={clsx("w-2.5 h-2.5 rounded-full ring-2 ring-offset-1", option.dot, value === option.value ? "ring-indigo-300" : "ring-transparent")}></span>
                            )}
                            {option.label}
                            {value === option.value && (
                                <svg className="w-4 h-4 ml-auto text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <div className="space-y-6 md:space-y-8">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
                <div className="space-y-1">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Partner Management</h1>
                    <p className="text-gray-500 font-medium mt-1 text-sm md:text-base">Monitoring and managing {partners.length} registered service providers.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex-1 text-sm md:text-base md:flex-none inline-flex items-center cursor-pointer justify-center gap-2 px-5 py-2.5 md:py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl md:rounded-2xl hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm active:scale-95 group">
                        <Download className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                        Export Partners
                    </button>
                </div>
            </div>



            {/* Main Content Area */}
            <div className="premium-card overflow-hidden">
                {/* Search and Filters */}
                <div className="p-5 border-b border-gray-100/50 bg-gray-50/30">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full lg:w-[400px] group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search by name or partner ID..."
                                className="w-full pl-11 pr-4 py-2.5 md:py-3.5 bg-white border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm shadow-gray-100"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-3 w-full lg:w-auto flex-wrap">
                            <FilterDropdown
                                options={serviceOptions}
                                value={serviceFilter}
                                onChange={setServiceFilter}
                                isOpen={serviceDropOpen}
                                setIsOpen={(v) => { setServiceDropOpen(v); setStatusDropOpen(false); setKycDropOpen(false); }}
                                ref={serviceRef}
                                icon={Filter}
                            />
                            <FilterDropdown
                                options={statusOptions}
                                value={statusFilter}
                                onChange={setStatusFilter}
                                isOpen={statusDropOpen}
                                setIsOpen={(v) => { setStatusDropOpen(v); setServiceDropOpen(false); setKycDropOpen(false); }}
                                ref={statusRef}
                                icon={Wifi}
                            />
                            <FilterDropdown
                                options={kycOptions}
                                value={kycFilter}
                                onChange={setKycFilter}
                                isOpen={kycDropOpen}
                                setIsOpen={(v) => { setKycDropOpen(v); setServiceDropOpen(false); setStatusDropOpen(false); }}
                                ref={kycRef}
                                icon={ShieldCheck}
                            />
                            <div className="hidden xl:flex items-center gap-1.5 px-4 py-3 bg-indigo-50 border border-indigo-100/50 rounded-2xl">
                                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                                <span className="text-xs font-black text-indigo-700 uppercase tracking-widest">Live</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="overflow-x-auto relative min-h-[400px]">
                    {filteredPartners.length > 0 ? (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/80 border-b border-gray-100">
                                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-[9px] md:text-[10px] font-extrabold text-gray-400 uppercase tracking-widest whitespace-nowrap">Partner Detail</th>
                                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-[9px] md:text-[10px] font-extrabold text-gray-400 uppercase tracking-widest whitespace-nowrap">Service Type</th>
                                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-[9px] md:text-[10px] font-extrabold text-gray-400 uppercase tracking-widest whitespace-nowrap text-center">Rating</th>
                                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-[9px] md:text-[10px] font-extrabold text-gray-400 uppercase tracking-widest whitespace-nowrap text-center">Status</th>
                                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-[9px] md:text-[10px] font-extrabold text-gray-400 uppercase tracking-widest whitespace-nowrap">KYC</th>
                                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-[9px] md:text-[10px] font-extrabold text-gray-400 uppercase tracking-widest whitespace-nowrap text-right hidden md:table-cell">Earnings</th>
                                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-[9px] md:text-[10px] font-extrabold text-gray-400 uppercase tracking-widest whitespace-nowrap text-center hidden lg:table-cell">Jobs</th>
                                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-[9px] md:text-[10px] font-extrabold text-gray-400 uppercase tracking-widest whitespace-nowrap text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {paginatedPartners.map((partner) => (
                                    <tr key={partner.id} className="hover:bg-indigo-50/20 transition-all group">
                                        <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2.5 md:gap-3">
                                                <div className="relative">
                                                    <div className="w-10 h-10 md:w-11 md:h-11 bg-white border border-gray-200 rounded-xl md:rounded-2xl flex items-center justify-center text-indigo-600 font-black md:text-base shadow-sm group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all duration-300">
                                                        {partner.name[0]}
                                                    </div>
                                                    <div className={clsx(
                                                        "absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm",
                                                        partner.online ? 'bg-emerald-500' : 'bg-gray-300'
                                                    )}></div>
                                                </div>
                                                <div>
                                                    <div className="font-black text-gray-900 text-xs md:text-sm tracking-tight">{partner.name}</div>
                                                    <div className="text-xs font-bold text-indigo-600 mt-0.5">{partner.phone}</div>
                                                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{partner.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-6 py-3 md:py-4">
                                            <div className={clsx(
                                                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-black",
                                                partner.serviceType === 'Garage'
                                                    ? 'bg-violet-50 border-violet-100 text-violet-700'
                                                    : 'bg-sky-50 border-sky-100 text-sky-700'
                                            )}>
                                                {partner.serviceType === 'Garage' ? <Wrench className="w-3 h-3" /> : <Truck className="w-3 h-3" />}
                                                {partner.serviceType}
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-6 py-3 md:py-4 text-center">
                                            <div className="inline-flex items-center gap-1.5 bg-amber-50 px-2.5 py-1.5 rounded-xl border border-amber-100">
                                                <span className="text-xs font-black text-amber-800">{partner.rating}</span>
                                                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 drop-shadow-sm" />
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-6 py-3 md:py-4 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <span className={clsx(
                                                    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                                                    partner.online
                                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                                        : 'bg-gray-50 text-gray-500 border border-gray-100'
                                                )}>
                                                    <span className={clsx("w-1.5 h-1.5 rounded-full", partner.online ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400')}></span>
                                                    {partner.online ? 'Online' : 'Offline'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-6 py-3 md:py-4">
                                            <StatusBadge status={partner.kyc} />
                                        </td>
                                        <td className="px-4 md:px-6 py-3 md:py-4 text-right hidden md:table-cell">
                                            <div className="text-xs md:text-sm font-black text-gray-900 tracking-tighter">
                                                <span className="text-gray-400 mr-0.5">₹</span>
                                                {partner.earnings.toLocaleString()}
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-6 py-3 md:py-4 text-center hidden lg:table-cell">
                                            <span className="inline-flex items-center px-2.5 py-1 bg-gray-100 text-gray-900 rounded-lg text-xs font-black tracking-tight group-hover:bg-indigo-100 group-hover:text-indigo-700 transition-colors">
                                                {partner.jobs}
                                            </span>
                                        </td>
                                        <td className="px-4 md:px-6 py-3 md:py-4 text-right">
                                            <button
                                                onClick={() => handleViewPartner(partner)}
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
                            <h3 className="text-lg font-black text-gray-900 uppercase tracking-wider">No Partners Found</h3>
                            <p className="text-gray-400 font-bold max-w-xs mt-2 text-sm">We couldn't find any partners matching your current search or filter criteria.</p>
                            <button
                                onClick={() => { setSearchQuery(''); setServiceFilter('All'); setStatusFilter('All'); setKycFilter('All'); }}
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
                                <span className="text-gray-700 font-black">{startIndex + 1}–{endIndex}</span> of <span className="text-gray-700 font-black">{filteredPartners.length}</span>
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

            {/* Partner Details Side Drawer */}
            <PartnerDetailsDrawer
                partner={selectedPartner}
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            />
        </div>
    );
};

export default PartnerManagement;
