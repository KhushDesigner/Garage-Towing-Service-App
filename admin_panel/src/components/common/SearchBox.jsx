import React from 'react';
import { Search } from 'lucide-react';
import clsx from 'clsx';

/**
 * SearchBox — reusable styled search input
 *
 * Props:
 *  - value        : string
 *  - onChange     : (e) => void  |  or use onSearch: (value) => void
 *  - onSearch     : (value) => void  (shorthand, fires on every keystroke)
 *  - placeholder  : string (default: "Search...")
 *  - className    : string (extra wrapper classes)
 *  - inputClassName : string (extra input classes)
 *  - width        : string (Tailwind width class, default: "w-full")
 */
const SearchBox = ({
    value,
    onChange,
    onSearch,
    placeholder = 'Search...',
    className,
    inputClassName,
    width = 'w-full',
}) => {
    const handleChange = (e) => {
        onChange?.(e);
        onSearch?.(e.target.value);
    };

    return (
        <div className={clsx('relative group', width, className)}>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200 pointer-events-none" />
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                className={clsx(
                    'w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-2xl',
                    'text-sm font-semibold text-gray-800 placeholder:text-gray-400 placeholder:font-medium',
                    'outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500',
                    'shadow-sm transition-all duration-200',
                    inputClassName
                )}
            />
        </div>
    );
};

export default SearchBox;
