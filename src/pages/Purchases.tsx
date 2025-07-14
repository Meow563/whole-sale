import React, { useState } from 'react';
import { Plus, Search, Filter, Package, Eye, Check, X } from 'lucide-react';

const mockPurchaseOrders = [
  {
    id: '1',
    po_number: 'PO-2024-001',
    supplier: {
      id: '1',
      name: 'PharmaCorp Supplies',
      email: 'orders@pharmacorp.com',
      contact_person: 'John Smith',
    },
    total_amount: 15750.00,
    status: 'pending',
    order_date: '2024-01-20',
    expected_delivery: '2024-01-27',
    items: [
      { product: { name: 'Paracetamol 500mg' }, quantity: 1000, unit_price: 12.50 },
      { product: { name: 'Ibuprofen 400mg' }, quantity: 500, unit_price: 15.25 },
    ],
  },
  {
    id: '2',
    po_number: 'PO-2024-002',
    supplier: {
      id: '2',
      name: 'MediLab Distributors',
      email: 'supply@medilab.com',
      contact_person: 'Sarah Johnson',
    },
    total_amount: 8920.00,
    status: 'approved',
    order_date: '2024-01-18',
    expected_delivery: '2024-01-25',
    items: [
      { product: { name: 'Amoxicillin 250mg' }, quantity: 800, unit_price: 18.75 },
    ],
  },
  {
    id: '3',
    po_number: 'PO-2024-003',
    supplier: {
      id: '3',
      name: 'HealthPlus Wholesale',
      email: 'orders@healthplus.com',
      contact_person: 'Mike Davis',
    },
    total_amount: 12400.00,
    status: 'received',
    order_date: '2024-01-15',
    expected_delivery: '2024-01-22',
    items: [
      { product: { name: 'Aspirin 75mg' }, quantity: 2000, unit_price: 6.20 },
    ],
  },
];

export function Purchases() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredOrders = mockPurchaseOrders.filter(order => {
    const matchesSearch = order.po_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.supplier.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-warning-50 text-warning-700 border-warning-200';
      case 'approved':
        return 'bg-primary-50 text-primary-700 border-primary-200';
      case 'received':
        return 'bg-success-50 text-success-700 border-success-200';
      case 'cancelled':
        return 'bg-error-50 text-error-700 border-error-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const totalOrders = mockPurchaseOrders.length;
  const pendingOrders = mockPurchaseOrders.filter(order => order.status === 'pending').length;
  const totalValue = mockPurchaseOrders.reduce((sum, order) => sum + order.total_amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Purchase Orders</h1>
          <p className="text-gray-600">Manage supplier orders and deliveries</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Purchase Order
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
              </div>
              <div className="bg-primary-50 p-3 rounded-full">
                <Package className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                <p className="text-2xl font-bold text-warning-600">{pendingOrders}</p>
              </div>
              <div className="bg-warning-50 p-3 rounded-full">
                <Package className="h-6 w-6 text-warning-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${totalValue.toLocaleString()}
                </p>
              </div>
              <div className="bg-success-50 p-3 rounded-full">
                <Package className="h-6 w-6 text-success-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${(totalValue * 0.4).toLocaleString()}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-full">
                <Package className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="card-content">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search purchase orders..."
                className="input pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="input w-full sm:w-48"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="received">Received</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button className="btn-secondary">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Purchase Orders Table */}
      <div className="card">
        <div className="card-content">
          <div className="overflow-x-auto">
            <table className="table">
              <thead className="table-header">
                <tr className="table-row">
                  <th className="table-head">PO Number</th>
                  <th className="table-head">Supplier</th>
                  <th className="table-head">Amount</th>
                  <th className="table-head">Status</th>
                  <th className="table-head">Order Date</th>
                  <th className="table-head">Expected Delivery</th>
                  <th className="table-head">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="table-row">
                    <td className="table-cell">
                      <p className="font-medium text-primary-600">{order.po_number}</p>
                    </td>
                    <td className="table-cell">
                      <div>
                        <p className="font-medium text-gray-900">{order.supplier.name}</p>
                        <p className="text-sm text-gray-500">{order.supplier.contact_person}</p>
                      </div>
                    </td>
                    <td className="table-cell">
                      <p className="font-medium">${order.total_amount.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">{order.items.length} items</p>
                    </td>
                    <td className="table-cell">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="table-cell">
                      {new Date(order.order_date).toLocaleDateString()}
                    </td>
                    <td className="table-cell">
                      {new Date(order.expected_delivery).toLocaleDateString()}
                    </td>
                    <td className="table-cell">
                      <div className="flex space-x-2">
                        <button className="p-1 text-gray-400 hover:text-primary-600" title="View">
                          <Eye className="h-4 w-4" />
                        </button>
                        {order.status === 'pending' && (
                          <>
                            <button className="p-1 text-gray-400 hover:text-success-600" title="Approve">
                              <Check className="h-4 w-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-error-600" title="Cancel">
                              <X className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}