import React, { useState } from 'react';
import { Plus, Search, Filter, User, Mail, Phone, Edit, Trash2 } from 'lucide-react';

const mockCustomers = [
  {
    id: '1',
    name: 'City Medical Store',
    email: 'orders@citymedical.com',
    phone: '+1-555-0123',
    address: '123 Main St, Downtown, NY 10001',
    license_number: 'LIC-2024-001',
    credit_limit: 50000,
    outstanding_balance: 2450.00,
    created_at: '2024-01-15',
  },
  {
    id: '2',
    name: 'Health Plus Pharmacy',
    email: 'billing@healthplus.com',
    phone: '+1-555-0124',
    address: '456 Oak Ave, Midtown, NY 10002',
    license_number: 'LIC-2024-002',
    credit_limit: 35000,
    outstanding_balance: 1875.50,
    created_at: '2024-01-18',
  },
  {
    id: '3',
    name: 'MediCare Distributors',
    email: 'accounts@medicare.com',
    phone: '+1-555-0125',
    address: '789 Pine Rd, Uptown, NY 10003',
    license_number: 'LIC-2024-003',
    credit_limit: 75000,
    outstanding_balance: 3200.75,
    created_at: '2024-01-10',
  },
  {
    id: '4',
    name: 'Central Pharmacy',
    email: 'info@centralpharm.com',
    phone: '+1-555-0126',
    address: '321 Elm St, Westside, NY 10004',
    license_number: 'LIC-2024-004',
    credit_limit: 40000,
    outstanding_balance: 0,
    created_at: '2024-01-22',
  },
];

export function Customers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredCustomers = mockCustomers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.license_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCustomers = mockCustomers.length;
  const activeCustomers = mockCustomers.filter(c => c.outstanding_balance > 0).length;
  const totalOutstanding = mockCustomers.reduce((sum, c) => sum + c.outstanding_balance, 0);
  const totalCreditLimit = mockCustomers.reduce((sum, c) => sum + c.credit_limit, 0);

  const getCreditUtilization = (customer: any) => {
    return (customer.outstanding_balance / customer.credit_limit) * 100;
  };

  const getCreditStatus = (utilization: number) => {
    if (utilization >= 80) return { color: 'text-error-600 bg-error-50', text: 'High Risk' };
    if (utilization >= 60) return { color: 'text-warning-600 bg-warning-50', text: 'Medium Risk' };
    return { color: 'text-success-600 bg-success-50', text: 'Good Standing' };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Management</h1>
          <p className="text-gray-600">Manage customer information and credit limits</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Customer
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-gray-900">{totalCustomers}</p>
              </div>
              <div className="bg-primary-50 p-3 rounded-full">
                <User className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Customers</p>
                <p className="text-2xl font-bold text-success-600">{activeCustomers}</p>
              </div>
              <div className="bg-success-50 p-3 rounded-full">
                <User className="h-6 w-6 text-success-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Outstanding Balance</p>
                <p className="text-2xl font-bold text-warning-600">
                  ${totalOutstanding.toLocaleString()}
                </p>
              </div>
              <div className="bg-warning-50 p-3 rounded-full">
                <Mail className="h-6 w-6 text-warning-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Credit Limit</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${totalCreditLimit.toLocaleString()}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-full">
                <Phone className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="card-content">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search customers..."
                className="input pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="btn-secondary">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="card">
        <div className="card-content">
          <div className="overflow-x-auto">
            <table className="table">
              <thead className="table-header">
                <tr className="table-row">
                  <th className="table-head">Customer</th>
                  <th className="table-head">Contact</th>
                  <th className="table-head">License</th>
                  <th className="table-head">Credit Limit</th>
                  <th className="table-head">Outstanding</th>
                  <th className="table-head">Status</th>
                  <th className="table-head">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => {
                  const utilization = getCreditUtilization(customer);
                  const status = getCreditStatus(utilization);
                  
                  return (
                    <tr key={customer.id} className="table-row">
                      <td className="table-cell">
                        <div>
                          <p className="font-medium text-gray-900">{customer.name}</p>
                          <p className="text-sm text-gray-500">{customer.address}</p>
                        </div>
                      </td>
                      <td className="table-cell">
                        <div>
                          <p className="text-sm text-gray-900">{customer.email}</p>
                          <p className="text-sm text-gray-500">{customer.phone}</p>
                        </div>
                      </td>
                      <td className="table-cell">
                        <span className="font-mono text-sm">{customer.license_number}</span>
                      </td>
                      <td className="table-cell">
                        <div>
                          <p className="font-medium">${customer.credit_limit.toLocaleString()}</p>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div
                              className={`h-2 rounded-full ${
                                utilization >= 80 ? 'bg-error-500' :
                                utilization >= 60 ? 'bg-warning-500' : 'bg-success-500'
                              }`}
                              style={{ width: `${Math.min(utilization, 100)}%` }}
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {utilization.toFixed(1)}% utilized
                          </p>
                        </div>
                      </td>
                      <td className="table-cell">
                        <p className={`font-medium ${
                          customer.outstanding_balance > 0 ? 'text-warning-600' : 'text-success-600'
                        }`}>
                          ${customer.outstanding_balance.toLocaleString()}
                        </p>
                      </td>
                      <td className="table-cell">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                          {status.text}
                        </span>
                      </td>
                      <td className="table-cell">
                        <div className="flex space-x-2">
                          <button className="p-1 text-gray-400 hover:text-primary-600">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-error-600">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}