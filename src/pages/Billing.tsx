import React, { useState } from 'react';
import { Plus, Search, Filter, FileText, Eye, Download, Send, Edit, Trash2, ShoppingCart } from 'lucide-react';

const mockInvoices = [
  {
    id: '1',
    invoice_number: 'INV-2024-001',
    customer: {
      id: '1',
      name: 'VEDPRAKASH 255',
      address: 'JAIPUR INDORE',
      mobile: '7726008122',
      email: 'orders@citymedical.com',
      phone: '+1-555-0123',
    },
    total_amount: 1599.22,
    tax_amount: 171.36,
    discount_amount: 30.71,
    gross_amount: 1535.33,
    status: 'paid',
    due_date: '2024-02-15',
    created_at: '2024-01-15',
    entry_no: 'E001',
    ref_no: 'R001',
    excise: 'Not Applicable',
    consumption_days: 7,
    order_frequency: '',
    items: [
      {
        id: '1',
        sr_no: 1,
        product: '1 2 3 100 MG TABLET 4 (4 TAB)',
        batch: '56456',
        expiry_date: '02/22',
        mrp: 130.00,
        rate: 116.08,
        qty: 14.00,
        qty_unit: 'TAB',
        trade_disc: 2.00,
        tax: 'SG2',
        final_amount: 445.93
      },
      {
        id: '2',
        sr_no: 2,
        product: '1 2 3 50 MG TABLET 4',
        batch: '456456',
        expiry_date: '02/24',
        mrp: 200.00,
        rate: 200.00,
        qty: 14.00,
        qty_unit: 'TAB',
        trade_disc: 2.00,
        tax: 'SG2',
        final_amount: 700.00
      },
      {
        id: '3',
        sr_no: 3,
        product: '1000 PARA 1000 MG TABLET 12 (12 TAB)',
        batch: '56892',
        expiry_date: '02/23',
        mrp: 155.00,
        rate: 155.00,
        qty: 14.00,
        qty_unit: 'TAB',
        trade_disc: 2.00,
        tax: 'SG2',
        final_amount: 180.83
      },
      {
        id: '4',
        sr_no: 4,
        product: '1 AL PLUS 5/120 MG CAPSULE 10',
        batch: 'AR452',
        expiry_date: '02/24',
        mrp: 125.00,
        rate: 118.20,
        qty: 21.00,
        qty_unit: 'CAP',
        trade_disc: 2.00,
        tax: 'SG2',
        final_amount: 272.46
      }
    ],
    total_items: 4,
    total_qty: 63,
    total_trade_disc: 30.71
  },
  {
    id: '2',
    invoice_number: 'INV-2024-002',
    customer: {
      id: '2',
      name: 'Health Plus Pharmacy',
      address: '456 Oak Ave, Midtown, NY 10002',
      mobile: '9876543210',
      email: 'billing@healthplus.com',
      phone: '+1-555-0124',
    },
    total_amount: 1875.50,
    tax_amount: 187.55,
    discount_amount: 0,
    gross_amount: 1687.95,
    status: 'sent',
    due_date: '2024-02-20',
    created_at: '2024-01-20',
    entry_no: 'E002',
    ref_no: 'R002',
    excise: 'Not Applicable',
    consumption_days: 5,
    order_frequency: 'Weekly',
    items: [],
    total_items: 2,
    total_qty: 45,
    total_trade_disc: 15.25
  },
];

