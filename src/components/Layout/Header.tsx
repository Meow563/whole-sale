import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function Header() {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products, customers, orders..."
              className="input pl-10 w-96"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-error-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-primary-600" />
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-900">{user?.user_metadata?.name || 'User'}</p>
              <p className="text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}