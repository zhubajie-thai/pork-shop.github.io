# 🐷 Quick Start Guide - Pork Shop Management System

## 📂 Project Structure
```
pork-shop.github.io/
├── index.html                  # 📝 Production Planner
├── pos.html                    # 💳 Point of Sale System
├── admin.html                  # 👔 Admin Backend
├── dashboard.html              # 🏠 Navigation Hub
├── employees.html              # 👨‍💼 Employee Management
├── customers.html              # 🎁 Loyalty Program
├── js/
│   └── data-service.js        # 💾 Shared Data Layer
├── productplan.html           # 📋 Production Plan Template
├── file/                      # 📄 PDF Documents
├── README.md                  # 📖 Project Overview
├── IMPLEMENTATION_SUMMARY.md  # 📊 Full Documentation
└── .git/                      # Version Control
```

## 🚀 Quick Links

### 1. **Start Here**: Dashboard
👉 Open `dashboard.html` to see all systems

### 2. **Sell Products**: POS System
👉 Open `pos.html` → Search customer by phone → Sell with loyalty points

### 3. **Manage Customers**: Loyalty Program
👉 Open `customers.html` → Add customers → Track loyalty tiers

### 4. **Manage Staff**: Employee System
👉 Open `employees.html` → Add employees → Track payroll

### 5. **Run Reports**: Admin Panel
👉 Open `admin.html` → View reports → Manage products & inventory

### 6. **Plan Production**: Production Planner
👉 Open `index.html` → Enter orders → Calculate batches needed

## 💡 Key Features

### ✨ Loyalty Program
- **3 Tiers**: Bronze (0-2,499 pts) → Silver (2,500-4,999 pts, 5% off) → Gold (5,000+ pts, 10% off)
- **Automatic**: Points awarded automatically at checkout
- **Smart Discounts**: Tier-based discounts apply automatically

### 💰 POS System
1. Enter customer phone to load loyalty profile
2. Add products to cart
3. Loyalty discount auto-applies
4. Pay cash or card
5. Receipt shows points earned

### 📊 Admin Reports
- Sales reports (transactions, revenue)
- Inventory tracking (stock levels, alerts)
- Production tracking (recipe usage)
- Revenue analysis (daily/weekly)

### 👥 Employee Management
- Track staff and salaries
- Manage status (Active/Inactive/On Leave)
- View payroll totals
- 5 Role types: Manager, Chef, Sales, Cashier, Delivery

## 📱 Mobile Support
✅ All pages are fully responsive
✅ Works on phones, tablets, and desktops
✅ Touch-friendly buttons and forms

## 💾 Data Storage
All data stored in browser localStorage:
- Survives browser refresh
- Persists across sessions
- Backup/restore in admin panel

## 🎮 How to Use Each System

### POS - Sell with Loyalty
```
1. Open pos.html
2. Enter phone number in "🎁 Loyalty Customer" field
3. Click Search
4. Add products to cart
5. Total shows automatic loyalty discount
6. Click Checkout
7. Enter payment info
8. Receipt shows points earned
```

### Customers - Manage Loyalty
```
1. Open customers.html
2. Click "➕ Add Customer"
3. Enter name, phone, email
4. View loyalty tier and points
5. Make sales to earn points
6. Tier auto-upgrades when points reach threshold
```

### Admin - View Reports & Manage
```
1. Open admin.html
2. Dashboard: See quick stats
3. Products: Add/edit/delete products
4. Inventory: Track stock levels
5. Reports: View sales, inventory, production
6. Settings: Configure business info
```

### Employees - Manage Staff
```
1. Open employees.html
2. Click "➕ Hire Employee"
3. Enter name, role, salary
4. View payroll totals
5. Update status as needed
6. Track active employees
```

## 🔧 Technical Details

### Data Service (js/data-service.js)
Handles all data operations:
- Product CRUD
- Customer management
- Loyalty tier calculation
- Sales recording
- Analytics

### localStorage Keys
- `porkshop_products` - Products catalog
- `porkshop_customers` - Customer database
- `porkshop_employees` - Employee records
- `porkshop_sales` - Transaction history
- `porkshop_settings` - Business config
- `dailyStats` - Daily POS statistics

## 📊 Default Data

**8 Products**
- Fried Pork (kg) - ₱450
- Grilled Pork (kg) - ₱520
- Roasted Pork (kg) - ₱580
- Pork Adobo (kg) - ₱650
- Ground Pork (kg) - ₱380
- Pork Belly (kg) - ₱420
- Pork Chops (kg) - ₱480
- Chicken Breast (kg) - ₱320

**3 Employees**
- Maria Santos (Manager) - ₱15,000
- Juan Dela Cruz (Sales) - ₱12,000
- Anna Garcia (Chef) - ₱13,000

## ⚠️ Important Notes

1. **Data is Local**: Information stored on device, not synced to cloud
2. **Backup Regularly**: Use admin panel backup feature
3. **Phone Numbers**: Use as customer IDs (e.g., "09123456789")
4. **Stock Management**: Adjust inventory in admin panel
5. **Reports**: Pull from actual recorded sales, not estimates

## 🆘 Troubleshooting

### Customer not found
- Make sure phone number matches exactly
- Create customer first in `customers.html`

### Data missing
- Check browser localStorage is enabled
- Try backup/restore in admin panel

### Discount not applying
- Make sure customer loyalty tier is set correctly
- Refresh page if needed

### Mobile layout broken
- Try responsive design mode in browser dev tools
- Check viewport meta tag

## 📞 Support

For issues or questions:
1. Check IMPLEMENTATION_SUMMARY.md for detailed docs
2. Review admin panel settings
3. Check browser console for errors (F12)

## 🎯 Next Steps

1. **Use Dashboard**: Start with dashboard.html
2. **Add Customers**: Create customers in customers.html
3. **Make Sales**: Try POS with loyalty search
4. **View Reports**: Check admin.html reports
5. **Manage Inventory**: Update stock in admin

---

**System Version**: 1.0  
**Status**: Production Ready ✅  
**Last Updated**: 2024
