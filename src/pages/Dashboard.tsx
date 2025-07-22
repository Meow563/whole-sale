import React from 'react';
import { 
  TrendingUp, 
  Package, 
  DollarSign, 
  Users, 
  AlertTriangle,
  ShoppingCart,
  FileText,
  Calendar
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { AIInsights } from '../components/AI/AIInsights';
import { AIChat } from '../components/AI/AIChat';
import { GameInterface } from '../components/GameUI/GameInterface';
import { AnimatedCard } from '../components/GameUI/AnimatedCard';
import { showNotification } from '../components/GameUI/FloatingNotification';

const Dashboard = () => {
  // Mock data for demonstration
  const salesData = [
    { month: 'Jan', sales: 45000, orders: 120 },
    { month: 'Feb', sales: 52000, orders: 135 },
    { month: 'Mar', sales: 48000, orders: 128 },
    { month: 'Apr', sales: 61000, orders: 155 },
    { month: 'May', sales: 55000, orders: 142 },
    { month: 'Jun', sales: 67000, orders: 168 },
  ];

  const inventoryData = [
    { name: 'Paracetamol 500mg', stock: 1200, reorderLevel: 500, expiry: '2024-12-15' },
    { name: 'Amoxicillin 250mg', stock: 800, reorderLevel: 300, expiry: '2024-10-20' },
    { name: 'Ibuprofen 400mg', stock: 450, reorderLevel: 600, expiry: '2024-11-30' },
    { name: 'Aspirin 75mg', stock: 2000, reorderLevel: 800, expiry: '2025-01-10' },
  ];

  const topProducts = [
    { name: 'Paracetamol', value: 35, color: '#8884d8' },
    { name: 'Antibiotics', value: 25, color: '#82ca9d' },
    { name: 'Vitamins', value: 20, color: '#ffc658' },
    { name: 'Pain Relief', value: 20, color: '#ff7300' },
  ];

  const stats = [
    {
      title: 'Total Revenue',
      value: '₹2,45,000',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      onClick: () => showNotification({
        type: 'success',
        title: 'Revenue Updated!',
        message: 'Revenue data has been refreshed successfully.'
      })
    },
    {
      title: 'Total Orders',
      value: '1,248',
      change: '+8.2%',
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      onClick: () => showNotification({
        type: 'info',
        title: 'Orders Synced!',
        message: 'Order data synchronized with latest updates.'
      })
    },
    {
      title: 'Active Customers',
      value: '456',
      change: '+15.3%',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      onClick: () => showNotification({
        type: 'success',
        title: 'Customer Data!',
        message: 'Customer analytics updated successfully.'
      })
    },
    {
      title: 'Low Stock Items',
      value: '23',
      change: '-5.1%',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      onClick: () => showNotification({
        type: 'error',
        title: 'Stock Alert!',
        message: 'Some items are running low on stock.'
      })
    },
  ];

  const recentActivities = [
    { id: 1, type: 'order', message: 'New order #ORD-001 from City Hospital', time: '2 minutes ago' },
    { id: 2, type: 'stock', message: 'Low stock alert: Paracetamol 500mg', time: '15 minutes ago' },
    { id: 3, type: 'payment', message: 'Payment received from ABC Pharmacy', time: '1 hour ago' },
    { id: 4, type: 'expiry', message: 'Products expiring in 30 days: 12 items', time: '2 hours ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🎮 MedWholesale Pro Dashboard
          </h1>
          <p className="text-gray-600">Level up your business with gamified management!</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>{new Date().toLocaleDateString('en-IN', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
      </div>

      {/* Game Interface */}
      <GameInterface />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <AnimatedCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            color={stat.color}
            bgColor={stat.bgColor}
            onClick={stat.onClick}
          />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Sales Overview</h3>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`₹${value}`, 'Sales']} />
              <Bar dataKey="sales" fill="#8884d8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
            <Package className="w-5 h-5 text-blue-600" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={topProducts}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {topProducts.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: product.color }}
                ></div>
                <span className="text-sm text-gray-600">{product.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights and Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AIInsights 
          type="inventory" 
          data={inventoryData} 
          title="AI Inventory Analysis" 
        />
        <AIChat />
      </div>

      {/* Recent Activities and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
            <FileText className="w-5 h-5 text-gray-600" />
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stock Alerts */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Stock Alerts</h3>
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div className="space-y-4">
            {inventoryData.filter(item => item.stock <= item.reorderLevel).map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-red-900">{item.name}</p>
                  <p className="text-xs text-red-600">Stock: {item.stock} (Reorder: {item.reorderLevel})</p>
                </div>
                <AlertTriangle className="w-4 h-4 text-red-600" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

export { Dashboard };