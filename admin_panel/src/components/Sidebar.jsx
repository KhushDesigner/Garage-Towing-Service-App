import React from 'react';
import { NavLink } from 'react-router-dom';
import { MENU_ITEMS } from '../utils/constants';
import clsx from 'clsx';
import { Truck } from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <aside
            className={clsx(
                'fixed top-0 left-0 h-screen transition-all duration-300 ease-in-out border-r border-gray-200 bg-white z-30 shadow-xl lg:shadow-none',
                isOpen
                    ? 'w-[var(--sidebar-width)] translate-x-0'
                    : 'w-[80px] -translate-x-full lg:translate-x-0'
            )}
        >
            <div className="flex items-center justify-center h-[70px] border-b border-gray-100 px-4">
                <Truck className="w-8 h-8 text-blue-600" style={{ color: 'var(--primary-color)' }} />
                {isOpen && (
                    <span className="ml-3 font-bold text-lg text-gray-800 truncate">
                        Garage & Towing
                    </span>
                )}
            </div>

            <nav className="mt-6 px-2 overflow-y-auto h-[calc(100vh-80px)]" style={{ scrollbarWidth: 'none' }}>
                <ul>
                    {MENU_ITEMS.map((item) => (
                        <li key={item.name} className="mb-2">
                            <NavLink
                                to={item.path}
                                onClick={() => {
                                    if (window.innerWidth < 768) toggleSidebar();
                                }}
                                className={({ isActive }) =>
                                    clsx(
                                        'flex items-center px-4 py-3 rounded-lg transition-colors duration-200 group',
                                        isActive
                                            ? ''
                                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900',
                                    )
                                }
                                style={({ isActive }) => ({
                                    backgroundColor: isActive ? 'var(--primary-color)' : 'transparent',
                                    color: isActive ? '#fff' : 'inherit',
                                })}
                            >
                                <item.icon
                                    className={clsx('w-5 h-5 flex-shrink-0', !isOpen && 'mx-auto')}
                                />
                                {isOpen && (
                                    <span className="ml-3 font-medium truncate">{item.name}</span>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
