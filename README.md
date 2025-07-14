# Medicine Wholesale Management System

A comprehensive software solution for medicine wholesale businesses built with React, TypeScript, and Supabase.

## Features

### 🏥 Core Modules

1. **Dashboard**
   - Real-time business metrics and KPIs
   - Sales overview with interactive charts
   - Top-selling products analysis
   - Quick access to critical information

2. **Inventory Management**
   - Real-time stock tracking
   - Low stock and expiry alerts
   - Batch tracking and storage location management
   - Product categorization and search

3. **Purchase Orders**
   - Supplier order management
   - Delivery tracking and scheduling
   - Bulk order capabilities
   - Automated reorder notifications

4. **Billing & Invoicing**
   - Intuitive invoice creation
   - Payment processing and tracking
   - Discount and tax calculations
   - Recurring billing support

5. **Customer Management**
   - Customer database with credit limits
   - Outstanding balance tracking
   - License number management
   - Credit utilization monitoring

6. **Reports & Analytics**
   - Customizable reporting tools
   - Visual analytics with charts
   - Export capabilities (PDF, CSV)
   - Sales, inventory, and financial reports

7. **Accounting & Finance**
   - General ledger functionality
   - Accounts receivable/payable
   - Cash flow analysis
   - Financial reporting (P&L, Balance Sheet)

### 🔧 Technical Features

- **Modern Tech Stack**: React 18, TypeScript, Tailwind CSS
- **Database**: Supabase (PostgreSQL) with real-time capabilities
- **Authentication**: Secure user authentication with role-based access
- **Responsive Design**: Mobile-first approach with clean UI/UX
- **Data Visualization**: Interactive charts using Recharts
- **Export Functionality**: PDF and CSV export capabilities
- **Real-time Updates**: Live data synchronization

### 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd medicine-wholesale-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Fill in your Supabase credentials in the `.env` file.

4. **Set up Supabase**
   - Create a new Supabase project
   - Run the database migrations (see Database Setup section)
   - Update the environment variables

5. **Start the development server**
   ```bash
   npm run dev
   ```

### 📊 Database Setup

The system requires a Supabase database with the following tables:
- `products` - Medicine inventory
- `customers` - Customer information
- `suppliers` - Supplier details
- `invoices` - Billing information
- `purchase_orders` - Purchase management
- `transactions` - Financial records
- `stock_movements` - Inventory tracking

### 🔐 Security Features

- Row Level Security (RLS) enabled on all tables
- User authentication with email/password
- Role-based access control
- Secure API endpoints
- Data validation and sanitization

### 📱 User Interface

- Clean, professional design
- Intuitive navigation
- Responsive layout for all devices
- Accessibility compliant
- Dark/light mode support (coming soon)

### 🏭 Industry Compliance

- Pharmaceutical industry standards
- Batch tracking for regulatory compliance
- Expiry date monitoring
- License number validation
- Audit trail functionality

### 📈 Scalability

- Modular architecture
- Efficient database queries
- Optimized for large datasets
- Horizontal scaling support
- Performance monitoring

### 🛠️ Development

- TypeScript for type safety
- ESLint and Prettier for code quality
- Component-based architecture
- Reusable UI components
- Comprehensive error handling

### 📞 Support

For technical support or feature requests, please contact the development team.

### 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Demo Credentials:**
- Email: admin@medwholesale.com
- Password: password123

*Note: This is a demonstration system. Please set up proper authentication and security measures for production use.*