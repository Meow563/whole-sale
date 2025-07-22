import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Search, Eye, Edit, Trash2, Download, Send, FileText, DollarSign, Users, TrendingUp, ShoppingCart } from 'lucide-react';
import { showNotification } from '../components/GameUI/FloatingNotification';

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
  items: InvoiceItem[];
}

interface InvoiceItem {
  id: string;
  product_name: string;
  batch: string;
  expiry_date: string;
  mrp: number;
  rate: number;
  quantity: number;
  trade_discount: number;
  tax: number;
  final_amount: number;
}

const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoice_number: 'INV-2024-001',
    customer_name: 'VEDPRAKASH 255',
    customer_address: 'JAIPUR INDORE',
    customer_mobile: '7726008122',
    total_amount: 1599.22,
    tax_amount: 171.36,
    discount_amount: 30.71,
    status: 'paid',
    due_date: '2024-02-15',
    created_at: '2024-01-20',
    items: [
      {
        id: '1',
        product_name: '1 2 3 100 MG TABLET 4 (4 TAB)',
        batch: '56456',
        expiry_date: '02/22',
        mrp: 130.00,
        rate: 116.08,
        quantity: 14.00,
        trade_discount: 2.00,
        tax: 2.00,
        final_amount: 445.93
      }
    ]
  },
  {
    id: '2',
    invoice_number: 'INV-2024-002',
    customer_name: 'HEALTH PLUS PHARMACY',
    customer_address: 'MUMBAI CENTRAL',
    customer_mobile: '9876543210',
    total_amount: 2450.00,
    tax_amount: 245.00,
    discount_amount: 50.00,
    status: 'sent',
    due_date: '2024-02-20',
    created_at: '2024-01-22',
    items: []
  }
];

