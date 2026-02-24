import React, { useState } from 'react';
import {
    Star,
    Trash2,
    MessageSquare,
    Filter,
    AlertCircle,
    Clock,
    ShieldCheck,
    CheckCircle2,
    Eye,
    Shield
} from 'lucide-react';
import clsx from 'clsx';
import Modal from '../components/common/Modal';
import ReviewDetailsDrawer from '../components/ReviewDetailsDrawer';
import Button from '../components/common/Button';
import DataTable from '../components/common/DataTable';
import SearchBox from '../components/common/SearchBox';
import FilterDropdown from '../components/common/FilterDropdown';

const ReviewsRatings = () => {
    const [activeTab, setActiveTab] = useState('user');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [filterRating, setFilterRating] = useState('All');
    const [isGuidelinesOpen, setIsGuidelinesOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);

    const ratingOptions = [
        { label: 'All Ratings', value: 'All' },
        { label: '5 Stars', value: '5', dot: 'bg-amber-400' },
        { label: '4 Stars', value: '4', dot: 'bg-amber-400' },
        { label: '3 Stars', value: '3', dot: 'bg-amber-300' },
        { label: '2 Stars', value: '2', dot: 'bg-gray-400' },
        { label: '1 Star', value: '1', dot: 'bg-gray-400' },
    ];

    // Dummy User Reviews Data
    const userReviews = [
        { id: 101, name: 'Rahul Sharma', reviewerType: 'User', for: 'Quick Fix Garage', rating: 5, comment: 'Excellent service! Arrived 10 minutes earlier than expected and fixed my battery issue quickly.', date: '18 Feb 2024', time: '10:30 AM', status: 'Published' },
        { id: 102, name: 'Sneha Gupta', reviewerType: 'User', for: 'Highway Pros', rating: 4, comment: 'Towing was professional but a bit expensive. Good communication throughout.', date: '18 Feb 2024', time: '02:15 PM', status: 'Published' },
        { id: 103, name: 'Amit Singh', reviewerType: 'User', for: 'Metro Mechanic', rating: 3, comment: 'Wait time was long, but the mechanic knew his work well.', date: '17 Feb 2024', time: '11:45 AM', status: 'Flagged' },
        { id: 104, name: 'Priya Verma', reviewerType: 'User', for: '24/7 Recovery', rating: 5, comment: 'Saved me in the middle of the night. Highly recommended!', date: '16 Feb 2024', time: '09:00 AM', status: 'Published' },
        { id: 105, name: 'Vikram Das', reviewerType: 'User', for: 'City Garage', rating: 2, comment: 'Charged more than the initial quote. Not very happy with the behavior.', date: '15 Feb 2024', time: '04:20 PM', status: 'Published' },
    ];

    // Dummy Partner Reviews Data
    const partnerReviews = [
        { id: 201, name: 'Quick Fix Garage', reviewerType: 'Partner', for: 'Arjun Mehra', rating: 5, comment: 'Very cooperative customer. Clear location provided and quick payment.', date: '18 Feb 2024', time: '12:00 PM', status: 'Published' },
        { id: 202, name: 'Highway Pros', reviewerType: 'Partner', for: 'Karan Mehra', rating: 4, comment: 'Nice experience. Though road visibility was poor, customer stayed on call.', date: '17 Feb 2024', time: '03:45 PM', status: 'Published' },
        { id: 203, name: 'Metro Mechanic', reviewerType: 'Partner', for: 'Deepak Rao', rating: 5, comment: 'Great customer. Very patient while we were stuck in traffic.', date: '16 Feb 2024', time: '08:30 AM', status: 'Published' },
        { id: 204, name: '24/7 Recovery', reviewerType: 'Partner', for: 'Anjali Reddy', rating: 1, comment: 'Customer was abusive and provided wrong location intentionally. Avoid.', date: '15 Feb 2024', time: '11:10 PM', status: 'Flagged' },
        { id: 205, name: 'City Garage', reviewerType: 'Partner', for: 'Megha Nair', rating: 5, comment: 'Perfect interaction. Would love to serve again.', date: '14 Feb 2024', time: '05:00 PM', status: 'Published' },
    ];

    const currentData = activeTab === 'user' ? userReviews : partnerReviews;

    const filteredReviews = currentData.filter(review => {
        const matchesSearch =
            review.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            review.for.toLowerCase().includes(searchQuery.toLowerCase()) ||
            review.comment.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRating = filterRating === 'All' || review.rating.toString() === filterRating;
        return matchesSearch && matchesRating;
    });

    const totalPages = Math.max(1, Math.ceil(filteredReviews.length / itemsPerPage));
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredReviews.length);
    const paginatedReviews = filteredReviews.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const renderStars = (rating) => {
        return (
            <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={clsx(
                            "w-3.5 h-3.5",
                            i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'
                        )}
                    />
                ))}
            </div>
        );
    };

    const columns = [
        {
            header: 'Source Profile',
            key: 'name',
            render: (val, row) => (
                <div className="flex items-center gap-3.5 whitespace-nowrap">
                    <div className="relative">
                        <div className="w-10 h-10 md:w-11 md:h-11 bg-white border border-gray-200 rounded-2xl flex items-center justify-center text-indigo-600 font-extrabold text-sm md:text-base shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                            {val[0]}
                        </div>
                    </div>
                    <div>
                        <div className="font-black text-gray-900 text-xs md:text-sm tracking-tight">{val}</div>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                            <Clock className="w-3 h-3" /> {row.time}
                        </div>
                    </div>
                </div>
            )
        },
        {
            header: 'Protocol Target',
            key: 'for',
            render: (val) => (
                <div className="flex flex-col whitespace-nowrap">
                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest leading-none mb-1">Target Identity</span>
                    <span className="text-xs md:text-sm font-bold text-gray-700 tracking-tight">{val}</span>
                </div>
            )
        },
        {
            header: 'Scorecard',
            key: 'rating',
            align: 'center',
            render: (val) => (
                <div className="flex items-center justify-center gap-1.5 whitespace-nowrap">
                    <span className="text-xs md:text-sm font-black text-gray-900">{val}</span>
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 drop-shadow-sm" />
                </div>
            )
        },
        {
            header: 'Feedback Observation',
            key: 'comment',
            headerClassName: 'min-w-[300px]',
            render: (val) => (
                <div className="flex gap-3 items-start group/comment max-w-md">
                    <MessageSquare className="w-4 h-4 text-gray-300 shrink-0 mt-1 group-hover/comment:text-indigo-400 transition-colors" />
                    <p className="text-xs font-semibold text-gray-600 leading-relaxed italic line-clamp-2 cursor-default">
                        "{val}"
                    </p>
                </div>
            )
        },
        {
            header: 'Status',
            key: 'status',
            align: 'center',
            render: (val) => (
                <span className={clsx(
                    "text-xs px-2.5 py-1 rounded-full font-medium inline-block border whitespace-nowrap",
                    val === 'Published' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'
                )}>
                    {val}
                </span>
            )
        },
        {
            header: 'Actions',
            key: 'actions',
            align: 'right',
            render: (_, row) => (
                <div className="flex items-center justify-end gap-2.5">
                    <button
                        onClick={() => { setSelectedReview(row); setIsDrawerOpen(true); }}
                        className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-indigo-600 hover:border-indigo-600 transition-all shadow-sm group/btn"
                        title="Examine Intel"
                    >
                        <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-rose-600 hover:border-rose-600 transition-all shadow-sm" title="Liquidate Feedback">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Reviews & Ratings</h1>
                    <p className="text-gray-500 font-medium text-sm">Monitor platform sentiment and manage quality assurance protocols.</p>
                </div>
                <div className="flex items-center gap-1.5 px-4 py-3 bg-indigo-50 border border-indigo-100/50 rounded-2xl">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                    <span className="text-xs font-black text-indigo-700 uppercase tracking-widest">Live Updates</span>
                </div>
            </div>

            {/* Moderation Directive */}
            <div className="bg-indigo-50/50 border border-indigo-100/50 p-5 md:p-6 rounded-2xl flex gap-4 items-center flex-col md:flex-row relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                    <ShieldCheck className="w-32 h-32 -mr-12 -mt-12 text-indigo-600" />
                </div>
                <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm shrink-0">
                    <AlertCircle className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="space-y-1 relative flex-1 text-center md:text-left">
                    <h4 className="text-sm font-black text-indigo-900 uppercase">Need to moderate a review?</h4>
                    <p className="text-xs font-bold text-indigo-700 leading-relaxed max-w-2xl">
                        As an admin, you can liquidate feedback that violates community integrity. Deleted entries are permanently removed from public profiles but archived in the master audit ledger for governance tracking.
                    </p>
                </div>
                <Button onClick={() => setIsGuidelinesOpen(true)}>
                    View Guidelines
                </Button>
            </div>

            {/* Main Content Area */}
            <div className="space-y-4">
                <DataTable
                    title={activeTab === 'user' ? 'User Feedback' : 'Partner Metrics'}
                    subtitle={activeTab === 'user' ? 'Customer-submitted reviews' : 'Partner-submitted reviews'}
                    headerRight={
                        <div className="flex items-center p-1 bg-indigo-50 rounded-2xl shadow-inner w-full md:w-auto">
                            <button
                                onClick={() => { setActiveTab('user'); setCurrentPage(1); }}
                                className={clsx(
                                    "px-4 md:px-6 py-2 rounded-xl text-xs md:text-sm font-black transition-all w-full md:w-auto",
                                    activeTab === 'user' ? "bg-white text-indigo-600 shadow-sm ring-1 ring-indigo-200" : "text-gray-700 hover:text-gray-900"
                                )}
                            >
                                User Feedback
                            </button>
                            <button
                                onClick={() => { setActiveTab('partner'); setCurrentPage(1); }}
                                className={clsx(
                                    "px-4 md:px-6 py-2 rounded-xl text-xs md:text-sm font-black transition-all w-full md:w-auto",
                                    activeTab === 'partner' ? "bg-white text-indigo-600 shadow-sm ring-1 ring-indigo-200" : "text-gray-700 hover:text-gray-900"
                                )}
                            >
                                Partner Metrics
                            </button>
                        </div>
                    }
                    filters={
                        <>
                            <SearchBox
                                value={searchQuery}
                                onSearch={(v) => { setSearchQuery(v); setCurrentPage(1); }}
                                placeholder={`Search by ${activeTab === 'user' ? 'customer' : 'partner'} or comment...`}
                                width="w-full lg:w-80"
                            />
                            <FilterDropdown
                                icon={<Filter className="w-4 h-4" />}
                                options={ratingOptions}
                                value={filterRating}
                                onChange={(v) => { setFilterRating(v); setCurrentPage(1); }}
                                placeholder="All Ratings"
                                width="w-full lg:w-40"
                            />
                        </>
                    }
                    columns={columns}
                    data={paginatedReviews}
                    paginationProps={{
                        currentPage,
                        totalPages,
                        onPageChange: handlePageChange,
                        startIndex,
                        endIndex,
                        totalItems: filteredReviews.length,
                        itemsPerPage,
                        setItemsPerPage
                    }}
                />
            </div>

            {/* Guidelines Modal */}
            <Modal
                isOpen={isGuidelinesOpen}
                onClose={() => setIsGuidelinesOpen(false)}
                title="Moderation Guidelines"
            >
                <div className="space-y-6">
                    <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl flex gap-2.5 md:gap-4">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm shrink-0">
                            <Shield className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-sm font-black text-indigo-900 uppercase">Core Directive</h4>
                            <p className="text-xs font-bold text-indigo-700 leading-relaxed">
                                Our goal is to maintain a high-trust environment. Only liquidate reviews that violate the following protocols.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl space-y-2">
                            <div className="flex items-center gap-2 text-rose-600 mb-3">
                                <Trash2 className="w-4 h-4" />
                                <span className="text-xs font-black uppercase tracking-widest">Liquidatable</span>
                            </div>
                            <ul className="text-xs font-normal text-gray-600 space-y-1 list-disc pl-4 leading-relaxed">
                                <li>Abusive or hate speech</li>
                                <li>Explicitly false information</li>
                                <li>Spam or promotional content</li>
                                <li>Personal contact information</li>
                            </ul>
                        </div>
                        <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl space-y-2">
                            <div className="flex items-center gap-2 text-emerald-600 mb-3">
                                <CheckCircle2 className="w-4 h-4" />
                                <span className="text-xs font-black uppercase tracking-widest">Protected</span>
                            </div>
                            <ul className="text-xs font-normal text-gray-600 space-y-1 list-disc pl-4 leading-relaxed">
                                <li>Negative service experiences</li>
                                <li>Pricing complaints</li>
                                <li>Professional tone disagreements</li>
                                <li>Wait time frustrations</li>
                            </ul>
                        </div>
                    </div>

                    <div className="p-4 border border-amber-100 bg-amber-50 rounded-2xl">
                        <p className="text-[10px] font-black text-amber-700 uppercase mb-1">Important Note</p>
                        <p className="text-xs font-bold text-amber-600 leading-relaxed">
                            Deleted reviews are archived in the governance ledger. Administrators are audited monthly on their moderation choices.
                        </p>
                    </div>

                    <Button variant="primary" size="lg" className="w-full" onClick={() => setIsGuidelinesOpen(false)}>
                        I understand the protocol
                    </Button>
                </div>
            </Modal>

            {/* Review Details Drawer */}
            <ReviewDetailsDrawer
                review={selectedReview}
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            />
        </div>
    );
};

export default ReviewsRatings;

