import React, { useState } from 'react';
import {
    Download,
    Star,
    Mail,
    Phone,
    ArrowUpRight,
    Filter
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import UserDetailsDrawer from '../components/UserDetailsDrawer';
import clsx from 'clsx';
import Button from '../components/common/Button';
import DataTable from '../components/common/DataTable';
import SearchBox from '../components/common/SearchBox';
import FilterDropdown from '../components/common/FilterDropdown';

const statusOptions = [
    { value: 'All', label: 'All Status', dot: 'bg-gray-400' },
    { value: 'Active', label: 'Active Customers', dot: 'bg-emerald-500' },
    { value: 'Blocked', label: 'Blocked Access', dot: 'bg-rose-500' },
];

const UserManagement = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [selectedUser, setSelectedUser] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Realistic Demo Data
    const [users] = useState([
        { id: 1001, name: 'Rahul Sharma', email: 'rahul.s@example.com', phone: '+91 98765 43210', totalRequests: 12, totalSpent: '12,500', rating: 4.8, status: 'Active', joined: '12 Jan 2024' },
        { id: 1002, name: 'Priya Singh', email: 'priya.singh@example.com', phone: '+91 87654 32109', totalRequests: 5, totalSpent: '4,200', rating: 4.5, status: 'Active', joined: '25 Jan 2024' },
        { id: 1003, name: 'Amit Verma', email: 'amit.v@example.com', phone: '+91 76543 21098', totalRequests: 2, totalSpent: '1,500', rating: 3.2, status: 'Blocked', joined: '02 Feb 2024' },
        { id: 1004, name: 'Sneha Gupta', email: 'sneha.g@example.com', phone: '+91 65432 10987', totalRequests: 24, totalSpent: '45,800', rating: 4.9, status: 'Active', joined: '15 Feb 2024' },
        { id: 1005, name: 'Vikram Malhotra', email: 'vikram.m@example.com', phone: '+91 54321 09876', totalRequests: 8, totalSpent: '7,400', rating: 4.1, status: 'Active', joined: '18 Feb 2024' },
        { id: 1006, name: 'Anjali Das', email: 'anjali.das@example.com', phone: '+91 99887 76655', totalRequests: 15, totalSpent: '18,200', rating: 4.7, status: 'Active', joined: '22 Feb 2024' },
        { id: 1007, name: 'Sanjeev Kumar', email: 'sanjeev.k@example.com', phone: '+91 88776 65544', totalRequests: 1, totalSpent: '500', rating: 2.5, status: 'Blocked', joined: '25 Feb 2024' },
        { id: 1008, name: 'Megha Reddy', email: 'megha.r@example.com', phone: '+91 77665 54433', totalRequests: 9, totalSpent: '9,100', rating: 4.3, status: 'Active', joined: '28 Feb 2024' },
        { id: 1009, name: 'Kushal Taneja', email: 'kushal.t@example.com', phone: '+91 66554 43322', totalRequests: 4, totalSpent: '3,800', rating: 4.6, status: 'Active', joined: '01 Mar 2024' },
        { id: 1010, name: 'Pooja Hegde', email: 'pooja.h@example.com', phone: '+91 55443 32211', totalRequests: 11, totalSpent: '11,400', rating: 4.4, status: 'Active', joined: '05 Mar 2024' },
    ]);

    const handleViewDetails = (user) => {
        setSelectedUser(user);
        setIsDrawerOpen(true);
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.phone.includes(searchQuery) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterStatus === 'All' || user.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const totalPages = Math.max(1, Math.ceil(filteredUsers.length / itemsPerPage));
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredUsers.length);
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const columns = [
        {
            header: 'ID',
            key: 'id',
            headerClassName: 'w-24',
            render: (val) => (
                <span className="text-xs md:text-sm font-bold text-indigo-600 whitespace-nowrap tracking-tight">#{val}</span>
            )
        },
        {
            header: 'Customer Profile',
            key: 'name',
            render: (val, row) => (
                <div className="flex items-center gap-2.5 md:gap-3 whitespace-nowrap">
                    <div className="relative">
                        <div className="w-10 h-10 md:w-11 md:h-11 bg-white border border-gray-200 rounded-xl md:rounded-2xl flex items-center justify-center text-indigo-600 font-bold text-sm md:text-base shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                            {val[0]}
                        </div>
                        <div className={clsx(
                            "absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm",
                            row.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'
                        )}></div>
                    </div>
                    <div>
                        <div className="font-black text-gray-900 text-xs md:text-sm tracking-tight">{val}</div>
                        <div className="text-[10px] md:text-[11px] font-medium text-gray-400 uppercase tracking-widest mt-0.5">Joined {row.joined}</div>
                    </div>
                </div>
            )
        },
        {
            header: 'Contact Details',
            key: 'contact',
            className: 'hidden xl:table-cell',
            headerClassName: 'hidden xl:table-cell',
            render: (_, row) => (
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-600 whitespace-nowrap">
                        <Phone className="w-3 h-3 text-gray-300" /> {row.phone}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400 whitespace-nowrap">
                        <Mail className="w-3 h-3 text-gray-300" /> {row.email}
                    </div>
                </div>
            )
        },
        {
            header: 'Requests',
            key: 'totalRequests',
            align: 'center',
            render: (val) => (
                <span className="whitespace-nowrap inline-flex items-center px-2.5 py-1 bg-gray-100 text-gray-900 rounded-lg text-xs font-black tracking-tight group-hover:bg-indigo-100 group-hover:text-indigo-700 transition-colors">
                    {val}
                </span>
            )
        },
        {
            header: 'Total Spent',
            key: 'totalSpent',
            render: (val) => (
                <div className="whitespace-nowrap text-xs md:text-sm font-black text-gray-900 tracking-tighter">₹{val}</div>
            )
        },
        {
            header: 'Rating',
            key: 'rating',
            align: 'center',
            render: (val) => (
                <div className="whitespace-nowrap flex items-center justify-center gap-1.5">
                    <span className="text-xs md:text-sm font-black text-gray-900">{val}</span>
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 drop-shadow-sm" />
                </div>
            )
        },
        {
            header: 'Status',
            key: 'status',
            render: (val) => <StatusBadge status={val} />
        },
        {
            header: 'Actions',
            key: 'actions',
            align: 'right',
            render: (_, row) => (
                <button
                    onClick={() => handleViewDetails(row)}
                    className="inline-flex whitespace-nowrap cursor-pointer items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-900 text-xs font-black uppercase md:tracking-widest rounded-xl hover:text-indigo-600 hover:border-indigo-600 transition-all shadow-sm active:scale-95 group/btn"
                >
                    Details
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-40 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all" />
                </button>
            )
        }
    ];

    return (
        <div className="space-y-6 md:space-y-8">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
                <div className="space-y-1">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">User Management</h1>
                    <p className="text-gray-500 font-medium mt-1 text-sm">Manage, track, and monitor platform customer activities.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>
                        Export Data
                    </Button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="space-y-4">
                <DataTable
                    title="Customer Directory"
                    subtitle="All registered platform users"
                    headerRight={
                        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-50 border border-indigo-100/50 rounded-2xl">
                            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                            <span className="text-xs font-black text-indigo-700 uppercase tracking-widest">Live</span>
                        </div>
                    }
                    filters={
                        <>
                            <SearchBox
                                value={searchQuery}
                                onSearch={(v) => { setSearchQuery(v); setCurrentPage(1); }}
                                placeholder="Search by name, email or phone..."
                                width="w-full lg:w-80"
                            />
                            <FilterDropdown
                                icon={<Filter className="w-4 h-4" />}
                                options={statusOptions}
                                value={filterStatus}
                                onChange={(v) => { setFilterStatus(v); setCurrentPage(1); }}
                                width="w-full sm:w-52"
                            />
                        </>
                    }
                    columns={columns}
                    data={paginatedUsers}
                    paginationProps={{
                        currentPage,
                        totalPages,
                        onPageChange: handlePageChange,
                        startIndex,
                        endIndex,
                        totalItems: filteredUsers.length,
                        itemsPerPage,
                        setItemsPerPage
                    }}
                />
            </div>

            <UserDetailsDrawer
                user={selectedUser}
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            />
        </div>
    );
};

export default UserManagement;
