import React, { useState } from 'react';
import { Search, Bell, User, Settings, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function ModernHeader() {
  const { user, signOut } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: 'Low Stock Alert', message: 'Paracetamol running low', time: '2 min ago', type: 'warning' },
    { id: 2, title: 'New Order', message: 'Order #1234 received', time: '5 min ago', type: 'success' },
    { id: 3, title: 'Payment Received', message: '₹25,000 from ABC Pharmacy', time: '10 min ago', type: 'info' },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex items-center space-x-4 flex-1 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search medicines, customers, orders..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>
        
        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <Bell className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center animate-pulse">
                3
              </span>
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 py-2 animate-slide-up">
                <div className="px-4 py-2 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto custom-scrollbar">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.type === 'warning' ? 'bg-yellow-500' :
                          notification.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                        }`} />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 text-sm">{notification.title}</p>
                          <p className="text-gray-600 text-sm">{notification.message}</p>
                          <p className="text-gray-400 text-xs mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="text-left hidden md:block">
                <p className="font-medium text-gray-900 text-sm">{user?.user_metadata?.name || 'Admin'}</p>
                <p className="text-gray-500 text-xs">{user?.email}</p>
              </div>
            </button>
            
            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 animate-slide-up">
                <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </button>
                <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </button>
                <hr className="my-2" />
                <button
                  onClick={signOut}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 text-red-600 flex items-center space-x-2"
                >
                  <X className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}