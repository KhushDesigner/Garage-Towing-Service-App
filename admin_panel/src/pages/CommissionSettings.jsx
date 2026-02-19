import React, { useState } from 'react';
import {
    Settings,
    Save,
    Zap,
    History,
    User,
    Percent,
    ShieldCheck,
    RotateCcw,
    AlertCircle
} from 'lucide-react';

const CommissionSettings = () => {
    const [commissionPercent, setCommissionPercent] = useState(20);
    const [surgeEnabled, setSurgeEnabled] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Dummy History Data
    const commissionHistory = [
        { id: 1, date: '15 Feb 2024, 10:30 AM', oldPercent: 18, newPercent: 20, changedBy: 'Admin (Vikram)' },
        { id: 2, date: '12 Jan 2024, 02:15 PM', oldPercent: 15, newPercent: 18, changedBy: 'Admin (Anjali)' },
        { id: 3, date: '05 Dec 2023, 11:45 AM', oldPercent: 20, newPercent: 15, changedBy: 'System Update' },
        { id: 4, date: '20 Oct 2023, 09:00 AM', oldPercent: 18, newPercent: 20, changedBy: 'Admin (Vikram)' },
    ];

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            alert('Settings updated successfully!');
        }, 1000);
    };

    return (
        <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">Revenue Configuration</h1>
                <p className="text-sm text-gray-500 font-medium">Fine-tune platform commissions and dynamic pricing rules.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Section 1: Default Commission */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-between group hover:border-blue-100 transition-all">
                    <div>
                        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                            <Percent className="w-7 h-7" />
                        </div>
                        <h2 className="text-xl font-black text-gray-900 mb-2">Platform Commission</h2>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-6">Global setting for all services</p>

                        <div className="relative mb-6">
                            <input
                                type="number"
                                value={commissionPercent}
                                onChange={(e) => setCommissionPercent(e.target.value)}
                                className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl px-6 py-4 text-2xl font-black text-gray-900 outline-none transition-all pr-16"
                            />
                            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl font-black text-gray-300">%</span>
                        </div>

                        <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl flex gap-3 items-start">
                            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                            <p className="text-xs font-bold text-amber-700 leading-relaxed">
                                This will apply to all completed requests. Partners will receive {100 - commissionPercent}% of the base fare.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="mt-8 w-full flex items-center justify-center gap-2 py-4 bg-gray-900 text-white font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-blue-600 transition-all shadow-xl shadow-gray-200 disabled:opacity-50"
                    >
                        {isSaving ? (
                            <RotateCcw className="w-5 h-5 animate-spin" />
                        ) : (
                            <Save className="w-5 h-5" />
                        )}
                        {isSaving ? 'Processing...' : 'Save Configuration'}
                    </button>
                </div>

                {/* Section 2: Surge Pricing */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col group hover:border-red-100 transition-all">
                    <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 mb-6 group-hover:bg-red-600 group-hover:text-white transition-all">
                        <Zap className="w-7 h-7" />
                    </div>
                    <h2 className="text-xl font-black text-gray-900 mb-2">SOS Emergency Surge</h2>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-6">Dynamic emergency fee</p>

                    <div className="flex-1 space-y-6">
                        <div className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl">
                            <div>
                                <p className="text-sm font-black text-gray-900">Enable Surge Pricing</p>
                                <p className="text-xs text-gray-500 font-medium mt-1">Add 15% extra for SOS requests</p>
                            </div>
                            <button
                                onClick={() => setSurgeEnabled(!surgeEnabled)}
                                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${surgeEnabled ? 'bg-red-600' : 'bg-gray-300'}`}
                            >
                                <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${surgeEnabled ? 'translate-x-7' : 'translate-x-1'}`} />
                            </button>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-gray-600">
                                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                <span className="text-xs font-bold">Encourages faster partner response</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                <span className="text-xs font-bold">Applies only to high-priority alerts</span>
                            </div>
                            <div className="p-4 bg-red-50/50 border border-red-100 rounded-2xl">
                                <p className="text-[10px] font-black text-red-700 uppercase leading-none opacity-60">Revenue Impact</p>
                                <p className="text-lg font-black text-red-900 mt-2">+₹12,400 <span className="text-[10px] font-medium opacity-60 ml-1">last 30 days</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 3: History Table */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-black text-gray-900">Adjustment History</h3>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Audited changes to platform fees</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-2xl text-gray-400">
                        <History className="w-6 h-6" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 text-gray-500 font-black text-[10px] uppercase tracking-widest border-b border-gray-100">
                            <tr>
                                <th className="px-8 py-5">Modification Date</th>
                                <th className="px-8 py-5 text-center">Previous %</th>
                                <th className="px-8 py-5 text-center">New %</th>
                                <th className="px-8 py-5 text-right">Authorized By</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50/50">
                            {commissionHistory.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-8 py-5">
                                        <p className="text-sm font-bold text-gray-800">{item.date}</p>
                                    </td>
                                    <td className="px-8 py-5 text-center px-4">
                                        <span className="text-sm font-black text-gray-400">{item.oldPercent}%</span>
                                    </td>
                                    <td className="px-8 py-5 text-center">
                                        <span className="text-sm font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
                                            {item.newPercent}%
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <span className="text-xs font-black text-gray-900">{item.changedBy}</span>
                                            <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                                                <User className="w-3 h-3" />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CommissionSettings;
