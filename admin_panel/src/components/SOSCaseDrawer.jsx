import React, { useEffect, useState } from 'react';
import {
    X,
    MapPin,
    Phone,
    Store,
    CheckCircle,
    MessageSquare,
    AlertOctagon,
    Car,
    Battery,
    Wifi,
    Clock,
    Activity,
    User,
    RefreshCw,
    Navigation,
    Shield,
    Radio,
    ChevronRight,
} from 'lucide-react';
import clsx from 'clsx';
import Button from './common/Button';

/* ── Small helper: severity-aware coloring ── */
const severityConfig = {
    high: {
        bg: 'bg-rose-600',
        light: 'bg-rose-50',
        border: 'border-rose-200',
        text: 'text-rose-600',
        badge: 'bg-rose-100 text-rose-700 border-rose-200',
    },
    medium: {
        bg: 'bg-amber-500',
        light: 'bg-amber-50',
        border: 'border-amber-200',
        text: 'text-amber-600',
        badge: 'bg-amber-100 text-amber-700 border-amber-200',
    },
};

/* ── Signal strength helper ── */
const signalColor = (strength) => {
    if (strength === 'Good') return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    if (strength === 'Weak') return 'text-amber-600 bg-amber-50 border-amber-100';
    return 'text-rose-600 bg-rose-50 border-rose-100'; // Critical
};

/* ── Battery level helper ── */
const batteryColor = (level) => {
    const pct = parseInt(level);
    if (pct > 60) return 'text-emerald-600';
    if (pct > 25) return 'text-amber-600';
    return 'text-rose-600';
};

/* ── Timeline stub data ── */
const TIMELINE = [
    { label: 'SOS Signal Triggered', time: '2 mins ago', icon: AlertOctagon, color: 'text-rose-500 bg-rose-50 border-rose-100' },
    { label: 'Command Center Notified', time: '1 min 48s ago', icon: Radio, color: 'text-indigo-500 bg-indigo-50 border-indigo-100' },
    { label: 'Responder Dispatched', time: '1 min 12s ago', icon: Navigation, color: 'text-blue-500 bg-blue-50 border-blue-100' },
    { label: 'ETA Estimated', time: '55s ago', icon: Clock, color: 'text-amber-500 bg-amber-50 border-amber-100' },
];

