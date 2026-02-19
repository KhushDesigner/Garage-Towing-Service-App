import React from 'react';
import clsx from 'clsx';
import { STATUS_COLORS } from '../utils/constants';

const StatusBadge = ({ status }) => {
    const badgeClass = STATUS_COLORS[status] || 'bg-gray-100 text-gray-800';

    return (
        <span
            className={clsx(
                "text-xs px-2.5 py-1 rounded-full font-medium inline-block",
                badgeClass === 'badge-success' && 'bg-green-100 text-green-800 border border-green-200',
                badgeClass === 'badge-primary' && 'bg-blue-100 text-blue-800 border border-blue-200',
                badgeClass === 'badge-alert' && 'bg-red-100 text-red-800 border border-red-200',
                badgeClass === 'badge-warning' && 'bg-yellow-100 text-yellow-800 border border-yellow-200',
            )}
        >
            {status}
        </span>
    );
};

export default StatusBadge;
