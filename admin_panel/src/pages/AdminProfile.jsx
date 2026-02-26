import React, { useState, useRef } from 'react';
import {
    User,
    Mail,
    Phone,
    ShieldCheck,
    Lock,
    Camera,
    Save,
    Key,
    Smartphone,
    History,
    Activity,
    Calendar,
    ChevronRight,
    Edit3,
    ArrowUpRight,
    AtSign,
    Image as ImageIcon,
    Upload,
    Trash2
} from 'lucide-react';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import DataTable from '../components/common/DataTable';
import clsx from 'clsx';

const AdminProfile = () => {
    const [is2FAEnabled, setIs2FAEnabled] = useState(true);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isIdentityModalOpen, setIsIdentityModalOpen] = useState(false);
    const [adminData, setAdminData] = useState({
        name: "Vikram Singh",
        email: "vikram.admin@garagetow.com",
        phone: "+91 98765 43210",
        role: "Super Admin"
    });

    const [tempAdminData, setTempAdminData] = useState({ ...adminData });
    const [profileImage, setProfileImage] = useState("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop");
    const fileInputRef = useRef(null);

    // Dummy Permissions Data
    const permissions = [
        { id: 1, name: 'User Management', level: 'Full Access', status: true },
        { id: 2, name: 'Financial Reports', level: 'View Only', status: true },
        { id: 3, name: 'Partner Onboarding', level: 'Edit Access', status: true },
        { id: 4, name: 'System Settings', level: 'Full Access', status: false },
        { id: 5, name: 'Dispute Resolution', level: 'Full Access', status: true },
    ];

    const openIdentityModal = () => {
        setTempAdminData({ ...adminData });
        setIsIdentityModalOpen(true);
    };

    const handleUpdateIdentity = () => {
        setAdminData({ ...tempAdminData });
        setIsIdentityModalOpen(false);
    };

    const handleTempInputChange = (e) => {
        const { name, value } = e.target;
        setTempAdminData(prev => ({ ...prev, [name]: value }));
    };

    const handleAdminInputChange = (e) => {
        const { name, value } = e.target;
        setAdminData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (profileImage && profileImage.startsWith('blob:')) {
                URL.revokeObjectURL(profileImage);
            }
            const objectUrl = URL.createObjectURL(file);
            setProfileImage(objectUrl);
            e.target.value = '';
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const removeImage = () => {
        if (profileImage && profileImage.startsWith('blob:')) {
            URL.revokeObjectURL(profileImage);
        }
        setProfileImage(null);
    };

    const permissionColumns = [
        {
            header: 'Permission Module',
            key: 'name',
            render: (val) => <span className="text-xs font-black text-gray-800 whitespace-nowrap tracking-tight">{val}</span>
        },
        {
            header: 'Access Level',
            key: 'level',
            render: (val) => (
                <span className={clsx(
                    "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tight whitespace-nowrap",
                    val === 'Full Access' ? 'bg-indigo-50 text-indigo-600' :
                        val === 'Edit Access' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500'
                )}>
                    {val}
                </span>
            )
        },
        {
            header: 'Status',
            key: 'status',
            align: 'right',
            render: (val) => (
                <div className="flex items-center justify-end gap-2 whitespace-nowrap">
                    <span className={clsx("text-[10px] font-black uppercase", val ? 'text-emerald-500' : 'text-gray-300')}>
                        {val ? 'Enabled' : 'Disabled'}
                    </span>
                    <div className={clsx("w-2 h-2 rounded-full", val ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]' : 'bg-gray-200')} />
                </div>
            )
        },
    ];

    return (
        <div className="space-y-6 md:space-y-8">
            {/* Hidden File Input */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
            />

            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 md:gap-6">
                <div className="space-y-1">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Admin Profile</h1>
                    <p className="text-gray-500 font-medium mt-1 text-sm">Manage your account details, security preferences, and permissions.</p>
                </div>
                <div className="flex items-center">
                    <span className="px-3 md:px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded-full border border-indigo-100 flex items-center gap-2 whitespace-nowrap">
                        <ShieldCheck className="w-3 md:w-3.5 h-3 md:h-3.5" /> System Verified
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                {/* LEFT COLUMN: Overview & Stats */}
                <div className="space-y-6 md:space-y-8">
                    {/* SECTION 1: Profile Overview Card */}
                    <div className="premium-card p-6 md:p-8 text-center relative overflow-hidden group border border-gray-100">
                        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-indigo-600 to-violet-600 opacity-5" />
                        <div className="relative mb-6 inline-block">
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2rem] md:rounded-[2.5rem] border-4 border-white shadow-xl overflow-hidden bg-gray-50">
                                {profileImage ? (
                                    <img
                                        src={profileImage}
                                        alt="Admin"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                                        <User className="w-10 h-10 md:w-12 md:h-12" />
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={triggerFileInput}
                                className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 p-2.5 md:p-3 bg-gray-900 text-white rounded-xl md:rounded-2xl hover:bg-indigo-600 transition-all shadow-lg hover:scale-110 active:scale-95 duration-300"
                            >
                                <Camera className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            </button>
                        </div>
                        <div className="space-y-1.5 md:space-y-2">
                            <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">{adminData.name}</h2>
                            <p className="text-[9px] md:text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] bg-indigo-50 inline-block px-3 md:px-4 py-1.5 rounded-lg md:rounded-xl border border-indigo-100">{adminData.role} Node</p>
                        </div>
                        <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-50 space-y-3 md:space-y-4 text-left">
                            <div className="flex items-center gap-3 text-gray-600 group/item overflow-hidden">
                                <div className="p-2 bg-gray-50 rounded-lg group-hover/item:bg-indigo-50 transition-colors shrink-0">
                                    <Mail className="w-3.5 h-3.5 text-gray-400 group-hover/item:text-indigo-600" />
                                </div>
                                <span className="text-xs font-bold truncate">{adminData.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600 group/item">
                                <div className="p-2 bg-gray-50 rounded-lg group-hover/item:bg-indigo-50 transition-colors shrink-0">
                                    <Phone className="w-3.5 h-3.5 text-gray-400 group-hover/item:text-indigo-600" />
                                </div>
                                <span className="text-xs font-bold">{adminData.phone}</span>
                            </div>
                        </div>
                        <Button
                            variant="secondary"
                            className="mt-6 md:mt-8 w-full bg-gray-50 border-gray-100 text-gray-900 hover:bg-gray-100"
                            onClick={openIdentityModal}
                        >
                            Update Public Identity
                        </Button>
                    </div>

                    {/* SECTION 4: Admin Activity Summary */}
                    <div className="premium-card p-6 md:p-8 space-y-5 md:space-y-6 border border-gray-100">
                        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Activity Audit</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                            <div className="p-4 md:p-5 bg-gray-50/50 border border-gray-100 rounded-2xl flex items-center justify-between group hover:border-emerald-200 transition-all cursor-default">
                                <div className="flex items-center gap-3 md:gap-4">
                                    <div className="p-2.5 md:p-3 bg-emerald-50 rounded-xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all shrink-0">
                                        <Activity className="w-4 md:w-5 h-4 md:h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-tight leading-none">Total Actions</p>
                                        <p className="text-lg md:text-xl font-black text-gray-900 mt-1">1,248</p>
                                    </div>
                                </div>
                                <ArrowUpRight className="w-3.5 md:w-4 h-3.5 md:h-4 text-emerald-600" />
                            </div>
                            <div className="p-4 md:p-5 bg-gray-50/50 border border-gray-100 rounded-2xl flex items-center gap-3 md:gap-4 group hover:border-indigo-200 transition-all cursor-default">
                                <div className="p-2.5 md:p-3 bg-indigo-50 rounded-xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all shrink-0">
                                    <History className="w-4 md:w-5 h-4 md:h-5" />
                                </div>
                                <div>
                                    <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-tight leading-none">Last Login</p>
                                    <p className="text-xs md:text-sm font-black text-gray-900 mt-1">Today, 09:42 AM</p>
                                </div>
                            </div>
                            <div className="p-4 md:p-5 bg-gray-50/50 border border-gray-100 rounded-2xl flex items-center gap-3 md:gap-4 group hover:border-violet-200 transition-all cursor-default sm:col-span-2 lg:col-span-1">
                                <div className="p-2.5 md:p-3 bg-violet-50 rounded-xl text-violet-600 group-hover:bg-violet-600 group-hover:text-white transition-all shrink-0">
                                    <Calendar className="w-4 md:w-5 h-4 md:h-5" />
                                </div>
                                <div>
                                    <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-tight leading-none">Joined Date</p>
                                    <p className="text-xs md:text-sm font-black text-gray-900 mt-1">12 Jan 2024</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Settings & Security */}
                <div className="lg:col-span-2 space-y-6 md:space-y-8">
                    {/* SECTION 2: Personal Information Form */}
                    <div className="premium-card p-6 md:p-8 space-y-6 md:space-y-8 border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 md:w-10 md:h-10 bg-indigo-600 rounded-lg md:rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100 shrink-0">
                                <User className="w-4 md:w-5 h-4 md:h-5" />
                            </div>
                            <div className="space-y-0.5">
                                <h3 className="text-base md:text-lg font-black text-gray-900">Personal Information</h3>
                                <p className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">Primary identity protocols</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div className="space-y-2">
                                <label className="text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={adminData.name}
                                    onChange={handleAdminInputChange}
                                    className="w-full bg-gray-50/50 border border-gray-200 focus:border-indigo-500 focus:bg-white rounded-xl px-4 md:px-5 py-3 md:py-3.5 text-sm outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={adminData.email}
                                    onChange={handleAdminInputChange}
                                    className="w-full bg-gray-50/50 border border-gray-200 focus:border-indigo-500 focus:bg-white rounded-xl px-4 md:px-5 py-3 md:py-3.5 text-sm outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Phone Number</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={adminData.phone}
                                    onChange={handleAdminInputChange}
                                    className="w-full bg-gray-50/50 border border-gray-200 focus:border-indigo-500 focus:bg-white rounded-xl px-4 md:px-5 py-3 md:py-3.5 text-sm outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Administrative Role</label>
                                <div className="relative">
                                    <select
                                        name="role"
                                        value={adminData.role}
                                        onChange={handleAdminInputChange}
                                        className="w-full bg-gray-50/50 border border-gray-200 focus:border-indigo-500 focus:bg-white rounded-xl px-4 md:px-5 py-3 md:py-3.5 text-sm outline-none transition-all appearance-none"
                                    >
                                        <option>Super Admin</option>
                                        <option>Manager</option>
                                        <option>Operations Head</option>
                                    </select>
                                    <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 md:w-4 h-3.5 md:h-4 text-gray-400 rotate-90 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2">
                            <Button variant="primary" className="flex-1 bg-indigo-600 shadow-xl shadow-indigo-100 h-12 md:h-14 text-sm" leftIcon={<Save className="w-4 h-4" />}>
                                Save Core Identity
                            </Button>
                            <Button variant="secondary" className="flex-1 border-gray-100 h-12 md:h-14 text-sm" leftIcon={<Edit3 className="w-4 h-4" />}>
                                Reset Parameters
                            </Button>
                        </div>
                    </div>

                    {/* SECTION 3: Security Settings */}
                    <div className="premium-card p-6 md:p-8 space-y-6 md:space-y-8 border border-gray-100">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 md:w-10 md:h-10 bg-indigo-600 rounded-lg md:rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100 shrink-0">
                                    <Lock className="w-4 md:w-5 h-4 md:h-5" />
                                </div>
                                <div className="space-y-0.5">
                                    <h3 className="text-base md:text-lg font-black text-gray-900">Security Control</h3>
                                    <p className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">Guard & encryption protocols</p>
                                </div>
                            </div>
                            <div className="sm:text-right">
                                <span className="text-[9px] md:text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">High Protection</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                            <div className="p-5 md:p-6 bg-gray-50/50 border border-gray-100 rounded-2xl space-y-4 group">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all shrink-0">
                                            <Smartphone className="w-4 md:w-5 h-4 md:h-5" />
                                        </div>
                                        <h4 className="text-sm font-black text-gray-900">2FA Authentication</h4>
                                    </div>
                                    <button
                                        onClick={() => setIs2FAEnabled(!is2FAEnabled)}
                                        className={clsx(
                                            "relative inline-flex h-6 md:h-7 w-10 md:w-12 items-center rounded-full transition-all duration-300 shadow-inner shrink-0",
                                            is2FAEnabled ? 'bg-emerald-500' : 'bg-gray-200'
                                        )}
                                    >
                                        <span className={clsx(
                                            "inline-block h-4 md:h-5 w-4 md:w-5 transform rounded-full bg-white shadow-md transition-transform duration-300",
                                            is2FAEnabled ? 'translate-x-[1.4rem] md:translate-x-6' : 'translate-x-1'
                                        )} />
                                    </button>
                                </div>
                                <p className="text-[11px] md:text-xs text-gray-500 font-medium leading-relaxed">Secure your account with multi-factor authentication for sensitive operations.</p>
                            </div>
                            <div className="p-5 md:p-6 bg-gray-50/50 border border-gray-100 rounded-2xl space-y-4 group">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all shrink-0">
                                        <Key className="w-4 md:w-5 h-4 md:h-5" />
                                    </div>
                                    <h4 className="text-sm font-black text-gray-900">Update Password</h4>
                                </div>
                                <p className="text-[11px] md:text-xs text-gray-500 font-medium leading-relaxed">Ensure a strong, unique password to maintain platform safety.</p>
                                <button
                                    onClick={() => setIsPasswordModalOpen(true)}
                                    className="text-[9px] md:text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all"
                                >
                                    Launch Change Dialog <ChevronRight className="w-3 h-3" />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Recent Sessions</h4>
                            <div className="space-y-3">
                                {[
                                    { id: 1, device: 'Safari - MacBook Pro', ip: '192.168.1.1', time: 'Active Now', status: 'Online' },
                                    { id: 2, device: 'Chrome - Linux Server', ip: '45.12.89.5', time: 'Yesterday, 10:15 PM', status: 'Logged Out' },
                                ].map((session) => (
                                    <div key={session.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl group hover:border-indigo-100 transition-all gap-2">
                                        <div className="flex items-center gap-4">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] shrink-0" />
                                            <div>
                                                <p className="text-xs font-black text-gray-900">{session.device}</p>
                                                <p className="text-[9px] md:text-[10px] font-bold text-gray-400 italic">IP: {session.ip}</p>
                                            </div>
                                        </div>
                                        <span className="text-[9px] md:text-[10px] font-bold text-gray-500 ml-6 sm:ml-0">{session.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* SECTION 5: Role & Permissions using DataTable */}
                    <div className="space-y-4">
                        <div className="overflow-x-auto -mx-1 px-1">
                            <DataTable
                                columns={permissionColumns}
                                data={permissions}
                                title="Permissions Profile"
                                subtitle="Defined system access capabilities"
                            />
                        </div>
                        <div className="premium-card p-4 md:p-6 bg-gray-50/50 border-t border-gray-100 -mt-8">
                            <p className="text-[9px] md:text-[10px] text-gray-400 font-bold italic text-center">Contact high-tier administrators to modify specific module permissions.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Password Update Modal */}
            <Modal isOpen={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)} title="Update Admin Password">
                <div className="space-y-5 md:space-y-6">
                    <div className="flex bg-indigo-50 p-4 rounded-xl items-start gap-3 md:gap-4 border border-indigo-100">
                        <div className="p-2 bg-indigo-600 rounded-lg text-white shrink-0">
                            <Key className="w-4 h-4" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-gray-900">Security Protocol</h4>
                            <p className="text-[10px] md:text-[11px] text-gray-500 mt-1 leading-relaxed">Updating your password will invalidate all current active sessions for security purposes.</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Current Password</label>
                            <input type="password" placeholder="••••••••" className="w-full bg-gray-50/50 border border-gray-200 focus:border-indigo-500 focus:bg-white rounded-xl px-4 py-3 text-sm outline-none transition-all placeholder:text-gray-300" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">New Password</label>
                                <input type="password" placeholder="••••••••" className="w-full bg-gray-50/50 border border-gray-200 focus:border-indigo-500 focus:bg-white rounded-xl px-4 py-3 text-sm outline-none transition-all placeholder:text-gray-300" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Confirm New Password</label>
                                <input type="password" placeholder="••••••••" className="w-full bg-gray-50/50 border border-gray-200 focus:border-indigo-500 focus:bg-white rounded-xl px-4 py-3 text-sm outline-none transition-all placeholder:text-gray-300" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-100">
                        <Button variant="secondary" onClick={() => setIsPasswordModalOpen(false)} className="w-full sm:w-auto">
                            Cancel
                        </Button>
                        <Button variant="primary" className="bg-indigo-600 shadow-lg shadow-indigo-100 px-8 w-full sm:w-auto">
                            Update Password
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Public Identity Modal */}
            <Modal isOpen={isIdentityModalOpen} onClose={() => setIsIdentityModalOpen(false)} title="Update Public Identity">
                <div className="space-y-5 md:space-y-6">
                    <div className="flex bg-indigo-50 p-4 rounded-xl items-start gap-3 md:gap-4 border border-indigo-100">
                        <div className="p-2 bg-indigo-600 rounded-lg text-white shrink-0">
                            <User className="w-4 h-4" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-gray-900">Public Protocol</h4>
                            <p className="text-[10px] md:text-[11px] text-gray-500 mt-1 leading-relaxed">These details are visible to other team members and in activity logs.</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-center mb-4 md:mb-6">
                            <div className="relative group">
                                <div
                                    onClick={triggerFileInput}
                                    className={clsx(
                                        "w-20 h-20 md:w-24 md:h-24 rounded-2xl md:rounded-3xl border-2 flex flex-col items-center justify-center transition-all cursor-pointer overflow-hidden shadow-inner",
                                        profileImage ? "border-indigo-500 bg-white" : "border-dashed border-indigo-200 bg-gray-50 group-hover:bg-indigo-50"
                                    )}
                                >
                                    {profileImage ? (
                                        <div className="relative w-full h-full">
                                            <img src={profileImage} className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-40" />
                                            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                <Upload className="w-5 md:w-6 h-5 md:h-6 text-indigo-600 mb-1" />
                                                <span className="text-[7px] md:text-[8px] font-black text-indigo-600 uppercase">Change Photo</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                            <Upload className="w-5 md:w-6 h-5 md:h-6 mb-1" />
                                            <span className="text-[7px] md:text-[8px] font-bold uppercase">Upload</span>
                                        </div>
                                    )}
                                </div>
                                {profileImage && (
                                    <button
                                        onClick={(e) => { e.stopPropagation(); removeImage(); }}
                                        className="absolute -top-1.5 -right-1.5 p-1 md:p-1.5 bg-white text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all shadow-md border border-gray-100"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Full Display Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={tempAdminData.name}
                                        onChange={handleTempInputChange}
                                        className="w-full bg-gray-50/50 border border-gray-200 focus:border-indigo-500 focus:bg-white rounded-xl px-11 md:px-12 py-2.5 md:py-3 text-sm outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Contact Email</label>
                                <div className="relative">
                                    <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={tempAdminData.email}
                                        onChange={handleTempInputChange}
                                        className="w-full bg-gray-50/50 border border-gray-200 focus:border-indigo-500 focus:bg-white rounded-xl px-11 md:px-12 py-2.5 md:py-3 text-sm outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Primary Mobile</label>
                                <div className="relative">
                                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                    <input
                                        type="text"
                                        name="phone"
                                        value={tempAdminData.phone}
                                        onChange={handleTempInputChange}
                                        className="w-full bg-gray-50/50 border border-gray-200 focus:border-indigo-500 focus:bg-white rounded-xl px-11 md:px-12 py-2.5 md:py-3 text-sm outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-100">
                        <Button variant="secondary" onClick={() => setIsIdentityModalOpen(false)} className="w-full sm:w-auto">
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            className="bg-indigo-600 shadow-lg shadow-indigo-100 px-8 w-full sm:w-auto"
                            onClick={handleUpdateIdentity}
                        >
                            Update Identity
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AdminProfile;
