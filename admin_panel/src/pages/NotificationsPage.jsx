import React, { useState, useMemo } from 'react';
import {
    Bell,
    Zap,
    IndianRupee,
    Info,
    ShieldCheck,
    Gavel,
    Clock,
    Trash2,
    CheckCircle2,
    MailOpen,
    AlertTriangle,
    CreditCard,
    UserPlus,
    Filter,
    ChevronRight,
    Search
} from 'lucide-react';
import clsx from 'clsx';
import Button from '../components/common/Button';
import Pagination from '../components/common/Pagination';
import FilterDropdown from '../components/common/FilterDropdown';
import SearchBox from '../components/common/SearchBox';

const NotificationsPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const [notifications, setNotifications] = useState([
        { id: 1, type: 'emergency', title: 'SOS Alert Triggered', message: 'New emergency request #REQ-9901 from NH8 Highway.', time: '2 min ago', isRead: false, icon: Zap, color: 'emerald' },
        { id: 2, type: 'financial', title: 'High Commission Alert', message: 'Commission for partner "Metro Garage" exceeds threshold of ₹5,000.', time: '15 min ago', isRead: false, icon: IndianRupee, color: 'indigo' },
        { id: 3, type: 'user', title: 'New Partner Onboarding', message: 'Modern Towing Services has submitted application for verification.', time: '45 min ago', isRead: false, icon: UserPlus, color: 'violet' },
        { id: 4, type: 'system', title: 'Server Load Advisory', message: 'Peak hour volume detected near Mumbai South.', time: '1 hr ago', isRead: true, icon: Info, color: 'amber' },
        { id: 5, type: 'emergency', title: 'Accident Reported', message: 'Collision detected on MG Road. Emergency services notified.', time: '2 hrs ago', isRead: true, icon: AlertTriangle, color: 'red' },
        { id: 6, type: 'financial', title: 'Batch Payout Successful', message: 'Withdrawal of ₹1,42,800 processed for 12 partners.', time: '3 hrs ago', isRead: true, icon: CreditCard, color: 'emerald' },
        { id: 7, type: 'security', title: 'Identity Verified', message: 'Admin Vikram Singh updated profile credentials successfully.', time: '5 hrs ago', isRead: true, icon: ShieldCheck, color: 'indigo' },
        { id: 8, type: 'dispute', title: 'New Dispute Raised', message: 'User #U4402 raised dispute for overcharging on #REQ-8812.', time: '1 day ago', isRead: true, icon: Gavel, color: 'red' },
        { id: 9, type: 'system', title: 'Database Maintenance', message: 'Scheduled maintenance complete.', time: '1 day ago', isRead: true, icon: CheckCircle2, color: 'indigo' },
        { id: 10, type: 'financial', title: 'Refund Processed', message: 'Refund of ₹450 issued to User #U1102.', time: '2 days ago', isRead: true, icon: IndianRupee, color: 'amber' },
        { id: 11, type: 'emergency', title: 'Critical Alert', message: 'Fuel leak reported on Vehicle DL-1CA-4421 during transit.', time: '2 days ago', isRead: true, icon: Zap, color: 'red' },
        { id: 12, type: 'user', title: 'User Feedback', message: '5-star review received for "Fast Towing Co"!', time: '3 days ago', isRead: true, icon: Bell, color: 'emerald' },
        { id: 13, type: 'financial', title: 'Partner Payout Failed', message: 'Bank rejection for "Express Garage" payout.', time: '3 days ago', isRead: true, icon: CreditCard, color: 'red' },
        { id: 14, type: 'system', title: 'API Warning', message: 'Google Maps API usage reached 85% of monthly quota.', time: '4 days ago', isRead: true, icon: Info, color: 'violet' },
        { id: 15, type: 'emergency', title: 'Multi-Vehicle Accident', message: 'Major accident on Yamuna Expressway.', time: '4 days ago', isRead: true, icon: AlertTriangle, color: 'red' },
    ]);

    const filteredNotifications = useMemo(() => {
        return notifications.filter(notif => {
            const matchesSearch = notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                notif.message.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesTab = activeTab === 'all' ||
                (activeTab === 'unread' && !notif.isRead) ||
                (activeTab === 'critical' && notif.type === 'emergency') ||
                (activeTab === 'financial' && notif.type === 'financial');

            return matchesSearch && matchesTab;
        });
    }, [notifications, searchQuery, activeTab]);

    const paginatedNotifications = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredNotifications.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredNotifications, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);

    const markAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    };

    const deleteNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const toggleRead = (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: !n.isRead } : n));
    };

    const colors = {
        emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100' },
        indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-100' },
        violet: { bg: 'bg-violet-50', text: 'text-violet-600', border: 'border-violet-100' },
        amber: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100' },
        red: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-100' },
        gray: { bg: 'bg-gray-50', text: 'text-gray-400', border: 'border-gray-100' },
    };

    const filterOptions = [
        { label: 'All', value: 'all', dot: 'bg-indigo-400' },
        { label: 'Unread', value: 'unread', dot: 'bg-rose-400' },
        { label: 'Emergency', value: 'critical', dot: 'bg-red-500' },
        { label: 'Financial', value: 'financial', dot: 'bg-emerald-500' },
    ];

    return (
        <div className="space-y-6 md:space-y-8">
            {/* Minimal Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                        Notification Center
                        <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-indigo-100">
                            {notifications.filter(n => !n.isRead).length}
                        </span>
                    </h1>
                    <p className="text-gray-500 font-medium mt-1 text-sm">Manage your system logs and real-time alerts.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={markAllRead}>
                        Mark All Read
                    </Button>
                    <Button variant="primary" onClick={() => setNotifications([])}>
                        Clear All
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start  max-w-7xl mx-auto">
                {/* Compact Filters Sidebar */}
                <div className="lg:col-span-3 space-y-4 lg:sticky lg:top-24">
                    <div className="premium-card p-5 border border-gray-100 md:space-y-8 space-y-4 rounded-3xl">
                        {/* Compact SearchBox */}
                        <div className="space-y-2">
                            <h3 className="md:text-xs text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Search</h3>
                            <SearchBox
                                value={searchQuery}
                                onSearch={(val) => setSearchQuery(val)}
                                placeholder="Filter alerts..."
                                width="w-full"
                            // inputClassName="!py-2 !h-10 !text-xs !rounded-xl"
                            />
                        </div>

                        {/* Minimal Categories */}
                        <div className="space-y-2">
                            <h3 className="md:text-xs text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Categories</h3>

                            {/* Desktop List */}
                            <div className="hidden lg:flex flex-col gap-1.5">
                                {filterOptions.map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => { setActiveTab(opt.value); setCurrentPage(1); }}
                                        className={clsx(
                                            "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all",
                                            activeTab === opt.value
                                                ? "bg-indigo-50 text-indigo-700 border border-indigo-100"
                                                : "text-gray-400 hover:bg-gray-50 hover:text-gray-600 border border-transparent"
                                        )}
                                    >
                                        <div className={clsx("w-1.5 h-1.5 rounded-full", activeTab === opt.value ? "bg-indigo-600" : opt.dot)} />
                                        {opt.label}
                                    </button>
                                ))}
                            </div>

                            {/* Mobile/iPad Dropdown */}
                            <div className="lg:hidden">
                                <FilterDropdown
                                    options={filterOptions}
                                    value={activeTab}
                                    onChange={(val) => { setActiveTab(val); setCurrentPage(1); }}
                                    icon={<Filter className="w-3.5 h-3.5" />}
                                    width="w-full"
                                    placeholder="Filter Feed"
                                    className="!rounded-xl !h-10 border-gray-100"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Compact Notifications List */}
                <div className="lg:col-span-9 space-y-3">
                    {paginatedNotifications.length > 0 ? (
                        <>
                            {paginatedNotifications.map((notif) => {
                                const theme = colors[notif.color] || colors.gray;
                                return (
                                    <div
                                        key={notif.id}
                                        className={clsx(
                                            "premium-card p-4 bg-white md:p-5 group relative transition-all duration-200 border border-l-4 rounded-2xl",
                                            !notif.isRead
                                                ? "border-indigo-200 shadow-sm border-l-indigo-500"
                                                : "border-gray-100 border-l-transparent"
                                        )}
                                    >
                                        <div className="flex items-center gap-4 md:gap-5">
                                            {/* Small Icon Section */}
                                            <div className={clsx(
                                                "w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center shrink-0 border transition-transform duration-300",
                                                theme.bg, theme.text, theme.border
                                            )}>
                                                <notif.icon className="w-5 h-5 md:w-5.5 md:h-5.5 stroke-[2.5]" />
                                            </div>

                                            {/* Minimal Content Block */}
                                            <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-center justify-between gap-1">
                                                <div className="space-y-0.5">
                                                    <div className="flex items-center gap-2">
                                                        <h3 className={clsx(
                                                            "text-sm md:text-base tracking-tight truncate max-w-md",
                                                            !notif.isRead ? "font-bold text-gray-900" : "font-bold text-gray-600"
                                                        )}>
                                                            {notif.title}
                                                        </h3>

                                                    </div>
                                                    <p className={clsx(
                                                        "text-xs md:text-sm leading-tight truncate max-w-2xl font-medium text-gray-400",
                                                    )}>
                                                        {notif.message}
                                                    </p>
                                                    <span className="text-xs mt-6 block font-semibold text-gray-400 whitespace-nowrap">{notif.time}</span>
                                                </div>

                                                {/* Compact Action Panel */}
                                                <div className="flex items-center gap-2 md:opacity-0 md:group-hover:opacity-100 transition-all">
                                                    <button onClick={(e) => { e.stopPropagation(); toggleRead(notif.id); }} title="Read"
                                                        className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-indigo-600 hover:border-indigo-600 transition-all shadow-sm">
                                                        <MailOpen className="w-4 h-4" />
                                                    </button>
                                                    <button onClick={(e) => { e.stopPropagation(); deleteNotification(notif.id); }} title="Delete"
                                                        className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-rose-600 hover:border-rose-600 transition-all shadow-sm">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Dot Indicator for Unread */}
                                        {!notif.isRead && (
                                            <div className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-indigo-600 shadow-[0_0_8px_rgba(79,70,229,0.5)]" />
                                        )}
                                    </div>
                                );
                            })}

                            {/* Minimal Pagination */}
                            <div className="mt-6 bg-white rounded-2xl border-2 border-white shadow-sm overflow-hidden p-0.5">
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={setCurrentPage}
                                    startIndex={(currentPage - 1) * itemsPerPage}
                                    endIndex={currentPage * itemsPerPage}
                                    totalItems={filteredNotifications.length}
                                    itemsPerPage={itemsPerPage}
                                    setItemsPerPage={setItemsPerPage}
                                />
                            </div>
                        </>
                    ) : (
                        <div className="premium-card p-12 text-center border-dashed border-2 border-gray-100 bg-gray-50/10 rounded-3xl">
                            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 border border-gray-50">
                                <Bell className="w-8 h-8 text-gray-100" />
                            </div>
                            <h3 className="text-base font-black text-gray-900 tracking-tight">No alerts</h3>
                            <Button variant="outline" size="sm" className="mt-4 mx-auto text-[9px] h-8" onClick={() => { setActiveTab('all'); setSearchQuery(''); }}>
                                Full Reset
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationsPage;
