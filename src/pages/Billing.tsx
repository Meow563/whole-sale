import React, { useState, useEffect } from 'react';
import { Plus, Eye, Edit, Trash2, Download, Send } from 'lucide-react';
import { ModernTable } from '../components/Modern/ModernTable';
import { ModernCard } from '../components/Modern/ModernCard';

interface Invoice {
  id: string;
  invoice_number: string;
  customer_name: string;
  customer_address: string;
  customer_mobile: string;
  total_amount: number;
  tax_amount: number;
  discount_amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  due_date: string;
  created_at: string;
}

const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoice_number: 'INV-2024-001',
    customer_name: 'VEDPRAKASH MEDICAL',
    customer_address: 'JAIPUR, RAJASTHAN',
    customer_mobile: '7726008122',
    total_amount: 1599.22,
    tax_amount: 171.36,
    discount_amount: 30.71,
    status: 'paid',
    due_date: '2024-02-15',
    created_at: '2024-01-20',
  },
  {
    id: '2',
    invoice_number: 'INV-2024-002',
    customer_name: 'HEALTH PLUS PHARMACY',
    customer_address: 'MUMBAI, MAHARASHTRA',
    customer_mobile: '9876543210',
    total_amount: 2450.00,
    tax_amount: 245.00,
    discount_amount: 50.00,
    status: 'sent',
    due_date: '2024-02-20',
    created_at: '2024-01-22',
  },
  {
    id: '3',
    invoice_number: 'INV-2024-003',
    customer_name: 'CITY MEDICAL STORE',
    customer_address: 'DELHI, INDIA',
    customer_mobile: '9123456789',
    total_amount: 3200.75,
    tax_amount: 320.08,
    discount_amount: 75.25,
    status: 'overdue',
    due_date: '2024-01-30',
    created_at: '2024-01-15',
  },
];