export function Billing() {
  const [invoices] = useState<Invoice[]>(mockInvoices);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null);

  // Form states for new invoice
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');
  const [mrp, setMrp] = useState<number>(0);
  const [tradePrice, setTradePrice] = useState<number>(0);
  const [margin, setMargin] = useState<number>(0);

  const filteredInvoices = invoices.filter(invoice =>
    invoice.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate margin when MRP or trade price changes
  useEffect(() => {
    if (mrp > 0 && tradePrice > 0) {
      const calculatedMargin = ((mrp - tradePrice) / tradePrice) * 100;
      setMargin(Number(calculatedMargin.toFixed(2)));
    } else {
      setMargin(0);
    }
  }, [mrp, tradePrice]);

  // Keyboard event handler with proper functionality
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Don't handle keys if modal is open or user is typing in input
    if (showCreateModal || showViewModal) return;
    if ((event.target as HTMLElement)?.tagName === 'INPUT') return;

    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        setSelectedIndex(prev => {
          const newIndex = Math.max(0, prev - 1);
          showNotification({
            type: 'info',
            title: 'Navigation',
            message: `Selected invoice ${filteredInvoices[newIndex]?.invoice_number || 'N/A'}`
          });
          return newIndex;
        });
        break;
        
      case 'ArrowDown':
        event.preventDefault();
        setSelectedIndex(prev => {
          const newIndex = Math.min(filteredInvoices.length - 1, prev + 1);
          showNotification({
            type: 'info',
            title: 'Navigation',
            message: `Selected invoice ${filteredInvoices[newIndex]?.invoice_number || 'N/A'}`
          });
          return newIndex;
        });
        break;
        
      case 'Enter':
        event.preventDefault();
        if (filteredInvoices[selectedIndex]) {
          viewInvoice(filteredInvoices[selectedIndex]);
        }
        break;
        
      case 'Delete':
        event.preventDefault();
        if (filteredInvoices[selectedIndex]) {
          deleteInvoice(filteredInvoices[selectedIndex].id);
        }
        break;
        
      case 'Escape':
        event.preventDefault();
        setShowCreateModal(false);
        setShowViewModal(false);
        setCurrentInvoice(null);
        break;
    }

    // Handle Ctrl combinations
    if (event.ctrlKey) {
      switch (event.key.toLowerCase()) {
        case 'n':
          event.preventDefault();
          setShowCreateModal(true);
          showNotification({
            type: 'info',
            title: 'New Invoice',
            message: 'Creating new invoice...'
          });
          break;
          
        case 'f':
          event.preventDefault();
          const searchInput = document.getElementById('search-input') as HTMLInputElement;
          if (searchInput) {
            searchInput.focus();
            showNotification({
              type: 'info',
              title: 'Search',
              message: 'Search field focused'
            });
          }
          break;
          
        case 'e':
          event.preventDefault();
          if (filteredInvoices[selectedIndex]) {
            editInvoice(filteredInvoices[selectedIndex].id);
          }
          break;
      }
    }
  }, [selectedIndex, filteredInvoices, showCreateModal, showViewModal]);

  // Add event listener
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Action functions
  const viewInvoice = (invoice: Invoice) => {
    setCurrentInvoice(invoice);
    setShowViewModal(true);
    showNotification({
      type: 'success',
      title: 'Invoice Opened',
      message: `Viewing ${invoice.invoice_number}`
    });
  };

  const editInvoice = (id: string) => {
    const invoice = invoices.find(inv => inv.id === id);
    if (invoice) {
      showNotification({
        type: 'info',
        title: 'Edit Mode',
        message: `Editing ${invoice.invoice_number}`
      });
    }
  };

  const deleteInvoice = (id: string) => {
    const invoice = invoices.find(inv => inv.id === id);
    if (invoice && confirm(`Delete invoice ${invoice.invoice_number}?`)) {
      showNotification({
        type: 'success',
        title: 'Invoice Deleted',
        message: `${invoice.invoice_number} has been deleted`
      });
    }
  };

  const createInvoice = () => {
    if (!customerName.trim()) {
      showNotification({
        type: 'error',
        title: 'Validation Error',
        message: 'Customer name is required'
      });
      return;
    }

    showNotification({
      type: 'success',
      title: 'Invoice Created!',
      message: `New invoice created for ${customerName}`
    });

    // Reset form
    setCustomerName('');
    setCustomerAddress('');
    setCustomerMobile('');
    setMrp(0);
    setTradePrice(0);
    setMargin(0);
    setShowCreateModal(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800 border-green-200';
      case 'sent': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🧾 Billing & Invoicing
          </h1>
          <p className="text-gray-600">Gamified invoice management with keyboard shortcuts</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => showNotification({
              type: 'info',
              title: 'Purchase Order',
              message: 'Creating new purchase order...'
            })}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-105"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Purchase (Ctrl+P)</span>
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
          >
            <Plus className="h-4 w-4" />
            <span>New Invoice (Ctrl+N)</span>
          </button>
        </div>
      </div>

      {/* Keyboard Instructions */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-4">
        <h3 className="font-bold text-blue-900 mb-3 flex items-center">
          🎮 Game Controls Active
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <kbd className="px-2 py-1 bg-blue-200 rounded font-mono">↑↓</kbd>
            <span className="text-blue-800">Navigate</span>
          </div>
          <div className="flex items-center space-x-2">
            <kbd className="px-2 py-1 bg-green-200 rounded font-mono">Enter</kbd>
            <span className="text-green-800">View</span>
          </div>
          <div className="flex items-center space-x-2">
            <kbd className="px-2 py-1 bg-purple-200 rounded font-mono">Ctrl+N</kbd>
            <span className="text-purple-800">New</span>
          </div>
          <div className="flex items-center space-x-2">
            <kbd className="px-2 py-1 bg-red-200 rounded font-mono">Del</kbd>
            <span className="text-red-800">Delete</span>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Invoices</p>
              <p className="text-3xl font-bold">{invoices.length}</p>
            </div>
            <FileText className="h-10 w-10 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Total Revenue</p>
              <p className="text-3xl font-bold">
                ₹{invoices.reduce((sum, inv) => sum + inv.total_amount, 0).toLocaleString()}
              </p>
            </div>
            <DollarSign className="h-10 w-10 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Paid Invoices</p>
              <p className="text-3xl font-bold">
                {invoices.filter(inv => inv.status === 'paid').length}
              </p>
            </div>
            <TrendingUp className="h-10 w-10 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Pending</p>
              <p className="text-3xl font-bold">
                {invoices.filter(inv => inv.status !== 'paid').length}
              </p>
            </div>
            <Users className="h-10 w-10 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            id="search-input"
            type="text"
            placeholder="🔍 Search invoices... (Ctrl+F to focus)"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Invoice #</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredInvoices.map((invoice, index) => (
                <tr
                  key={invoice.id}
                  className={`
                    cursor-pointer transition-all duration-200 hover:bg-gray-50
                    ${index === selectedIndex 
                      ? 'bg-gradient-to-r from-blue-100 to-purple-100 border-l-4 border-blue-500 shadow-lg transform scale-[1.02]' 
                      : 'hover:shadow-md'
                    }
                  `}
                  onClick={() => setSelectedIndex(index)}
                >
                  <td className="px-6 py-4">
                    <p className="font-bold text-blue-600 text-lg">{invoice.invoice_number}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900">{invoice.customer_name}</p>
                      <p className="text-sm text-gray-500">{invoice.customer_mobile}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-lg text-green-600">₹{invoice.total_amount.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border-2 ${getStatusColor(invoice.status)}`}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-900">{new Date(invoice.due_date).toLocaleDateString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          viewInvoice(invoice);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        title="View (Enter)"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          editInvoice(invoice.id);
                        }}
                        className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                        title="Edit (Ctrl+E)"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteInvoice(invoice.id);
                        }}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        title="Delete (Del)"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Selection Indicator */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-3 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <span className="font-medium text-gray-700">
                🎯 Selected: <span className="text-blue-600 font-bold">Row {selectedIndex + 1}</span> of {filteredInvoices.length}
              </span>
              <span className="text-gray-500">|</span>
              <span className="font-medium text-gray-700">
                📋 Current: <span className="text-purple-600 font-bold">{filteredInvoices[selectedIndex]?.invoice_number || 'None'}</span>
              </span>
            </div>
            <div className="text-xs text-gray-500">
              Use ↑↓ to navigate, Enter to view, Del to delete
            </div>
          </div>
        </div>
      </div>

      {/* Create Invoice Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
              <h2 className="text-2xl font-bold">🆕 Create New Invoice</h2>
              <p className="text-blue-100">Fill in the details to create a new invoice</p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Customer Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">👤 Customer Name *</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    placeholder="Enter customer name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">🏠 Address</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    placeholder="Enter address"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">📱 Mobile</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
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
                  <h4 className="font-bold text-blue-900 mb-4 flex items-center">
                    📊 Retail Price Section
                  </h4>
                  <label className="block text-sm font-bold text-blue-700 mb-2">MRP (₹)</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" 
                    placeholder="0.00"
                    value={mrp || ''}
                    onChange={(e) => setMrp(Number(e.target.value))}
                  />
                </div>

                {/* Trade Price Section */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-xl p-6">
                  <h4 className="font-bold text-green-900 mb-4 flex items-center">
                    💰 Trade Price Section
                  </h4>
                  <label className="block text-sm font-bold text-green-700 mb-2">Trade Price (₹)</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white" 
                    placeholder="0.00"
                    value={tradePrice || ''}
                    onChange={(e) => setTradePrice(Number(e.target.value))}
                  />
                </div>

                {/* Margin Section */}
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-300 rounded-xl p-6">
                  <h4 className="font-bold text-yellow-900 mb-4 flex items-center">
                    📈 Margin Section
                  </h4>
                  <label className="block text-sm font-bold text-yellow-700 mb-2">Margin (%)</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border-2 border-yellow-300 rounded-lg bg-yellow-50 font-bold text-yellow-900" 
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
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
              >
                Cancel (Esc)
              </button>
              <button 
                onClick={createInvoice}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 font-medium"
              >
                💾 Create Invoice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Invoice Modal */}
      {showViewModal && currentInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">📋 Invoice Details</h2>
                  <p className="text-green-100">{currentInvoice.invoice_number}</p>
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
              {/* Invoice Header */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50 rounded-xl p-4">
                  <h3 className="font-bold text-blue-900 mb-3">👤 Customer Details</h3>
                  <p className="text-xl font-bold text-gray-900">{currentInvoice.customer_name}</p>
                  <p className="text-gray-600">{currentInvoice.customer_address}</p>
                  <p className="text-gray-600">📱 {currentInvoice.customer_mobile}</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <h3 className="font-bold text-green-900 mb-3">📄 Invoice Details</h3>
                  <p><span className="font-bold">Invoice #:</span> {currentInvoice.invoice_number}</p>
                  <p><span className="font-bold">Date:</span> {new Date(currentInvoice.created_at).toLocaleDateString()}</p>
                  <p><span className="font-bold">Due Date:</span> {new Date(currentInvoice.due_date).toLocaleDateString()}</p>
                  <p className="flex items-center"><span className="font-bold">Status:</span> 
                    <span className={`ml-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border-2 ${getStatusColor(currentInvoice.status)}`}>
                      {currentInvoice.status.charAt(0).toUpperCase() + currentInvoice.status.slice(1)}
                    </span>
                  </p>
                </div>
              </div>

              {/* Items Table */}
              {currentInvoice.items.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-bold text-gray-900 mb-4 text-xl">📦 Items</h3>
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-xl overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-gray-100 to-gray-200">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Sr</th>
                          <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Product</th>
                          <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Batch</th>
                          <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Expiry</th>
                          <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">MRP</th>
                          <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Rate</th>
                          <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Qty</th>
                          <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Final Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {currentInvoice.items.map((item, index) => (
                          <tr key={item.id} className="hover:bg-white">
                            <td className="px-4 py-3 font-medium">{index + 1}</td>
                            <td className="px-4 py-3">{item.product_name}</td>
                            <td className="px-4 py-3 font-mono">{item.batch}</td>
                            <td className="px-4 py-3">{item.expiry_date}</td>
                            <td className="px-4 py-3 font-bold">₹{item.mrp.toFixed(2)}</td>
                            <td className="px-4 py-3">₹{item.rate.toFixed(2)}</td>
                            <td className="px-4 py-3 font-bold">{item.quantity}</td>
                            <td className="px-4 py-3 font-bold text-green-600">₹{item.final_amount.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Invoice Summary */}
              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border-2 border-blue-200">
                <h3 className="font-bold text-gray-900 mb-4 text-xl">💰 Invoice Summary</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <p className="flex justify-between"><span className="font-medium">Total Items:</span> <span className="font-bold">{currentInvoice.items.length}</span></p>
                    <p className="flex justify-between"><span className="font-medium">Gross Amount:</span> <span className="font-bold">₹{(currentInvoice.total_amount + currentInvoice.discount_amount - currentInvoice.tax_amount).toFixed(2)}</span></p>
                  </div>
                  <div className="space-y-2 text-right">
                    <p className="flex justify-between"><span className="font-medium">Discount:</span> <span className="font-bold text-red-600">-₹{currentInvoice.discount_amount.toFixed(2)}</span></p>
                    <p className="flex justify-between"><span className="font-medium">Tax:</span> <span className="font-bold text-blue-600">+₹{currentInvoice.tax_amount.toFixed(2)}</span></p>
                    <div className="border-t-2 border-gray-300 pt-2">
                      <p className="flex justify-between text-xl">
                        <span className="font-bold">NET TOTAL:</span> 
                        <span className="font-bold text-green-600">₹{currentInvoice.total_amount.toFixed(2)}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 rounded-b-2xl flex justify-end space-x-4">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                🖨️ Print
              </button>
              <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                📄 Download PDF
              </button>
              <button
                onClick={() => setShowViewModal(false)}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
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