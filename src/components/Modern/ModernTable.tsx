import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, Search } from 'lucide-react';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}

interface ModernTableProps {
  data: any[];
  columns: Column[];
  searchable?: boolean;
  onRowClick?: (row: any, index: number) => void;
  selectedIndex?: number;
  className?: string;
}

export function ModernTable({ 
  data, 
  columns, 
  searchable = true, 
  onRowClick,
  selectedIndex = -1,
  className = '' 
}: ModernTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [currentSelectedIndex, setCurrentSelectedIndex] = useState(selectedIndex);

  // Filter data based on search term
  const filteredData = data.filter(row =>
    Object.values(row).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortConfig) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Handle sorting
  const handleSort = (key: string) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          setCurrentSelectedIndex(prev => Math.max(0, prev - 1));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setCurrentSelectedIndex(prev => Math.min(sortedData.length - 1, prev + 1));
          break;
        case 'Enter':
          e.preventDefault();
          if (currentSelectedIndex >= 0 && onRowClick) {
            onRowClick(sortedData[currentSelectedIndex], currentSelectedIndex);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentSelectedIndex, sortedData, onRowClick]);

  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden ${className}`}>
      {/* Search */}
      {searchable && (
        <div className="p-6 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full">
          <thead className="bg-gray-50/50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-4 text-left text-sm font-semibold text-gray-700 ${
                    column.sortable ? 'cursor-pointer hover:bg-gray-100 transition-colors' : ''
                  }`}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-2">
                    <span>{column.label}</span>
                    {column.sortable && sortConfig?.key === column.key && (
                      sortConfig.direction === 'asc' ? 
                        <ChevronUp className="h-4 w-4" /> : 
                        <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedData.map((row, index) => (
              <tr
                key={index}
                className={`smooth-transition cursor-pointer ${
                  index === currentSelectedIndex
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => {
                  setCurrentSelectedIndex(index);
                  onRowClick?.(row, index);
                }}
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 text-sm text-gray-900">
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Showing {sortedData.length} of {data.length} entries</span>
          {currentSelectedIndex >= 0 && (
            <span className="font-medium">
              Selected: Row {currentSelectedIndex + 1}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}