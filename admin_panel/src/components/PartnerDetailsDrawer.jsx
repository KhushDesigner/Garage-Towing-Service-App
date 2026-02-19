import React, { useEffect } from 'react';
import { X, Wrench, ShieldCheck, Briefcase, IndianRupee, Star, FileText, CheckCircle2, Clock, Ban } from 'lucide-react';
import StatusBadge from './StatusBadge';

const PartnerDetailsDrawer = ({ partner, isOpen, onClose }) => {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!isOpen || !partner) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity"
                onClick={onClose}
            ></div>

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-3xl bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <Wrench className="text-blue-600 w-6 h-6" />
                            Partner Profile
                        </h2>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-1">Partner ID: #{partner.id}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white rounded-full transition-all border border-transparent hover:border-gray-200 text-gray-500 bg-white shadow-sm"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 space-y-10 scroll-smooth">
                    {/* Profile & Business Info */}
                    <section className="flex gap-8 items-start">
                        <div className="w-24 h-24 bg-blue-600 rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-blue-100 shrink-0">
                            {partner.name[0]}
                        </div>
                        <div className="flex-1 space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-2xl font-black text-gray-900">{partner.name}</h3>
                                <div className="flex items-center gap-2">
                                    <div className={`w-2.5 h-2.5 rounded-full ${partner.online ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
                                    <span className="text-sm font-bold text-gray-700">{partner.online ? 'Live & Available' : 'Currently Offline'}</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-y-3 gap-x-8">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase">Contact Number</span>
                                    <span className="text-sm font-bold text-blue-600">{partner.phone}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase">Service Category</span>
                                    <span className="text-sm font-bold text-gray-800">{partner.serviceType}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase">KYC Status</span>
                                    <div className="mt-0.5"><StatusBadge status={partner.kyc || 'Verified'} /></div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase">Establishment Date</span>
                                    <span className="text-sm font-bold text-gray-800">Jan 12, 2021</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Earnings Summary Grid */}
                    <section className="grid grid-cols-3 gap-6">
                        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 group hover:bg-blue-600 transition-all duration-300">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 mb-3 shadow-sm">
                                <IndianRupee className="w-6 h-6" />
                            </div>
                            <p className="text-xs font-bold text-blue-600 uppercase tracking-tighter group-hover:text-blue-100">Total Earnings</p>
                            <p className="text-2xl font-black text-blue-900 group-hover:text-white mt-1">₹{partner.earnings.toLocaleString()}</p>
                        </div>
                        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 group hover:bg-emerald-600 transition-all duration-300">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 mb-3 shadow-sm">
                                <Briefcase className="w-6 h-6" />
                            </div>
                            <p className="text-xs font-bold text-emerald-600 uppercase tracking-tighter group-hover:text-emerald-100">Total Jobs</p>
                            <p className="text-2xl font-black text-emerald-900 group-hover:text-white mt-1">482</p>
                        </div>
                        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 group hover:bg-amber-600 transition-all duration-300">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-amber-600 mb-3 shadow-sm">
                                <Star className="w-6 h-6 fill-amber-600" />
                            </div>
                            <p className="text-xs font-bold text-amber-600 uppercase tracking-tighter group-hover:text-amber-100">User Rating</p>
                            <p className="text-2xl font-black text-amber-900 group-hover:text-white mt-1">{partner.rating} / 5</p>
                        </div>
                    </section>

                    {/* KYC Documents Preview */}
                    <section>
                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4" /> KYC Documents (2)
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 border-2 border-dashed border-gray-100 rounded-2xl flex items-center gap-4 bg-gray-50/50 hover:bg-white hover:border-blue-200 transition-all cursor-pointer group">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-gray-400 group-hover:text-blue-600 shadow-sm transition-colors">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-gray-800">Shop_Act_License.pdf</p>
                                    <p className="text-xs text-gray-400">Verified on 15 Oct 2023</p>
                                </div>
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                            </div>
                            <div className="p-4 border-2 border-dashed border-gray-100 rounded-2xl flex items-center gap-4 bg-gray-50/50 hover:bg-white hover:border-blue-200 transition-all cursor-pointer group">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-gray-400 group-hover:text-blue-600 shadow-sm transition-colors">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-gray-800">GST_Registration.pdf</p>
                                    <p className="text-xs text-gray-400">Verified on 15 Oct 2023</p>
                                </div>
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                            </div>
                        </div>
                    </section>

                    {/* Completed Jobs Table */}
                    <section>
                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                            <Clock className="w-4 h-4" /> Recent Completed Jobs
                        </h4>
                        <div className="border border-gray-100 rounded-2xl bg-white shadow-sm overflow-hidden">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50/50 text-gray-500 font-bold border-b border-gray-100">
                                    <tr>
                                        <th className="px-5 py-3">Job ID</th>
                                        <th className="px-5 py-3">Customer</th>
                                        <th className="px-5 py-3">Amount</th>
                                        <th className="px-5 py-3 text-right">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {[1, 2, 3].map((i) => (
                                        <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-5 py-4 font-bold text-gray-400 text-xs">#JOB-245{i}</td>
                                            <td className="px-5 py-4 font-bold text-gray-800 text-xs">Customer Name {i}</td>
                                            <td className="px-5 py-4 font-black text-gray-900 text-xs">₹{450 * i}</td>
                                            <td className="px-5 py-4 text-right text-gray-500 text-xs">2 hours ago</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>

                {/* Footer Actions */}
                <div className="p-8 border-t border-gray-100 bg-gray-50 flex gap-4">
                    <button className="flex-1 py-4 px-6 bg-white border border-gray-200 text-gray-700 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-gray-100 transition-all shadow-sm">
                        Edit Partner Info
                    </button>
                    <button className="flex-1 py-4 px-6 bg-red-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-red-700 transition-all shadow-lg shadow-red-100 flex items-center justify-center gap-2">
                        <Ban className="w-4 h-4" /> Suspend Partner
                    </button>
                </div>
            </div>
        </>
    );
};

export default PartnerDetailsDrawer;
