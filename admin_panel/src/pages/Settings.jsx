import React, { useState } from 'react';
import {
    Smartphone,
    Bell,
    MapPin,
    LogOut,
    Save,
    Plus,
    Trash2,
    Users,
    Building2,
    Lock,
    X,
    ChevronRight
} from 'lucide-react';
import Button from '../components/common/Button';
import DataTable from '../components/common/DataTable';
import clsx from 'clsx';

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

    const columns = [
        {
            header: 'Administrator',
            key: 'name',
            render: (val, row) => (
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-50 border border-indigo-100 rounded-xl shadow-sm flex items-center justify-center text-indigo-600 font-extrabold text-sm uppercase">
                        {val[0]}
                    </div>
                    <div>
                        <p className="text-sm font-black text-gray-900 uppercase tracking-tight">{val}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mt-1">{row.email}</p>
                    </div>
                </div>
            )
        },
        {
            header: 'Access Level',
            key: 'role',
            align: 'center',
            render: (val) => (
                <span className="px-3 py-1 bg-white border border-gray-100 rounded-lg text-[10px] font-black uppercase text-gray-600 tracking-widest shadow-sm">
                    {val}
                </span>
            )
        },
        {
            header: 'Operations',
            key: 'id',
            align: 'right',
            render: (val) => (
                <button className="p-2 text-gray-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all">
                    <Trash2 className="w-4 h-4" />
                </button>
            )
        }
    ];

    return (
        <div className="space-y-6 md:space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">System Settings</h1>
                    <p className="text-gray-500 font-medium mt-1 text-sm">Global configuration and administrative control panel.</p>
                </div>
                <Button
                    variant="primary"
                    className="bg-indigo-600 shadow-xl shadow-indigo-100 h-12 px-8"
                    leftIcon={<Save className="w-4 h-4 group-hover:scale-110" />}
                >
                    Save Global Changes
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                {/* Left Column: Form Sections */}
                <div className="lg:col-span-2 space-y-4 md:space-y-6">

                    {/* App Settings Section */}
                    <section className="premium-card p-5 md:p-6 border border-gray-100 space-y-8">
                        <div className="flex items-center gap-3">
                            {/* <div className="p-2.5 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-600 shadow-sm">
                                <Smartphone className="w-5 h-5" />
                            </div> */}
                            <div className='space-y-0.5'>
                                <h2 className="text-base md:text-md font-black text-gray-900">Platform Core</h2>
                                <p className="text-xs font-medium text-gray-400">Identity & Region protocols</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1 leading-none">Application Identity</label>
                                <input
                                    type="text"
                                    value={appSettings.appName}
                                    onChange={(e) => setAppSettings({ ...appSettings, appName: e.target.value })}
                                    className="w-full bg-gray-50/50 border border-gray-200 focus:border-indigo-600 focus:bg-white rounded-2xl px-5 py-4 text-sm font-black text-gray-900 outline-none transition-all shadow-inner uppercase"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1 leading-none">Global Support Channel</label>
                                <input
                                    type="email"
                                    value={appSettings.supportEmail}
                                    onChange={(e) => setAppSettings({ ...appSettings, supportEmail: e.target.value })}
                                    className="w-full bg-gray-50/50 border border-gray-200 focus:border-indigo-600 focus:bg-white rounded-2xl px-5 py-4 text-sm font-black text-gray-900 outline-none transition-all shadow-inner"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1 leading-none">Operational Currency</label>
                                <div className="relative">
                                    <select className="w-full bg-gray-50/50 border border-gray-200 focus:border-indigo-600 focus:bg-white rounded-2xl px-5 py-4 text-sm font-black text-gray-900 outline-none transition-all shadow-inner appearance-none uppercase">
                                        <option>INR (₹) - Indian Rupee</option>
                                        <option>USD ($) - US Dollar</option>
                                    </select>
                                    <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 rotate-90" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1 leading-none">System Time Protocol</label>
                                <div className="relative">
                                    <select className="w-full bg-gray-50/50 border border-gray-200 focus:border-indigo-600 focus:bg-white rounded-2xl px-5 py-4 text-sm font-black text-gray-900 outline-none transition-all shadow-inner appearance-none uppercase">
                                        <option>(GMT+05:30) India Standard Time</option>
                                        <option>(GMT+00:00) UTC</option>
                                    </select>
                                    <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 rotate-90" />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Admin Role Management Section */}
                    <section>
                        <DataTable
                            title="Staffing Nodes"
                            subtitle="Access control list"
                            headerRight={
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                                    leftIcon={<Plus className="w-3.5 h-3.5" />}
                                >
                                    New Access
                                </Button>
                            }
                            columns={columns}
                            data={roles}
                        />
                    </section>
                </div>

                {/* Right Column: Dynamic Lists & Actions */}
                <div className="space-y-4 md:space-y-6">

                    {/* Notification Toggles */}
                    <section className="premium-card p-5 md:p-6 border border-gray-100 space-y-8">
                        <div className="flex items-center gap-3">
                            {/* <div className="p-2.5 bg-amber-50 border border-amber-100 rounded-xl text-amber-600 shadow-sm">
                                <Bell className="w-5 h-5" />
                            </div> */}
                            <div className='space-y-0.5'>
                                <h2 className="text-base md:text-md font-black text-gray-900">Alert Center</h2>
                                <p className="text-xs font-medium text-gray-400">Notification pipelines</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {Object.entries(notifications).map(([key, val]) => (
                                <div key={key} className="flex items-center justify-between group">
                                    <p className="text-sm font-bold text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                                    <button
                                        onClick={() => toggleNotification(key)}
                                        className={clsx(
                                            "relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 shadow-inner",
                                            val ? 'bg-indigo-600' : 'bg-gray-200'
                                        )}
                                    >
                                        <span className={clsx(
                                            "inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300",
                                            val ? 'translate-x-6' : 'translate-x-1'
                                        )} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* City Management */}
                    <section className="premium-card p-5 md:p-6 border border-gray-100 space-y-8">
                        <div className="flex items-center gap-3">
                            {/* <div className="p-2.5 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-600 shadow-sm">
                                <Building2 className="w-5 h-5" />
                            </div> */}
                            <div className='space-y-0.5'>
                                <h2 className="text-base md:text-md font-black text-gray-900">Service Nodes</h2>
                                <p className="text-xs font-medium text-gray-400">Operational perimeter</p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newCity}
                                onChange={(e) => setNewCity(e.target.value)}
                                placeholder="Add City..."
                                className="flex-1 bg-gray-50 rounded-2xl px-5 py-3 text-xs font-black outline-none border border-transparent focus:border-emerald-600 transition-all shadow-inner uppercase tracking-widest"
                            />
                            <button onClick={addCity} className="p-3 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700 transition-all shadow-md shadow-emerald-100 active:scale-95">
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2.5">
                            {cities.map((city) => (
                                <div key={city} className="flex items-center gap-2.5 bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl group hover:border-indigo-200 transition-all">
                                    <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{city}</span>
                                    <button onClick={() => removeCity(city)} className="text-gray-300 hover:text-rose-600 transition-colors">
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Account Security & Logout */}
                    <div className="space-y-4">
                        <button className="w-full flex items-center justify-between px-8 py-6 bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all group shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 group-hover:bg-gray-900 group-hover:text-white transition-all shadow-sm">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-black text-gray-900 uppercase tracking-tight">Security Protocol</p>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mt-1">Password & Encryption</p>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-900 transition-colors" />
                        </button>

                        <button className="w-full flex items-center justify-center gap-4 py-6 bg-rose-50 text-rose-600 font-black text-[10px] uppercase tracking-[0.25em] rounded-2xl hover:bg-rose-600 hover:text-white transition-all border border-rose-100 shadow-md shadow-rose-50/50 hover:shadow-xl hover:shadow-rose-100 group">
                            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            Sign Out Node Access
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
