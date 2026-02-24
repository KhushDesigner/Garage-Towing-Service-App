import React, { useEffect } from 'react';
import { X, User, Wrench, Star, Clock, Calendar, MessageSquare, Shield, Trash2, CheckCircle2 } from 'lucide-react';
import StatusBadge from './StatusBadge';
import clsx from 'clsx';
import Button from './common/Button';

const ReviewDetailsDrawer = ({ review, isOpen, onClose }) => {
    // Handle Esc key to close
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

    if (!isOpen || !review) return null;

    const renderStars = (rating) => {
        return (
            <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={clsx(
                            "w-4 h-4",
                            i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'
                        )}
                    />
                ))}
            </div>
        );
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-in fade-in duration-200 mb-0"
                onClick={onClose}
            ></div>

            {/* Drawer */}
            <div
                className={clsx(
                    "fixed z-50 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out",
                    "inset-x-0 bottom-0 top-12 rounded-t-3xl",
                    "sm:inset-y-0 sm:left-auto sm:right-0 sm:top-0 sm:rounded-none sm:max-w-xl sm:w-full",
                    isOpen ? 'translate-y-0 sm:translate-x-0' : 'translate-y-full sm:translate-x-full'
                )}
            >
                {/* Header */}
                <div className="sm:hidden flex justify-center pt-3 pb-1">
                    <div className="w-10 h-1.5 bg-gray-300 rounded-full"></div>
                </div>

                <div className="flex items-center justify-between px-5 sm:px-8 py-3.5 md:py-5 border-b border-gray-50 bg-gray-50/30">
                    <div>
                        <h2 className="text-md md:text-lg font-black text-gray-900 tracking-tight">Review Intelligence</h2>
                        <p className="text-xs font-bold text-gray-400 mt-0.5">Reference ID: #{review.id}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 sm:p-2.5 bg-white hover:bg-gray-100 rounded-xl transition-all text-gray-400 hover:text-gray-900 active:scale-95 shadow-sm border border-gray-100"
                    >
                        <X className="w-4 h-4 sm:w-5 sm:h-5" />

                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto">
                    {/* Perspective Header */}
                    <div className="bg-indigo-600 p-5 md:p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Shield className="w-24 h-24 -mr-8 -mt-8" />
                        </div>
                        <div className="relative z-10 flex flex-col gap-5 md:gap-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/20">
                                    <span className="text-[10px] font-black uppercase tracking-widest">{review.reviewerType} Feedback</span>
                                </div>
                                <StatusBadge status={review.status} />
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-xl font-black border border-white/30">
                                        {review.name[0]}
                                    </div>
                                    <div>
                                        <p className="text-[10px] md:text-xs font-bold text-indigo-100 uppercase tracking-widest">Source Profiler</p>
                                        <h3 className="text-lg md:text-xl font-black tracking-tight">{review.name}</h3>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-black text-indigo-200 uppercase tracking-widest">Assigned Target:</span>
                                    <span className="text-xs md:text-sm font-bold bg-white/10 px-3 py-1 rounded-lg backdrop-blur-sm">{review.for}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Review Core Data */}
                    <div className="p-5 sm:p-8 space-y-6 md:space-y-8">
                        {/* Rating Card */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center border border-gray-100/50">
                                <p className="text-[9px] sm:text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-0.5 sm:mb-1">Rating</p>
                                <div className="flex items-center justify-center gap-1">
                                    <span className="text-lg sm:text-2xl font-black text-gray-900 tracking-tighter">{review.rating}</span>
                                    <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400 drop-shadow-sm" />
                                </div>

                            </div>
                            <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center border border-gray-100/50">
                                <p className="text-[9px] sm:text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-0.5 sm:mb-1">Timeline</p>
                                <div className="flex flex-col items-center gap-1">
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700">
                                        <Calendar className="hidden md:block w-3.5 h-3.5 text-indigo-500" />
                                        {review.date}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700">
                                        <Clock className="hidden md:block w-3.5 h-3.5 text-indigo-500" />
                                        {review.time}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Comment Section */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <MessageSquare className="w-3.5 h-3.5" />
                                    Feedback Observation
                                </h4>
                            </div>
                            <div className="bg-white text-sm md:text-base border-l-4 border-indigo-500 p-4 md:p-5 rounded-r-2xl shadow-sm text-gray-700 italic font-medium leading-relaxed bg-indigo-50/10">
                                "{review.comment}"
                            </div>
                        </div>

                        {/* Moderation Notes */}
                        <div className="bg-amber-50 border border-amber-100/50 p-5 rounded-2xl space-y-3">
                            <h4 className="text-[10px] font-black text-amber-700 uppercase tracking-widest flex items-center gap-2">
                                <Shield className="w-3.5 h-3.5" />
                                Governance Protocol
                            </h4>
                            <p className="text-xs font-bold text-amber-600/80 leading-relaxed">
                                Review status is currently <span className="text-amber-700 font-black">{review.status}</span>. Moderation actions will be recorded in the platform audit log. Any liquidation is final and archives the entry.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="p-5 md:p-6 border-t border-gray-100 bg-white flex flex-col sm:flex-row gap-3">
                    <Button variant="primary" leftIcon={<CheckCircle2 className="w-4 h-4" />} onClick={onClose} className="flex-1">
                        Verify Review
                    </Button>
                    <Button variant="danger" leftIcon={<Trash2 className="w-4 h-4" />} className="flex-1">
                        Liquidate
                    </Button>
                </div>
            </div>
        </>
    );
};

export default ReviewDetailsDrawer;
