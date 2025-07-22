import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Search, Eye, Edit, Trash2, Download, Send, FileText, DollarSign, Users, TrendingUp, ShoppingCart } from 'lucide-react';

// Add this at the top to ensure we're capturing events
const DEBUG_KEYBOARD = true;

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
      },
      {
        id: '2',
        product_name: '1 2 3 50 MG TABLET 4',
        batch: '456456',
        expiry_date: '02/24',
        mrp: 200.00,
        rate: 200.00,
        quantity: 14.00,
        trade_discount: 2.00,
        tax: 2.00,
        final_amount: 700.00
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

  const filteredInvoices = invoices.filter(invoice =>
    invoice.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Keyboard event handler
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (DEBUG_KEYBOARD) {
      console.log('🎹 Key pressed:', event.key, 'Ctrl:', event.ctrlKey, 'Alt:', event.altKey, 'Target:', event.target);
    }
    
    // Prevent default for our handled keys
    const handledKeys = ['ArrowUp', 'ArrowDown', 'Enter', 'Delete', 'Home', 'End', 'PageUp', 'PageDown', 'F1', 'F5'];
    const handledCtrlKeys = ['n', 'p', 'f', 'e', 's'];
    
    if (handledKeys.includes(event.key) || (event.ctrlKey && handledCtrlKeys.includes(event.key.toLowerCase()))) {
      event.preventDefault();
      event.stopPropagation();
      if (DEBUG_KEYBOARD) console.log('🚫 Prevented default for:', event.key);
    }

    // Handle Escape key
    if (event.key === 'Escape') {
      event.preventDefault();
      if (showCreateModal || showViewModal) {
        setShowCreateModal(false);
        setShowViewModal(false);
        setCurrentInvoice(null);
        if (DEBUG_KEYBOARD) console.log('✅ Modal closed with Escape');
      }
      return;
    }

    // Don't handle other keys if modal is open
    if (showCreateModal || showViewModal) {
      if (DEBUG_KEYBOARD) console.log('⏸️ Modal is open, ignoring key:', event.key);
      return;
    }

    // Handle navigation keys
    switch (event.key) {
      case 'ArrowUp':
        setSelectedIndex(prev => {
          const newIndex = Math.max(0, prev - 1);
          if (DEBUG_KEYBOARD) console.log('⬆️ Arrow Up - New index:', newIndex);
          return newIndex;
        });
        break;
        
      case 'ArrowDown':
        setSelectedIndex(prev => {
          const newIndex = Math.min(filteredInvoices.length - 1, prev + 1);
          if (DEBUG_KEYBOARD) console.log('⬇️ Arrow Down - New index:', newIndex);
          return newIndex;
        });
        break;
        
      case 'Home':
        setSelectedIndex(0);
        if (DEBUG_KEYBOARD) console.log('🏠 Home - Index set to 0');
        break;
        
      case 'End':
        setSelectedIndex(filteredInvoices.length - 1);
        if (DEBUG_KEYBOARD) console.log('🔚 End - Index set to:', filteredInvoices.length - 1);
        break;
        
      case 'PageUp':
        setSelectedIndex(prev => Math.max(0, prev - 10));
        if (DEBUG_KEYBOARD) console.log('📄⬆️ Page Up');
        break;
        
      case 'PageDown':
        setSelectedIndex(prev => Math.min(filteredInvoices.length - 1, prev + 10));
        if (DEBUG_KEYBOARD) console.log('📄⬇️ Page Down');
        break;
        
      case 'Enter':
        if (filteredInvoices[selectedIndex]) {
          viewInvoice(filteredInvoices[selectedIndex]);
          if (DEBUG_KEYBOARD) console.log('✅ Enter - Viewing invoice:', filteredInvoices[selectedIndex].invoice_number);
        }
        break;
        
      case 'Delete':
        if (filteredInvoices[selectedIndex]) {
          deleteInvoice(filteredInvoices[selectedIndex].id);
          if (DEBUG_KEYBOARD) console.log('🗑️ Delete - Deleting invoice:', filteredInvoices[selectedIndex].invoice_number);
        }
        break;
        
      case 'F1':
        showHelp();
        if (DEBUG_KEYBOARD) console.log('❓ F1 - Showing help');
        break;
        
      case 'F5':
        window.location.reload();
        if (DEBUG_KEYBOARD) console.log('🔄 F5 - Refreshing page');
        break;
    }

    // Handle Ctrl combinations
    if (event.ctrlKey) {
      switch (event.key.toLowerCase()) {
        case 'n':
          setShowCreateModal(true);
          if (DEBUG_KEYBOARD) console.log('🆕 Ctrl+N - Creating new invoice');
          break;
          
        case 'p':
          createPurchaseOrder();
          if (DEBUG_KEYBOARD) console.log('🛒 Ctrl+P - Creating purchase order');
          break;
          
        case 'f':
          const searchInput = document.getElementById('search-input') as HTMLInputElement;
          if (searchInput) {
            searchInput.focus();
            if (DEBUG_KEYBOARD) console.log('🔍 Ctrl+F - Focusing search');
          }
          break;
          
        case 'e':
          if (filteredInvoices[selectedIndex]) {
            editInvoice(filteredInvoices[selectedIndex].id);
            if (DEBUG_KEYBOARD) console.log('✏️ Ctrl+E - Editing invoice');
          }
          break;
          
        case 's':
          saveCurrentForm();
          if (DEBUG_KEYBOARD) console.log('💾 Ctrl+S - Saving form');
          break;
      }
    }
  }, [selectedIndex, filteredInvoices, showCreateModal, showViewModal]);

  // Add event listener
  useEffect(() => {
    if (DEBUG_KEYBOARD) console.log('🎯 Adding keyboard event listener');
    
    // Add to document and window for better capture
    document.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('keydown', handleKeyDown, true);
    
    return () => {
      if (DEBUG_KEYBOARD) console.log('🗑️ Removing keyboard event listener');
      document.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [handleKeyDown]);

  // Force focus on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      document.body.focus();
      if (DEBUG_KEYBOARD) console.log('🎯 Focused document body for keyboard events');
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Action functions
  const viewInvoice = (invoice: Invoice) => {
    setCurrentInvoice(invoice);
    setShowViewModal(true);
    if (DEBUG_KEYBOARD) console.log('👁️ Viewing invoice:', invoice.invoice_number);
  };

  const editInvoice = (id: string) => {
    const invoice = invoices.find(inv => inv.id === id);
    if (invoice) {
      if (DEBUG_KEYBOARD) console.log('✏️ Editing invoice:', invoice.invoice_number);
      alert(`Editing invoice: ${invoice.invoice_number}`);
    }
  };

  const deleteInvoice = (id: string) => {
    const invoice = invoices.find(inv => inv.id === id);
    if (invoice && confirm(`Delete invoice ${invoice.invoice_number}?`)) {
      if (DEBUG_KEYBOARD) console.log('🗑️ Deleted invoice:', invoice.invoice_number);
      alert(`Invoice ${invoice.invoice_number} deleted!`);
    }
  };

  const createPurchaseOrder = () => {
    if (DEBUG_KEYBOARD) console.log('🛒 Creating purchase order');
    alert('Creating new purchase order...');
  };

  const saveCurrentForm = () => {
    if (DEBUG_KEYBOARD) console.log('💾 Saving form');
    alert('Saving current form...');
  };

  const showHelp = () => {
    if (DEBUG_KEYBOARD) console.log('❓ Showing help');
    alert(`Keyboard Shortcuts:

Navigation:
↑↓ - Navigate rows
Home/End - First/Last row
Page Up/Down - Jump 10 rows
Enter - View invoice
Delete - Delete invoice

Actions:
Ctrl+N - New invoice
Ctrl+P - Purchase order
Ctrl+F - Search
Ctrl+E - Edit
Ctrl+S - Save
F1 - This help
F5 - Refresh
Escape - Cancel`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-success-50 text-success-700 border-success-200';
      case 'sent': return 'bg-primary-50 text-primary-700 border-primary-200';
      case 'draft': return 'bg-gray-50 text-gray-700 border-gray-200';
      case 'overdue': return 'bg-error-50 text-error-700 border-error-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Billing & Invoicing</h1>
          <p className="text-gray-600">Use keyboard shortcuts for navigation</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={createPurchaseOrder}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Create Purchase (Ctrl+P)</span>
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn-primary"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Invoice (Ctrl+N)
          </button>
        </div>
      </div>

      {/* Keyboard Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-medium text-blue-900 mb-2">🎯 Keyboard Navigation Active:</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-blue-800">
          <div><kbd className="px-2 py-1 bg-blue-200 rounded">↑↓</kbd> Navigate</div>
          <div><kbd className="px-2 py-1 bg-blue-200 rounded">Enter</kbd> View</div>
          <div><kbd className="px-2 py-1 bg-blue-200 rounded">Ctrl+N</kbd> New</div>
          <div><kbd className="px-2 py-1 bg-blue-200 rounded">F1</kbd> Help</div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Invoices</p>
                <p className="text-2xl font-bold text-gray-900">{invoices.length}</p>
              </div>
              <FileText className="h-8 w-8 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-success-600">
                  ₹{invoices.reduce((sum, inv) => sum + inv.total_amount, 0).toLocaleString()}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-success-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Paid Invoices</p>
                <p className="text-2xl font-bold text-success-600">
                  {invoices.filter(inv => inv.status === 'paid').length}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-success-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-warning-600">
                  {invoices.filter(inv => inv.status !== 'paid').length}
                </p>
              </div>
              <Users className="h-8 w-8 text-warning-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="card">
        <div className="card-content">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              id="search-input"
              type="text"
              placeholder="Search invoices... (Ctrl+F to focus)"
              className="input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
                  <th className="table-head">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((invoice, index) => (
                  <tr
                    key={invoice.id}
                    className={`table-row cursor-pointer transition-colors ${
                      index === selectedIndex 
                        ? 'bg-blue-100 border-l-4 border-blue-600 shadow-sm' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedIndex(index)}
                  >
                    <td className="table-cell">
                      <p className="font-medium text-primary-600">{invoice.invoice_number}</p>
                    </td>
                    <td className="table-cell">
                      <div>
                        <p className="font-medium text-gray-900">{invoice.customer_name}</p>
                        <p className="text-sm text-gray-500">{invoice.customer_mobile}</p>
                      </div>
                    </td>
                    <td className="table-cell">
                      <p className="font-medium">₹{invoice.total_amount.toLocaleString()}</p>
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
                      <div className="flex space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            viewInvoice(invoice);
                          }}
                          className="p-1 text-gray-400 hover:text-primary-600"
                          title="View (Enter)"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            editInvoice(invoice.id);
                          }}
                          className="p-1 text-gray-400 hover:text-blue-600"
                          title="Edit (Ctrl+E)"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteInvoice(invoice.id);
                          }}
                          className="p-1 text-gray-400 hover:text-error-600"
                          title="Delete (Del)"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-sm text-gray-600 bg-gray-50 p-2 rounded">
            <strong>Selected:</strong> Row {selectedIndex + 1} of {filteredInvoices.length} | 
            <strong> Current:</strong> {filteredInvoices[selectedIndex]?.invoice_number || 'None'}
          </div>
        </div>
      </div>

      {/* Create Invoice Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Create New Invoice</h2>
              <p className="text-sm text-gray-600">Press Escape to cancel</p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Customer Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
                  <input type="text" className="input" placeholder="Enter customer name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input type="text" className="input" placeholder="Enter address" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                  <input type="text" className="input" placeholder="Enter mobile number" />
                </div>
              </div>

              {/* Three Pricing Sections */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Retail Price Section */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">📊 Retail Price Section</h4>
                  <label className="block text-sm font-medium text-blue-700 mb-1">MRP (₹)</label>
                  <input type="number" step="0.01" className="input" placeholder="0.00" />
                </div>

                {/* Trade Price Section */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-medium text-green-900 mb-2">💰 Trade Price Section</h4>
                  <label className="block text-sm font-medium text-green-700 mb-1">Trade Price (₹)</label>
                  <input type="number" step="0.01" className="input" placeholder="0.00" />
                </div>

                {/* Margin Section */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-medium text-yellow-900 mb-2">📈 Margin Section</h4>
                  <label className="block text-sm font-medium text-yellow-700 mb-1">Margin (%)</label>
                  <input type="text" className="input bg-yellow-100" value="0.00" readOnly />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
              <button
                onClick={() => setShowCreateModal(false)}
                className="btn-secondary"
              >
                Cancel (Esc)
              </button>
              <button className="btn-primary">
                Save Invoice (Ctrl+S)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Invoice Modal */}
      {showViewModal && currentInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Invoice Details</h2>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Invoice Header */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Customer Details</h3>
                  <p className="text-lg font-medium">{currentInvoice.customer_name}</p>
                  <p className="text-gray-600">{currentInvoice.customer_address}</p>
                  <p className="text-gray-600">Mobile: {currentInvoice.customer_mobile}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Invoice Details</h3>
                  <p><span className="font-medium">Invoice #:</span> {currentInvoice.invoice_number}</p>
                  <p><span className="font-medium">Date:</span> {new Date(currentInvoice.created_at).toLocaleDateString()}</p>
                  <p><span className="font-medium">Due Date:</span> {new Date(currentInvoice.due_date).toLocaleDateString()}</p>
                  <p><span className="font-medium">Status:</span> 
                    <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(currentInvoice.status)}`}>
                      {currentInvoice.status.charAt(0).toUpperCase() + currentInvoice.status.slice(1)}
                    </span>
                  </p>
                </div>
              </div>

              {/* Items Table */}
              {currentInvoice.items.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-4">Items</h3>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="table">
                      <thead className="table-header">
                        <tr className="table-row">
                          <th className="table-head">Sr No</th>
                          <th className="table-head">Product</th>
                          <th className="table-head">Batch</th>
                          <th className="table-head">Expiry</th>
                          <th className="table-head">MRP</th>
                          <th className="table-head">Rate</th>
                          <th className="table-head">Qty</th>
                          <th className="table-head">Trade Disc.</th>
                          <th className="table-head">Tax</th>
                          <th className="table-head">Final Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentInvoice.items.map((item, index) => (
                          <tr key={item.id} className="table-row">
                            <td className="table-cell">{index + 1}</td>
                            <td className="table-cell">{item.product_name}</td>
                            <td className="table-cell">{item.batch}</td>
                            <td className="table-cell">{item.expiry_date}</td>
                            <td className="table-cell">₹{item.mrp.toFixed(2)}</td>
                            <td className="table-cell">₹{item.rate.toFixed(2)}</td>
                            <td className="table-cell">{item.quantity}</td>
                            <td className="table-cell">{item.trade_discount.toFixed(2)}</td>
                            <td className="table-cell">{item.tax.toFixed(2)}</td>
                            <td className="table-cell">₹{item.final_amount.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Invoice Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p><span className="font-medium">Total Items:</span> {currentInvoice.items.length}</p>
                    <p><span className="font-medium">Gross Amount:</span> ₹{(currentInvoice.total_amount + currentInvoice.discount_amount - currentInvoice.tax_amount).toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p><span className="font-medium">Discount:</span> ₹{currentInvoice.discount_amount.toFixed(2)}</p>
                    <p><span className="font-medium">Tax:</span> ₹{currentInvoice.tax_amount.toFixed(2)}</p>
                    <p className="text-lg font-bold text-blue-600">
                      <span className="font-medium">NET:</span> ₹{currentInvoice.total_amount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
              <button className="btn-secondary">Print</button>
              <button className="btn-primary">Download PDF</button>
              <button
                onClick={() => setShowViewModal(false)}
                className="btn-secondary"
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