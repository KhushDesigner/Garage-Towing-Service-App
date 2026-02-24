import React, { useState } from 'react';
import {
    Settings,
    Save,
    Zap,
    User,
    Percent,
    ShieldCheck,
    RotateCcw,
    AlertCircle,
    TrendingUp,
    ChevronRight,
} from 'lucide-react';
import clsx from 'clsx';
import Button from '../components/common/Button';
import DataTable from '../components/common/DataTable';

const CommissionSettings = () => {
    const [commissionPercent, setCommissionPercent] = useState(20);
    const [surgeEnabled, setSurgeEnabled] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Dummy History Data
    const commissionHistory = [
        { id: 1, date: '15 Feb 2024', time: '10:30 AM', oldPercent: 18, newPercent: 20, changedBy: 'Admin (Vikram)', type: 'Manual' },
        { id: 2, date: '12 Jan 2024', time: '02:15 PM', oldPercent: 15, newPercent: 18, changedBy: 'Admin (Anjali)', type: 'Manual' },
        { id: 3, date: '05 Dec 2023', time: '11:45 AM', oldPercent: 20, newPercent: 15, changedBy: 'System Update', type: 'System' },
        { id: 4, date: '20 Oct 2023', time: '09:00 AM', oldPercent: 18, newPercent: 20, changedBy: 'Admin (Vikram)', type: 'Manual' },
    ];

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
        }, 1000);
    };

    const columns = [
        {
            header: 'Modification Node',
            key: 'date',
            render: (val, row) => (
                <div className="flex items-center gap-3 whitespace-nowrap">
                    <div className="w-10 h-10 bg-white border border-gray-100 rounded-xl shadow-sm flex items-center justify-center text-gray-400 group-hover:text-indigo-600 group-hover:border-indigo-600 transition-all">
                        <Settings className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                        <div className="text-xs font-black text-gray-900 tracking-tight uppercase">{val}</div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">{row.time}</div>
                    </div>
                </div>
            )
        },
        {
            header: 'Protocol Delta',
            key: 'oldPercent',
            align: 'center',
            render: (val, row) => (
                <div className="flex items-center justify-center gap-3 whitespace-nowrap">
                    <span className="text-xs font-bold text-gray-400 line-through decoration-black/10">
                        {val}%
                    </span>
                    <ChevronRight className="w-3 h-3 text-gray-300" />
                    <span className="inline-flex items-center px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-black border border-indigo-100 shadow-sm shadow-indigo-50/50">
                        {row.newPercent}%
                    </span>
                </div>
            )
        },
        {
            header: 'Type',
            key: 'type',
            align: 'center',
            render: (val) => (
                <span className={clsx(
                    "inline-flex whitespace-nowrap items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border",
                    val === 'Manual' ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                )}>
                    {val}
                </span>
            )
        },
        {
            header: 'Authority',
            key: 'changedBy',
            align: 'right',
            render: (val) => (
                <div className="flex items-center justify-end gap-3 font-bold whitespace-nowrap">
                    <div className="text-right">
                        <div className="font-black text-gray-900 text-xs md:text-sm tracking-tight">{val}</div>
                        <div className="text-[10px] md:text-[11px] font-medium text-gray-400 uppercase tracking-widest mt-0.5">Admin Level Access</div>
                    </div>
                    <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm shrink-0">
                        <User className="w-4 h-4" />
                    </div>
                </div>
            )
        }
    ];

    return (
        <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Commission Settings</h1>
                    <p className="text-gray-500 font-medium text-sm">Fine-tune platform commissions and dynamic pricing protocols.</p>
                </div>
                <div className="flex items-center gap-1.5 px-4 py-3 bg-indigo-50 border border-indigo-100/50 rounded-2xl">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                    <span className="text-xs font-black text-indigo-700 uppercase tracking-widest">Live Updates</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
                {/* Main Configuration Card */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="premium-card overflow-hidden h-full flex flex-col border border-gray-100">
                        <div className="p-5 md:p-6 py-4 md:py-6 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                                    <Percent className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-base md:text-md font-black text-gray-900">Platform Commission</h3>
                                    <p className="text-[11px] text-gray-400 font-medium mt-0.5">Global setting for service nodes</p>
                                </div>
                            </div>
                            <Settings className="w-5 h-5 text-gray-300 hidden md:block" />
                        </div>

                        <div className="p-5 md:p-6 space-y-8 flex-1 py-4 md:py-6">
                            <div className="space-y-3">
                                <label className="text-xs block font-black text-gray-500 mb-1.5">Commission Percentage</label>
                                <div className="relative group/input">
                                    <input
                                        type="number"
                                        value={commissionPercent}
                                        onChange={(e) => setCommissionPercent(e.target.value)}
                                        className="w-full bg-gray-50/50 border border-gray-200 focus:border-indigo-500 focus:bg-white rounded-xl px-5 py-3 text-lg font-black text-gray-900 outline-none transition-all pr-24 uppercase"
                                    />
                                    <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                        <span className="text-xl font-black text-gray-300 group-focus-within/input:text-indigo-600 transition-colors">%</span>
                                    </div>
                                </div>
                                <p className="text-xs font-medium text-gray-400 italic">Partners will automatically receive {100 - commissionPercent}% of base fare per protocol completion.</p>
                            </div>

                            <div className="bg-indigo-50/50 border border-indigo-100/50 p-4 rounded-2xl flex gap-2.5 items-start relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <AlertCircle className="w-20 h-20 -mr-8 -mt-8 text-indigo-600" />
                                </div>
                                <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm shrink-0">
                                    <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />
                                </div>
                                <div className="space-y-1 relative">
                                    <h4 className="text-sm font-bold text-indigo-900 uppercase">Configuration Guard</h4>
                                    <p className="text-xs font-medium text-indigo-700 leading-relaxed max-w-md">
                                        Changes to the commission structure are logged for architectural audits and will take effect immediately.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 md:p-8 py-4 md:py-6 bg-gray-50/50 border-t border-gray-100 mt-auto">
                            <Button
                                variant="primary"
                                className="w-full bg-gray-900 hover:bg-indigo-600 shadow-xl shadow-gray-200 py-3.5"
                                onClick={handleSave}
                                isLoading={isSaving}
                                leftIcon={!isSaving && <Save className="w-5 h-5 group-hover:scale-110" />}
                            >
                                {isSaving ? 'Synchronizing...' : 'Update Global Configuration'}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Surge Pricing & Dynamic Rules */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="premium-card p-6 md:p-8 space-y-6 h-full border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600">
                                <Zap className="w-5 h-5" />
                            </div>
                            <button
                                onClick={() => setSurgeEnabled(!surgeEnabled)}
                                className={clsx(
                                    "relative inline-flex h-8 w-14 items-center rounded-full transition-all duration-500 cursor-pointer shadow-inner",
                                    surgeEnabled ? 'bg-rose-500 ring-4 ring-rose-500/20' : 'bg-gray-200'
                                )}
                            >
                                <span className={clsx(
                                    "inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 shadow-md",
                                    surgeEnabled ? 'translate-x-7' : 'translate-x-1'
                                )} />
                            </button>
                        </div>

                        <div className="space-y-0.5">
                            <h3 className="text-base md:text-md font-black text-gray-900">SOS Priority Surge</h3>
                            <p className="text-[11px] text-gray-400 font-medium mt-0.5">Dynamic high-load protocols</p>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between group hover:bg-white hover:border-indigo-200 transition-all cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                                    <span className="text-xs font-black text-gray-700 tracking-tight uppercase">SOS Request Premium</span>
                                </div>
                                <span className="text-sm font-black text-rose-600">+15%</span>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between group hover:bg-white hover:border-indigo-200 transition-all cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                                    <span className="text-xs font-black text-gray-700 tracking-tight uppercase">Night Operations</span>
                                </div>
                                <span className="text-sm font-black text-indigo-600">+₹150</span>
                            </div>
                        </div>

                        <div className="pt-4 space-y-3">
                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] leading-none">Operational Impact</h4>
                            <div className="p-4 bg-emerald-50/50 border border-emerald-100/50 rounded-2xl relative overflow-hidden group">
                                <TrendingUp className="absolute -bottom-4 -right-4 w-20 h-20 text-emerald-600 opacity-5 group-hover:scale-110 transition-transform" />
                                <div className="relative flex items-end justify-between">
                                    <div>
                                        <p className="text-[10px] font-black text-emerald-700 uppercase leading-none opacity-60">Revenue Gain</p>
                                        <p className="text-lg font-black text-emerald-900 mt-2">+₹12,400</p>
                                    </div>
                                    <span className="text-[10px] font-bold text-emerald-600 bg-white px-2 py-1 rounded-lg border border-emerald-100 shadow-sm mb-1 uppercase tracking-widest leading-none">Last 30 Days</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Audit History Table */}
            <DataTable
                title="Adjustment Log"
                subtitle="Immutable record of platform modifications"
                columns={columns}
                data={commissionHistory}
            />
        </div>
    );
};

export default CommissionSettings;
