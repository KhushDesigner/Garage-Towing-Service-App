import React, { useState } from 'react';
import {
    AlertOctagon,
    Clock,
    MapPin,
    User,
    ShieldAlert,
    Phone,
    Navigation,
    MoreVertical,
    Search,
    ChevronDown,
    Activity,
    Plus,
    Minus,
    BellRing,
    Radio,
    ChevronRight,
    ArrowUpRight,
    MessageSquare,
    CheckCircle,
    Filter,
    Store,
    Eye,
    Car,
    X
} from 'lucide-react';
import {
    Drawer,
    IconButton,
} from '@mui/material';
import StatusBadge from '../components/StatusBadge';
import MetricCard from '../components/MetricCard';
import clsx from 'clsx';

const SOSAlerts = () => {
    const [selectedAlert, setSelectedAlert] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Dummy Emergency Data
    const [emergencyAlerts] = useState([
        {
            id: 'SOS-9901',
            user: 'Rahul Malhotra',
            phone: '+91 98765 43210',
            location: 'Western Express Highway, Near Goregaon',
            partner: 'Quick Fix Garage',
            time: '2 mins ago',
            status: 'Urgent',
            coords: { x: 45, y: 32 },
            severity: 'high',
            description: 'Major engine failure and smoke reported from the cabin. Vehicle stranded in high-traffic zone.',
            vehicle: 'Maruti Suzuki Swift (MH-01-AX-1234)',
            batteryLevel: '12%',
            signalStrength: 'Critical'
        },
        {
            id: 'SOS-9902',
            user: 'Sneha Gupta',
            phone: '+91 87654 32109',
            location: 'S.V. Road, Malad West',
            partner: 'Highway Pros',
            time: '5 mins ago',
            status: 'In Progress',
            coords: { x: 28, y: 56 },
            severity: 'medium',
            description: 'Flat tire on front-left wheel. Spare tire jack is missing.',
            vehicle: 'Honda City (MH-02-CP-5678)',
            batteryLevel: '84%',
            signalStrength: 'Good'
        },
        {
            id: 'SOS-9903',
            user: 'Amit Singh',
            phone: '+91 76543 21098',
            location: 'Link Road, Andheri West',
            partner: 'Awaiting Assignment',
            time: 'Just Now',
            status: 'Urgent',
            coords: { x: 62, y: 68 },
            severity: 'high',
            description: 'Accident reported at junction. Front fender damaged, fluids leaking. User sounds panicked.',
            vehicle: 'Toyota Fortuner (MH-04-DZ-9012)',
            batteryLevel: '45%',
            signalStrength: 'Weak'
        }
    ]);

    const handleViewDetails = (alert) => {
        setSelectedAlert(alert);
        setIsModalOpen(true);
    };

    const stats = [
        { title: 'SOS Active Alerts', value: '03', change: '+1', trend: 'up', icon: AlertOctagon, color: 'red' },
        { title: 'Avg Response Time', value: '08:45', change: '-12%', trend: 'down', icon: Clock, color: 'blue' },
    ];

    return (
        <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
            {/* Urgent Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">SOS Command Center</h1>
                    <p className="text-sm md:text-base text-gray-500 font-medium">Real-time emergency tracking and provider dispatch interface.</p>
                </div>
                <div className="flex items-stratch sm:items-center gap-3 flex-col sm:flex-row">
                    <button className="flex-1 text-sm md:text-base md:flex-none inline-flex items-center cursor-pointer justify-center gap-2 px-5 py-2.5 md:py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl md:rounded-2xl hover:border-rose-500 hover:text-rose-600 transition-all shadow-sm active:scale-95 group">
                        <Radio className="w-4 h-4 text-gray-400 group-hover:text-rose-500 transition-colors" />
                        Alert All partners
                    </button>
                    <button className="flex-1 text-sm md:text-base md:flex-none inline-flex items-center cursor-pointer justify-center gap-2 px-5 py-2.5 md:py-3 bg-rose-600 text-white font-bold rounded-xl md:rounded-2xl hover:bg-rose-700 transition-all shadow-lg shadow-rose-200 active:scale-95 group">
                        <BellRing className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
                        Incident Report
                    </button>
                </div>
            </div>

            {/* Quick Stats Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {stats.map((stat, index) => (
                    <MetricCard
                        key={index}
                        title={stat.title}
                        value={stat.value}
                        change={stat.change}
                        trend={stat.trend}
                        icon={stat.icon}
                        color={stat.color}
                    />
                ))}
            </div>

            {/* Live Tracking Map Center */}
            <div className="grid grid-cols-1 gap-4 md:gap-6">
                <div className="bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl overflow-hidden relative group min-h-[450px]">
                    {/* Map Header Overlay */}
                    <div className="absolute top-3 left-3 right-3 md:top-6 md:left-6 md:right-6 z-1 flex justify-between items-center pointer-events-none">
                        <div className="flex items-center gap-2 md:gap-3 px-3 py-2 md:px-4 md:py-2.5 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl pointer-events-auto shadow-2xl">
                            <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-rose-500" />
                            <span className="text-[9px] md:text-[10px] font-black text-white uppercase tracking-widest shrink-0">Live Incident Map</span>
                            <div className="w-px h-4 bg-white/10 mx-1.5 md:mx-2 hidden xs:block"></div>
                            <span className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest shrink-0 hidden xs:block">Goregaon Region</span>
                        </div>

                        <div className="flex gap-1.5 md:gap-2 pointer-events-auto">
                            <button className="p-2 md:p-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl md:rounded-2xl text-white hover:bg-white/20 transition-all">
                                <Plus className="w-4 h-4 md:w-5 md:h-5" />
                            </button>
                            <button className="p-2 md:p-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl md:rounded-2xl text-white hover:bg-white/20 transition-all">
                                <Minus className="w-4 h-4 md:w-5 md:h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Mock Map Texture */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundSize: '80px 80px', backgroundImage: 'radial-gradient(circle, #475569 1.5px, transparent 1.5px)' }}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>

                    {/* Radar Sweep Effect */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden origin-center animate-[spin_10s_linear_infinite]" style={{ background: 'conic-gradient(from 0deg, transparent 0%, rgba(225, 29, 72, 0.05) 50%, transparent 100%)' }}></div>
                    <div className="absolute inset-0 pointer-events-none border-[1px] border-white/5 rounded-full scale-150 animate-pulse"></div>
                    <div className="absolute inset-0 pointer-events-none border-[1px] border-white/5 rounded-full scale-100 animate-pulse delay-75"></div>
                    <div className="absolute inset-0 pointer-events-none border-[1px] border-white/5 rounded-full scale-50 animate-pulse delay-150"></div>

                    {/* Ping Points */}
                    {emergencyAlerts.map((alert) => (
                        <div
                            key={alert.id}
                            className="absolute cursor-pointer transition-all duration-500 hover:scale-110"
                            style={{ left: `${alert.coords.x}%`, top: `${alert.coords.y}%` }}
                        >
                            <div className="relative group/pin">
                                <div className={clsx(
                                    "absolute inset-0 rounded-full animate-ping opacity-25",
                                    alert.severity === 'high' ? 'bg-rose-500' : 'bg-amber-500'
                                )}></div>
                                <div className={clsx(
                                    "w-5 h-5 md:w-6 md:h-6 rounded-full border-[3px] md:border-4 border-slate-900 shadow-2xl relative z-1 transition-transform duration-300",
                                    alert.severity === 'high' ? 'bg-rose-500' : 'bg-amber-500'
                                )}></div>

                                <div className="absolute -left-1/2 bottom-full mb-3 opacity-0 group-hover/pin:opacity-100 transition-all duration-300 pointer-events-none -translate-x-1/2 translate-y-2 group-hover/pin:translate-y-0 z-1">
                                    <div className="bg-white p-3 rounded-2xl shadow-2xl border border-gray-100 w-[180px]">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[10px] font-black text-rose-600 uppercase">{alert.id}</span>
                                            <span className="text-[10px] font-bold text-gray-400">{alert.time}</span>
                                        </div>
                                        <p className="text-xs font-black text-gray-900 truncate mb-1">{alert.user}</p>
                                        <p className="text-[9px] font-medium text-gray-500 leading-tight mb-2">{alert.location}</p>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleViewDetails(alert); }}
                                            className="w-full py-1.5 bg-gray-900 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-rose-600 transition-colors pointer-events-auto"
                                        >
                                            View Intel
                                        </button>
                                    </div>
                                    <div className="w-3 h-3 bg-white rotate-45 mx-auto -mt-1.5 border-r border-b border-gray-100"></div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Bottom Status Ticker */}
                    <div className="absolute bottom-3 left-3 right-3 md:bottom-6 md:left-6 md:right-6 z-1 flex justify-between items-center bg-slate-800/50 backdrop-blur-xl border border-white/5 p-3 md:p-4 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                        <div className="flex items-center gap-2 md:gap-4 overflow-hidden">
                            <span className="flex items-center gap-1.5 md:gap-2 text-[9px] md:text-[10px] font-black text-emerald-400 uppercase tracking-widest whitespace-nowrap">
                                <div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                                Online
                            </span>
                            <div className="w-px h-4 bg-white/10 shrink-0"></div>
                            <p className="text-[10px] md:text-[11px] font-bold text-gray-300 truncate tracking-tight">Latest: SOS-9903 incoming...</p>
                        </div>
                        <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-bold text-white transition-all uppercase tracking-widest whitespace-nowrap">
                            History <ChevronRight className="w-3 h-3" />
                        </button>
                    </div>
                </div>

                {/* Incident Record Grid */}
                < div className="premium-card overflow-hidden" >
                    <div className="p-5 border-b border-gray-100/50 flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
                        <h3 className="text-base md:text-lg font-bold text-gray-800">
                            Incident Queue
                        </h3>
                        <div className="flex items-center gap-3">
                            <div className="relative group">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search Queue..."
                                    className="w-full pl-11 pr-4 py-2.5 md:py-3.5 bg-white border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm shadow-gray-100"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto relative">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                    <th className="px-4 md:px-6 py-3 md:py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Incident Details</th>
                                    <th className="px-4 md:px-6 py-3 md:py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Stakeholders</th>
                                    <th className="px-4 md:px-6 py-3 md:py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Response ETA</th>
                                    <th className="px-4 md:px-6 py-3 md:py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status Level</th>
                                    <th className="px-4 md:px-6 py-3 md:py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Emergency Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {emergencyAlerts.map((alert) => (
                                    <tr key={alert.id} className="hover:bg-rose-50/10 transition-all group">
                                        <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className={clsx(
                                                    "w-10 h-10 rounded-xl border flex items-center justify-center transition-all group-hover:scale-110",
                                                    alert.severity === 'high' ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-amber-50 border-amber-100 text-amber-600'
                                                )}>
                                                    <AlertOctagon className="w-5 h-5" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-black text-gray-900 tracking-tighter uppercase">{alert.id}</span>
                                                    <div className="flex items-center gap-1.5 mt-0.5">
                                                        <MapPin className="w-3 h-3 text-gray-300" />
                                                        <span className="text-[10px] font-bold text-gray-400 truncate max-w-[140px]">{alert.location}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                                            <div className="flex flex-col gap-1.5">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-5 h-5 rounded-md bg-indigo-50 flex items-center justify-center text-indigo-600">
                                                        <User className="w-3 h-3" />
                                                    </div>
                                                    <span className="text-xs font-bold text-gray-700">{alert.user}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-5 h-5 rounded-md bg-amber-50 flex items-center justify-center text-amber-600">
                                                        <Store className="w-3 h-3" />
                                                    </div>
                                                    <span className="text-xs font-bold text-gray-500 truncate max-w-[150px]">{alert.partner}</span>
                                                </div>
                                            </div>

                                        </td>

                                        <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <div className="p-1.5 bg-gray-50 rounded-lg text-gray-400">
                                                    <Clock className="w-3.5 h-3.5" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold text-gray-700">{alert.time}</span>
                                                    <span className="text-[10px] font-medium text-gray-400">ELAPSED</span>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                                            <span className={clsx(
                                                "inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[10px] font-black border uppercase tracking-wider",
                                                alert.status === 'Urgent' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-amber-100 text-amber-700 border-amber-200'
                                            )}>
                                                <Activity className="w-3.5 h-3.5" />
                                                {alert.status}
                                            </span>
                                        </td>

                                        <td className="px-4 md:px-6 py-3 md:py-4 text-right whitespace-nowrap">
                                            <div className="flex items-center justify-end gap-2.5">
                                                <button
                                                    onClick={() => handleViewDetails(alert)}
                                                    className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-900 text-[10px] font-black uppercase tracking-widest hover:border-indigo-700 hover:text-indigo-600 transition-all shadow-sm active:scale-95"
                                                >
                                                    <Eye className="w-3.5 h-3.5" />
                                                    Intel
                                                </button>
                                                <button className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 shadow-inner active:scale-95 group/msg">
                                                    <MessageSquare className="w-3.5 h-3.5" />
                                                    Chat
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div >

                {/* Case Detail Drawer */}
                <Drawer
                    anchor="right"
                    open={isModalOpen && !!selectedAlert}
                    onClose={() => setIsModalOpen(false)}
                    PaperProps={{
                        sx: {
                            width: { xs: '100%', sm: 500, md: 540 },
                            borderLeft: 'none',
                            boxShadow: '-20px 0 50px -12px rgba(0,0,0,0.15)',
                        }
                    }}
                >
                    {selectedAlert && (
                        <div className="h-full flex flex-col bg-white">
                            {/* Drawer Header */}
                            <div className="p-5 md:p-8 bg-slate-900 text-white relative overflow-hidden shrink-0">
                                <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/20 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                                <div className="relative z-10 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="px-3 py-1 bg-rose-600 text-[10px] font-black uppercase tracking-widest rounded-lg">LIVE INCIDENT</span>
                                            <span className="text-gray-400 text-sm font-black tracking-widest">ID: {selectedAlert.id}</span>
                                        </div>
                                        <IconButton
                                            onClick={() => setIsModalOpen(false)}
                                            className="relative z-10 p-3 bg-white/10 hover:bg-rose-600 transition-all rounded-2xl text-white active:scale-95"
                                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' }}
                                        >
                                            <X className="w-5 h-5" />
                                        </IconButton>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-2">{selectedAlert.user}</h2>
                                        <div className="flex flex-col gap-2.5 text-gray-400">
                                            <div className="flex items-start gap-2">
                                                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                                                <span className="text-xs font-bold leading-snug">{selectedAlert.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                                                <span className="text-xs font-bold">{selectedAlert.phone}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Drawer Body */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar p-5 md:p-8 space-y-6">
                                <div className="p-4 md:p-5 bg-rose-50/30 border border-rose-100/50 rounded-xl md:rounded-2xl">
                                    <h3 className="text-[10px] font-black text-rose-600 uppercase tracking-[0.2em] mb-4">Situation Assessment</h3>
                                    <p className="text-md md:text-lg font-bold text-gray-800 leading-relaxed italic">
                                        "{selectedAlert.description}"
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Responder Intelligence</h3>
                                    <div className="p-4 md:p-5 bg-gray-50 border border-gray-100 rounded-3xl space-y-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm border border-gray-100 shrink-0">
                                                <Store className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-black text-gray-900 truncate">{selectedAlert.partner}</p>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Dispatcher</p>
                                            </div>
                                        </div>
                                        <button className="w-full py-3.5 bg-white border border-gray-200 text-gray-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm active:scale-95">
                                            Reassign Response Unit
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2 md:gap-4">
                                    <button className="flex items-center justify-center gap-3 py-3 md:py-4 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all shadow-xl shadow-gray-200 active:scale-95">
                                        <Phone className="w-4 h-4" /> Voice Dispatch
                                    </button>
                                    <button className="flex items-center justify-center gap-3 py-3 md:py-4 bg-white border border-gray-200 text-gray-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-indigo-500 hover:text-indigo-600 transition-all active:scale-95">
                                        <MessageSquare className="w-4 h-4" /> Live Chat
                                    </button>
                                </div>
                            </div>

                            {/* Drawer Footer */}
                            <div className="p-5 md:p-8 border-t border-gray-100 bg-white sticky bottom-0">
                                <button className="w-full flex items-center justify-center gap-3 py-3 md:py-5 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 active:scale-95">
                                    <CheckCircle className="w-5 h-5" /> Resolve SOS Incident
                                </button>
                            </div>
                        </div>
                    )}
                </Drawer>
            </div>
        </div>
    );
};

export default SOSAlerts;
