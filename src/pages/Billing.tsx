import React, { useState, useEffect, useRef } from 'react';
import { Plus, Search, Filter, FileText, Eye, Download, Send, Edit, Trash2, ShoppingCart, ArrowLeft, Save, Printer, X, ArrowUp, ArrowDown, ArrowRight, ArrowLeft as ArrowLeftIcon, Enter } from 'lucide-react';

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
const KeyboardShortcutsHelp = ({ isOpen, onClose, focusedElement }) => {
  const helpRef = useRef(null);

  useEffect(() => {
    if (isOpen && helpRef.current) {
      helpRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'F1') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div 
        ref={helpRef}
        tabIndex={-1}
        className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-96 overflow-y-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Keyboard Navigation Guide</h3>
          <span className="text-sm text-gray-500">Press ESC or F1 to close</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium mb-3 text-blue-600">Navigation Keys</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Move Up</span>
                <kbd className="bg-gray-100 px-2 py-1 rounded text-xs">↑</kbd>
              </div>
              <div className="flex justify-between">
                <span>Move Down</span>
                <kbd className="bg-gray-100 px-2 py-1 rounded text-xs">↓</kbd>
              </div>
              <div className="flex justify-between">
                <span>Move Left</span>
                <kbd className="bg-gray-100 px-2 py-1 rounded text-xs">←</kbd>
              </div>
              <div className="flex justify-between">
                <span>Move Right</span>
                <kbd className="bg-gray-100 px-2 py-1 rounded text-xs">→</kbd>
              </div>
              <div className="flex justify-between">
                <span>Select/Activate</span>
                <kbd className="bg-gray-100 px-2 py-1 rounded text-xs">Enter</kbd>
              </div>
              <div className="flex justify-between">
                <span>Tab Navigation</span>
                <kbd className="bg-gray-100 px-2 py-1 rounded text-xs">Tab</kbd>
              </div>
              <div className="flex justify-between">
                <span>Reverse Tab</span>
                <kbd className="bg-gray-100 px-2 py-1 rounded text-xs">Shift+Tab</kbd>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3 text-green-600">Action Shortcuts</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>New Invoice</span>
                <kbd className="bg-gray-100 px-2 py-1 rounded text-xs">Ctrl+N</kbd>
              </div>
              <div className="flex justify-between">
                <span>Create Purchase</span>
                <kbd className="bg-gray-100 px-2 py-1 rounded text-xs">Ctrl+P</kbd>
              </div>
              <div className="flex justify-between">
                <span>Save</span>
                <kbd className="bg-gray-100 px-2 py-1 rounded text-xs">Ctrl+S</kbd>
              </div>
              <div className="flex justify-between">
                <span>Print</span>
                <kbd className="bg-gray-100 px-2 py-1 rounded text-xs">Ctrl+Shift+P</kbd>
              </div>
              <div className="flex justify-between">
                <span>Edit Selected</span>
                <kbd className="bg-gray-100 px-2 py-1 rounded text-xs">Ctrl+E</kbd>
              </div>
              <div className="flex justify-between">
                <span>Delete Selected</span>
                <kbd className="bg-gray-100 px-2 py-1 rounded text-xs">Delete</kbd>
              </div>
              <div className="flex justify-between">
                <span>Search</span>
                <kbd className="bg-gray-100 px-2 py-1 rounded text-xs">Ctrl+F</kbd>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3 text-purple-600">System Controls</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Back/Cancel</span>
                <kbd className="bg-gray-100 px-2 py-1 rounded text-xs">Escape</kbd>
              </div>
              <div className="flex justify-between">
                <span>Help</span>
                <kbd className="bg-gray-100 px-2 py-1 rounded text-xs">F1</kbd>
              </div>
              <div className="flex justify-between">
                <span>Exit Application</span>
                <kbd className="bg-gray-100 px-2 py-1 rounded text-xs">Alt+F4</kbd>
              </div>
              <div className="flex justify-between">
                <span>Refresh</span>
                <kbd className="bg-gray-100 px-2 py-1 rounded text-xs">F5</kbd>
              </div>
              <div className="flex justify-between">
                <span>Home</span>
                <kbd className="bg-gray-100 px-2 py-1 rounded text-xs">Home</kbd>
              </div>
              <div className="flex justify-between">
                <span>End</span>
                <kbd className="bg-gray-100 px-2 py-1 rounded text-xs">End</kbd>
              </div>
              <div className="flex justify-between">
                <span>Page Up</span>
                <kbd className="bg-gray-100 px-2 py-1 rounded text-xs">PgUp</kbd>
              </div>
              <div className="flex justify-between">
                <span>Page Down</span>
                <kbd className="bg-gray-100 px-2 py-1 rounded text-xs">PgDn</kbd>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">Quick Tips:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Use arrow keys to navigate between table rows and form fields</li>
            <li>• Press Enter to activate buttons or select items</li>
            <li>• Use Tab to move between sections and Shift+Tab to go back</li>
            <li>• All actions can be performed without using a mouse</li>
            <li>• Press F1 anytime to see this help guide</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Create Bill/Purchase Modal with full keyboard navigation
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
  const [focusedField, setFocusedField] = useState(0);
  const modalRef = useRef(null);
  const fieldRefs = useRef([]);

  // Form fields in tab order
  const formFields = [
    'customerName', 'address', 'mobile', 'entryNo', 'refNo', 'excise',
    'product', 'batch', 'expiryDate', 'mrp', 'retailPrice', 'tradePrice',
    'qty', 'qtyUnit', 'tradeDisc', 'tax', 'addItem', 'save', 'print', 'cancel'
  ];

  useEffect(() => {
    if (currentItem.retailPrice && currentItem.tradePrice) {
      const retail = parseFloat(currentItem.retailPrice) || 0;
      const trade = parseFloat(currentItem.tradePrice) || 0;
      const calculatedMargin = trade > 0 ? ((retail - trade) / trade * 100) : 0;
      setMargin(calculatedMargin.toFixed(2));
    }
  }, [currentItem.retailPrice, currentItem.tradePrice]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
      setFocusedField(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
        
        case 'Tab':
          e.preventDefault();
          if (e.shiftKey) {
            setFocusedField(prev => prev > 0 ? prev - 1 : formFields.length - 1);
          } else {
            setFocusedField(prev => prev < formFields.length - 1 ? prev + 1 : 0);
          }
          break;
        
        case 'ArrowUp':
          e.preventDefault();
          setFocusedField(prev => prev > 0 ? prev - 1 : formFields.length - 1);
          break;
        
        case 'ArrowDown':
          e.preventDefault();
          setFocusedField(prev => prev < formFields.length - 1 ? prev + 1 : 0);
          break;
        
        case 'Enter':
          e.preventDefault();
          const currentField = formFields[focusedField];
          if (currentField === 'addItem') {
            handleAddItem();
          } else if (currentField === 'save') {
            handleSave();
          } else if (currentField === 'print') {
            window.print();
          } else if (currentField === 'cancel') {
            onClose();
          }
          break;
        
        case 'F1':
          e.preventDefault();
          // Could open help specific to this modal
          break;
      }

      // Ctrl shortcuts
      if (e.ctrlKey) {
        switch (e.key.toLowerCase()) {
          case 's':
            e.preventDefault();
            handleSave();
            break;
          case 'p':
            if (e.shiftKey) {
              e.preventDefault();
              window.print();
            }
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, focusedField, onClose]);

  // Focus the current field
  useEffect(() => {
    const currentFieldName = formFields[focusedField];
    const fieldElement = fieldRefs.current[currentFieldName];
    if (fieldElement) {
      fieldElement.focus();
    }
  }, [focusedField]);

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
      
      // Focus back to product field
      setFocusedField(6); // product field index
    }
  };

  const handleSave = () => {
    console.log('Saving:', type, formData);
    alert(`${type === 'invoice' ? 'Invoice' : 'Purchase'} saved successfully!`);
    onClose();
  };

  const getFieldClassName = (fieldName) => {
    const baseClass = "input";
    const focusedClass = formFields[focusedField] === fieldName ? 
      "ring-2 ring-blue-500 border-blue-500 bg-blue-50" : "";
    return `${baseClass} ${focusedClass}`;
  };

  const getButtonClassName = (buttonName) => {
    const baseClass = formFields[focusedField] === buttonName ? 
      "ring-2 ring-blue-500 bg-blue-600 text-white" : "";
    return baseClass;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div 
        ref={modalRef}
        tabIndex={-1}
        className="bg-white rounded-lg w-full max-w-6xl mx-4 max-h-screen overflow-y-auto focus:outline-none"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              Create {type === 'invoice' ? 'Invoice' : 'Purchase Order'}
            </h2>
            <div className="text-sm text-gray-500">
              Use Tab/Arrow keys to navigate • Enter to select • Esc to close
            </div>
          </div>

          {/* Customer Information */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Name *</label>
                  <input
                    ref={el => fieldRefs.current['customerName'] = el}
                    type="text"
                    value={formData.customerName}
                    onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                    className={getFieldClassName('customerName')}
                    placeholder="Customer name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Mobile No.</label>
                  <input
                    ref={el => fieldRefs.current['mobile'] = el}
                    type="text"
                    value={formData.mobile}
                    onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
                    className={getFieldClassName('mobile')}
                    placeholder="Mobile number"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-600 mb-1">Address</label>
                  <textarea
                    ref={el => fieldRefs.current['address'] = el}
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    className={`${getFieldClassName('address')} h-20 resize-none`}
                    placeholder="Customer address"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Entry No.</label>
                <input
                  ref={el => fieldRefs.current['entryNo'] = el}
                  type="text"
                  value={formData.entryNo}
                  onChange={(e) => setFormData(prev => ({ ...prev, entryNo: e.target.value }))}
                  className={getFieldClassName('entryNo')}
                  placeholder="Entry number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Ref. No.</label>
                <input
                  ref={el => fieldRefs.current['refNo'] = el}
                  type="text"
                  value={formData.refNo}
                  onChange={(e) => setFormData(prev => ({ ...prev, refNo: e.target.value }))}
                  className={getFieldClassName('refNo')}
                  placeholder="Reference number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Excise</label>
                <input
                  ref={el => fieldRefs.current['excise'] = el}
                  type="text"
                  value={formData.excise}
                  onChange={(e) => setFormData(prev => ({ ...prev, excise: e.target.value }))}
                  className={getFieldClassName('excise')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Date</label>
                <input 
                  type="date" 
                  className="input" 
                  defaultValue={new Date().toISOString().split('T')[0]} 
                />
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
                  ref={el => fieldRefs.current['product'] = el}
                  type="text"
                  value={currentItem.product}
                  onChange={(e) => setCurrentItem(prev => ({ ...prev, product: e.target.value }))}
                  className={getFieldClassName('product')}
                  placeholder="Product name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Batch</label>
                <input
                  ref={el => fieldRefs.current['batch'] = el}
                  type="text"
                  value={currentItem.batch}
                  onChange={(e) => setCurrentItem(prev => ({ ...prev, batch: e.target.value }))}
                  className={getFieldClassName('batch')}
                  placeholder="Batch number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Expiry Date</label>
                <input
                  ref={el => fieldRefs.current['expiryDate'] = el}
                  type="text"
                  value={currentItem.expiryDate}
                  onChange={(e) => setCurrentItem(prev => ({ ...prev, expiryDate: e.target.value }))}
                  className={getFieldClassName('expiryDate')}
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">MRP</label>
                <input
                  ref={el => fieldRefs.current['mrp'] = el}
                  type="number"
                  value={currentItem.mrp}
                  onChange={(e) => setCurrentItem(prev => ({ ...prev, mrp: e.target.value }))}
                  className={getFieldClassName('mrp')}
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Pricing Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4">
              {/* Retail Price Section */}
              <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                <h4 className="font-medium text-blue-800 mb-2">Retail Price Section</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Retail Price</label>
                  <input
                    ref={el => fieldRefs.current['retailPrice'] = el}
                    type="number"
                    value={currentItem.retailPrice}
                    onChange={(e) => setCurrentItem(prev => ({ ...prev, retailPrice: e.target.value }))}
                    className={getFieldClassName('retailPrice')}
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Trade Price Section */}
              <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                <h4 className="font-medium text-green-800 mb-2">Trade Price Section</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Trade Price</label>
                  <input
                    ref={el => fieldRefs.current['tradePrice'] = el}
                    type="number"
                    value={currentItem.tradePrice}
                    onChange={(e) => setCurrentItem(prev => ({ ...prev, tradePrice: e.target.value }))}
                    className={getFieldClassName('tradePrice')}
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Margin Section */}
              <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
                <h4 className="font-medium text-yellow-800 mb-2">Margin Section</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Margin %</label>
                  <input
                    type="text"
                    value={margin}
                    className="input bg-gray-100 font-bold text-lg"
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
                  ref={el => fieldRefs.current['qty'] = el}
                  type="number"
                  value={currentItem.qty}
                  onChange={(e) => setCurrentItem(prev => ({ ...prev, qty: e.target.value }))}
                  className={getFieldClassName('qty')}
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Unit</label>
                <select
                  ref={el => fieldRefs.current['qtyUnit'] = el}
                  value={currentItem.qtyUnit}
                  onChange={(e) => setCurrentItem(prev => ({ ...prev, qtyUnit: e.target.value }))}
                  className={getFieldClassName('qtyUnit')}
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
                  ref={el => fieldRefs.current['tradeDisc'] = el}
                  type="number"
                  value={currentItem.tradeDisc}
                  onChange={(e) => setCurrentItem(prev => ({ ...prev, tradeDisc: e.target.value }))}
                  className={getFieldClassName('tradeDisc')}
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Tax</label>
                <select
                  ref={el => fieldRefs.current['tax'] = el}
                  value={currentItem.tax}
                  onChange={(e) => setCurrentItem(prev => ({ ...prev, tax: e.target.value }))}
                  className={getFieldClassName('tax')}
                >
                  <option value="SG2">SG2</option>
                  <option value="SG1">SG1</option>
                  <option value="EXEMPT">EXEMPT</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  ref={el => fieldRefs.current['addItem'] = el}
                  onClick={handleAddItem}
                  className={`btn-primary w-full ${getButtonClassName('addItem')}`}
                >
                  Add Item (Enter)
                </button>
              </div>
            </div>
          </div>

          {/* Items Table */}
          {formData.items.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Items Added ({formData.items.length})</h3>
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
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-2 py-2 text-sm">{item.sr_no}</td>
                        <td className="border border-gray-300 px-2 py-2 text-sm">{item.product}</td>
                        <td className="border border-gray-300 px-2 py-2 text-sm">{item.batch}</td>
                        <td className="border border-gray-300 px-2 py-2 text-sm">{item.qty}</td>
                        <td className="border border-gray-300 px-2 py-2 text-sm">{item.tradePrice}</td>
                        <td className="border border-gray-300 px-2 py-2 text-sm font-medium">{item.final_amount.toFixed(2)}</td>
                        <td className="border border-gray-300 px-2 py-2 text-sm">
                          <button
                            onClick={() => setFormData(prev => ({
                              ...prev,
                              items: prev.items.filter(i => i.id !== item.id)
                            }))}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Delete item"
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
            <button 
              ref={el => fieldRefs.current['save'] = el}
              onClick={handleSave} 
              className={`btn-primary ${getButtonClassName('save')}`}
            >
              Save (Ctrl+S)
            </button>
            <button 
              ref={el => fieldRefs.current['print'] = el}
              onClick={() => window.print()} 
              className={`btn-secondary ${getButtonClassName('print')}`}
            >
              Print (Ctrl+Shift+P)
            </button>
            <button 
              ref={el => fieldRefs.current['cancel'] = el}
              onClick={onClose} 
              className={`btn-secondary ${getButtonClassName('cancel')}`}
            >
              Cancel (Esc)
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
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);
  const [createType, setCreateType] = useState('invoice');
  const [focusedElement, setFocusedElement] = useState('table');
  
  const searchRef = useRef(null);
  const tableRef = useRef(null);

  const filteredInvoices = mockInvoices.filter(invoice => {
    const matchesSearch = invoice.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Comprehensive keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Global shortcuts that work anywhere
      if (event.key === 'F1') {
        event.preventDefault();
        setShowKeyboardHelp(true);
        return;
      }

      if (event.key === 'F5') {
        event.preventDefault();
        window.location.reload();
        return;
      }

      if (event.altKey && event.key === 'F4') {
        event.preventDefault();
        if (window.confirm('Are you sure you want to exit the application?')) {
          window.close();
        }
        return;
      }

      // Ctrl shortcuts
      if (event.ctrlKey) {
        switch (event.key.toLowerCase()) {
          case 'n':
            event.preventDefault();
            setCreateType('invoice');
            setShowCreateModal(true);
            break;
          case 'p':
            if (event.shiftKey) {
              event.preventDefault();
              window.print();
            } else {
              event.preventDefault();
              setCreateType('purchase');
              setShowPurchaseModal(true);
            }
            break;
          case 'f':
            event.preventDefault();
            if (searchRef.current) {
              searchRef.current.focus();
              setFocusedElement('search');
            }
            break;
          case 'e':
            event.preventDefault();
            if (selectedInvoice) {
              handleEdit(selectedInvoice);
            }
            break;
          case 's':
            event.preventDefault();
            console.log('Save action triggered');
            break;
        }
        return;
      }

      // Navigation keys for table
      if (focusedElement === 'table') {
        switch (event.key) {
          case 'ArrowUp':
            event.preventDefault();
            setSelectedRowIndex(prev => prev > 0 ? prev - 1 : filteredInvoices.length - 1);
            setSelectedInvoice(filteredInvoices[selectedRowIndex > 0 ? selectedRowIndex - 1 : filteredInvoices.length - 1]);
            break;
          case 'ArrowDown':
            event.preventDefault();
            setSelectedRowIndex(prev => prev < filteredInvoices.length - 1 ? prev + 1 : 0);
            setSelectedInvoice(filteredInvoices[selectedRowIndex < filteredInvoices.length - 1 ? selectedRowIndex + 1 : 0]);
            break;
          case 'Home':
            event.preventDefault();
            setSelectedRowIndex(0);
            setSelectedInvoice(filteredInvoices[0]);
            break;
          case 'End':
            event.preventDefault();
            setSelectedRowIndex(filteredInvoices.length - 1);
            setSelectedInvoice(filteredInvoices[filteredInvoices.length - 1]);
            break;
          case 'PageUp':
            event.preventDefault();
            const newUpIndex = Math.max(0, selectedRowIndex - 10);
            setSelectedRowIndex(newUpIndex);
            setSelectedInvoice(filteredInvoices[newUpIndex]);
            break;
          case 'PageDown':
            event.preventDefault();
            const newDownIndex = Math.min(filteredInvoices.length - 1, selectedRowIndex + 10);
            setSelectedRowIndex(newDownIndex);
            setSelectedInvoice(filteredInvoices[newDownIndex]);
            break;
          case 'Enter':
            event.preventDefault();
            if (selectedInvoice) {
              handleViewDetails(selectedInvoice);
            }
            break;
          case 'Delete':
            event.preventDefault();
            if (selectedInvoice) {
              handleDelete(selectedInvoice);
            }
            break;
        }
      }

      // Escape key handling
      if (event.key === 'Escape') {
        event.preventDefault();
        if (showKeyboardHelp) {
          setShowKeyboardHelp(false);
        } else if (showCreateModal) {
          setShowCreateModal(false);
        } else if (showPurchaseModal) {
          setShowPurchaseModal(false);
        } else {
          // Go back or exit
          window.history.back();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedRowIndex, selectedInvoice, filteredInvoices, focusedElement, showKeyboardHelp, showCreateModal, showPurchaseModal]);

  // Set initial selected invoice
  useEffect(() => {
    if (filteredInvoices.length > 0 && !selectedInvoice) {
      setSelectedInvoice(filteredInvoices[0]);
    }
  }, [filteredInvoices]);

  // Focus table on mount
  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.focus();
    }
  }, []);

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
    console.log('Viewing details for:', invoice.invoice_number);
    alert(`Viewing details for ${invoice.invoice_number}`);
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
    console.log('Editing invoice:', invoice.invoice_number);
    alert(`Editing ${invoice.invoice_number}`);
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
          <p className="text-sm text-blue-600 mt-1">
            🎯 Full Keyboard Navigation • Press F1 for help • Use arrow keys to navigate
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleCreatePurchase}
            className="btn-success flex items-center space-x-2"
            title="Create Purchase (Ctrl+P)"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Create Purchase</span>
          </button>
          <button
            onClick={handleCreateInvoice}
            className="btn-primary flex items-center space-x-2"
            title="Create Invoice (Ctrl+N)"
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

      {/* Search and Filters */}
      <div className="card">
        <div className="card-content">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search invoices... (Ctrl+F to focus)"
                className="input pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setFocusedElement('search')}
                onBlur={() => setFocusedElement('table')}
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

      {/* Navigation Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 text-blue-800">
          <div className="flex items-center space-x-4 text-sm">
            <span>🔍 <kbd className="bg-blue-100 px-1 rounded">Ctrl+F</kbd> Search</span>
            <span>📝 <kbd className="bg-blue-100 px-1 rounded">Ctrl+N</kbd> New Invoice</span>
            <span>🛒 <kbd className="bg-blue-100 px-1 rounded">Ctrl+P</kbd> Purchase</span>
            <span>✏️ <kbd className="bg-blue-100 px-1 rounded">Ctrl+E</kbd> Edit</span>
            <span>🗑️ <kbd className="bg-blue-100 px-1 rounded">Del</kbd> Delete</span>
            <span>↕️ <kbd className="bg-blue-100 px-1 rounded">↑↓</kbd> Navigate</span>
            <span>✅ <kbd className="bg-blue-100 px-1 rounded">Enter</kbd> Select</span>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="card">
        <div className="card-content">
          <div 
            ref={tableRef}
            tabIndex={0}
            className="overflow-x-auto focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            onFocus={() => setFocusedElement('table')}
          >
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
                {filteredInvoices.map((invoice, index) => (
                  <tr 
                    key={invoice.id} 
                    className={`table-row cursor-pointer ${
                      selectedRowIndex === index ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                    }`}
                    onClick={() => {
                      setSelectedRowIndex(index);
                      setSelectedInvoice(invoice);
                    }}
                  >
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
                          title="View Details (Enter)"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetails(invoice);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          className="p-1 text-gray-400 hover:text-blue-600" 
                          title="Edit (Ctrl+E)"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(invoice);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          className="p-1 text-gray-400 hover:text-success-600" 
                          title="Download"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(invoice);
                          }}
                        >
                          <Download className="h-4 w-4" />
                        </button>
                        {invoice.status !== 'paid' && (
                          <button 
                            className="p-1 text-gray-400 hover:text-primary-600" 
                            title="Send"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSend(invoice);
                            }}
                          >
                            <Send className="h-4 w-4" />
                          </button>
                        )}
                        <button 
                          className="p-1 text-gray-400 hover:text-red-600" 
                          title="Delete (Del)"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(invoice);
                          }}
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
          
          {/* Selected Invoice Info */}
          {selectedInvoice && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Selected:</strong> {selectedInvoice.invoice_number} - {selectedInvoice.customer.name} 
                <span className="ml-4">
                  Press <kbd className="bg-blue-100 px-1 rounded">Enter</kbd> to view details, 
                  <kbd className="bg-blue-100 px-1 rounded ml-1">Ctrl+E</kbd> to edit, 
                  <kbd className="bg-blue-100 px-1 rounded ml-1">Del</kbd> to delete
                </span>
              </p>
            </div>
          )}
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
        focusedElement={focusedElement}
      />
    </div>
  );
}