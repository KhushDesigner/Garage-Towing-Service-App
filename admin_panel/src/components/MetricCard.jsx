import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import clsx from 'clsx';

const MetricCard = ({ title, value, change, trend = 'up', icon: Icon, color = 'blue' }) => {
    const colorMap = {
        blue: 'text-indigo-600 bg-indigo-50/50',
        green: 'text-emerald-600 bg-emerald-50/50',
        indigo: 'text-violet-600 bg-violet-50/50',
        emerald: 'text-teal-600 bg-teal-50/50',
        yellow: 'text-amber-600 bg-amber-50/50',
        red: 'text-rose-600 bg-rose-50/50',
    };

    return (
        <div className="premium-card p-6 flex flex-col justify-between group">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{title}</p>
                    <h3 className="text-2xl font-extrabold mt-1 text-gray-900 tracking-tight">{value}</h3>
                </div>
                <div className={clsx("p-3 rounded-xl transition-all duration-300 group-hover:scale-110 shadow-sm", colorMap[color] || colorMap.blue)}>
                    <Icon className="w-5 h-5" />
                </div>
            </div>

            {change && (
                <div className="mt-4 flex items-center text-sm">
                    <div
                        className={clsx(
                            "flex items-center px-2 py-0.5 rounded-md font-bold text-xs",
                            trend === 'up' ? "text-emerald-700 bg-emerald-50" : "text-rose-700 bg-rose-50"
                        )}
                    >
                        {trend === 'up' ? <ArrowUp className="w-3.5 h-3.5 mr-0.5" /> : <ArrowDown className="w-3.5 h-3.5 mr-0.5" />}
                        {change}
                    </div>
                    <span className="text-gray-400 ml-2 font-medium">vs last month</span>
                </div>
            )}
        </div>
    );
};

export default MetricCard;