/* ═══════════════════════════════════════════ */
const SOSCaseDrawer = ({ alert, isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState('overview');

    /* Esc key to close */
    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    /* Lock body scroll */
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    /* Reset tab on open */
    useEffect(() => {
        if (isOpen) setActiveTab('overview');
    }, [isOpen]);

    if (!isOpen || !alert) return null;

    const sev = severityConfig[alert.severity] ?? severityConfig.medium;

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'responder', label: 'Responder' },
        { id: 'timeline', label: 'Timeline' },
    ];

    return (
        <>
            {/* ── Backdrop ── */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-in fade-in duration-200"
                onClick={onClose}
            />

            {/* ── Drawer panel ── */}
            <div
                className={clsx(
                    'fixed z-50 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out flex-1 overflow-y-auto custom-scrollbar',
                    // Mobile: bottom sheet (slides up from bottom, leaves a header gap)
                    'inset-x-0 bottom-0 top-14 rounded-t-3xl',
                    // sm+: right side panel
                    'sm:inset-y-0 sm:left-auto sm:right-0 sm:top-0 sm:rounded-none sm:max-w-[520px] sm:w-full',
                    isOpen
                        ? 'translate-y-0 sm:translate-x-0'
                        : 'translate-y-full sm:translate-y-0 sm:translate-x-full'
                )}
            >
                {/* ─ Mobile drag handle ─ */}
                <div className="sm:hidden flex justify-center pt-3 pb-1 shrink-0">
                    <div className="w-10 h-1.5 bg-gray-200 rounded-full" />
                </div>

                {/* ── HEADER ── */}
                <div className={clsx('relative shrink-0 overflow-hidden', 'bg-slate-900')}>
                    {/* Glow blob */}
                    <div className={clsx(
                        'absolute top-0 right-0 w-80 h-80 rounded-full blur-[90px] -mr-28 -mt-28 opacity-25',
                        alert.severity === 'high' ? 'bg-rose-500' : 'bg-amber-500'
                    )} />

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 sm:top-5 sm:right-5 z-10 w-9 h-9 flex items-center justify-center rounded-2xl bg-white/10 hover:bg-rose-600 text-white transition-all active:scale-90"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="relative z-[1] p-4 sm:p-8 space-y-3 sm:space-y-4">
                        {/* Top badges row */}
                        <div className="flex items-center gap-2 sm:gap-3 flex-wrap pr-12">
                            <span className={clsx(
                                'px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg text-white',
                                sev.bg
                            )}>
                                {alert.severity === 'high' ? '🔴 CRITICAL' : '🟡 MEDIUM'}
                            </span>
                            <span className="text-gray-400 text-xs font-black tracking-widest uppercase">
                                {alert.id}
                            </span>
                            <span className="ml-auto flex items-center gap-1.5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                <Clock className="w-3 h-3" />
                                {alert.time}
                            </span>
                        </div>

                        {/* User name + location */}
                        <div>
                            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-1 sm:mb-2">
                                {alert.user}
                            </h2>
                            <div className="space-y-1.5">
                                <div className="flex items-start gap-2 text-gray-400">
                                    <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                                    <span className="text-xs font-bold leading-snug">{alert.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                                    <span className="text-xs font-bold">{alert.phone}</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick stat pills */}
                        <div className="flex flex-wrap gap-2">
                            <span className={clsx(
                                'flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[10px] font-black border',
                                batteryColor(alert.batteryLevel),
                                'bg-white/10 border-white/10 text-white'
                            )}>
                                <Battery className="w-3 h-3" />
                                {alert.batteryLevel}
                            </span>
                            <span className={clsx(
                                'flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[10px] font-black border',
                                'bg-white/10 border-white/10 text-white'
                            )}>
                                <Wifi className="w-3 h-3" />
                                {alert.signalStrength}
                            </span>
                            <span className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/10 border border-white/10 rounded-xl text-[10px] font-black text-white">
                                <Car className="w-3 h-3" />
                                {alert.vehicle}
                            </span>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-t border-white/10">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={clsx(
                                    'flex-1 py-3 text-[11px] sm:text-xs font-black uppercase tracking-widest transition-all',
                                    activeTab === tab.id
                                        ? 'text-white border-b-2 border-rose-500 bg-white/5'
                                        : 'text-gray-500 hover:text-gray-300'
                                )}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── SCROLLABLE BODY ── */}
                <div className="flex-1">

                    {/* ─ TAB: Overview ─ */}
                    {activeTab === 'overview' && (
                        <div className="p-4 sm:p-8 space-y-4 sm:space-y-5 animate-in fade-in duration-200">
                            {/* Situation Assessment */}
                            <div className={clsx(
                                'p-3.5 sm:p-5 rounded-2xl border',
                                sev.light, sev.border
                            )}>
                                <p className={clsx('text-[10px] font-black uppercase tracking-[0.2em] mb-2 sm:mb-3 leading-none', sev.text)}>
                                    Situation Assessment
                                </p>
                                <p className="text-sm sm:text-base font-bold text-gray-800 leading-relaxed italic">
                                    "{alert.description}"
                                </p>
                            </div>

                            {/* Caller details */}
                            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-3.5 sm:p-5">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 leading-none">
                                    Caller Details
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 text-lg font-black shadow-sm border border-indigo-100 shrink-0">
                                        {alert.user.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-black text-gray-900 truncate">{alert.user}</p>
                                        <p className="text-xs font-bold text-gray-400 mt-0.5">{alert.phone}</p>
                                    </div>
                                    <div className="flex gap-2 shrink-0">
                                        <button className="w-9 h-9 bg-emerald-50 border border-emerald-100 hover:bg-emerald-600 hover:text-white text-emerald-600 rounded-xl flex items-center justify-center transition-all active:scale-90">
                                            <Phone className="w-4 h-4" />
                                        </button>
                                        <button className="w-9 h-9 bg-blue-50 border border-blue-100 hover:bg-blue-600 hover:text-white text-blue-600 rounded-xl flex items-center justify-center transition-all active:scale-90">
                                            <MessageSquare className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Quick actions */}
                            <div className="grid grid-cols-2 gap-3">
                                <Button
                                    variant="primary"
                                    // className="bg-gray-900 hover:bg-rose-600 shadow-xl shadow-gray-200 py-3.5"
                                    leftIcon={<Phone className="w-4 h-4" />}
                                >
                                    Voice Dispatch
                                </Button>
                                <Button
                                    variant="outline"
                                    // className="py-3.5"
                                    leftIcon={<MessageSquare className="w-4 h-4" />}
                                >
                                    Live Chat
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* ─ TAB: Responder ─ */}
                    {activeTab === 'responder' && (
                        <div className="p-5 sm:p-8 space-y-5 animate-in fade-in duration-200">
                            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-4 sm:p-6 space-y-5">
                                {/* Partner info */}
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm border border-gray-100 shrink-0">
                                        <Store className="w-7 h-7" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-black text-gray-900 truncate">
                                            {alert.partner}
                                        </p>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mt-1">
                                            Active Dispatcher
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-xl text-[10px] font-black text-emerald-700 shrink-0">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        Live
                                    </div>
                                </div>

                                {/* ETA & Distance */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-white rounded-2xl border border-gray-100 p-3 text-center">
                                        <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">ETA</p>
                                        <p className="text-xl font-black text-gray-900 mt-1">8 min</p>
                                    </div>
                                    <div className="bg-white rounded-2xl border border-gray-100 p-3 text-center">
                                        <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Distance</p>
                                        <p className="text-xl font-black text-gray-900 mt-1">3.2 km</p>
                                    </div>
                                </div>

                                {/* Status trail */}
                                <div className="space-y-2">
                                    {[
                                        { label: 'Accepted', done: true },
                                        { label: 'En Route', done: true },
                                        { label: 'On Site', done: false },
                                        { label: 'Resolved', done: false },
                                    ].map((step, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className={clsx(
                                                'w-5 h-5 rounded-full flex items-center justify-center shrink-0',
                                                step.done ? 'bg-emerald-500' : 'bg-gray-200'
                                            )}>
                                                {step.done && <CheckCircle className="w-3 h-3 text-white" />}
                                            </div>
                                            <div className={clsx(
                                                'flex-1 h-px',
                                                step.done ? 'bg-emerald-200' : 'bg-gray-100'
                                            )} />
                                            <span className={clsx(
                                                'text-[10px] font-black uppercase tracking-widest w-20 text-right',
                                                step.done ? 'text-emerald-600' : 'text-gray-300'
                                            )}>
                                                {step.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    variant="outline"
                                    className="w-full py-3"
                                    leftIcon={<RefreshCw className="w-4 h-4" />}
                                >
                                    Reassign Response Unit
                                </Button>
                            </div>

                            {/* Contact partner */}
                            <div className="grid grid-cols-2 gap-3">
                                <Button
                                    variant="primary"
                                    className="bg-gray-900 hover:bg-indigo-600 shadow-xl shadow-gray-200 py-3.5"
                                    leftIcon={<Phone className="w-4 h-4" />}
                                >
                                    Call Partner
                                </Button>
                                <Button
                                    variant="outline"
                                    className="py-3.5"
                                    leftIcon={<Navigation className="w-4 h-4" />}
                                >
                                    Track Route
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* ─ TAB: Timeline ─ */}
                    {activeTab === 'timeline' && (
                        <div className="p-5 sm:p-8 animate-in fade-in duration-200">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-5 leading-none">
                                Incident Timeline
                            </p>
                            <div className="relative space-y-1">
                                {/* Vertical line */}
                                <div className="absolute left-[18px] top-6 bottom-6 w-px bg-gray-100" />

                                {TIMELINE.map((event, i) => (
                                    <div key={i} className="relative flex items-start gap-4 py-3 group">
                                        <div className={clsx(
                                            'w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 relative z-[1]',
                                            event.color
                                        )}>
                                            <event.icon className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1 min-w-0 pt-1.5 pb-2 border-b border-gray-50 group-last:border-0">
                                            <p className="text-sm font-black text-gray-900">{event.label}</p>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                                                {event.time}
                                            </p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-200 mt-2 shrink-0" />
                                    </div>
                                ))}

                                {/* Pending entry */}
                                <div className="relative flex items-start gap-4 py-3 opacity-40">
                                    <div className="w-9 h-9 rounded-xl border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center shrink-0 relative z-[1]">
                                        <Activity className="w-4 h-4 text-gray-300" />
                                    </div>
                                    <div className="flex-1 pt-1.5">
                                        <p className="text-sm font-black text-gray-400">On-Site Arrival</p>
                                        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mt-0.5">
                                            Pending...
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* ── FOOTER ── */}
                <div className="p-3.5 sm:p-6 border-t border-gray-100 bg-white shrink-0 space-y-2">
                    <Button
                        variant="primary"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-100 py-3 sm:py-4"
                        leftIcon={<CheckCircle className="w-5 h-5" />}
                    >
                        Resolve SOS Incident
                    </Button>
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="w-full py-2.5 sm:py-3.5"
                        leftIcon={<Shield className="w-4 h-4" />}
                    >
                        Escalate to Senior Admin
                    </Button>
                </div>
            </div>
        </>
    );
};

export default SOSCaseDrawer;
