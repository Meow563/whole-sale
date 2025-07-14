export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'staff';
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  generic_name: string;
  manufacturer: string;
  category: string;
  unit: string;
  price: number;
  stock_quantity: number;
  reorder_level: number;
  expiry_date: string;
  batch_number: string;
  storage_location: string;
  created_at: string;
  updated_at: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  license_number: string;
  credit_limit: number;
  outstanding_balance: number;
  created_at: string;
}

export interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  contact_person: string;
  payment_terms: string;
  created_at: string;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  customer_id: string;
  customer: Customer;
  total_amount: number;
  tax_amount: number;
  discount_amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  due_date: string;
  created_at: string;
  items: InvoiceItem[];
}

export interface InvoiceItem {
  id: string;
  invoice_id: string;
  product_id: string;
  product: Product;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface PurchaseOrder {
  id: string;
  po_number: string;
  supplier_id: string;
  supplier: Supplier;
  total_amount: number;
  status: 'pending' | 'approved' | 'received' | 'cancelled';
  order_date: string;
  expected_delivery: string;
  created_at: string;
  items: PurchaseOrderItem[];
}

export interface PurchaseOrderItem {
  id: string;
  purchase_order_id: string;
  product_id: string;
  product: Product;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  reference_id?: string;
  reference_type?: 'invoice' | 'purchase_order';
  date: string;
  created_at: string;
}

export interface StockMovement {
  id: string;
  product_id: string;
  product: Product;
  type: 'in' | 'out';
  quantity: number;
  reference_type: 'purchase' | 'sale' | 'adjustment';
  reference_id: string;
  notes?: string;
  created_at: string;
}