import React from 'react';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className,
    isLoading = false,
    leftIcon,
    rightIcon,
    disabled,
    ...props
}) => {
    const variants = {
        primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200/50 active:scale-[0.98]',
        secondary: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 active:scale-[0.98]',
        outline: 'bg-white border border-gray-200 text-gray-700 hover:border-indigo-600 hover:text-indigo-600 shadow-sm active:scale-[0.98]',
        danger: 'bg-rose-50 border border-rose-100 text-rose-600 hover:bg-rose-100 active:scale-[0.98]',
        ghost: 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 active:scale-[0.95]',
        dark: 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg shadow-gray-200 active:scale-[0.98]'
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-xs font-bold',
        md: 'px-5 py-2.5 text-sm font-bold',
        lg: 'px-5 md:px-8 py-2.5 md:py-4 text-sm md:text-base font-bold'
    };

    return (
        <button
            disabled={disabled || isLoading}
            className={clsx(
                'inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
                <>
                    {leftIcon && <span className="shrink-0">{leftIcon}</span>}
                    {children}
                    {rightIcon && <span className="shrink-0">{rightIcon}</span>}
                </>
            )}
        </button>
    );
};

export default Button;
