import React, { useState, useEffect, useMemo } from 'react';
import {
    X,
    Search,
    Filter,
    Download,
    ChevronLeft,
    ChevronRight,
    IndianRupee,
    User,
    Store,
    CreditCard,
    Wallet,
    Banknote,
    Clock,
    ArrowUpRight,
    SearchX,
    Calendar,
    ChevronDown
} from 'lucide-react';
import StatusBadge from './StatusBadge';
import clsx from 'clsx';

const TransactionLedgerDrawer = ({ isOpen, onClose, transactions = [] }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Lock body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    // Enhanced Dummy Data for Archive Feel
    const archiveData = useMemo(() => {
        const base = [...transactions];
        // Generate extra entries for demonstration if short
        if (base.length < 15) {
            for (let i = 0; i < 20; i++) {
                base.push({
                    id: `TXN-ARCH-${4500 + i}`,
                    user: ['Rohan Mehta', 'Anita Desai', 'Karan Johar', 'Sunita Rao', 'Arjun Kapoor'][i % 5],
                    partner: ['Highway Pros', 'City Garage', 'Quick Fix', 'Metro Mechanic'][i % 4],
                    total: Math.floor(Math.random() * 5000) + 500,
                    comm: 0, // calculated below
                    share: 0, // calculated below
                    mode: ['Online', 'Card', 'Wallet', 'Cash'][i % 4],
                    status: ['Completed', 'Pending', 'Settled'][i % 3],
                    date: `${10 + i % 10} Feb, ${10 + i % 12}:00 ${i % 2 === 0 ? 'AM' : 'PM'}`
                });
            }
        }
        return base.map(txn => ({
            ...txn,
            comm: txn.comm || Math.floor(txn.total * 0.2),
            share: txn.share || Math.floor(txn.total * 0.8)
        }));
    }, [transactions]);

    const filteredRecords = useMemo(() => {
        return archiveData.filter(rec => {
            const matchesSearch =
                rec.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                rec.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                rec.partner.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesStatus = statusFilter === 'All' || rec.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [archiveData, searchQuery, statusFilter]);

    const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedRecords = filteredRecords.slice(startIndex, startIndex + itemsPerPage);

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-in fade-in duration-300"
                onClick={onClose}
            ></div>

            {/* Drawer */}
            <div
                className={clsx(
                    "fixed z-50 bg-[#F9FBFF] shadow-2xl flex flex-col transition-transform duration-500 ease-in-out inset-y-0 right-0 w-full lg:max-w-5xl",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                {/* Header Section */}
                <div className="bg-white border-b border-gray-100 px-6 py-5 shrink-0 relative">
                    <button
                        onClick={onClose}
                        className="absolute top-5 right-6 p-2 hover:bg-gray-100 rounded-xl transition-all text-gray-400 hover:text-gray-900 group shadow-sm bg-white"
                    >
                        <X className="w-5 h-5 group-active:scale-90" />
                    </button>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mr-10">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Financial Transaction Ledger</h2>
                            <p className="text-xs font-bold text-gray-400">Complete historical audit of all ecosystem capital flows.</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-black transition-all shadow-lg shadow-gray-200 active:scale-95 group">
                                <Download className="w-4 h-4 text-white/50 group-hover:text-white" /> Export XLS
                            </button>
                        </div>
                    </div>

                    {/* Filter Bar */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search by Transaction ID, User, or Partner node..."
                                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-transparent rounded-2xl text-xs font-bold focus:bg-white focus:border-indigo-100 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none"
                                value={searchQuery}
                                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <button
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                    className={clsx(
                                        "flex items-center gap-2.5 px-5 py-3 border rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                                        statusFilter !== 'All'
                                            ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                                            : "bg-white border-gray-100 text-gray-500 hover:border-gray-200"
                                    )}
                                >
                                    <Filter className="w-3.5 h-3.5" />
                                    {statusFilter === 'All' ? 'Status Filter' : statusFilter}
                                    <ChevronDown className={clsx("w-3.5 h-3.5 transition-transform", isFilterOpen && "rotate-180")} />
                                </button>

                                {isFilterOpen && (
                                    <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl z-10 overflow-hidden animate-in fade-in slide-in-from-top-2">
                                        {['All', 'Completed', 'Pending', 'Settled'].map(status => (
                                            <button
                                                key={status}
                                                onClick={() => { setStatusFilter(status); setIsFilterOpen(false); setCurrentPage(1); }}
                                                className={clsx(
                                                    "w-full px-5 py-3 text-[10px] font-black uppercase tracking-widest text-left transition-all",
                                                    statusFilter === status ? "bg-indigo-50 text-indigo-700" : "text-gray-400 hover:bg-gray-50 hover:text-gray-900"
                                                )}
                                            >
                                                {status}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Ledger Area */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                    {paginatedRecords.length > 0 ? (
                        <div className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm shadow-gray-100">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/80 border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Node ID</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Stakeholders</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap text-right">Flow Metrics</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap text-center">Protocol</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap text-center">Status</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Timestamp</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {paginatedRecords.map((txn) => (
                                        <tr key={txn.id} className="hover:bg-indigo-50/10 transition-all group">
                                            <td className="px-6 py-5 whitespace-nowrap">
                                                <span className="text-xs font-black text-gray-900 group-hover:text-indigo-600 transition-colors">{txn.id}</span>
                                            </td>
                                            <td className="px-6 py-5 whitespace-nowrap">
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
                                                        <span className="text-xs font-bold text-gray-400 truncate max-w-[120px]">{txn.partner}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-right whitespace-nowrap">
                                                <div className="flex flex-col items-end">
                                                    <span className="text-sm font-black text-gray-900">₹{txn.total.toLocaleString()}</span>
                                                    <div className="flex gap-2 mt-1">
                                                        <span className="text-[10px] font-bold text-indigo-500/80 uppercase">Fee: ₹{txn.comm}</span>
                                                        <span className="text-[10px] font-bold text-emerald-500/80 uppercase">Ptr: ₹{txn.share}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-center whitespace-nowrap">
                                                <div className={clsx(
                                                    "inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[10px] font-black border uppercase tracking-wider",
                                                    txn.mode === 'Online' || txn.mode === 'Card' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' :
                                                        txn.mode === 'Wallet' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                                            'bg-emerald-50 text-emerald-700 border-emerald-100'
                                                )}>
                                                    {txn.mode === 'Online' || txn.mode === 'Card' ? <CreditCard className="w-3 h-3" /> :
                                                        txn.mode === 'Wallet' ? <Wallet className="w-3 h-3" /> :
                                                            <Banknote className="w-3 h-3" />}
                                                    {txn.mode}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-center whitespace-nowrap">
                                                <StatusBadge status={txn.status} />
                                            </td>
                                            <td className="px-6 py-5 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <div className="p-1.5 bg-gray-50 rounded-lg text-gray-400">
                                                        <Clock className="w-3.5 h-3.5" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-bold text-gray-700">{txn.date.split(',')[0]}</span>
                                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{txn.date.split(',')[1]?.trim()}</span>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center py-20 px-6">
                            <div className="w-20 h-20 bg-gray-50 rounded-[2.5rem] flex items-center justify-center mb-6">
                                <SearchX className="w-8 h-8 text-gray-300" />
                            </div>
                            <h3 className="text-lg font-black text-gray-900 uppercase tracking-widest">No Log Entries Detected</h3>
                            <p className="text-gray-400 text-sm font-bold max-w-xs mt-2 italic">The search parameters yielded zero historical data nodes in the current database partition.</p>
                            <button
                                onClick={() => { setSearchQuery(''); setStatusFilter('All'); }}
                                className="mt-8 text-indigo-600 font-black text-[10px] uppercase tracking-[0.2em] border-b-2 border-indigo-100 hover:border-indigo-600 transition-all pb-1"
                            >
                                Reset Audit Parameters
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer / Pagination Section */}
                <div className="bg-white border-t border-gray-100 px-6 py-5 shrink-0">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2.5">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Rows</span>
                                <select
                                    value={itemsPerPage}
                                    onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                                    className="appearance-none bg-gray-50 border border-transparent rounded-xl px-3 py-2 text-xs font-black text-gray-700 cursor-pointer hover:bg-gray-100 outline-none"
                                >
                                    {[10, 20, 50, 100].map(n => (
                                        <option key={n} value={n}>{n}</option>
                                    ))}
                                </select>
                            </div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">
                                Viewing <span className="text-gray-900 font-black">{startIndex + 1}–{Math.min(startIndex + itemsPerPage, filteredRecords.length)}</span> of <span className="text-gray-900 font-black">{filteredRecords.length}</span> nodes
                            </p>
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="p-2.5 border border-gray-100 rounded-xl bg-white text-gray-400 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-90"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>

                            <div className="flex items-center gap-1.5 px-1.5 py-1 bg-gray-50 border border-gray-100 rounded-2xl">
                                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                                    const pageNum = i + 1;
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => setCurrentPage(pageNum)}
                                            className={clsx(
                                                "w-8 h-8 rounded-xl text-[10px] font-black transition-all active:scale-95",
                                                currentPage === pageNum ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" : "text-gray-400 hover:text-gray-700"
                                            )}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                                {totalPages > 5 && <span className="text-[10px] font-black text-gray-300 px-1">...</span>}
                            </div>

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="p-2.5 border border-gray-100 rounded-xl bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-90"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TransactionLedgerDrawer;
