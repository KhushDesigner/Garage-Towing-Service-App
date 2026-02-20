import React, { useEffect, useState } from 'react';
import {
    X,
    Wrench,
    Briefcase,
    IndianRupee,
    Star,
    FileText,
    Mail,
    Phone,
    MapPin,
    Calendar,
    ChevronRight,
    ArrowUpRight,
    Ban
} from 'lucide-react';
import StatusBadge from './StatusBadge';
import clsx from 'clsx';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Fade,
    Zoom
} from '@mui/material';
import { X as MuiX } from '@mui/icons-material';

const PartnerDetailsDrawer = ({ partner, isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState('jobs');
    const [viewingDoc, setViewingDoc] = useState(null);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    // Lock body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    if (!isOpen || !partner) return null;

    const initials = partner.name.split(' ').map(n => n[0]).join('');

    const tabs = [
        { id: 'jobs', label: 'Recent Jobs', icon: Briefcase },
        { id: 'documents', label: 'Documents', icon: FileText },
        { id: 'info', label: 'Business Info', icon: Wrench },
    ];

    return (
        <>
            {/* Backdrop */}
            <div
                className="mt-0 mb-0 fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-in fade-in duration-200"
                onClick={onClose}
            ></div>

            {/* Drawer - matches UserDetailsDrawer design */}
            <div
                className={clsx(
                    "fixed z-50 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out",
                    // Mobile: bottom sheet
                    "inset-x-0 bottom-0 top-12 rounded-t-3xl",
                    // sm+: right side drawer
                    "sm:inset-y-0 sm:left-auto sm:right-0 sm:top-0 sm:rounded-none sm:max-w-xl sm:w-full",
                    isOpen
                        ? 'translate-y-0 sm:translate-x-0'
                        : 'translate-y-full sm:translate-y-0 sm:translate-x-full'
                )}
            >
                {/* Close Button / Drag Handle */}
                <div className="sm:hidden flex justify-center pt-3 pb-1">
                    <div className="w-10 h-1.5 bg-gray-300 rounded-full"></div>
                </div>
                <button
                    onClick={onClose}
                    className="z-11 absolute cursor-pointer top-3 right-4 sm:top-5 sm:right-5 z-10 p-2 sm:p-2.5 bg-white/80 backdrop-blur-sm hover:bg-gray-100 rounded-xl sm:rounded-2xl transition-all text-gray-400 hover:text-gray-900 active:scale-90 shadow-sm border border-gray-100"
                >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto">
                    {/* Profile Hero - Gradient Design same as User Drawer */}
                    <div className="relative bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-700 px-5 sm:px-8 pt-5 sm:pt-8 pb-14 sm:pb-16">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvc3ZnPg==')] opacity-60"></div>
                        <div className="relative flex items-center gap-4 sm:gap-5">
                            <div className="relative">
                                <div className="w-14 h-14 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-md rounded-2xl sm:rounded-3xl flex items-center justify-center text-white text-lg sm:text-2xl font-black shadow-lg shadow-indigo-900/30 border border-white/20 shrink-0">
                                    {initials}
                                </div>
                                <div className={clsx(
                                    "absolute bottom-0 right-0 w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full border-2 sm:border-4 border-white/20 backdrop-blur-md shadow-lg",
                                    partner.online ? "bg-emerald-500" : "bg-gray-400 text-gray-400"
                                )}></div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 sm:gap-3 mb-1 flex-wrap">
                                    <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight">{partner.name}</h2>
                                    <div className={clsx(
                                        "px-2 py-0.5 rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5",
                                        partner.online
                                            ? "bg-emerald-500/20 text-emerald-100 border border-emerald-500/30"
                                            : "bg-white/10 text-gray-200 border border-white/10"
                                    )}>
                                        <span className={clsx("w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full", partner.online ? "bg-emerald-400 animate-pulse" : "bg-gray-400")}></span>
                                        {partner.online ? 'Online' : 'Offline'}
                                    </div>
                                </div>
                                <p className="text-blue-200 text-xs sm:text-sm font-bold">Partner ID: #{partner.id}</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Info Card - overlapping hero */}
                    <div className="px-4 sm:px-8 -mt-8 sm:-mt-10 relative z-10">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/50 p-4 sm:p-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
                                        <Calendar className="w-4 h-4 text-amber-600" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Joined</p>
                                        <p className="text-sm font-bold text-gray-900 truncate">{partner.joined || 'Jan 2024'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                                        <Phone className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Phone</p>
                                        <p className="text-sm font-bold text-gray-900 truncate">{partner.phone}</p>
                                    </div>
                                </div>
                                <div className="flex col-span-2 items-center gap-3">
                                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                                        <Mail className="w-4 h-4 text-indigo-600" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Email</p>
                                        <p className="text-sm font-bold text-gray-900 truncate">{partner.email || 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="flex col-span-2 items-start gap-3">
                                    <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                                        <MapPin className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Location</p>
                                        <p className="text-sm font-bold text-gray-900 leading-snug mt-0.5">{partner.fullAddress || 'N/A'}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Stats Row */}
                    <div className="px-4 sm:px-8 mt-5 sm:mt-6">
                        <div className="grid grid-cols-3 gap-2 sm:gap-3">
                            <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center border border-gray-100/50">
                                <p className="text-[9px] sm:text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-0.5 sm:mb-1">Revenue</p>
                                <p className="text-lg sm:text-2xl font-black text-gray-900 tracking-tighter">₹{partner.earnings?.toLocaleString()}</p>
                            </div>
                            <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center border border-gray-100/50">
                                <p className="text-[9px] sm:text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-0.5 sm:mb-1">Jobs</p>
                                <p className="text-lg sm:text-2xl font-black text-gray-900 tracking-tighter">{partner.jobs || '0'}</p>
                            </div>
                            <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center border border-gray-100/50">
                                <p className="text-[9px] sm:text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-0.5 sm:mb-1">Rating</p>
                                <div className="flex items-center justify-center gap-1">
                                    <span className="text-lg sm:text-2xl font-black text-gray-900 tracking-tighter">{partner.rating}</span>
                                    <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400 drop-shadow-sm" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="px-4 sm:px-8 mt-6 sm:mt-8">
                        <div className="flex gap-1 bg-gray-100 rounded-xl sm:rounded-2xl p-1">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={clsx(
                                        "flex-1 flex cursor-pointer items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-wider sm:tracking-widest transition-all active:scale-95",
                                        activeTab === tab.id
                                            ? "bg-white text-gray-900 shadow-sm"
                                            : "text-gray-400 hover:text-gray-600"
                                    )}
                                >
                                    <tab.icon className="w-3.5 h-3.5" />
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="px-4 sm:px-8 mt-5 sm:mt-6 pb-6 sm:pb-8">
                        {/* Recent Jobs Tab */}
                        {activeTab === 'jobs' && (
                            <div className="space-y-3 animate-in fade-in duration-300">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-2xl hover:border-indigo-100 hover:bg-indigo-50/20 transition-all group cursor-pointer">
                                        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors shrink-0">
                                            <Briefcase className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-0.5">
                                                <span className="text-sm font-black text-gray-900">#JOB-{450 + i}</span>
                                                <span className="text-[10px] font-black px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full">Completed</span>
                                            </div>
                                            <p className="text-xs font-bold text-gray-400">{partner.serviceType} · Oct {20 + i}, 2023</p>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className="text-sm font-black text-gray-900">₹{(Math.random() * 2000 + 500).toFixed(0)}</p>
                                            <ChevronRight className="w-4 h-4 text-gray-300 ml-auto mt-1 group-hover:text-indigo-600 transition-colors" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Documents Tab */}
                        {activeTab === 'documents' && (
                            <div className="space-y-3 animate-in fade-in duration-300">
                                {[
                                    { name: 'Shop_Act_License.pdf', type: 'Registration', date: '15 Oct 2023', url: 'https://images.unsplash.com/photo-1586769852044-692d6e671c6e?auto=format&fit=crop&q=80&w=1200' },
                                    { name: 'GST_Registration.pdf', type: 'Tax Document', date: '20 Oct 2023', url: 'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?auto=format&fit=crop&q=80&w=1200' }
                                ].map((doc, i) => (
                                    <div
                                        key={i}
                                        onClick={() => setViewingDoc(doc)}
                                        className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-2xl hover:border-indigo-100 hover:bg-indigo-50/20 transition-all group cursor-pointer"
                                    >
                                        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shrink-0">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-black text-gray-900">{doc.name}</p>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{doc.type} · Verified on {doc.date}</p>
                                        </div>
                                        <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-600 transition-colors" />
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Business Info Tab */}
                        {activeTab === 'info' && (
                            <div className="bg-gray-50/50 rounded-2xl p-5 border border-gray-100 animate-in fade-in duration-300">
                                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category</p>
                                        <p className="text-sm font-black text-gray-800">{partner.serviceType}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">KYC Status</p>
                                        <StatusBadge status={partner.kyc} />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Established</p>
                                        <p className="text-sm font-black text-gray-800">{partner.joined}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Level</p>
                                        <p className="text-sm font-black text-gray-800">Standard Partner</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Controls */}
                <div className="p-4 sm:p-6 border-t border-gray-100 bg-white flex gap-2.5 sm:gap-3 shrink-0 safe-bottom">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 sm:py-3.5 px-4 bg-gray-100 text-gray-700 font-black text-[10px] sm:text-xs uppercase tracking-widest rounded-xl sm:rounded-2xl hover:bg-gray-200 transition-all active:scale-95"
                    >
                        Close
                    </button>
                    <button className="flex-1 py-3 sm:py-3.5 px-4 bg-rose-600 text-white font-black text-[10px] sm:text-xs uppercase tracking-widest rounded-xl sm:rounded-2xl hover:bg-rose-700 transition-all shadow-lg shadow-rose-100 active:scale-95 flex items-center justify-center gap-2">
                        <Ban className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        Suspend Partner
                    </button>
                </div>
            </div>

            {/* Document Viewer Modal using Material UI */}
            <Dialog
                open={Boolean(viewingDoc)}
                onClose={() => setViewingDoc(null)}
                maxWidth="lg"
                fullWidth
                TransitionComponent={Fade}
                PaperProps={{
                    sx: {
                        borderRadius: '24px',
                        overflow: 'hidden',
                        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                        width: "calc(100% - 32px)",
                        margin: "16px"
                    }
                }}
            >
                <DialogTitle sx={{
                    m: 0,
                    p: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'between',
                    borderBottom: '1px solid #f3f4f6'
                }}>
                    <div style={{ flex: 1 }}>
                        <h3 className="!text-base sm:!text-lg font-bold text-gray-900 tracking-tight leading-none">
                            {viewingDoc?.name}
                        </h3>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1.5">
                            {viewingDoc?.type}
                        </p>
                    </div>
                    <IconButton
                        onClick={() => setViewingDoc(null)}
                        sx={{
                            color: (theme) => theme.palette.grey[500],
                            '&:hover': { bgcolor: '#f3f4f6', color: '#111827' },
                            borderRadius: '12px'
                        }}
                    >
                        <X className="w-4 h-4 sm:w-5 sm:h-5" />
                    </IconButton>
                </DialogTitle>

                <DialogContent sx={{ p: 0, bgcolor: '#f9fafb', minHeight: '40vh', display: 'flex', alignItems: 'center', justifyCenter: 'center' }}>
                    {viewingDoc && (
                        <div className="p-4 sm:p-10 flex items-center justify-center w-full">
                            <Zoom in={true} style={{ transitionDelay: '100ms' }}>
                                <div className="relative group max-w-full">
                                    <img
                                        src={viewingDoc.url}
                                        alt={viewingDoc.name}
                                        className="max-w-full h-auto rounded-2xl shadow-lg border border-gray-100"
                                        style={{ maxHeight: '75vh', objectFit: 'contain' }}
                                    />
                                    <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl pointer-events-none"></div>
                                </div>
                            </Zoom>
                        </div>
                    )}
                </DialogContent>

                <div className="px-6 py-4 border-t border-gray-100 flex justify-end bg-white">
                    <button
                        onClick={() => setViewingDoc(null)}
                        className="px-8 py-3 bg-gray-900 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-black transition-all active:scale-95 shadow-lg shadow-gray-200"
                    >
                        Close Preview
                    </button>
                </div>
            </Dialog>
        </>
    );
};

export default PartnerDetailsDrawer;
