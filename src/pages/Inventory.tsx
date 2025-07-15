import React, { useState } from 'react';
import { 
  Package, 
  Search, 
  Filter, 
  Plus, 
  AlertTriangle, 
  Calendar,
  BarChart3,
  Download,
  Edit,
  Trash2
} from 'lucide-react';
import { AIInsights } from '../components/AI/AIInsights';

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock inventory data
  const inventoryData = [
    {
      id: 1,
      name: 'Paracetamol 500mg',
      category: 'Pain Relief',
      batch: 'PCM001',
      stock: 1200,
      reorderLevel: 500,
      unitPrice: 2.50,
      supplier: 'PharmaCorp Ltd',
      expiryDate: '2024-12-15',
      location: 'A-01-001',
      status: 'In Stock'
    },
    {
      id: 2,
      name: 'Amoxicillin 250mg',
      category: 'Antibiotics',
      batch: 'AMX002',
      stock: 300,
      reorderLevel: 600,
      unitPrice: 8.75,
      supplier: 'MediSupply Co',
      expiryDate: '2024-10-20',
      location: 'B-02-015',
      status: 'Low Stock'
    },
    {
      id: 3,
      name: 'Vitamin D3 1000IU',
      category: 'Vitamins',
      batch: 'VTD003',
      stock: 800,
      reorderLevel: 300,
      unitPrice: 12.00,
      supplier: 'HealthPlus Inc',
      expiryDate: '2025-06-30',
      location: 'C-03-008',
      status: 'In Stock'
    },
    {
      id: 4,
      name: 'Ibuprofen 400mg',
      category: 'Pain Relief',
      batch: 'IBU004',
      stock: 50,
      reorderLevel: 200,
      unitPrice: 4.25,
      supplier: 'PharmaCorp Ltd',
      expiryDate: '2024-08-15',
      location: 'A-01-005',
      status: 'Critical'
    },
    {
      id: 5,
      name: 'Omeprazole 20mg',
      category: 'Gastric',
      batch: 'OMP005',
      stock: 1500,
      reorderLevel: 400,
      unitPrice: 6.50,
      supplier: 'MediCore Ltd',
      expiryDate: '2025-03-20',
      location: 'D-04-012',
      status: 'In Stock'
    }
  ];

  const categories = ['all', 'Pain Relief', 'Antibiotics', 'Vitamins', 'Gastric'];

  const filteredInventory = inventoryData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.batch.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock': return 'bg-green-100 text-green-800';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 90; // Expiring within 90 days
  };

  const totalValue = inventoryData.reduce((sum, item) => sum + (item.stock * item.unitPrice), 0);
  const lowStockItems = inventoryData.filter(item => item.stock <= item.reorderLevel).length;
  const expiringItems = inventoryData.filter(item => isExpiringSoon(item.expiryDate)).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600">Track and manage your medicine inventory</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{inventoryData.length}</p>
            </div>
            <Package className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">₹{totalValue.toLocaleString()}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Low Stock</p>
              <p className="text-2xl font-bold text-red-600 mt-1">{lowStockItems}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
              <p className="text-2xl font-bold text-orange-600 mt-1">{expiringItems}</p>
            </div>
            <Calendar className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <AIInsights 
        type="inventory" 
        data={inventoryData} 
        title="AI Inventory Optimization" 
      />

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products or batch..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pricing
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiry & Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-500">Batch: {item.batch}</div>
                      <div className="text-sm text-gray-500">{item.category}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">Stock: {item.stock}</div>
                      <div className="text-sm text-gray-500">Reorder: {item.reorderLevel}</div>
                      <div className="text-sm text-gray-500">{item.supplier}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">₹{item.unitPrice}</div>
                      <div className="text-sm text-gray-500">Total: ₹{(item.stock * item.unitPrice).toLocaleString()}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className={`text-sm font-medium ${isExpiringSoon(item.expiryDate) ? 'text-red-600' : 'text-gray-900'}`}>
                        {item.expiryDate}
                        {isExpiringSoon(item.expiryDate) && (
                          <AlertTriangle className="w-4 h-4 inline ml-1 text-red-600" />
                        )}
                      </div>
                      <div className="text-sm text-gray-500">{item.location}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inventory;

export { Inventory };