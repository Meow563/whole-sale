import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, AlertTriangle, DollarSign, Users, Package } from 'lucide-react';
import { grokAI } from '../../lib/grokApi';

interface AIInsightsProps {
  type: 'inventory' | 'sales' | 'financial' | 'customers' | 'purchasing';
  data?: any[];
  title: string;
}

export const AIInsights: React.FC<AIInsightsProps> = ({ type, data = [], title }) => {
  const [insights, setInsights] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getInsights = async () => {
    if (!data.length) return;
    
    setLoading(true);
    setError(null);
    
    try {
      let result = '';
      
      switch (type) {
        case 'inventory':
          result = await grokAI.analyzeInventory(data);
          break;
        case 'sales':
          result = await grokAI.analyzeSales(data);
          break;
        case 'financial':
          result = await grokAI.analyzeFinancials(data[0] || {});
          break;
        case 'customers':
          result = await grokAI.analyzeCustomers(data);
          break;
        case 'purchasing':
          result = await grokAI.optimizePurchasing(data, []);
          break;
        default:
          result = 'Analysis type not supported';
      }
      
      setInsights(result);
    } catch (err) {
      setError('Failed to get AI insights');
      console.error('AI Insights Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'inventory': return <Package className="w-5 h-5" />;
      case 'sales': return <TrendingUp className="w-5 h-5" />;
      case 'financial': return <DollarSign className="w-5 h-5" />;
      case 'customers': return <Users className="w-5 h-5" />;
      case 'purchasing': return <Package className="w-5 h-5" />;
      default: return <Brain className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <button
          onClick={getInsights}
          disabled={loading || !data.length}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {getIcon()}
          <span>{loading ? 'Analyzing...' : 'Get AI Insights'}</span>
        </button>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          <span className="ml-2 text-gray-600">AI is analyzing your data...</span>
        </div>
      )}

      {error && (
        <div className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <span className="text-red-700">{error}</span>
        </div>
      )}

      {insights && !loading && (
        <div className="prose max-w-none">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
            <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
              {insights}
            </div>
          </div>
        </div>
      )}

      {!insights && !loading && !error && (
        <div className="text-center py-8 text-gray-500">
          <Brain className="w-12 h-12 mx-auto mb-2 text-gray-300" />
          <p>Click "Get AI Insights" to analyze your {type} data with Grok AI</p>
        </div>
      )}
    </div>
  );
};