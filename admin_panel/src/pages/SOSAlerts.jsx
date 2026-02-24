import React, { useState } from 'react';
import {
    MapPin,
    Phone,
    AlertOctagon,
    Radio,
    BellRing,
    ChevronRight,
    X,
    Clock,
    Activity,
    User,
    Store,
    Eye,
    MessageSquare,
    CheckCircle,
    Plus,
    Minus
} from 'lucide-react';
import clsx from 'clsx';
import StatusBadge from '../components/StatusBadge';
import MetricCard from '../components/MetricCard';
import Button from '../components/common/Button';
import DataTable from '../components/common/DataTable';
import SearchBox from '../components/common/SearchBox';
import SOSCaseDrawer from '../components/SOSCaseDrawer';

const SOSAlerts = () => {
    const [selectedAlert, setSelectedAlert] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

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

    const columns = [
        {
            header: 'Incident Details',
            key: 'id',
            render: (val, row) => (
                <div className="flex items-center gap-3 whitespace-nowrap">
                    <div className={clsx(
                        "w-10 h-10 rounded-xl border flex items-center justify-center transition-all group-hover:scale-110",
                        row.severity === 'high' ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-amber-50 border-amber-100 text-amber-600'
                    )}>
                        <AlertOctagon className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-black text-gray-900 tracking-tighter uppercase">{val}</span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <MapPin className="w-3 h-3 text-gray-300" />
                            <span className="text-[10px] font-bold text-gray-400 truncate max-w-[140px] uppercase tracking-tighter">{row.location}</span>
                        </div>
                    </div>
                </div>
            )
        },
        {
            header: 'Stakeholders',
            key: 'stakeholders',
            render: (_, row) => (
                <div className="flex flex-col gap-1.5 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-md bg-indigo-50 flex items-center justify-center text-indigo-600">
                            <User className="w-3 h-3" />
                        </div>
                        <span className="text-xs font-bold text-gray-700">{row.user}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-md bg-amber-50 flex items-center justify-center text-amber-600">
                            <Store className="w-3 h-3" />
                        </div>
                        <span className="text-xs font-bold text-gray-500 truncate max-w-[150px]">{row.partner}</span>
                    </div>
                </div>
            )
        },
        {
            header: 'Response ETA',
            key: 'time',
            render: (val) => (
                <div className="flex items-center gap-2 whitespace-nowrap">
                    <div className="p-1.5 bg-gray-50 rounded-lg text-gray-400">
                        <Clock className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-700 uppercase tracking-tight">{val}</span>
                        <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest leading-none">Elapsed</span>
                    </div>
                </div>
            )
        },
        {
            header: 'Status Level',
            key: 'status',
            align: 'center',
            render: (val) => (
                <span className={clsx(
                    "text-xs px-2.5 py-1 rounded-full font-medium inline-block bg-red-100 text-red-800 border border-red-200",
                    val === 'Urgent' ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                )}>
                    {val}
                </span>
            )
        },
        {
            header: 'Emergency Actions',
            key: 'actions',
            align: 'right',
            render: (_, row) => (
                <div className="flex items-center justify-end gap-2.5">
                    <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<Eye className="w-3.5 h-3.5" />}
                        onClick={() => handleViewDetails(row)}
                    // className="bg-white border border-gray-200"
                    >
                        Intel
                    </Button>
                    <Button
                        variant="primary"
                        size="sm"
                        leftIcon={<MessageSquare className="w-3.5 h-3.5" />}
                        className="shadow-sm"
                    >
                        Chat
                    </Button>
                </div>
            )
        }
    ];

    return (
        <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
            {/* Urgent Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">SOS Command Center</h1>
                    <p className="text-gray-500 font-medium mt-1 text-sm">Real-time emergency tracking and provider dispatch interface.</p>
                </div>
                <div className="flex items-stretch sm:items-center gap-3 flex-col sm:flex-row">
                    <Button
                        variant="outline"
                        leftIcon={<Radio className="w-4 h-4" />}
                    // className="hover:border-rose-500 hover:text-rose-600"
                    >
                        Alert All Partners
                    </Button>
                    <Button
                        variant="primary"
                        leftIcon={<BellRing className="w-4 h-4" />}
                        className="bg-rose-600 hover:bg-rose-700 shadow-rose-200"
                    >
                        Incident Report
                    </Button>
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

                {/* Incident Record Section */}
                <div className="space-y-4">
                    <DataTable
                        title="Incident Queue"
                        subtitle="Live emergency alert log"
                        filters={
                            <SearchBox
                                value={searchQuery}
                                onSearch={setSearchQuery}
                                placeholder="Search Queue..."
                                width="w-full lg:w-72"
                            />
                        }
                        columns={columns}
                        data={emergencyAlerts.filter(alert =>
                            alert.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            alert.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            alert.location.toLowerCase().includes(searchQuery.toLowerCase())
                        )}
                    />
                </div>

                {/* Case Detail Drawer */}
                <SOSCaseDrawer
                    alert={selectedAlert}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            </div>
        </div>
    );
};

export default SOSAlerts;