export function Billing() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showDetailView, setShowDetailView] = useState(false);

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

  const handleViewDetails = (invoice) => {
    setSelectedInvoice(invoice);
    setShowDetailView(true);
  };

  const handleCreatePurchase = () => {
    setShowCreateModal(true);
  };

  if (showDetailView && selectedInvoice) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowDetailView(false)}
              className="btn-secondary"
            >
              ← Back to List
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Invoice Details</h1>
              <p className="text-gray-600">{selectedInvoice.invoice_number}</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button className="btn-secondary">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </button>
            <button className="btn-secondary">
              <Download className="h-4 w-4 mr-2" />
              Print
            </button>
            <button className="btn-primary" onClick={handleCreatePurchase}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Create Purchase
            </button>
          </div>
        </div>

        {/* Invoice Detail View */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* Customer Information */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
                  <input
                    type="text"
                    value={selectedInvoice.customer.name}
                    className="input"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Refer By</label>
                  <input
                    type="text"
                    value=""
                    className="input"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Address</label>
                  <textarea
                    value={`${selectedInvoice.customer.address}\nMobile No: ${selectedInvoice.customer.mobile}`}
                    className="input h-20 resize-none"
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Cr. Days</label>
                    <input type="text" value="0" className="input" readOnly />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Balance</label>
                    <input type="text" value="150.00 Dr" className="input" readOnly />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Price/Disc. Ref.</label>
                  <input type="text" value="" className="input" readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Checked By</label>
                  <input type="text" value="" className="input" readOnly />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Consumption Days for Order</label>
                  <input
                    type="text"
                    value={selectedInvoice.consumption_days}
                    className="input"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Order Frequency</label>
                  <input
                    type="text"
                    value={selectedInvoice.order_frequency}
                    className="input"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Days</label>
                  <select className="input" disabled>
                    <option>Days</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Entry No.</label>
                <input
                  type="text"
                  value={selectedInvoice.entry_no}
                  className="input"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Ref. No.</label>
                <input
                  type="text"
                  value={selectedInvoice.ref_no}
                  className="input"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Excise</label>
                <input
                  type="text"
                  value={selectedInvoice.excise}
                  className="input"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Date</label>
                <input
                  type="text"
                  value="20/09/2021"
                  className="input"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Date</label>
                <input
                  type="text"
                  value="20/09/2021"
                  className="input"
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-2 py-2 text-left text-xs font-medium text-gray-700">Sr No</th>
                  <th className="border border-gray-300 px-2 py-2 text-left text-xs font-medium text-gray-700">Product</th>
                  <th className="border border-gray-300 px-2 py-2 text-left text-xs font-medium text-gray-700">Batch</th>
                  <th className="border border-gray-300 px-2 py-2 text-left text-xs font-medium text-gray-700">Expiry Date</th>
                  <th className="border border-gray-300 px-2 py-2 text-left text-xs font-medium text-gray-700">MRP</th>
                  <th className="border border-gray-300 px-2 py-2 text-left text-xs font-medium text-gray-700">Rate</th>
                  <th className="border border-gray-300 px-2 py-2 text-left text-xs font-medium text-gray-700">Qty</th>
                  <th className="border border-gray-300 px-2 py-2 text-left text-xs font-medium text-gray-700">Qty Unit</th>
                  <th className="border border-gray-300 px-2 py-2 text-left text-xs font-medium text-gray-700">Trade Disc.</th>
                  <th className="border border-gray-300 px-2 py-2 text-left text-xs font-medium text-gray-700">Tax</th>
                  <th className="border border-gray-300 px-2 py-2 text-left text-xs font-medium text-gray-700">Final Amount</th>
                </tr>
              </thead>
              <tbody>
                {selectedInvoice.items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-2 py-2 text-sm">{item.sr_no}</td>
                    <td className="border border-gray-300 px-2 py-2 text-sm">{item.product}</td>
                    <td className="border border-gray-300 px-2 py-2 text-sm">{item.batch}</td>
                    <td className="border border-gray-300 px-2 py-2 text-sm">{item.expiry_date}</td>
                    <td className="border border-gray-300 px-2 py-2 text-sm text-right">{item.mrp.toFixed(2)}</td>
                    <td className="border border-gray-300 px-2 py-2 text-sm text-right">{item.rate.toFixed(2)}</td>
                    <td className="border border-gray-300 px-2 py-2 text-sm text-right">{item.qty.toFixed(2)}</td>
                    <td className="border border-gray-300 px-2 py-2 text-sm">{item.qty_unit}</td>
                    <td className="border border-gray-300 px-2 py-2 text-sm text-right">{item.trade_disc.toFixed(2)}</td>
                    <td className="border border-gray-300 px-2 py-2 text-sm">{item.tax}</td>
                    <td className="border border-gray-300 px-2 py-2 text-sm text-right font-medium">{item.final_amount.toFixed(2)}</td>
                  </tr>
                ))}
                {/* Summary Row */}
                <tr className="bg-gray-100 font-medium">
                  <td className="border border-gray-300 px-2 py-2 text-sm" colSpan="6">Total Items: {selectedInvoice.total_items}</td>
                  <td className="border border-gray-300 px-2 py-2 text-sm text-right">{selectedInvoice.total_qty}</td>
                  <td className="border border-gray-300 px-2 py-2 text-sm"></td>
                  <td className="border border-gray-300 px-2 py-2 text-sm text-right">{selectedInvoice.total_trade_disc.toFixed(2)}</td>
                  <td className="border border-gray-300 px-2 py-2 text-sm"></td>
                  <td className="border border-gray-300 px-2 py-2 text-sm text-right font-bold">{selectedInvoice.total_amount.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Financial Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Gross</label>
                  <input
                    type="text"
                    value={selectedInvoice.gross_amount.toFixed(2)}
                    className="input"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Cash Disc.</label>
                  <input
                    type="text"
                    value="0.00"
                    className="input"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Round off</label>
                  <input
                    type="text"
                    value="0.00"
                    className="input"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Rs.</label>
                  <input
                    type="text"
                    value="0.00"
                    className="input"
                    readOnly
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="text-right space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Discounts:</span>
                  <span className="text-lg font-bold text-blue-600">{selectedInvoice.discount_amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Tax:</span>
                  <span className="text-lg font-bold text-gray-900">{selectedInvoice.tax_amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Add/Less:</span>
                  <span className="text-lg font-bold text-gray-900">0</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">NET:</span>
                    <span className="text-2xl font-bold text-blue-600">{selectedInvoice.total_amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 mt-6 pt-6 border-t">
            <button className="btn-secondary">New: Alt+N</button>
            <button className="btn-secondary">Save: Alt+S</button>
            <button className="btn-secondary">Print: Alt+P</button>
            <button className="btn-secondary">Draft: Alt+R</button>
            <button className="btn-secondary">Delete: Alt+D</button>
            <button className="btn-secondary">Cancel: Alt+C</button>
            <button className="btn-secondary">Cancel Changes: Alt+A</button>
            <button className="btn-secondary">Browse: Alt+E</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Billing & Invoices</h1>
          <p className="text-gray-600">Manage customer invoices and payments</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleCreatePurchase}
            className="btn-success"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Create Purchase
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn-primary"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Invoice
          </button>
        </div>
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
                        <button 
                          className="p-1 text-gray-400 hover:text-primary-600" 
                          title="View Details"
                          onClick={() => handleViewDetails(invoice)}
                        >
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