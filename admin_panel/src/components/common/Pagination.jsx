import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    startIndex,
    endIndex,
    totalItems,
    itemsPerPage,
    setItemsPerPage
}) => {
    // Generate page numbers with ellipsis
    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push('...');
            for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
                pages.push(i);
            }
            if (currentPage < totalPages - 2) pages.push('...');
            pages.push(totalPages);
        }
        return pages;
    };

    return (
        <div className="px-4 md:px-6 py-4 md:py-5 bg-gray-50/50 border-t border-gray-100/50">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Left: Rows per page + result info */}
                <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto justify-between md:justify-start">
                    {setItemsPerPage && (
                        <div className="flex items-center gap-2.5">
                            <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Rows</span>
                            <select
                                value={itemsPerPage}
                                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                className="appearance-none bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-black text-gray-700 cursor-pointer hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all shadow-sm"
                            >
                                {[5, 10, 20, 50].map(n => (
                                    <option key={n} value={n}>{n}</option>
                                ))}
                            </select>
                        </div>
                    )}
                    <p className="text-xs font-bold text-gray-400">
                        <span className="text-gray-700 font-black">{startIndex + 1}–{Math.min(endIndex, totalItems)}</span> of <span className="text-gray-700 font-black">{totalItems}</span>
                    </p>
                </div>

                {/* Right: Page navigation */}
                <div className="flex items-center gap-1.5">
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2.5 md:p-3 border border-gray-200 rounded-xl md:rounded-2xl bg-white text-gray-400 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:text-indigo-600 hover:border-indigo-200 active:scale-90 shadow-sm"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>

                    <div className="flex items-center bg-white border border-gray-200 rounded-xl md:rounded-2xl p-1 shadow-sm">
                        {getPageNumbers().map((page, i) => (
                            page === '...' ? (
                                <span key={`ellipsis-${i}`} className="w-8 md:w-10 h-8 md:h-10 flex items-center justify-center text-xs text-gray-300 font-black">⋯</span>
                            ) : (
                                <button
                                    key={page}
                                    onClick={() => onPageChange(page)}
                                    className={clsx(
                                        "w-8 md:w-10 h-8 md:h-10 rounded-lg md:rounded-xl text-xs font-black transition-all active:scale-95",
                                        page === currentPage
                                            ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                                            : "text-gray-400 hover:bg-gray-50 hover:text-gray-700"
                                    )}
                                >
                                    {page}
                                </button>
                            )
                        ))}
                    </div>

                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2.5 md:p-3 border border-gray-200 rounded-xl md:rounded-2xl bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:text-indigo-600 hover:border-indigo-200 active:scale-90 shadow-sm"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
