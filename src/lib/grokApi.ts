// Grok AI API Integration for Medicine Wholesale System
const GROK_API_KEY = 'xai-oUw9JxN8s69VxkCkxLE1F0NEZz2WV8sUmZi3nW0O7rr4jBJ8OOTcJKEthAnKnnGoKrwf5KboLA56VhnV';
const GROK_API_URL = 'https://api.x.ai/v1/chat/completions';

interface GrokMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface GrokResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

class GrokAI {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = GROK_API_KEY;
    this.baseUrl = GROK_API_URL;
  }

  private async makeRequest(messages: GrokMessage[]): Promise<string> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages,
          model: 'grok-beta',
          stream: false,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`Grok API error: ${response.status}`);
      }

      const data: GrokResponse = await response.json();
      return data.choices[0]?.message?.content || 'No response from AI';
    } catch (error) {
      console.error('Grok API Error:', error);
      return 'AI service temporarily unavailable';
    }
  }

  // Inventory Analysis and Predictions
  async analyzeInventory(inventoryData: any[]): Promise<string> {
    const systemPrompt = `You are an AI assistant specialized in pharmaceutical inventory management. 
    Analyze the provided inventory data and provide insights on:
    1. Stock optimization recommendations
    2. Expiry risk assessment
    3. Demand forecasting
    4. Cost optimization opportunities
    5. Regulatory compliance suggestions
    
    Provide actionable insights in a professional format.`;

    const userPrompt = `Analyze this inventory data: ${JSON.stringify(inventoryData.slice(0, 10))}`;

    return await this.makeRequest([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ]);
  }

  // Sales Analytics and Insights
  async analyzeSales(salesData: any[]): Promise<string> {
    const systemPrompt = `You are an AI assistant specialized in pharmaceutical sales analysis.
    Analyze the sales data and provide insights on:
    1. Sales trends and patterns
    2. Customer behavior analysis
    3. Product performance evaluation
    4. Revenue optimization strategies
    5. Market opportunities
    
    Focus on actionable business intelligence.`;

    const userPrompt = `Analyze this sales data: ${JSON.stringify(salesData.slice(0, 10))}`;

    return await this.makeRequest([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ]);
  }

  // Purchase Order Optimization
  async optimizePurchasing(purchaseData: any[], inventoryData: any[]): Promise<string> {
    const systemPrompt = `You are an AI assistant specialized in pharmaceutical procurement optimization.
    Analyze purchase patterns and inventory levels to provide:
    1. Optimal order quantities
    2. Supplier performance insights
    3. Cost reduction opportunities
    4. Lead time optimization
    5. Risk mitigation strategies`;

    const userPrompt = `Optimize purchasing based on this data:
    Purchases: ${JSON.stringify(purchaseData.slice(0, 5))}
    Inventory: ${JSON.stringify(inventoryData.slice(0, 5))}`;

    return await this.makeRequest([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ]);
  }

  // Financial Analysis
  async analyzeFinancials(financialData: any): Promise<string> {
    const systemPrompt = `You are an AI assistant specialized in pharmaceutical business financial analysis.
    Analyze financial data and provide insights on:
    1. Cash flow optimization
    2. Profitability analysis
    3. Cost structure evaluation
    4. Financial risk assessment
    5. Growth opportunities`;

    const userPrompt = `Analyze this financial data: ${JSON.stringify(financialData)}`;

    return await this.makeRequest([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ]);
  }

  // Regulatory Compliance Assistant
  async checkCompliance(productData: any[]): Promise<string> {
    const systemPrompt = `You are an AI assistant specialized in pharmaceutical regulatory compliance.
    Review product data for compliance issues and provide:
    1. Regulatory compliance status
    2. Documentation requirements
    3. Expiry management recommendations
    4. License and certification tracking
    5. Risk mitigation strategies`;

    const userPrompt = `Check compliance for these products: ${JSON.stringify(productData.slice(0, 5))}`;

    return await this.makeRequest([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ]);
  }

  // Customer Insights
  async analyzeCustomers(customerData: any[]): Promise<string> {
    const systemPrompt = `You are an AI assistant specialized in pharmaceutical customer relationship management.
    Analyze customer data and provide insights on:
    1. Customer segmentation
    2. Purchase behavior patterns
    3. Credit risk assessment
    4. Relationship optimization
    5. Growth opportunities`;

    const userPrompt = `Analyze customer data: ${JSON.stringify(customerData.slice(0, 5))}`;

    return await this.makeRequest([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ]);
  }

  // General Business Query
  async askBusinessQuestion(question: string, context?: any): Promise<string> {
    const systemPrompt = `You are an AI assistant specialized in pharmaceutical wholesale business management.
    Provide expert advice and insights for medicine wholesale operations, including:
    - Inventory management
    - Sales optimization
    - Financial planning
    - Regulatory compliance
    - Customer management
    - Supplier relationships`;

    const contextStr = context ? `Context: ${JSON.stringify(context)}` : '';
    const userPrompt = `${question} ${contextStr}`;

    return await this.makeRequest([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ]);
  }
}

export const grokAI = new GrokAI();