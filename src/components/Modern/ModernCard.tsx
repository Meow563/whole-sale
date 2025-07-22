import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ModernCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  gradient: string;
  onClick?: () => void;
  className?: string;
}

export function ModernCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  gradient, 
  onClick,
  className = '' 
}: ModernCardProps) {
  return (
    <div
      className={`modern-card bg-white rounded-2xl p-6 shadow-lg border border-gray-100 cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900">
            {value}
          </p>
          {change && (
            <p className={`text-sm font-medium ${
              change.startsWith('+') ? 'text-green-600' : 'text-red-600'
            }`}>
              {change} from last month
            </p>
          )}
        </div>
        
        <div className={`p-4 rounded-2xl ${gradient} animate-float`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
      
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}