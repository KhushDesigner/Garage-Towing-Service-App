import React, { useState } from 'react';
import {
    Smartphone,
    Mail,
    Globe,
    Bell,
    ShieldCheck,
    MapPin,
    LogOut,
    Save,
    Plus,
    Trash2,
    Users,
    SmartphoneNfc,
    Building2,
    CheckCircle2,
    Lock,
    ChevronDown
} from 'lucide-react';

const Settings = () => {
    const [appSettings, setAppSettings] = useState({
        appName: 'Garage & Towing Service App',
        supportEmail: 'support@garagetow.com',
        currency: 'INR (₹)',
        timezone: '(GMT+05:30) India Standard Time'
    });

    const [notifications, setNotifications] = useState({
        email: true,
        smd: true,
        push: true,
        systemAlerts: true
    });

    const [cities, setCities] = useState(['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Chennai']);
    const [newCity, setNewCity] = useState('');

    const roles = [
        { id: 1, name: 'Vikram Singh', role: 'Super Admin', email: 'vikram@garagetow.com' },
        { id: 2, name: 'Anjali Reddy', role: 'Operations Head', email: 'anjali@garagetow.com' },
        { id: 3, name: 'Rahul Mehra', role: 'Support Lead', email: 'rahul@garagetow.com' }
    ];

    const toggleNotification = (key) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const addCity = () => {
        if (newCity && !cities.includes(newCity)) {
            setCities([...cities, newCity]);
            setNewCity('');
        }
    };

    const removeCity = (city) => {
        setCities(cities.filter(c => c !== city));
    };

    return (
        <div className="max-w-5xl space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">System Settings</h1>
                    <p className="text-sm text-gray-500 font-medium">Global configuration and administrative control panel.</p>
                </div>
                <button className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 group">
                    <Save className="w-4 h-4 group-hover:scale-110 transition-transform" /> Save Global Changes
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Left Column: Form Sections */}
                <div className="lg:col-span-2 space-y-10">

                    {/* App Settings Section */}
                    <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                                <Smartphone className="w-5 h-5" />
                            </div>
                            <h2 className="text-lg font-black text-gray-900">App Settings</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Platform Name</label>
                                <input
                                    type="text"
                                    value={appSettings.appName}
                                    onChange={(e) => setAppSettings({ ...appSettings, appName: e.target.value })}
                                    className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl px-5 py-3 text-sm font-bold outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Support Email</label>
                                <input
                                    type="email"
                                    value={appSettings.supportEmail}
                                    onChange={(e) => setAppSettings({ ...appSettings, supportEmail: e.target.value })}
                                    className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl px-5 py-3 text-sm font-bold outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Default Currency</label>
                                <select className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl px-5 py-3 text-sm font-bold outline-none transition-all">
                                    <option>INR (₹) - Indian Rupee</option>
                                    <option>USD ($) - US Dollar</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">System Timezone</label>
                                <select className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl px-5 py-3 text-sm font-bold outline-none transition-all">
                                    <option>(GMT+05:30) India Standard Time</option>
                                    <option>(GMT+00:00) UTC</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* Admin Role Management Section */}
                    <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
                                    <Users className="w-5 h-5" />
                                </div>
                                <h2 className="text-lg font-black text-gray-900">Admin Staff & Roles</h2>
                            </div>
                            <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-600 hover:text-white transition-all">
                                Add New Access
                            </button>
                        </div>

                        <div className="space-y-3">
                            {roles.map((admin) => (
                                <div key={admin.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-gray-200 transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-gray-400 font-black">
                                            {admin.name[0]}
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-gray-900">{admin.name}</p>
                                            <p className="text-xs text-gray-500 font-medium">{admin.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="px-3 py-1 bg-white border border-gray-100 rounded-lg text-[10px] font-black uppercase text-gray-600 tracking-tight">
                                            {admin.role}
                                        </span>
                                        <button className="text-gray-300 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column: Dynamic Lists & Actions */}
                <div className="space-y-10">

                    {/* Notification Toggles */}
                    <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-amber-50 rounded-xl text-amber-600">
                                <Bell className="w-5 h-5" />
                            </div>
                            <h2 className="text-lg font-black text-gray-900">Alert Center</h2>
                        </div>

                        <div className="space-y-5">
                            {Object.entries(notifications).map(([key, val]) => (
                                <div key={key} className="flex items-center justify-between">
                                    <p className="text-sm font-black text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                                    <button
                                        onClick={() => toggleNotification(key)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${val ? 'bg-blue-600' : 'bg-gray-200'}`}
                                    >
                                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${val ? 'translate-x-6' : 'translate-x-1'}`} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* City Management */}
                    <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
                                <Building2 className="w-5 h-5" />
                            </div>
                            <h2 className="text-lg font-black text-gray-900">Operational Cities</h2>
                        </div>

                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newCity}
                                onChange={(e) => setNewCity(e.target.value)}
                                placeholder="Add City..."
                                className="flex-1 bg-gray-50 rounded-xl px-4 py-2 text-xs font-bold outline-none border border-transparent focus:border-emerald-600 transition-all"
                            />
                            <button onClick={addCity} className="p-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors">
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {cities.map((city) => (
                                <div key={city} className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-xl group">
                                    <span className="text-[10px] font-black text-gray-600 uppercase tracking-tight">{city}</span>
                                    <button onClick={() => removeCity(city)} className="text-gray-300 hover:text-red-600 transition-colors">
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Account Security & Logout */}
                    <div className="space-y-4">
                        <button className="w-full flex items-center justify-between px-8 py-5 bg-white border border-gray-100 rounded-3xl hover:bg-gray-50 transition-all group shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-gray-100 rounded-xl text-gray-500 group-hover:bg-gray-900 group-hover:text-white transition-all">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <span className="text-sm font-black text-gray-900">Security & Password</span>
                            </div>
                            <ChevronDown className="w-5 h-5 text-gray-300 -rotate-90" />
                        </button>

                        <button className="w-full flex items-center justify-center gap-3 py-5 bg-red-50 text-red-600 font-black text-xs uppercase tracking-[0.2em] rounded-3xl hover:bg-red-600 hover:text-white transition-all border border-red-100 hover:shadow-lg hover:shadow-red-100">
                            <LogOut className="w-5 h-5" /> Sign Out from Admin Panel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Local X component for city chips
const X = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

export default Settings;
