import React, { useState } from 'react';
import {
    AlertCircle,
    Gavel,
    User,
    Wrench,
    Store,
    X,
    MessageCircle,
    RotateCcw
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import Button from '../components/common/Button';
import DataTable from '../components/common/DataTable';
import Modal from '../components/common/Modal';
import SearchBox from '../components/common/SearchBox';
import clsx from 'clsx';

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

    const columns = [
        {
            header: 'Case / Request ID',
            key: 'id',
            render: (val, row) => (
                <div className="flex flex-col whitespace-nowrap">
                    <span className="text-sm font-black text-gray-900 tracking-tight uppercase">{val}</span>
                    <span className="text-[10px] font-bold text-indigo-600 mt-1 uppercase tracking-widest leading-none">{row.requestId}</span>
                </div>
            )
        },
        {
            header: 'Platform Stakeholders',
            key: 'user',
            render: (val, row) => (
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-md bg-indigo-50 flex items-center justify-center text-indigo-600">
                            <User className="w-3 h-3" />
                        </div>
                        <span className="text-xs font-bold text-gray-700">{val}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-md bg-amber-50 flex items-center justify-center text-amber-600">
                            <Store className="w-3 h-3" />
                        </div>
                        <span className="text-xs font-bold text-gray-500 truncate max-w-[150px]">{row.partner}</span>
                    </div>
                </div>
                // <div className="flex flex-col gap-1.5 whitespace-nowrap">
                //     <div className="flex items-center gap-2">
                //         <User className="w-3 h-3 text-gray-400" />
                //         <span className="text-xs font-bold text-gray-800 uppercase tracking-tight">{val}</span>
                //     </div>
                //     <div className="flex items-center gap-2">
                //         <Wrench className="w-3 h-3 text-gray-400" />
                //         <span className="text-xs font-bold text-gray-500 uppercase tracking-tight leading-none">{row.partner}</span>
                //     </div>
                // </div>
            )
        },
        {
            header: 'Issue Category',
            key: 'issueType',
            render: (val) => (
                <span className={clsx(
                    "inline-flex whitespace-nowrap items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border whitespace-nowrap",
                    val === 'Misbehavior' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                        val === 'Overcharged' ? 'bg-red-50 text-red-600 border-red-100' :
                            'bg-gray-100 text-gray-700 border-gray-200'
                )}>
                    {val}
                </span>
            )
        },
        {
            header: 'Dispute Description',
            key: 'description',
            className: 'w-[30%]',
            render: (val) => (
                <div className="flex gap-2">
                    <MessageCircle className="w-4 h-4 text-gray-300 shrink-0 mt-0.5" />
                    <p className="text-xs font-semibold text-gray-600 leading-relaxed italic line-clamp-2 cursor-default" title={val}>
                        {val}
                    </p>
                </div>
            )
        },
        {
            header: 'Status',
            key: 'status',
            align: 'center',
            render: (val) => <StatusBadge status={val} />
        },
        {
            header: 'Operations',
            key: 'id',
            align: 'right',
            render: (val, row) => (
                <div className="flex flex-col items-end gap-2 whitespace-nowrap">
                    {row.status === 'Open' ? (
                        <Button
                            variant="primary"
                            size="sm"
                            // className="bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-100"
                            onClick={() => handleResolveClick(row)}
                        >
                            Take Action
                        </Button>
                    ) : (
                        <div className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-lg border border-emerald-100">
                            Closed
                        </div>
                    )}
                </div>
            )
        }
    ];

    const filteredDisputes = disputes.filter(d =>
        d.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.requestId.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 md:space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Dispute Center</h1>
                    <p className="text-gray-500 font-medium mt-1 text-sm">Arbitrate and resolve conflicts between users and partners.</p>
                </div>
                <div className="flex items-center gap-1.5 px-4 py-3 bg-red-50 border border-red-100/50 rounded-2xl">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <span className="text-xs font-black text-red-700 uppercase tracking-widest">
                        Open Cases: <span className="text-red-900 ml-1">{disputes.filter(d => d.status === 'Open').length}</span>
                    </span>
                </div>
            </div>

            {/* Table Section */}
            <div className="space-y-4">
                <DataTable
                    title="Dispute Center"
                    subtitle="Open and resolved case records"
                    filters={
                        <SearchBox
                            value={searchQuery}
                            onSearch={setSearchQuery}
                            placeholder="Find by Request ID or Case ID..."
                            width="w-full lg:w-80"
                        />
                    }
                    columns={columns}
                    data={filteredDisputes}
                />
            </div>

            {/* Resolution Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Arbitration Panel"
                subtitle={`Resolving Case ${selectedDispute?.id}`}
                icon={<Gavel className="w-5 h-5" />}
            >
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-2.5 md:p-4 bg-gray-50/80 rounded-2xl border border-gray-100">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 leading-none">Customer Instance</p>
                            <p className="text-sm font-black text-gray-900">{selectedDispute?.user}</p>
                        </div>
                        <div className="p-2.5 md:p-4 bg-gray-50/80 rounded-2xl border border-gray-100">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 leading-none">Service Provider</p>
                            <p className="text-sm font-black text-gray-900">{selectedDispute?.partner}</p>
                        </div>
                    </div>

                    {/* Original Description */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">Complaint Context</label>
                        <div className="bg-white text-sm md:text-base border-l-4 border-indigo-500 p-4 md:p-5 rounded-r-2xl shadow-sm text-gray-700 italic font-medium leading-relaxed bg-indigo-50/10">
                            {/* <p className="text-xs md:text-sm font-medium text-gray-700 italic leading-relaxed"> */}
                            "{selectedDispute?.description}"
                            {/* </p> */}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-xs block font-black text-gray-500 mb-1.5">Resolution Summary</label>
                        <textarea
                            value={resolutionNote}
                            onChange={(e) => setResolutionNote(e.target.value)}
                            placeholder="Enter the official verdict or settlement terms..."
                            className="w-full bg-gray-50/50 border border-gray-200 focus:border-indigo-500 focus:bg-white rounded-xl px-5 py-3 min-h-32 text-sm text-gray-900 outline-none transition-all transition-all resize-none"
                        />
                    </div>

                    <div className="bg-indigo-50/50 border border-indigo-100/50 p-4 rounded-2xl flex gap-3 text-indigo-700 relative overflow-hidden group">
                        <RotateCcw className="w-4 h-4 shrink-0 mt-0.5 group-hover:rotate-180 transition-transform duration-500" />
                        <p className="text-xs font-black leading-relaxed relative z-10">
                            Closing this case will notify both stakeholders of the final decision and release any held funds if applicable.
                        </p>
                    </div>

                    <div className="flex gap-2 md:gap-4 justify-end pt-4">
                        <Button
                            variant="ghost"
                            // className="py-4"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            // className="flex-[2] py-4 shadow-xl shadow-indigo-100"
                            onClick={submitResolution}
                            disabled={!resolutionNote.trim()}
                        >
                            Close Dispute & Resolve
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default DisputeManagement;
