import React from 'react';
import { SearchX } from 'lucide-react';
import clsx from 'clsx';
import Pagination from './Pagination';

/**
 * DataTable
 *
 * Props:
 *  - columns          : Array<{ header, key, align?, render?, headerClassName?, className? }>
 *  - data             : Array<object>
 *  - isLoading        : boolean
 *  - emptyMessage     : string
 *  - emptySubMessage  : string
 *  - paginationProps  : object (passed to <Pagination />)
 *  - className        : string
 *
 *  --- Optional table header section (only rendered if at least one prop is provided) ---
 *  - title            : string  — bold heading on the left
 *  - subtitle         : string  — muted label below the title
 *  - headerRight      : ReactNode  — anything rendered on the right side (buttons, badges…)
 *  - filters          : ReactNode  — search boxes / filter dropdowns rendered below the title row
 *                         Pass a single node or a fragment of multiple nodes.
 */
const DataTable = ({
    columns,
    data,
    isLoading = false,
    emptyMessage = 'No Results Found',
    emptySubMessage = "We couldn't find any entries matching your current criteria.",
    paginationProps,
    className,
    // Optional header props
    title,
    subtitle,
    headerRight,
    filters,
}) => {
    // Show the header block only when at least one header-related prop is passed
    const hasHeader = title || subtitle || headerRight || filters;

    return (
        <div className={clsx('premium-card overflow-hidden', className)}>
            {/* ── Optional Table Header ─────────────────────────────── */}
            {hasHeader && (
                <div className="px-4 md:px-6 py-4 md:py-5 border-b border-gray-100 bg-white space-y-4">
                    {/* Title row */}
                    {(title || headerRight) && (
                        <div className="flex items-center justify-between gap-4 flex-wrap md:flex-nowrap">
                            {/* Left: title + subtitle */}
                            {(title || subtitle) && (
                                <div className="space-y-0.5">
                                    {title && (
                                        <h3 className="text-base font-extrabold text-gray-900 tracking-tight">
                                            {title}
                                        </h3>
                                    )}
                                    {subtitle && (
                                        <p className="text-xs font-medium text-gray-400">
                                            {subtitle}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Right: any action nodes */}
                            {headerRight && (
                                <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
                                    {headerRight}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Filters row */}
                    {filters && (
                        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
                            {filters}
                        </div>
                    )}
                </div>
            )}

            {/* ── Table Body ────────────────────────────────────────── */}
            <div className="overflow-x-auto relative min-h-[250px]">
                {data.length > 0 ? (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/80 border-b border-gray-100">
                                {columns.map((col, idx) => (
                                    <th
                                        key={idx}
                                        className={clsx(
                                            'px-4 md:px-6 py-3 md:py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest whitespace-nowrap',
                                            col.align === 'center' && 'text-center',
                                            col.align === 'right' && 'text-right',
                                            col.headerClassName
                                        )}
                                    >
                                        {col.header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {data.map((row, rowIdx) => (
                                <tr key={row.id || rowIdx} className="hover:bg-indigo-50/40 transition-all group">
                                    {columns.map((col, colIdx) => (
                                        <td
                                            key={colIdx}
                                            className={clsx(
                                                'px-4 md:px-6 py-3 md:py-4',
                                                col.align === 'center' && 'text-center',
                                                col.align === 'right' && 'text-right',
                                                col.className
                                            )}
                                        >
                                            {col.render ? col.render(row[col.key], row) : (
                                                <span className="text-xs md:text-sm font-bold text-gray-700 tracking-tight">
                                                    {row[col.key]}
                                                </span>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="py-24 flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-[2.5rem] flex items-center justify-center mb-6">
                            <SearchX className="w-8 h-8 text-gray-300" />
                        </div>
                        <h3 className="text-lg font-black text-gray-900 uppercase tracking-wider">{emptyMessage}</h3>
                        <p className="text-gray-400 font-bold max-w-xs mt-2 text-sm">{emptySubMessage}</p>
                    </div>
                )}
            </div>

            {/* ── Pagination ────────────────────────────────────────── */}
            {paginationProps && <Pagination {...paginationProps} />}
        </div>
    );
};

export default DataTable;
