import React from 'react';
import { NavLink } from 'react-router-dom';
import { MENU_ITEMS } from '../utils/constants';
import clsx from 'clsx';
import { Truck, X } from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <aside
            className={clsx(
                'fixed top-0 left-0 h-screen flex flex-col transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] border-r border-gray-200 bg-white z-30 shadow-2xl lg:shadow-none',
                isOpen
                    ? 'w-[var(--sidebar-width)] translate-x-0'
                    : 'w-[88px] -translate-x-full lg:translate-x-0'
            )}
        >
            {/* Branding Section */}
            <div className="flex items-center justify-between h-[80px] border-b border-gray-100 px-6 bg-white/50 backdrop-blur-md sticky top-0 z-10 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-200 shrink-0">
                        <Truck className="w-6 h-6 text-white" />
                    </div>
                    {isOpen && (
                        <div className="flex flex-col min-w-0">
                            <span className="font-black text-sm text-gray-900 tracking-tight truncate leading-tight uppercase">
                                Garage & Towing
                            </span>
                            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-0.5">
                                Admin Portal
                            </span>
                        </div>
                    )}
                </div>

                {/* Close Button for Mobile */}
                <button
                    onClick={toggleSidebar}
                    className="lg:hidden p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-all active:scale-90"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Navigation Section */}
            <nav className="py-6 px-3 flex-1 overflow-y-auto h-[calc(100vh-160px)]" style={{ scrollbarWidth: 'none' }}>
                <ul className="space-y-1.5">
                    {MENU_ITEMS.map((item) => (
                        <li key={item.name} className="relative group/item">
                            <NavLink
                                to={item.path}
                                onClick={() => {
                                    if (window.innerWidth < 1024) toggleSidebar();
                                }}
                                className={({ isActive }) =>
                                    clsx(
                                        'flex items-center px-4 py-3.5 rounded-2xl transition-all duration-300 relative overflow-hidden group',
                                        isActive
                                            ? 'text-white shadow-lg shadow-blue-100'
                                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50',
                                        !isOpen && 'justify-center lg:px-0'
                                    )
                                }
                                style={({ isActive }) => ({
                                    background: isActive
                                        ? 'linear-gradient(135deg, var(--primary-color) 0%, #4338CA 100%)'
                                        : 'transparent',
                                })}
                            >
                                {({ isActive }) => (
                                    <>
                                        <item.icon
                                            className={clsx(
                                                'w-5 h-5 shrink-0 transition-all duration-300',
                                                'group-hover:scale-110'
                                            )}
                                        />
                                        {isOpen && (
                                            <span className="ml-3 text-[13px] font-bold tracking-tight truncate uppercase">
                                                {item.name}
                                            </span>
                                        )}

                                        {/* Tooltip for collapsed state */}
                                        {!isOpen && (
                                            <div className="hidden lg:group-hover/item:block absolute left-[calc(100%+16px)] top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-2xl z-50 pointer-events-none whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-200">
                                                <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                                                {item.name}
                                            </div>
                                        )}

                                        {/* Dot Indicator for Active Item in Collapsed State */}
                                        {isActive && !isOpen && (
                                            <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-white hidden lg:block" />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Bottom Support Card */}
            <div className={clsx("p-4 border-t border-gray-100 bg-gray-50/30 shrink-0", !isOpen && "hidden lg:block")}>
                {isOpen ? (
                    <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-5 shadow-xl group">
                        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all duration-700" />
                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-2">Help Center</p>
                        <p className="text-xs text-gray-300 leading-relaxed font-medium">Have questions? Our support team is here for you.</p>
                        <button className="mt-4 w-full py-2.5 bg-white text-gray-900 text-[10px] font-black uppercase tracking-widest rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all">
                            Get Support
                        </button>
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <button
                            onClick={toggleSidebar}
                            className="w-12 h-12 rounded-2xl bg-gray-900 text-white flex items-center justify-center hover:bg-blue-600 transition-all shadow-lg active:scale-90"
                        >
                            <X className="w-5 h-5 opacity-50 rotate-45" />
                        </button>
                    </div>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