export function Billing() {
  const [invoices] = useState<Invoice[]>(mockInvoices);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');
  const [mrp, setMrp] = useState<number>(0);
  const [tradePrice, setTradePrice] = useState<number>(0);
  const [margin, setMargin] = useState<number>(0);

  // Calculate margin when MRP or trade price changes
  useEffect(() => {
    if (mrp > 0 && tradePrice > 0) {
      const calculatedMargin = ((mrp - tradePrice) / tradePrice) * 100;
      setMargin(Number(calculatedMargin.toFixed(2)));
    } else {
      setMargin(0);
    }
  }, [mrp, tradePrice]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.ctrlKey) {
        switch (e.key.toLowerCase()) {
          case 'n':
            e.preventDefault();
            setShowCreateModal(true);
            break;
          case 'f':
            e.preventDefault();
            const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
            searchInput?.focus();
            break;
        }
      }

      if (e.key === 'Escape') {
        setShowCreateModal(false);
        setShowViewModal(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800 border-green-200';
      case 'sent': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleRowClick = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowViewModal(true);
  };

  const handleCreateInvoice = () => {
    if (!customerName.trim()) {
      alert('Customer name is required');
      return;
    }

    // Reset form
    setCustomerName('');
    setCustomerAddress('');
    setCustomerMobile('');
    setMrp(0);
    setTradePrice(0);
    setMargin(0);
    setShowCreateModal(false);
    
    alert('Invoice created successfully!');
  };

  const columns = [
    {
      key: 'invoice_number',
      label: 'Invoice #',
      sortable: true,
      render: (value: string) => (
        <span className="font-bold text-blue-600">{value}</span>
      )
    },
    {
      key: 'customer_name',
      label: 'Customer',
      sortable: true,
      render: (value: string, row: Invoice) => (
        <div>
          <p className="font-semibold text-gray-900">{value}</p>
          <p className="text-sm text-gray-500">{row.customer_mobile}</p>
        </div>
      )
    },
    {
      key: 'total_amount',
      label: 'Amount',
      sortable: true,
      render: (value: number) => (
        <span className="font-bold text-lg text-green-600">₹{value.toLocaleString()}</span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(value)}`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      )
    },
    {
      key: 'due_date',
      label: 'Due Date',
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString()
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_: any, row: Invoice) => (
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRowClick(row);
            }}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
            title="View"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              alert(`Editing ${row.invoice_number}`);
            }}
            className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
            title="Edit"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm(`Delete ${row.invoice_number}?`)) {
                alert(`${row.invoice_number} deleted`);
              }
            }}
            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )
    }
  ];

  const stats = [
    {
      title: 'Total Invoices',
      value: invoices.length.toString(),
      icon: Send,
      gradient: 'bg-gradient-to-r from-blue-500 to-blue-600',
    },
    {
      title: 'Total Revenue',
      value: `₹${invoices.reduce((sum, inv) => sum + inv.total_amount, 0).toLocaleString()}`,
      icon: Download,
      gradient: 'bg-gradient-to-r from-green-500 to-green-600',
    },
    {
      title: 'Paid Invoices',
      value: invoices.filter(inv => inv.status === 'paid').length.toString(),
      icon: Eye,
      gradient: 'bg-gradient-to-r from-purple-500 to-purple-600',
    },
    {
      title: 'Pending',
      value: invoices.filter(inv => inv.status !== 'paid').length.toString(),
      icon: Edit,
      gradient: 'bg-gradient-to-r from-orange-500 to-orange-600',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center animate-slide-up">
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Billing & Invoicing 📋
          </h1>
          <p className="text-gray-600 text-lg">Manage your invoices and billing efficiently</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <Plus className="h-5 w-5" />
            <span>New Invoice (Ctrl+N)</span>
          </button>
        </div>
      </div>

      {/* Keyboard Shortcuts Info */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4 animate-slide-up">
        <h3 className="font-bold text-blue-900 mb-2">⌨️ Keyboard Shortcuts</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <kbd className="px-2 py-1 bg-blue-200 rounded font-mono text-xs">↑↓</kbd>
            <span className="text-blue-800">Navigate</span>
          </div>
          <div className="flex items-center space-x-2">
            <kbd className="px-2 py-1 bg-green-200 rounded font-mono text-xs">Enter</kbd>
            <span className="text-green-800">View</span>
          </div>
          <div className="flex items-center space-x-2">
            <kbd className="px-2 py-1 bg-purple-200 rounded font-mono text-xs">Ctrl+N</kbd>
            <span className="text-purple-800">New</span>
          </div>
          <div className="flex items-center space-x-2">
            <kbd className="px-2 py-1 bg-orange-200 rounded font-mono text-xs">Ctrl+F</kbd>
            <span className="text-orange-800">Search</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
            <ModernCard
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              gradient={stat.gradient}
            />
          </div>
        ))}
      </div>

      {/* Invoices Table */}
      <div className="animate-slide-up">
        <ModernTable
          data={invoices}
          columns={columns}
          onRowClick={handleRowClick}
          searchable={true}
        />
      </div>

      {/* Create Invoice Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto animate-slide-up">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
              <h2 className="text-2xl font-bold">Create New Invoice</h2>
              <p className="text-blue-100">Fill in the details to create a new invoice</p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Customer Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Customer Name *</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    placeholder="Enter customer name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Address</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    placeholder="Enter address"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Mobile</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    placeholder="Enter mobile number"
                    value={customerMobile}
                    onChange={(e) => setCustomerMobile(e.target.value)}
                  />
                </div>
              </div>

              {/* Three Pricing Sections */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Retail Price Section */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-6">
                  <h4 className="font-bold text-blue-900 mb-4">📊 Retail Price Section</h4>
                  <label className="block text-sm font-bold text-blue-700 mb-2">MRP (₹)</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" 
                    placeholder="0.00"
                    value={mrp || ''}
                    onChange={(e) => setMrp(Number(e.target.value))}
                  />
                </div>

                {/* Trade Price Section */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-xl p-6">
                  <h4 className="font-bold text-green-900 mb-4">💰 Trade Price Section</h4>
                  <label className="block text-sm font-bold text-green-700 mb-2">Trade Price (₹)</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    className="w-full px-4 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-white" 
                    placeholder="0.00"
                    value={tradePrice || ''}
                    onChange={(e) => setTradePrice(Number(e.target.value))}
                  />
                </div>

                {/* Margin Section */}
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-300 rounded-xl p-6">
                  <h4 className="font-bold text-yellow-900 mb-4">📈 Margin Section</h4>
                  <label className="block text-sm font-bold text-yellow-700 mb-2">Margin (%)</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border-2 border-yellow-300 rounded-xl bg-yellow-50 font-bold text-yellow-900" 
                    value={margin.toFixed(2)}
                    readOnly
                  />
                  <p className="text-xs text-yellow-700 mt-2">Auto-calculated based on MRP and Trade Price</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 rounded-b-2xl flex justify-end space-x-4">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors font-medium"
              >
                Cancel (Esc)
              </button>
              <button 
                onClick={handleCreateInvoice}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 font-medium"
              >
                Create Invoice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Invoice Modal */}
      {showViewModal && selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto animate-slide-up">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Invoice Details</h2>
                  <p className="text-green-100">{selectedInvoice.invoice_number}</p>
                </div>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="text-white hover:text-gray-300 text-3xl font-bold"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Invoice Details */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50 rounded-xl p-4">
                  <h3 className="font-bold text-blue-900 mb-3">Customer Details</h3>
                  <p className="text-xl font-bold text-gray-900">{selectedInvoice.customer_name}</p>
                  <p className="text-gray-600">{selectedInvoice.customer_address}</p>
                  <p className="text-gray-600">📱 {selectedInvoice.customer_mobile}</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <h3 className="font-bold text-green-900 mb-3">Invoice Details</h3>
                  <p><span className="font-bold">Invoice #:</span> {selectedInvoice.invoice_number}</p>
                  <p><span className="font-bold">Date:</span> {new Date(selectedInvoice.created_at).toLocaleDateString()}</p>
                  <p><span className="font-bold">Due Date:</span> {new Date(selectedInvoice.due_date).toLocaleDateString()}</p>
                  <p className="flex items-center"><span className="font-bold">Status:</span> 
                    <span className={`ml-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedInvoice.status)}`}>
                      {selectedInvoice.status.charAt(0).toUpperCase() + selectedInvoice.status.slice(1)}
                    </span>
                  </p>
                </div>
              </div>

              {/* Invoice Summary */}
              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border-2 border-blue-200">
                <h3 className="font-bold text-gray-900 mb-4 text-xl">Invoice Summary</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <p className="flex justify-between"><span className="font-medium">Gross Amount:</span> <span className="font-bold">₹{(selectedInvoice.total_amount + selectedInvoice.discount_amount - selectedInvoice.tax_amount).toFixed(2)}</span></p>
                    <p className="flex justify-between"><span className="font-medium">Discount:</span> <span className="font-bold text-red-600">-₹{selectedInvoice.discount_amount.toFixed(2)}</span></p>
                  </div>
                  <div className="space-y-2 text-right">
                    <p className="flex justify-between"><span className="font-medium">Tax:</span> <span className="font-bold text-blue-600">+₹{selectedInvoice.tax_amount.toFixed(2)}</span></p>
                    <div className="border-t-2 border-gray-300 pt-2">
                      <p className="flex justify-between text-xl">
                        <span className="font-bold">NET TOTAL:</span> 
                        <span className="font-bold text-green-600">₹{selectedInvoice.total_amount.toFixed(2)}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 rounded-b-2xl flex justify-end space-x-4">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
                🖨️ Print
              </button>
              <button className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium">
                📄 Download PDF
              </button>
              <button
                onClick={() => setShowViewModal(false)}
                className="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors font-medium"
              >
                Close (Esc)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}