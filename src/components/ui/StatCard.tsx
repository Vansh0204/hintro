import React from 'react';
import { Skeleton } from './Skeleton';

interface StatCardProps {
  label: string;
  value: string | number;
  iconBgClass: string; // e.g., "bg-red-100"
  iconColorClass: string; // e.g., "text-red-500"
  icon: React.ComponentType<{ size?: number; className?: string }>;
  isLoading?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  iconBgClass,
  iconColorClass,
  icon: Icon,
  isLoading,
}) => {
  return (
    <div className="border border-gray-200 rounded-xl p-5 flex items-center bg-white shadow-sm">
      <div className={`flex items-center justify-center w-[48px] h-[48px] rounded-lg mr-4 shrink-0 ${iconBgClass}`}>
        <Icon size={24} className={iconColorClass} />
      </div>
      <div>
        <h3 className="text-sm text-gray-500 font-medium">{label}</h3>
        <div className="mt-1">
          {isLoading ? (
            <Skeleton className="h-8 w-20" />
          ) : (
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          )}
        </div>
      </div>
    </div>
  );
};
