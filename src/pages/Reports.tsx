import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar,
  Filter,
  FileText,
  PieChart,
  Activity
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { AIInsights } from '../components/AI/AIInsights';

const Reports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState('sales');
  const [dateRange, setDateRange] = useState('last30days');

  // Mock data for different reports
  const salesData = [
    { month: 'Jan', revenue: 45000, orders: 120, customers: 85 },
    { month: 'Feb', revenue: 52000, orders: 135, customers: 92 },
    { month: 'Mar', revenue: 48000, orders: 128, customers: 88 },
    { month: 'Apr', revenue: 61000, orders: 155, customers: 105 },
    { month: 'May', revenue: 55000, orders: 142, customers: 98 },
    { month: 'Jun', revenue: 67000, orders: 168, customers: 112 },
  ];

  const inventoryData = [
    { category: 'Pain Relief', value: 35, stock: 2500, color: '#8884d8' },
    { category: 'Antibiotics', value: 25, stock: 1800, color: '#82ca9d' },
    { category: 'Vitamins', value: 20, stock: 1200, color: '#ffc658' },
    { category: 'Gastric', value: 15, stock: 900, color: '#ff7300' },
    { category: 'Others', value: 5, stock: 300, color: '#8dd1e1' },
  ];

  const financialData = [
    { month: 'Jan', profit: 12000, expenses: 33000, revenue: 45000 },
    { month: 'Feb', profit: 15600, expenses: 36400, revenue: 52000 },
    { month: 'Mar', profit: 14400, expenses: 33600, revenue: 48000 },
    { month: 'Apr', profit: 18300, expenses: 42700, revenue: 61000 },
    { month: 'May', profit: 16500, expenses: 38500, revenue: 55000 },
    { month: 'Jun', profit: 20100, expenses: 46900, revenue: 67000 },
  ];

  const customerData = [
    { month: 'Jan', newCustomers: 15, returningCustomers: 70, totalOrders: 120 },
    { month: 'Feb', newCustomers: 22, returningCustomers: 70, totalOrders: 135 },
    { month: 'Mar', newCustomers: 18, returningCustomers: 70, totalOrders: 128 },
    { month: 'Apr', newCustomers: 27, returningCustomers: 78, totalOrders: 155 },
    { month: 'May', newCustomers: 20, returningCustomers: 78, totalOrders: 142 },
    { month: 'Jun', newCustomers: 32, returningCustomers: 80, totalOrders: 168 },
  ];

  const reportTypes = [
    { id: 'sales', name: 'Sales Report', icon: TrendingUp },
    { id: 'inventory', name: 'Inventory Report', icon: BarChart3 },
    { id: 'financial', name: 'Financial Report', icon: PieChart },
    { id: 'customer', name: 'Customer Report', icon: Activity },
  ];

  const dateRanges = [
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'last3months', label: 'Last 3 Months' },
    { value: 'last6months', label: 'Last 6 Months' },
    { value: 'lastyear', label: 'Last Year' },
  ];

  const renderSalesReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`₹${value}`, 'Revenue']} />
              <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Orders & Customers</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="orders" stroke="#82ca9d" strokeWidth={2} />
              <Line type="monotone" dataKey="customers" stroke="#ffc658" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <AIInsights 
        type="sales" 
        data={salesData} 
        title="AI Sales Analysis & Recommendations" 
      />
    </div>
  );

  const renderInventoryReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Stock Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={inventoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {inventoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Stock Levels by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={inventoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip formatter={(value) => [value, 'Stock Units']} />
              <Bar dataKey="stock" fill="#8884d8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <AIInsights 
        type="inventory" 
        data={inventoryData} 
        title="AI Inventory Optimization" 
      />
    </div>
  );

  const renderFinancialReport = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Performance</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={financialData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => [`₹${value}`, '']} />
            <Bar dataKey="revenue" fill="#82ca9d" name="Revenue" />
            <Bar dataKey="expenses" fill="#ff7300" name="Expenses" />
            <Bar dataKey="profit" fill="#8884d8" name="Profit" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <AIInsights 
        type="financial" 
        data={financialData} 
        title="AI Financial Analysis" 
      />
    </div>
  );

  const renderCustomerReport = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Acquisition</h3>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={customerData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey="newCustomers" 
              stackId="1" 
              stroke="#8884d8" 
              fill="#8884d8" 
              name="New Customers"
            />
            <Area 
              type="monotone" 
              dataKey="returningCustomers" 
              stackId="1" 
              stroke="#82ca9d" 
              fill="#82ca9d" 
              name="Returning Customers"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <AIInsights 
        type="customers" 
        data={customerData} 
        title="AI Customer Insights" 
      />
    </div>
  );

  const renderReport = () => {
    switch (selectedReport) {
      case 'sales': return renderSalesReport();
      case 'inventory': return renderInventoryReport();
      case 'financial': return renderFinancialReport();
      case 'customer': return renderCustomerReport();
      default: return renderSalesReport();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive business intelligence and insights</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Report Type Selection */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex flex-wrap gap-2">
            {reportTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedReport(type.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  selectedReport === type.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <type.icon className="w-4 h-4" />
                <span>{type.name}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {dateRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Report Content */}
      {renderReport()}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">₹3,28,000</p>
              <p className="text-sm text-green-600 mt-1">+12.5% from last period</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">848</p>
              <p className="text-sm text-blue-600 mt-1">+8.2% from last period</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">₹387</p>
              <p className="text-sm text-purple-600 mt-1">+3.8% from last period</p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Profit Margin</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">28.5%</p>
              <p className="text-sm text-green-600 mt-1">+2.1% from last period</p>
            </div>
            <PieChart className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;