import React, { useState } from 'react';
import { Plus, Search, Filter, FileText, Eye, Download, Send } from 'lucide-react';

const mockInvoices = [
  {
    id: '1',
    invoice_number: 'INV-2024-001',
    customer: {
      id: '1',
      name: 'City Medical Store',
      email: 'orders@citymedical.com',
      phone: '+1-555-0123',
    },
    total_amount: 2450.00,
    tax_amount: 245.00,
    discount_amount: 50.00,
    status: 'paid',
    due_date: '2024-02-15',
    created_at: '2024-01-15',
  },
  {
    id: '2',
    invoice_number: 'INV-2024-002',
    customer: {
      id: '2',
      name: 'Health Plus Pharmacy',
      email: 'billing@healthplus.com',
      phone: '+1-555-0124',
    },
    total_amount: 1875.50,
    tax_amount: 187.55,
    discount_amount: 0,
    status: 'sent',
    due_date: '2024-02-20',
    created_at: '2024-01-20',
  },
  {
    id: '3',
    invoice_number: 'INV-2024-003',
    customer: {
      id: '3',
      name: 'MediCare Distributors',
      email: 'accounts@medicare.com',
      phone: '+1-555-0125',
    },
    total_amount: 3200.75,
    tax_amount: 320.08,
    discount_amount: 100.00,
    status: 'overdue',
    due_date: '2024-01-25',
    created_at: '2024-01-10',
  },
];

export function Billing() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredInvoices = mockInvoices.filter(invoice => {
    const matchesSearch = invoice.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-success-50 text-success-700 border-success-200';
      case 'sent':
        return 'bg-primary-50 text-primary-700 border-primary-200';
      case 'overdue':
        return 'bg-error-50 text-error-700 border-error-200';
      case 'draft':
        return 'bg-gray-50 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const totalRevenue = mockInvoices.reduce((sum, inv) => sum + inv.total_amount, 0);
  const paidInvoices = mockInvoices.filter(inv => inv.status === 'paid');
  const overdueInvoices = mockInvoices.filter(inv => inv.status === 'overdue');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Billing & Invoices</h1>
          <p className="text-gray-600">Manage customer invoices and payments</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Invoice
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${totalRevenue.toLocaleString()}
                </p>
              </div>
              <div className="bg-success-50 p-3 rounded-full">
                <FileText className="h-6 w-6 text-success-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Paid Invoices</p>
                <p className="text-2xl font-bold text-gray-900">{paidInvoices.length}</p>
              </div>
              <div className="bg-primary-50 p-3 rounded-full">
                <FileText className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-error-600">{overdueInvoices.length}</p>
              </div>
              <div className="bg-error-50 p-3 rounded-full">
                <FileText className="h-6 w-6 text-error-600" />
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
                  ${(totalRevenue * 0.3).toLocaleString()}
                </p>
              </div>
              <div className="bg-warning-50 p-3 rounded-full">
                <FileText className="h-6 w-6 text-warning-600" />
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
                placeholder="Search invoices..."
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
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
            </select>
            <button className="btn-secondary">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="card">
        <div className="card-content">
          <div className="overflow-x-auto">
            <table className="table">
              <thead className="table-header">
                <tr className="table-row">
                  <th className="table-head">Invoice #</th>
                  <th className="table-head">Customer</th>
                  <th className="table-head">Amount</th>
                  <th className="table-head">Status</th>
                  <th className="table-head">Due Date</th>
                  <th className="table-head">Created</th>
                  <th className="table-head">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="table-row">
                    <td className="table-cell">
                      <p className="font-medium text-primary-600">{invoice.invoice_number}</p>
                    </td>
                    <td className="table-cell">
                      <div>
                        <p className="font-medium text-gray-900">{invoice.customer.name}</p>
                        <p className="text-sm text-gray-500">{invoice.customer.email}</p>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div>
                        <p className="font-medium">${invoice.total_amount.toLocaleString()}</p>
                        {invoice.discount_amount > 0 && (
                          <p className="text-sm text-success-600">
                            -${invoice.discount_amount} discount
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="table-cell">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(invoice.status)}`}>
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </span>
                    </td>
                    <td className="table-cell">
                      {new Date(invoice.due_date).toLocaleDateString()}
                    </td>
                    <td className="table-cell">
                      {new Date(invoice.created_at).toLocaleDateString()}
                    </td>
                    <td className="table-cell">
                      <div className="flex space-x-2">
                        <button className="p-1 text-gray-400 hover:text-primary-600" title="View">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-success-600" title="Download">
                          <Download className="h-4 w-4" />
                        </button>
                        {invoice.status !== 'paid' && (
                          <button className="p-1 text-gray-400 hover:text-primary-600" title="Send">
                            <Send className="h-4 w-4" />
                          </button>
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