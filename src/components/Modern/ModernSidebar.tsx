import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  FileText,
  Users,
  TrendingUp,
  Calculator,
  Settings,
  ChevronLeft,
  ChevronRight,
  Pill
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard, color: 'text-blue-600' },
  { name: 'Inventory', href: '/inventory', icon: Package, color: 'text-green-600' },
  { name: 'Purchase Orders', href: '/purchases', icon: ShoppingCart, color: 'text-purple-600' },
  { name: 'Billing', href: '/billing', icon: FileText, color: 'text-orange-600' },
  { name: 'Customers', href: '/customers', icon: Users, color: 'text-pink-600' },
  { name: 'Reports', href: '/reports', icon: TrendingUp, color: 'text-indigo-600' },
  { name: 'Accounting', href: '/accounting', icon: Calculator, color: 'text-teal-600' },
  { name: 'Settings', href: '/settings', icon: Settings, color: 'text-gray-600' },
];

export function ModernSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`${collapsed ? 'w-16' : 'w-64'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
              <Pill className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold gradient-text">MedWholesale</h1>
              <p className="text-xs text-gray-500">Professional</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 shadow-md border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={`${collapsed ? 'mx-auto' : 'mr-3'} h-5 w-5 flex-shrink-0 transition-colors ${
                    isActive ? item.color : 'text-gray-400 group-hover:text-gray-600'
                  }`}
                />
                {!collapsed && (
                  <span className="truncate">{item.name}</span>
                )}
                {!collapsed && isActive && (
                  <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
      
      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-3">
            <p className="text-xs font-medium text-gray-700">Need Help?</p>
            <p className="text-xs text-gray-500 mt-1">Contact support for assistance</p>
            <button className="mt-2 text-xs bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors">
              Get Support
            </button>
          </div>
        </div>
      )}
    </div>
  );
}