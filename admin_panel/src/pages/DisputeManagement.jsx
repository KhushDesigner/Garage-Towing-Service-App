import React, { useState } from 'react';
import {
    AlertCircle,
    CheckCircle2,
    MessageSquare,
    Gavel,
    User,
    Wrench,
    Search,
    Filter,
    X,
    MessageCircle,
    RotateCcw
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

const DisputeManagement = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDispute, setSelectedDispute] = useState(null);
    const [resolutionNote, setResolutionNote] = useState('');

    // Dummy Disputes Data
    const [disputes, setDisputes] = useState([
        {
            id: 'DS-401',
            requestId: 'REQ-8821',
            user: 'Rahul Sharma',
            partner: 'Quick Fix Garage',
            issueType: 'Overcharged',
            description: 'The partner charged me ₹500 extra for fuel which was not mentioned in the quote.',
            status: 'Open',
            date: '18 Feb 2024'
        },
        {
            id: 'DS-402',
            requestId: 'REQ-8825',
            user: 'Sneha Gupta',
            partner: 'Highway Pros',
            issueType: 'Delayed Service',
            description: 'The towing truck arrived after 2 hours despite the app showing 20 minutes.',
            status: 'Open',
            date: '18 Feb 2024'
        },
        {
            id: 'DS-403',
            requestId: 'REQ-8810',
            user: 'Amit Singh',
            partner: 'Metro Mechanic',
            issueType: 'Misbehavior',
            description: 'Technician was rude and refused to explain the breakdown reason.',
            status: 'Resolved',
            date: '17 Feb 2024'
        },
        {
            id: 'DS-404',
            requestId: 'REQ-8790',
            user: 'Vikram Das',
            partner: 'City Garage',
            issueType: 'Damage During Service',
            description: 'My bumper was scratched during the towing process.',
            status: 'Open',
            date: '16 Feb 2024'
        },
        {
            id: 'DS-405',
            requestId: 'REQ-8750',
            user: 'Priya Verma',
            partner: '24/7 Recovery',
            issueType: 'Service Not Completed',
            description: 'Paid for jumpstart but the battery died again within 5 minutes of them leaving.',
            status: 'Resolved',
            date: '15 Feb 2024'
        }
    ]);

    const handleResolveClick = (dispute) => {
        setSelectedDispute(dispute);
        setIsModalOpen(true);
    };

    const submitResolution = () => {
        setDisputes(disputes.map(d =>
            d.id === selectedDispute.id ? { ...d, status: 'Resolved' } : d
        ));
        setIsModalOpen(false);
        setResolutionNote('');
        setSelectedDispute(null);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Dispute Center</h1>
                    <p className="text-sm text-gray-500 font-medium">Arbitrate and resolve conflicts between users and partners.</p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-white px-5 py-2.5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        <span className="text-xs font-black uppercase text-gray-400">Open Cases: <span className="text-gray-900">{disputes.filter(d => d.status === 'Open').length}</span></span>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50/30">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Find by Request ID or Case ID..."
                            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 text-gray-500 font-black text-[10px] uppercase tracking-widest border-b border-gray-100">
                            <tr>
                                <th className="px-8 py-5">Case / Request ID</th>
                                <th className="px-8 py-5">Platform Stakeholders</th>
                                <th className="px-8 py-5">Issue Category</th>
                                <th className="px-8 py-5 w-[30%]">Dispute Description</th>
                                <th className="px-8 py-5 text-center">Status</th>
                                <th className="px-8 py-5 text-right">Operations</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50/50">
                            {disputes.map((dispute) => (
                                <tr key={dispute.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-gray-900">{dispute.id}</span>
                                            <span className="text-[10px] font-bold text-blue-600 mt-1 uppercase tracking-tighter">{dispute.requestId}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex items-center gap-2">
                                                <User className="w-3 h-3 text-gray-400" />
                                                <span className="text-xs font-bold text-gray-800">{dispute.user}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Wrench className="w-3 h-3 text-gray-400" />
                                                <span className="text-xs font-bold text-gray-500">{dispute.partner}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-tight ${dispute.issueType === 'Misbehavior' ? 'bg-orange-50 text-orange-600' :
                                            dispute.issueType === 'Overcharged' ? 'bg-red-50 text-red-600' :
                                                'bg-gray-100 text-gray-700'
                                            }`}>
                                            {dispute.issueType}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex gap-2">
                                            <MessageCircle className="w-4 h-4 text-gray-300 shrink-0 mt-0.5" />
                                            <p className="text-xs font-medium text-gray-600 leading-relaxed truncate max-w-[300px]" title={dispute.description}>
                                                {dispute.description}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <StatusBadge status={dispute.status} />
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        {dispute.status === 'Open' ? (
                                            <button
                                                onClick={() => handleResolveClick(dispute)}
                                                className="px-4 py-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
                                            >
                                                Take Action
                                            </button>
                                        ) : (
                                            <button className="px-4 py-2 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-xl cursor-default border border-emerald-100">
                                                Resolved
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Resolution Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                        {/* Modal Header */}
                        <div className="px-8 py-6 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white">
                                    <Gavel className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-gray-900">Arbitration Panel</h3>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Resolving Case {selectedDispute?.id}</p>
                                </div>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white rounded-xl text-gray-400 transition-all">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-gray-50 rounded-2xl">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Customer</p>
                                    <p className="text-sm font-black text-gray-900">{selectedDispute?.user}</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-2xl">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Provider</p>
                                    <p className="text-sm font-black text-gray-900">{selectedDispute?.partner}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Resolution Summary</label>
                                <textarea
                                    value={resolutionNote}
                                    onChange={(e) => setResolutionNote(e.target.value)}
                                    placeholder="Enter the official verdict or settlement terms..."
                                    className="w-full h-32 bg-gray-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl px-5 py-4 text-sm font-medium outline-none transition-all resize-none"
                                />
                            </div>

                            <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl flex gap-3 text-blue-700">
                                <RotateCcw className="w-4 h-4 shrink-0 mt-0.5" />
                                <p className="text-[10px] font-bold leading-relaxed">
                                    Closing this case will notify both stakeholders of the final decision and release any held funds if applicable.
                                </p>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-100 flex gap-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 py-3 text-xs font-black uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={submitResolution}
                                className="flex-[2] py-3 bg-blue-600 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                            >
                                Close Dispute & Resolve
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DisputeManagement;
