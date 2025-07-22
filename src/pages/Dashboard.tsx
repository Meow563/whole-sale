import React from 'react';
import { 
  TrendingUp, 
  Package, 
  DollarSign, 
  Users, 
  AlertTriangle,
  ShoppingCart,
  FileText,
  Calendar,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { ModernCard } from '../components/Modern/ModernCard';

const Dashboard = () => {
  // Mock data
  const salesData = [
    { month: 'Jan', sales: 45000, orders: 120, profit: 12000 },
    { month: 'Feb', sales: 52000, orders: 135, profit: 15600 },
    { month: 'Mar', sales: 48000, orders: 128, profit: 14400 },
    { month: 'Apr', sales: 61000, orders: 155, profit: 18300 },
    { month: 'May', sales: 55000, orders: 142, profit: 16500 },
    { month: 'Jun', sales: 67000, orders: 168, profit: 20100 },
  ];

  const topProducts = [
    { name: 'Paracetamol', value: 35, color: '#3B82F6' },
    { name: 'Antibiotics', value: 25, color: '#10B981' },
    { name: 'Vitamins', value: 20, color: '#F59E0B' },
    { name: 'Pain Relief', value: 20, color: '#EF4444' },
  ];

  const recentActivities = [
    { id: 1, type: 'order', message: 'New order #ORD-001 from City Hospital', time: '2 minutes ago', icon: ShoppingCart, color: 'text-blue-600' },
    { id: 2, type: 'stock', message: 'Low stock alert: Paracetamol 500mg', time: '15 minutes ago', icon: AlertTriangle, color: 'text-yellow-600' },
    { id: 3, type: 'payment', message: 'Payment received from ABC Pharmacy', time: '1 hour ago', icon: DollarSign, color: 'text-green-600' },
    { id: 4, type: 'expiry', message: 'Products expiring in 30 days: 12 items', time: '2 hours ago', icon: Calendar, color: 'text-red-600' },
  ];

  const stats = [
    {
      title: 'Total Revenue',
      value: '₹3,28,000',
      change: '+12.5%',
      icon: DollarSign,
      gradient: 'bg-gradient-to-r from-green-500 to-emerald-600',
    },
    {
      title: 'Total Orders',
      value: '1,248',
      change: '+8.2%',
      icon: ShoppingCart,
      gradient: 'bg-gradient-to-r from-blue-500 to-cyan-600',
    },
    {
      title: 'Active Customers',
      value: '456',
      change: '+15.3%',
      icon: Users,
      gradient: 'bg-gradient-to-r from-purple-500 to-pink-600',
    },
    {
      title: 'Low Stock Items',
      value: '23',
      change: '-5.1%',
      icon: AlertTriangle,
      gradient: 'bg-gradient-to-r from-orange-500 to-red-600',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="animate-slide-up">
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Welcome Back! 👋
          </h1>
          <p className="text-gray-600 text-lg">Here's what's happening with your business today.</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 animate-slide-right">
          <Calendar className="w-5 h-5" />
          <span className="font-medium">{new Date().toLocaleDateString('en-IN', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
            <ModernCard
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              gradient={stat.gradient}
            />
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-slide-up">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Revenue Overview</h3>
              <p className="text-gray-600">Monthly revenue and profit trends</p>
            </div>
            <div className="flex items-center space-x-2 text-green-600">
              <ArrowUp className="w-5 h-5" />
              <span className="font-semibold">+12.5%</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }} 
              />
              <Area type="monotone" dataKey="sales" stroke="#3B82F6" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={3} />
              <Area type="monotone" dataKey="profit" stroke="#10B981" fillOpacity={1} fill="url(#colorProfit)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-slide-up">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Top Products</h3>
              <p className="text-gray-600">Best selling categories</p>
            </div>
            <Package className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
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
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: product.color }}
                />
                <div>
                  <p className="font-medium text-gray-900 text-sm">{product.name}</p>
                  <p className="text-gray-600 text-xs">{product.value}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-slide-up">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Recent Activities</h3>
              <p className="text-gray-600">Latest updates and notifications</p>
            </div>
            <FileText className="w-6 h-6 text-gray-600" />
          </div>
          <div className="space-y-4 custom-scrollbar max-h-80 overflow-y-auto">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className={`p-2 rounded-lg bg-white shadow-sm ${activity.color}`}>
                  <activity.icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{activity.message}</p>
                  <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-slide-up">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900">Quick Actions</h3>
            <p className="text-gray-600">Frequently used features</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
              <ShoppingCart className="w-6 h-6 mb-2" />
              <p className="font-semibold">New Order</p>
            </button>
            <button className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
              <Package className="w-6 h-6 mb-2" />
              <p className="font-semibold">Add Product</p>
            </button>
            <button className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
              <Users className="w-6 h-6 mb-2" />
              <p className="font-semibold">New Customer</p>
            </button>
            <button className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
              <FileText className="w-6 h-6 mb-2" />
              <p className="font-semibold">Generate Report</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;