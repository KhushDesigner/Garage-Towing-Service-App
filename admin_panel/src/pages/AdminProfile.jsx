import React, { useState } from 'react';
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
    CheckCircle2
} from 'lucide-react';

const AdminProfile = () => {
    const [is2FAEnabled, setIs2FAEnabled] = useState(true);

    // Dummy Permissions Data
    const permissions = [
        { name: 'User Management', level: 'Full Access', status: true },
        { name: 'Financial Reports', level: 'View Only', status: true },
        { name: 'Partner Onboarding', level: 'Edit Access', status: true },
        { name: 'System Settings', level: 'Full Access', status: false },
        { name: 'Dispute Resolution', level: 'Full Access', status: true },
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Admin Profile</h1>
                    <p className="text-sm text-gray-500 font-medium">Manage your account details, security preferences, and permissions.</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="px-4 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-100 flex items-center gap-2">
                        <ShieldCheck className="w-3 h-3" /> System Verified
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT COLUMN: Overview & Stats */}
                <div className="space-y-8">
                    {/* SECTION 1: Profile Overview Card */}
                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 text-center relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-5" />

                        <div className="relative mb-6 inline-block">
                            <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-100">
                                <img
                                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop"
                                    alt="Admin"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <button className="absolute bottom-1 right-1 p-2.5 bg-gray-900 text-white rounded-2xl hover:bg-blue-600 transition-all shadow-lg">
                                <Camera className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-2xl font-black text-gray-900">Vikram Singh</h2>
                            <p className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] bg-blue-50 inline-block px-4 py-1 rounded-full border border-blue-100">Super Admin</p>
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-50 space-y-4 text-left">
                            <div className="flex items-center gap-3 text-gray-600">
                                <Mail className="w-4 h-4 text-gray-400" />
                                <span className="text-xs font-bold">vikram.admin@garagetow.com</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <Phone className="w-4 h-4 text-gray-400" />
                                <span className="text-xs font-bold">+91 98765 43210</span>
                            </div>
                        </div>

                        <button className="mt-8 w-full py-4 bg-gray-50 text-gray-900 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-gray-100 transition-all border border-gray-100">
                            Edit Public Profile
                        </button>
                    </div>

                    {/* SECTION 4: Admin Activity Summary */}
                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 space-y-6">
                        <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Activity Audit</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="p-5 bg-gray-50 rounded-3xl flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Activity className="w-5 h-5 text-emerald-600" />
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-tight leading-none">Total Actions</p>
                                        <p className="text-lg font-black text-gray-900 mt-1">1,248</p>
                                    </div>
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                            </div>
                            <div className="p-5 bg-gray-50 rounded-3xl flex items-center gap-3">
                                <History className="w-5 h-5 text-blue-600" />
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-tight leading-none">Last Login</p>
                                    <p className="text-sm font-black text-gray-900 mt-1">Today, 09:42 AM</p>
                                </div>
                            </div>
                            <div className="p-5 bg-gray-50 rounded-3xl flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-indigo-600" />
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-tight leading-none">Joined Date</p>
                                    <p className="text-sm font-black text-gray-900 mt-1">12 Jan 2024</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Settings & Security */}
                <div className="lg:col-span-2 space-y-8">

                    {/* SECTION 2: Personal Information Form */}
                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white">
                                <User className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-black text-gray-900">Personal Information</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                <input
                                    type="text"
                                    defaultValue="Vikram Singh"
                                    className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl px-5 py-4 text-sm font-bold outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                <input
                                    type="email"
                                    defaultValue="vikram.admin@garagetow.com"
                                    className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl px-5 py-4 text-sm font-bold outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                                <input
                                    type="text"
                                    defaultValue="+91 98765 43210"
                                    className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl px-5 py-4 text-sm font-bold outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Administrative Role</label>
                                <select className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl px-5 py-4 text-sm font-bold outline-none transition-all">
                                    <option>Super Admin</option>
                                    <option>Manager</option>
                                    <option>Operations Head</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 pt-4">
                            <button className="flex-1 py-4 bg-gray-900 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-blue-600 transition-all shadow-lg shadow-gray-200 flex items-center justify-center gap-2">
                                <Save className="w-4 h-4" /> Save Changes
                            </button>
                            <button className="flex-1 py-4 bg-white text-gray-600 font-bold text-xs uppercase tracking-widest rounded-2xl hover:bg-gray-50 transition-all border border-gray-100 flex items-center justify-center gap-2">
                                <Edit3 className="w-4 h-4" /> Reset Form
                            </button>
                        </div>
                    </div>

                    {/* SECTION 3: Security Settings */}
                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 space-y-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-black text-gray-900">Security Control</h3>
                            </div>
                            <div className="text-right">
                                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-lg">High Protection</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* 2FA Toggle */}
                            <div className="p-6 bg-gray-50 rounded-[2rem] space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Smartphone className="w-5 h-5 text-indigo-600" />
                                        <h4 className="text-sm font-black text-gray-900">2FA Authentication</h4>
                                    </div>
                                    <button
                                        onClick={() => setIs2FAEnabled(!is2FAEnabled)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${is2FAEnabled ? 'bg-emerald-500' : 'bg-gray-300'}`}
                                    >
                                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${is2FAEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 font-medium leading-relaxed">Secure your account with multi-factor authentication for sensitive operations.</p>
                            </div>

                            {/* Password Quick Change */}
                            <div className="p-6 bg-gray-50 rounded-[2rem] space-y-4">
                                <div className="flex items-center gap-3">
                                    <Key className="w-5 h-5 text-indigo-600" />
                                    <h4 className="text-sm font-black text-gray-900">Update Password</h4>
                                </div>
                                <p className="text-xs text-gray-500 font-medium leading-relaxed">Ensure a strong, unique password to maintain platform safety.</p>
                                <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Launch Change Dialog →</button>
                            </div>
                        </div>

                        {/* Login Activity */}
                        <div className="space-y-4">
                            <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Recent Sessions</h4>
                            <div className="space-y-3">
                                {[
                                    { device: 'Safari - MacBook Pro', ip: '192.168.1.1', time: 'Active Now', status: 'Online' },
                                    { device: 'Chrome - Linux Server', ip: '45.12.89.5', time: 'Yesterday, 10:15 PM', status: 'Logged Out' },
                                ].map((session, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl group hover:border-indigo-100 transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                            <div>
                                                <p className="text-xs font-black text-gray-900">{session.device}</p>
                                                <p className="text-[10px] font-bold text-gray-400 italic">IP: {session.ip}</p>
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-500">{session.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* SECTION 5: Role & Permissions */}
                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-emerald-600 rounded-2xl flex items-center justify-center text-white">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-gray-900">Permissions Profile</h3>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Defined system access capabilities</p>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/50 text-gray-500 font-black text-[10px] uppercase tracking-widest border-b border-gray-100">
                                    <tr>
                                        <th className="px-8 py-5">Permission Module</th>
                                        <th className="px-8 py-5">Access Level</th>
                                        <th className="px-8 py-5 text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50/50">
                                    {permissions.map((perm, i) => (
                                        <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-8 py-5">
                                                <span className="text-xs font-black text-gray-800 tracking-tight">{perm.name}</span>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tight ${perm.level === 'Full Access' ? 'bg-blue-50 text-blue-600' :
                                                        perm.level === 'Edit Access' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500'
                                                    }`}>
                                                    {perm.level}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <span className={`text-[10px] font-black uppercase ${perm.status ? 'text-emerald-500' : 'text-gray-300'}`}>
                                                        {perm.status ? 'Enabled' : 'Disabled'}
                                                    </span>
                                                    <div className={`w-2 h-2 rounded-full ${perm.status ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]' : 'bg-gray-200'}`} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-6 bg-gray-50/50 border-t border-gray-100">
                            <p className="text-[10px] text-gray-400 font-bold italic text-center">Contact high-tier administrators to modify specific module permissions.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Internal icon component for directional indicator
const ArrowUpRight = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
);

export default AdminProfile;
