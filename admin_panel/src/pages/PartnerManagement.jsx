import React, { useState } from 'react';
import {
    Download,
    Star,
    Wrench,
    Truck,
    ArrowUpRight,
    Filter,
    Wifi,
    ShieldCheck,
    Mail,
    Phone
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import PartnerDetailsDrawer from '../components/PartnerDetailsDrawer';
import clsx from 'clsx';
import Button from '../components/common/Button';
import DataTable from '../components/common/DataTable';
import SearchBox from '../components/common/SearchBox';
import FilterDropdown from '../components/common/FilterDropdown';

const serviceOptions = [
    { value: 'All', label: 'All Services', icon: Wrench },
    { value: 'Garage', label: 'Garage Only', icon: Wrench },
    { value: 'Towing', label: 'Towing Only', icon: Truck },
];

const statusOptions = [
    { value: 'All', label: 'All Status', dot: 'bg-gray-400' },
    { value: 'Online', label: 'Online Providers', dot: 'bg-emerald-500' },
    { value: 'Offline', label: 'Offline Providers', dot: 'bg-gray-300' },
];

const kycOptions = [
    { value: 'All', label: 'All KYC', dot: 'bg-gray-400' },
    { value: 'Verified', label: 'KYC Verified', dot: 'bg-emerald-500' },
    { value: 'Pending', label: 'KYC Pending', dot: 'bg-amber-500' },
];

const PartnerManagement = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [serviceFilter, setServiceFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [kycFilter, setKycFilter] = useState('All');
    const [selectedPartner, setSelectedPartner] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Realistic Partner Data
    const [partners] = useState([
        { id: 'PRT-101', name: 'Quick Fix Garage', email: 'quickfix@example.com', phone: '+91 99887 76655', serviceType: 'Garage', rating: 4.7, online: true, kyc: 'Verified', earnings: 154200, jobs: 312, joined: '12 Jan 2024', fullAddress: 'G-12, Wing B, Lotus Business Park, Andheri East, Mumbai, Maharashtra 400069' },
        { id: 'PRT-102', name: 'City Towing Services', email: 'citytowing@example.com', phone: '+91 88776 65544', serviceType: 'Towing', rating: 4.9, online: true, kyc: 'Verified', earnings: 242000, jobs: 482, joined: '08 Nov 2023', fullAddress: 'Shop No 4, Sai Krupa CHS, Link Road, Borivali West, Mumbai, Maharashtra 400092' },
        { id: 'PRT-103', name: 'Mechanic On Wheels', email: 'onwheels@example.com', phone: '+91 77665 54433', serviceType: 'Garage', rating: 3.8, online: false, kyc: 'Pending', earnings: 45000, jobs: 67, joined: '20 Feb 2024', fullAddress: 'Shop 2, Ground Floor, Royal Arcade, Malad West, Mumbai, Maharashtra 400064' },
        { id: 'PRT-104', name: 'Highway Helpers', email: 'highway@example.com', phone: '+91 66554 43322', serviceType: 'Towing', rating: 4.6, online: true, kyc: 'Verified', earnings: 195800, jobs: 390, joined: '15 Dec 2023', fullAddress: 'Unit 102, Everest Chambers, Marol Naka, Andheri West, Mumbai, Maharashtra 400059' },
        { id: 'PRT-105', name: 'Bike Doctor', email: 'bikedoctor@example.com', phone: '+91 55443 32211', serviceType: 'Garage', rating: 4.8, online: false, kyc: 'Verified', earnings: 120500, jobs: 214, joined: '03 Mar 2024', fullAddress: 'Plot 45, Sector 18, Vashi, Navi Mumbai, Maharashtra 400703' },
        { id: 'PRT-106', name: '24/7 Car Rescue', email: 'carrescue@example.com', phone: '+91 91234 56789', serviceType: 'Towing', rating: 4.2, online: true, kyc: 'Pending', earnings: 89000, jobs: 145, joined: '28 Jan 2024', fullAddress: 'Room 5, Krishna Co-op Hsg Soc, Thane West, Maharashtra 400601' },
        { id: 'PRT-107', name: 'Metro Motors', email: 'metromotors@example.com', phone: '+91 82345 67890', serviceType: 'Garage', rating: 4.5, online: true, kyc: 'Verified', earnings: 312000, jobs: 578, joined: '10 Sep 2023', fullAddress: 'No 15, Silver Oaks Industrial Area, Parel, Mumbai, Maharashtra 400012' },
        { id: 'PRT-108', name: 'Express Towing', email: 'expresstow@example.com', phone: '+91 73456 78901', serviceType: 'Towing', rating: 3.5, online: false, kyc: 'Pending', earnings: 28000, jobs: 42, joined: '14 Mar 2024', fullAddress: 'Shop 8, Galaxy Mall Mansarovar, Navi Mumbai, Maharashtra 410206' },
    ]);

    const filteredPartners = partners.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesService = serviceFilter === 'All' || p.serviceType === serviceFilter;
        const matchesStatus = statusFilter === 'All' || (statusFilter === 'Online' ? p.online : !p.online);
        const matchesKyc = kycFilter === 'All' || p.kyc === kycFilter;
        return matchesSearch && matchesService && matchesStatus && matchesKyc;
    });

    const totalPages = Math.max(1, Math.ceil(filteredPartners.length / itemsPerPage));
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredPartners.length);
    const paginatedPartners = filteredPartners.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleViewPartner = (partner) => {
        setSelectedPartner(partner);
        setIsDrawerOpen(true);
    };

    const columns = [
        {
            header: 'ID',
            key: 'id',
            render: (val) => (
                <span className="text-xs md:text-sm font-bold text-indigo-600 whitespace-nowrap tracking-tight">#{val.split('-')[1]}</span>
            )
        },
        {
            header: 'Partner Profile',
            key: 'name',
            render: (val, row) => (
                <div className="flex items-center gap-3 whitespace-nowrap">
                    <div className="relative">
                        <div className="w-10 h-10 md:w-11 md:h-11 bg-white border border-gray-100 rounded-xl md:rounded-2xl flex items-center justify-center text-indigo-600 font-bold text-sm md:text-base shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                            {val[0]}
                        </div>
                        <div className={clsx(
                            "absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-[3px] border-white shadow-sm",
                            row.online ? 'bg-emerald-500' : 'bg-gray-300'
                        )}></div>
                    </div>
                    <div>
                        <div className="font-black text-gray-900 text-xs md:text-sm tracking-tight">{val}</div>
                        <div className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">JOINED {row.joined}</div>
                    </div>
                </div>
            )
        },
        {
            header: 'Contact Details',
            key: 'contact',
            render: (_, row) => (
                <div className="flex flex-col gap-1.5 justify-center whitespace-nowrap">
                    <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-gray-300" />
                        <span className="text-xs font-bold text-gray-700 tracking-tight">{row.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-gray-300" />
                        <span className="text-xs font-bold text-gray-400 lowercase">{row.email}</span>
                    </div>
                </div>
            )
        },
        {
            header: 'Service Type',
            key: 'serviceType',
            render: (val) => (
                <div className={clsx(
                    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-black whitespace-nowrap",
                    val === 'Garage'
                        ? 'bg-violet-50 border-violet-100 text-violet-700'
                        : 'bg-sky-50 border-sky-100 text-sky-700'
                )}>
                    {val === 'Garage' ? <Wrench className="w-3 h-3" /> : <Truck className="w-3 h-3" />}
                    {val}
                </div>
            )
        },
        {
            header: 'Rating',
            key: 'rating',
            align: 'center',
            render: (val) => (
                <div className="flex items-center justify-center gap-1.5 whitespace-nowrap">
                    <span className="text-xs md:text-sm font-black text-gray-900">{val}</span>
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 drop-shadow-sm" />
                </div>
            )
        },
        {
            header: 'KYC',
            key: 'kyc',
            render: (val) => <StatusBadge status={val} />
        },
        {
            header: 'Earnings',
            key: 'earnings',
            className: 'hidden md:table-cell',
            headerClassName: 'hidden md:table-cell',
            render: (val) => (
                <div className="text-xs md:text-sm font-black text-gray-900 tracking-tighter whitespace-nowrap">
                    <span className="text-gray-400 mr-0.5">₹</span>
                    {val.toLocaleString()}
                </div>
            )
        },
        {
            header: 'Jobs',
            key: 'jobs',
            align: 'center',
            className: 'hidden lg:table-cell',
            headerClassName: 'hidden lg:table-cell',
            render: (val) => (
                <span className="whitespace-nowrap inline-flex items-center px-2.5 py-1 bg-gray-100 text-gray-900 rounded-lg text-xs font-black tracking-tight group-hover:bg-indigo-100 group-hover:text-indigo-700 transition-colors">
                    {val}
                </span>
            )
        },
        {
            header: 'Actions',
            key: 'actions',
            align: 'right',
            render: (_, row) => (
                <button
                    onClick={() => handleViewPartner(row)}
                    className="inline-flex cursor-pointer items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-900 text-xs font-black uppercase md:tracking-widest rounded-xl hover:text-indigo-600 hover:border-indigo-600 transition-all shadow-sm active:scale-95 group/btn"
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
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Partner Management</h1>
                    <p className="text-gray-500 font-medium mt-1 text-sm">Monitoring and managing {partners.length} registered service providers.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>
                        Export Partners
                    </Button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="space-y-4">
                <DataTable
                    title="Service Provider Registry"
                    subtitle="All registered partner accounts"
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
                                placeholder="Search by name or partner ID..."
                                width="w-full lg:w-72"
                            />
                            <FilterDropdown
                                icon={<Filter className="w-4 h-4" />}
                                options={serviceOptions}
                                value={serviceFilter}
                                onChange={(v) => { setServiceFilter(v); setCurrentPage(1); }}
                                width="w-full sm:w-44"
                            />
                            <FilterDropdown
                                icon={<Wifi className="w-4 h-4" />}
                                options={statusOptions}
                                value={statusFilter}
                                onChange={(v) => { setStatusFilter(v); setCurrentPage(1); }}
                                width="w-full sm:w-44"
                            />
                            <FilterDropdown
                                icon={<ShieldCheck className="w-4 h-4" />}
                                options={kycOptions}
                                value={kycFilter}
                                onChange={(v) => { setKycFilter(v); setCurrentPage(1); }}
                                width="w-full sm:w-40"
                            />
                        </>
                    }
                    columns={columns}
                    data={paginatedPartners}
                    paginationProps={{
                        currentPage,
                        totalPages,
                        onPageChange: handlePageChange,
                        startIndex,
                        endIndex,
                        totalItems: filteredPartners.length,
                        itemsPerPage,
                        setItemsPerPage
                    }}
                />
            </div>

            {/* Partner Details Side Drawer */}
            <PartnerDetailsDrawer
                partner={selectedPartner}
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            />
        </div>
    );
};

export default PartnerManagement;
