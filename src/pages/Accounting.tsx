import React, { useState } from 'react';
import { Plus, Download, Filter, TrendingUp, TrendingDown, DollarSign, CreditCard } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const mockTransactions = [
  {
    id: '1',
    type: 'income',
    category: 'Sales Revenue',
    amount: 2450.00,
    description: 'Invoice INV-2024-001 - City Medical Store',
    reference_type: 'invoice',
    reference_id: 'INV-2024-001',
    date: '2024-01-20',
  },
  {
    id: '2',
    type: 'expense',
    category: 'Inventory Purchase',
    amount: 15750.00,
    description: 'Purchase Order PO-2024-001 - PharmaCorp Supplies',
    reference_type: 'purchase_order',
    reference_id: 'PO-2024-001',
    date: '2024-01-18',
  },
  {
    id: '3',
    type: 'expense',
    category: 'Operating Expenses',
    amount: 1200.00,
    description: 'Monthly rent payment',
    date: '2024-01-15',
  },
  {
    id: '4',
    type: 'income',
    category: 'Sales Revenue',
    amount: 1875.50,
    description: 'Invoice INV-2024-002 - Health Plus Pharmacy',
    reference_type: 'invoice',
    reference_id: 'INV-2024-002',
    date: '2024-01-22',
  },
];

const cashFlowData = [
  { month: 'Jan', income: 45000, expenses: 32000, netFlow: 13000 },
  { month: 'Feb', income: 52000, expenses: 38000, netFlow: 14000 },
  { month: 'Mar', income: 48000, expenses: 35000, netFlow: 13000 },
  { month: 'Apr', income: 61000, expenses: 42000, netFlow: 19000 },
  { month: 'May', income: 55000, expenses: 39000, netFlow: 16000 },
  { month: 'Jun', income: 67000, expenses: 45000, netFlow: 22000 },
];

const accountsReceivable = [
  { customer: 'City Medical Store', amount: 2450.00, daysOverdue: 0, status: 'current' },
  { customer: 'Health Plus Pharmacy', amount: 1875.50, daysOverdue: 5, status: 'overdue' },
  { customer: 'MediCare Distributors', amount: 3200.75, daysOverdue: 15, status: 'overdue' },
  { customer: 'Central Pharmacy', amount: 1650.00, daysOverdue: 0, status: 'current' },
];

export function Accounting() {
  const [transactionType, setTransactionType] = useState('');
  const [dateRange, setDateRange] = useState('1month');

  const totalIncome = mockTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = mockTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netProfit = totalIncome - totalExpenses;

  const totalReceivables = accountsReceivable.reduce((sum, ar) => sum + ar.amount, 0);

  const filteredTransactions = mockTransactions.filter(transaction => {
    return !transactionType || transaction.type === transactionType;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Accounting & Finance</h1>
          <p className="text-gray-600">Financial management and accounting overview</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary">
            <Download className="h-4 w-4 mr-2" />
            Export Reports
          </button>
          <button className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add Transaction
          </button>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Income</p>
                <p className="text-2xl font-bold text-success-600">
                  ${totalIncome.toLocaleString()}
                </p>
                <p className="text-sm text-success-600">+12.5% this month</p>
              </div>
              <div className="bg-success-50 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-success-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-error-600">
                  ${totalExpenses.toLocaleString()}
                </p>
                <p className="text-sm text-error-600">+8.3% this month</p>
              </div>
              <div className="bg-error-50 p-3 rounded-full">
                <TrendingDown className="h-6 w-6 text-error-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Net Profit</p>
                <p className={`text-2xl font-bold ${netProfit >= 0 ? 'text-success-600' : 'text-error-600'}`}>
                  ${Math.abs(netProfit).toLocaleString()}
                </p>
                <p className="text-sm text-primary-600">Margin: {((netProfit / totalIncome) * 100).toFixed(1)}%</p>
              </div>
              <div className="bg-primary-50 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Accounts Receivable</p>
                <p className="text-2xl font-bold text-warning-600">
                  ${totalReceivables.toLocaleString()}
                </p>
                <p className="text-sm text-warning-600">{accountsReceivable.length} outstanding</p>
              </div>
              <div className="bg-warning-50 p-3 rounded-full">
                <CreditCard className="h-6 w-6 text-warning-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cash Flow Chart */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold">Cash Flow Analysis</h3>
        </div>
        <div className="card-content">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="income" fill="#22c55e" name="Income" />
              <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Recent Transactions</h3>
              <select
                className="input w-32"
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
              >
                <option value="">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              {filteredTransactions.slice(0, 5).map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      transaction.type === 'income' ? 'bg-success-500' : 'bg-error-500'
                    }`} />
                    <div>
                      <p className="font-medium text-gray-900">{transaction.category}</p>
                      <p className="text-sm text-gray-500">{transaction.description}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${
                      transaction.type === 'income' ? 'text-success-600' : 'text-error-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Accounts Receivable */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold">Accounts Receivable</h3>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              {accountsReceivable.map((account, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{account.customer}</p>
                    <p className={`text-sm ${
                      account.status === 'overdue' ? 'text-error-600' : 'text-success-600'
                    }`}>
                      {account.status === 'overdue' 
                        ? `${account.daysOverdue} days overdue` 
                        : 'Current'
                      }
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      ${account.amount.toLocaleString()}
                    </p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      account.status === 'overdue' 
                        ? 'bg-error-50 text-error-700' 
                        : 'bg-success-50 text-success-700'
                    }`}>
                      {account.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Net Profit Trend */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold">Net Profit Trend</h3>
        </div>
        <div className="card-content">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="netFlow" stroke="#3b82f6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}