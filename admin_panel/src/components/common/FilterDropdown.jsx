import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import clsx from 'clsx';

/**
 * FilterDropdown — premium pill-style filter selector
 *
 * Props:
 *  - options   : Array<{ label: string, value: string, dot?: string (Tailwind bg color, e.g. 'bg-emerald-500') }>
 *  - value     : string  (currently selected value)
 *  - onChange  : (value: string) => void
 *  - icon      : ReactNode  (lucide icon, shown on the left)
 *  - placeholder : string  (label shown when no value selected, default: "All")
 *  - className : string
 *  - width     : string  (Tailwind width class, default: 'w-44')
 */
const FilterDropdown = ({
    options = [],
    value,
    onChange,
    icon,
    placeholder = 'All',
    className,
    width = 'w-44',
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    // Close on outside click
    useEffect(() => {
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const selectedOption = options.find((o) => o.value === value);
    const displayLabel = selectedOption?.label ?? placeholder;

    const handleSelect = (optionValue) => {
        onChange?.(optionValue);
        setIsOpen(false);
    };

    return (
        <div ref={ref} className={clsx('relative', width, className)}>
            {/* Trigger button */}
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className={clsx(
                    'flex items-center gap-2 w-full px-4 py-2.5 bg-white border rounded-2xl shadow-sm',
                    'text-sm font-bold text-gray-700 cursor-pointer transition-all duration-200 active:scale-[0.98]',
                    isOpen
                        ? 'border-indigo-400 ring-4 ring-indigo-500/10 text-indigo-700'
                        : 'border-gray-200 hover:border-gray-300'
                )}
            >
                {/* Left icon */}
                {icon && (
                    <span className={clsx('shrink-0', isOpen ? 'text-indigo-500' : 'text-gray-400')}>
                        {icon}
                    </span>
                )}

                {/* Selected dot indicator */}
                {selectedOption?.dot && (
                    <span className={clsx('w-2 h-2 rounded-full shrink-0', selectedOption.dot)} />
                )}

                <span className="flex-1 text-left truncate">{displayLabel}</span>

                <ChevronDown
                    className={clsx(
                        'w-4 h-4 shrink-0 text-gray-400 transition-transform duration-200',
                        isOpen && 'rotate-180 text-indigo-500'
                    )}
                />
            </button>

            {/* Dropdown panel */}
            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl shadow-gray-200/50 z-40 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                    {options.map((option) => {
                        const isActive = option.value === value;
                        return (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => handleSelect(option.value)}
                                className={clsx(
                                    'flex items-center gap-3 w-full px-4 py-3 text-sm font-bold text-left transition-all',
                                    isActive
                                        ? 'bg-indigo-50 text-indigo-700'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                )}
                            >
                                {/* Dot indicator per option */}
                                {option.dot ? (
                                    <span className={clsx('w-2.5 h-2.5 rounded-full shrink-0', option.dot)} />
                                ) : (
                                    /* Placeholder circle when first option (All) */
                                    option.value === '' || option.value === 'all' || option.value === 'All' ? (
                                        <span className="w-2.5 h-2.5 rounded-full border-2 border-indigo-400 shrink-0" />
                                    ) : null
                                )}

                                <span className="flex-1">{option.label}</span>

                                {isActive && (
                                    <Check className="w-4 h-4 text-indigo-500 shrink-0" />
                                )}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default FilterDropdown;
