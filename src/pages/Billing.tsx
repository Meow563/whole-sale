import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, FileText, Eye, Download, Send, Edit, Trash2, ShoppingCart, ArrowLeft, Save, Printer, X } from 'lucide-react';

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
];

// Keyboard shortcuts help modal
const KeyboardShortcutsHelp = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Keyboard Shortcuts</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">Navigation</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Back</span>
                <kbd className="bg-gray-100 px-2 py-1 rounded">Alt + B</kbd>
              </div>
              <div className="flex justify-between">
                <span>Exit</span>
                <kbd className="bg-gray-100 px-2 py-1 rounded">Alt + X</kbd>
              </div>
              <div className="flex justify-between">
                <span>Help</span>
                <kbd className="bg-gray-100 px-2 py-1 rounded">F1</kbd>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2">Actions</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>New Invoice</span>
                <kbd className="bg-gray-100 px-2 py-1 rounded">Alt + N</kbd>
              </div>
              <div className="flex justify-between">
                <span>Save</span>
                <kbd className="bg-gray-100 px-2 py-1 rounded">Alt + S</kbd>
              </div>
              <div className="flex justify-between">
                <span>Print</span>
                <kbd className="bg-gray-100 px-2 py-1 rounded">Alt + P</kbd>
              </div>
              <div className="flex justify-between">
                <span>Edit</span>
                <kbd className="bg-gray-100 px-2 py-1 rounded">Alt + E</kbd>
              </div>
              <div className="flex justify-between">
                <span>Delete</span>
                <kbd className="bg-gray-100 px-2 py-1 rounded">Alt + D</kbd>
              </div>
              <div className="flex justify-between">
                <span>Create Purchase</span>
                <kbd className="bg-gray-100 px-2 py-1 rounded">Alt + C</kbd>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Create Bill/Purchase Modal
