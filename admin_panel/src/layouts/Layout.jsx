import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import clsx from 'clsx';

const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024); // Open by default on Desktop (>= 1024px)

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 lg:hidden backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 h-full">
                <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

                <main
                    className={clsx(
                        "flex-1 overflow-x-hidden overflow-y-auto transition-all duration-300 ease-in-out",
                        "p-5 md:p-6 pb-10 md:pb-10 pt-[calc(var(--header-height)+16px)] md:pt-[calc(var(--header-height)+24px)]",
                        sidebarOpen ? "lg:ml-[var(--sidebar-width)]" : "lg:ml-[88px]"
                    )}
                >
                    <div className="">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
