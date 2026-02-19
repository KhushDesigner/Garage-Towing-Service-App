import React, { useState } from 'react';
import {
    Star,
    Trash2,
    User,
    Wrench,
    MessageSquare,
    Search,
    Filter,
    ChevronLeft,
    ChevronRight,
    ThumbsUp,
    AlertCircle
} from 'lucide-react';

const ReviewsRatings = () => {
    const [activeTab, setActiveTab] = useState('user'); // 'user' or 'partner'
    const [searchQuery, setSearchQuery] = useState('');

    // Dummy User Reviews Data (Reviews given by Users for Partners)
    const userReviews = [
        { id: 1, name: 'Rahul Sharma', reviewerType: 'User', for: 'Quick Fix Garage', rating: 5, comment: 'Excellent service! Arrived 10 minutes earlier than expected and fixed my battery issue quickly.', date: '18 Feb 2024' },
        { id: 2, name: 'Sneha Gupta', reviewerType: 'User', for: 'Highway Pros', rating: 4, comment: 'Towing was professional but a bit expensive. Good communication throughout.', date: '18 Feb 2024' },
        { id: 3, name: 'Amit Singh', reviewerType: 'User', for: 'Metro Mechanic', rating: 3, comment: 'Wait time was long, but the mechanic knew his work well.', date: '17 Feb 2024' },
        { id: 4, name: 'Priya Verma', reviewerType: 'User', for: '24/7 Recovery', rating: 5, comment: 'Saved me in the middle of the night. Highly recommended!', date: '16 Feb 2024' },
        { id: 5, name: 'Vikram Das', reviewerType: 'User', for: 'City Garage', rating: 2, comment: 'Charged more than the initial quote. Not very happy with the behavior.', date: '15 Feb 2024' },
    ];

    // Dummy Partner Reviews Data (Reviews given by Partners for Users)
    const partnerReviews = [
        { id: 6, name: 'Quick Fix Garage', reviewerType: 'Partner', for: 'Arjun Mehra', rating: 5, comment: 'Very cooperative customer. Clear location provided and quick payment.', date: '18 Feb 2024' },
        { id: 7, name: 'Highway Pros', reviewerType: 'Partner', for: 'Karan Mehra', rating: 4, comment: 'Nice experience. Though road visibility was poor, customer stayed on call.', date: '17 Feb 2024' },
        { id: 8, name: 'Metro Mechanic', reviewerType: 'Partner', for: 'Deepak Rao', rating: 5, comment: 'Great customer. Very patient while we were stuck in traffic.', date: '16 Feb 2024' },
        { id: 9, name: '24/7 Recovery', reviewerType: 'Partner', for: 'Anjali Reddy', rating: 1, comment: 'Customer was abusive and provided wrong location intentionally. Avoid.', date: '15 Feb 2024' },
        { id: 10, name: 'City Garage', reviewerType: 'Partner', for: 'Megha Nair', rating: 5, comment: 'Perfect interaction. Would love to serve again.', date: '14 Feb 2024' },
    ];

    const currentReviews = activeTab === 'user' ? userReviews : partnerReviews;

    const renderStars = (rating) => {
        return (
            <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Reviews & Ratings</h1>
                    <p className="text-sm text-gray-500 font-medium">Manage platform feedback and maintain service quality.</p>
                </div>
                <div className="flex items-center gap-3 bg-white p-1 rounded-2xl border border-gray-100 shadow-sm">
                    <button
                        onClick={() => setActiveTab('user')}
                        className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'user' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        User Reviews
                    </button>
                    <button
                        onClick={() => setActiveTab('partner')}
                        className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'partner' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        Partner Reviews
                    </button>
                </div>
            </div>

            {/* Filters Row */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder={`Search ${activeTab} reviews...`}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-transparent focus:bg-white focus:border-blue-600 rounded-xl text-sm font-bold transition-all outline-none"
                    />
                </div>
                <div className="flex gap-2">
                    <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl text-xs font-black text-gray-500 uppercase">
                        <Filter className="w-3.5 h-3.5" /> Filter By Rating
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 text-gray-500 font-black text-[10px] uppercase tracking-widest border-b border-gray-100">
                            <tr>
                                <th className="px-8 py-5">Reviewer Detail</th>
                                <th className="px-8 py-5">Review For</th>
                                <th className="px-8 py-5 text-center">Rating</th>
                                <th className="px-8 py-5 w-[40%]">Comment</th>
                                <th className="px-8 py-5">Date</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50/50">
                            {currentReviews.map((review) => (
                                <tr key={review.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-xs ${activeTab === 'user' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                                {review.name[0]}
                                            </div>
                                            <p className="text-sm font-black text-gray-900">{review.name}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Target</span>
                                            <span className="text-xs font-bold text-gray-700">{review.for}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col items-center">
                                            <span className="text-sm font-black text-gray-900 mb-1">{review.rating}.0</span>
                                            {renderStars(review.rating)}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex gap-3">
                                            <MessageSquare className="w-4 h-4 text-gray-300 shrink-0 mt-0.5" />
                                            <p className="text-xs font-medium text-gray-600 leading-relaxed italic">
                                                "{review.comment}"
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-xs font-bold text-gray-400">{review.date}</span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="px-8 py-5 bg-gray-50/50 flex items-center justify-between border-t border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Showing {currentReviews.length} reviews</p>
                    <div className="flex gap-2">
                        <button className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-xl bg-white text-gray-400 hover:text-blue-600 transition-all"><ChevronLeft className="w-4 h-4" /></button>
                        <button className="w-9 h-9 flex items-center justify-center bg-blue-600 text-white text-xs font-black rounded-xl">1</button>
                        <button className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-xl bg-white text-gray-400 hover:text-blue-600 transition-all"><ChevronRight className="w-4 h-4" /></button>
                    </div>
                </div>
            </div>

            {/* Quality Note */}
            <div className="bg-blue-50/50 border border-blue-100 p-6 rounded-[2rem] flex items-center gap-6">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                    <AlertCircle className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                    <h4 className="text-lg font-black text-gray-900">Need to moderate a review?</h4>
                    <p className="text-sm text-gray-600 font-medium">As an admin, you can delete reviews that violate community guidelines. Deleted reviews are permanently removed from public profiles but archived in the master database.</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewsRatings;