const CreateBillModal = ({ isOpen, onClose, type = 'invoice' }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    address: '',
    mobile: '',
    entryNo: '',
    refNo: '',
    excise: 'Not Applicable',
    consumptionDays: '',
    orderFrequency: '',
    items: []
  });

  const [currentItem, setCurrentItem] = useState({
    product: '',
    batch: '',
    expiryDate: '',
    mrp: '',
    retailPrice: '',
    tradePrice: '',
    qty: '',
    qtyUnit: 'TAB',
    tradeDisc: '',
    tax: 'SG2'
  });

  const [margin, setMargin] = useState(0);

  useEffect(() => {
    if (currentItem.retailPrice && currentItem.tradePrice) {
      const retail = parseFloat(currentItem.retailPrice) || 0;
      const trade = parseFloat(currentItem.tradePrice) || 0;
      const calculatedMargin = trade > 0 ? ((retail - trade) / trade * 100) : 0;
      setMargin(calculatedMargin.toFixed(2));
    }
  }, [currentItem.retailPrice, currentItem.tradePrice]);

  const handleAddItem = () => {
    if (currentItem.product && currentItem.qty) {
      const qty = parseFloat(currentItem.qty) || 0;
      const rate = parseFloat(currentItem.tradePrice) || 0;
      const discount = parseFloat(currentItem.tradeDisc) || 0;
      const finalAmount = (qty * rate) - discount;

      const newItem = {
        ...currentItem,
        id: Date.now().toString(),
        sr_no: formData.items.length + 1,
        final_amount: finalAmount
      };

      setFormData(prev => ({
        ...prev,
        items: [...prev.items, newItem]
      }));

      setCurrentItem({
        product: '',
        batch: '',
        expiryDate: '',
        mrp: '',
        retailPrice: '',
        tradePrice: '',
        qty: '',
        qtyUnit: 'TAB',
        tradeDisc: '',
        tax: 'SG2'
      });
    }
  };

  const handleSave = () => {
    console.log('Saving:', type, formData);
    alert(`${type === 'invoice' ? 'Invoice' : 'Purchase'} saved successfully!`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-6xl mx-4 max-h-screen overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              Create {type === 'invoice' ? 'Invoice' : 'Purchase Order'}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Customer Information */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Name *</label>
                  <input
                    type="text"
                    value={formData.customerName}
                    onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                    className="input"
                    placeholder="Customer name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Refer By</label>
                  <input type="text" className="input" placeholder="Reference" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Address</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    className="input h-20 resize-none"
                    placeholder="Customer address"
                  />
                </div>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Mobile No.</label>
                    <input
                      type="text"
                      value={formData.mobile}
                      onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
                      className="input"
                      placeholder="Mobile number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Balance</label>
                    <input type="text" className="input" placeholder="0.00" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Entry No.</label>
                <input
                  type="text"
                  value={formData.entryNo}
                  onChange={(e) => setFormData(prev => ({ ...prev, entryNo: e.target.value }))}
                  className="input"
                  placeholder="Entry number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Ref. No.</label>
                <input
                  type="text"
                  value={formData.refNo}
                  onChange={(e) => setFormData(prev => ({ ...prev, refNo: e.target.value }))}
                  className="input"
                  placeholder="Reference number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Excise</label>
                <input
                  type="text"
                  value={formData.excise}
                  onChange={(e) => setFormData(prev => ({ ...prev, excise: e.target.value }))}
                  className="input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Date</label>
                <input type="date" className="input" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
            </div>
          </div>

          {/* Item Entry Section */}
          <div className="border-t pt-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Add Items</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Product *</label>
                <input
                  type="text"
                  value={currentItem.product}
                  onChange={(e) => setCurrentItem(prev => ({ ...prev, product: e.target.value }))}
                  className="input"
                  placeholder="Product name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Batch</label>
                <input
                  type="text"
                  value={currentItem.batch}
                  onChange={(e) => setCurrentItem(prev => ({ ...prev, batch: e.target.value }))}
                  className="input"
                  placeholder="Batch number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Expiry Date</label>
                <input
                  type="text"
                  value={currentItem.expiryDate}
                  onChange={(e) => setCurrentItem(prev => ({ ...prev, expiryDate: e.target.value }))}
                  className="input"
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">MRP</label>
                <input
                  type="number"
                  value={currentItem.mrp}
                  onChange={(e) => setCurrentItem(prev => ({ ...prev, mrp: e.target.value }))}
                  className="input"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Pricing Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4">
              {/* Retail Price Section */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Retail Price Section</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Retail Price</label>
                  <input
                    type="number"
                    value={currentItem.retailPrice}
                    onChange={(e) => setCurrentItem(prev => ({ ...prev, retailPrice: e.target.value }))}
                    className="input"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Trade Price Section */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">Trade Price Section</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Trade Price</label>
                  <input
                    type="number"
                    value={currentItem.tradePrice}
                    onChange={(e) => setCurrentItem(prev => ({ ...prev, tradePrice: e.target.value }))}
                    className="input"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Margin Section */}
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2">Margin Section</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Margin %</label>
                  <input
                    type="text"
                    value={margin}
                    className="input bg-gray-100"
                    readOnly
                    placeholder="Auto-calculated"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Quantity *</label>
                <input
                  type="number"
                  value={currentItem.qty}
                  onChange={(e) => setCurrentItem(prev => ({ ...prev, qty: e.target.value }))}
                  className="input"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Unit</label>
                <select
                  value={currentItem.qtyUnit}
                  onChange={(e) => setCurrentItem(prev => ({ ...prev, qtyUnit: e.target.value }))}
                  className="input"
                >
                  <option value="TAB">TAB</option>
                  <option value="CAP">CAP</option>
                  <option value="BOT">BOT</option>
                  <option value="INJ">INJ</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Trade Disc.</label>
                <input
                  type="number"
                  value={currentItem.tradeDisc}
                  onChange={(e) => setCurrentItem(prev => ({ ...prev, tradeDisc: e.target.value }))}
                  className="input"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Tax</label>
                <select
                  value={currentItem.tax}
                  onChange={(e) => setCurrentItem(prev => ({ ...prev, tax: e.target.value }))}
                  className="input"
                >
                  <option value="SG2">SG2</option>
                  <option value="SG1">SG1</option>
                  <option value="EXEMPT">EXEMPT</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleAddItem}
                  className="btn-primary w-full"
                >
                  Add Item
                </button>
              </div>
            </div>
          </div>

          {/* Items Table */}
          {formData.items.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Items Added</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-2 py-2 text-left text-xs font-medium">Sr No</th>
                      <th className="border border-gray-300 px-2 py-2 text-left text-xs font-medium">Product</th>
                      <th className="border border-gray-300 px-2 py-2 text-left text-xs font-medium">Batch</th>
                      <th className="border border-gray-300 px-2 py-2 text-left text-xs font-medium">Qty</th>
                      <th className="border border-gray-300 px-2 py-2 text-left text-xs font-medium">Trade Price</th>
                      <th className="border border-gray-300 px-2 py-2 text-left text-xs font-medium">Final Amount</th>
                      <th className="border border-gray-300 px-2 py-2 text-left text-xs font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.items.map((item, index) => (
                      <tr key={item.id}>
                        <td className="border border-gray-300 px-2 py-2 text-sm">{item.sr_no}</td>
                        <td className="border border-gray-300 px-2 py-2 text-sm">{item.product}</td>
                        <td className="border border-gray-300 px-2 py-2 text-sm">{item.batch}</td>
                        <td className="border border-gray-300 px-2 py-2 text-sm">{item.qty}</td>
                        <td className="border border-gray-300 px-2 py-2 text-sm">{item.tradePrice}</td>
                        <td className="border border-gray-300 px-2 py-2 text-sm">{item.final_amount.toFixed(2)}</td>
                        <td className="border border-gray-300 px-2 py-2 text-sm">
                          <button
                            onClick={() => setFormData(prev => ({
                              ...prev,
                              items: prev.items.filter(i => i.id !== item.id)
                            }))}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 pt-6 border-t">
            <button onClick={() => setFormData({ customerName: '', address: '', mobile: '', entryNo: '', refNo: '', excise: 'Not Applicable', consumptionDays: '', orderFrequency: '', items: [] })} className="btn-secondary">
              New (Alt+N)
            </button>
            <button onClick={handleSave} className="btn-primary">
              Save (Alt+S)
            </button>
            <button onClick={() => window.print()} className="btn-secondary">
              Print (Alt+P)
            </button>
            <button onClick={onClose} className="btn-secondary">
              Cancel (Alt+C)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export function Billing() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showDetailView, setShowDetailView] = useState(false);
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);
  const [createType, setCreateType] = useState('invoice');

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.altKey) {
        switch (event.key.toLowerCase()) {
          case 'n':
            event.preventDefault();
            setCreateType('invoice');
            setShowCreateModal(true);
            break;
          case 'c':
            event.preventDefault();
            setCreateType('purchase');
            setShowPurchaseModal(true);
            break;
          case 'b':
            event.preventDefault();
            if (showDetailView) {
              setShowDetailView(false);
            } else {
              window.history.back();
            }
            break;
          case 'x':
            event.preventDefault();
            if (window.confirm('Are you sure you want to exit?')) {
              window.close();
            }
            break;
          case 'e':
            event.preventDefault();
            if (selectedInvoice) {
              setShowDetailView(true);
            }
            break;
          case 's':
            event.preventDefault();
            console.log('Save action triggered');
            break;
          case 'p':
            event.preventDefault();
            window.print();
            break;
          case 'd':
            event.preventDefault();
            if (selectedInvoice && window.confirm('Are you sure you want to delete this invoice?')) {
              console.log('Delete invoice:', selectedInvoice.id);
            }
            break;
        }
      } else if (event.key === 'F1') {
        event.preventDefault();
        setShowKeyboardHelp(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showDetailView, selectedInvoice]);

  const filteredInvoices = mockInvoices.filter(invoice => {
    const matchesSearch = invoice.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
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

  const handleCreateInvoice = () => {
    setCreateType('invoice');
    setShowCreateModal(true);
  };

  const handleCreatePurchase = () => {
    setCreateType('purchase');
    setShowPurchaseModal(true);
  };

  const handleEdit = (invoice) => {
    setSelectedInvoice(invoice);
    setCreateType('invoice');
    setShowCreateModal(true);
  };

  const handleDownload = (invoice) => {
    console.log('Downloading invoice:', invoice.invoice_number);
    alert(`Downloading ${invoice.invoice_number}`);
  };

  const handleSend = (invoice) => {
    console.log('Sending invoice:', invoice.invoice_number);
    alert(`Invoice ${invoice.invoice_number} sent successfully!`);
  };

  const handleDelete = (invoice) => {
    if (window.confirm(`Are you sure you want to delete ${invoice.invoice_number}?`)) {
      console.log('Deleting invoice:', invoice.id);
      alert(`Invoice ${invoice.invoice_number} deleted successfully!`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Billing & Invoices</h1>
          <p className="text-gray-600">Manage customer invoices and payments</p>
          <p className="text-sm text-gray-500 mt-1">Press F1 for keyboard shortcuts</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleCreatePurchase}
            className="btn-success flex items-center space-x-2"
            title="Create Purchase (Alt+C)"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Create Purchase</span>
          </button>
          <button
            onClick={handleCreateInvoice}
            className="btn-primary flex items-center space-x-2"
            title="Create Invoice (Alt+N)"
          >
            <Plus className="h-4 w-4" />
            <span>Create Invoice</span>
          </button>
          <button
            onClick={() => setShowKeyboardHelp(true)}
            className="btn-secondary flex items-center space-x-2"
            title="Keyboard Shortcuts (F1)"
          >
            <span>Help (F1)</span>
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
            <button className="btn-secondary flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>More Filters</span>
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
                        <button 
                          className="p-1 text-gray-400 hover:text-blue-600" 
                          title="Edit"
                          onClick={() => handleEdit(invoice)}
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          className="p-1 text-gray-400 hover:text-success-600" 
                          title="Download"
                          onClick={() => handleDownload(invoice)}
                        >
                          <Download className="h-4 w-4" />
                        </button>
                        {invoice.status !== 'paid' && (
                          <button 
                            className="p-1 text-gray-400 hover:text-primary-600" 
                            title="Send"
                            onClick={() => handleSend(invoice)}
                          >
                            <Send className="h-4 w-4" />
                          </button>
                        )}
                        <button 
                          className="p-1 text-gray-400 hover:text-red-600" 
                          title="Delete"
                          onClick={() => handleDelete(invoice)}
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
        </div>
      </div>

      {/* Modals */}
      <CreateBillModal 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)} 
        type="invoice"
      />
      <CreateBillModal 
        isOpen={showPurchaseModal} 
        onClose={() => setShowPurchaseModal(false)} 
        type="purchase"
      />
      <KeyboardShortcutsHelp 
        isOpen={showKeyboardHelp} 
        onClose={() => setShowKeyboardHelp(false)} 
      />
    </div>
  );
}