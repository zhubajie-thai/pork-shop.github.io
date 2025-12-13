// Pork Shop Management System - Shared Data Service
// This service manages all data across the entire application

const PorkShopDataService = {
    // Initialize all data stores
    init() {
        this.initializeDefaults();
    },

    // Initialize default data if not exists
    initializeDefaults() {
        if (!localStorage.getItem('porkshop_products')) {
            localStorage.setItem('porkshop_products', JSON.stringify([
                { id: 1, name: 'Fried Pork (kg)', category: 'Recipe 1', price: 450, stock: 50, unit: 'kg', icon: '🍖' },
                { id: 2, name: 'Grilled Pork (kg)', category: 'Recipe 2', price: 520, stock: 30, unit: 'kg', icon: '🔥' },
                { id: 3, name: 'Roasted Pork (kg)', category: 'Recipe 3', price: 580, stock: 25, unit: 'kg', icon: '🍗' },
                { id: 4, name: 'Pork Adobo (kg)', category: 'Recipe 4', price: 650, stock: 20, unit: 'kg', icon: '🥘' },
                { id: 5, name: 'Ground Pork (kg)', category: 'Fresh', price: 380, stock: 15, unit: 'kg', icon: '🌪️' },
                { id: 6, name: 'Pork Belly (kg)', category: 'Fresh', price: 420, stock: 12, unit: 'kg', icon: '⬜' },
                { id: 7, name: 'Pork Chops (kg)', category: 'Fresh', price: 480, stock: 8, unit: 'kg', icon: '🥩' },
                { id: 8, name: 'Chicken Breast (kg)', category: 'Fresh', price: 320, stock: 35, unit: 'kg', icon: '🐔' }
            ]));
        }

        if (!localStorage.getItem('porkshop_employees')) {
            localStorage.setItem('porkshop_employees', JSON.stringify([
                { id: 1, name: 'Maria Santos', role: 'Manager', salary: 15000, status: 'Active', phone: '+63 9XX XXX 0001' },
                { id: 2, name: 'Juan Dela Cruz', role: 'Sales', salary: 12000, status: 'Active', phone: '+63 9XX XXX 0002' },
                { id: 3, name: 'Anna Garcia', role: 'Chef', salary: 13000, status: 'Active', phone: '+63 9XX XXX 0003' }
            ]));
        }

        if (!localStorage.getItem('porkshop_customers')) {
            localStorage.setItem('porkshop_customers', JSON.stringify([]));
        }

        if (!localStorage.getItem('porkshop_sales')) {
            localStorage.setItem('porkshop_sales', JSON.stringify([]));
        }

        if (!localStorage.getItem('porkshop_settings')) {
            localStorage.setItem('porkshop_settings', JSON.stringify({
                businessName: 'Pork Shop',
                currency: '₱',
                taxRate: 12,
                lowStockLevel: 5,
                businessAddress: '123 Pork Street, City',
                contactNumber: '+63 9XX XXX XXXX'
            }));
        }
    },

    // Product Methods
    getProducts() {
        return JSON.parse(localStorage.getItem('porkshop_products')) || [];
    },

    saveProducts(products) {
        localStorage.setItem('porkshop_products', JSON.stringify(products));
    },

    addProduct(product) {
        const products = this.getProducts();
        product.id = Math.max(...products.map(p => p.id), 0) + 1;
        products.push(product);
        this.saveProducts(products);
        return product;
    },

    updateProduct(id, updates) {
        const products = this.getProducts();
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
            products[index] = { ...products[index], ...updates };
            this.saveProducts(products);
        }
    },

    deleteProduct(id) {
        const products = this.getProducts().filter(p => p.id !== id);
        this.saveProducts(products);
    },

    // Employee Methods
    getEmployees() {
        return JSON.parse(localStorage.getItem('porkshop_employees')) || [];
    },

    saveEmployees(employees) {
        localStorage.setItem('porkshop_employees', JSON.stringify(employees));
    },

    addEmployee(employee) {
        const employees = this.getEmployees();
        employee.id = Math.max(...employees.map(e => e.id), 0) + 1;
        employee.hireDate = new Date().toLocaleDateString();
        employees.push(employee);
        this.saveEmployees(employees);
        return employee;
    },

    updateEmployee(id, updates) {
        const employees = this.getEmployees();
        const index = employees.findIndex(e => e.id === id);
        if (index !== -1) {
            employees[index] = { ...employees[index], ...updates };
            this.saveEmployees(employees);
        }
    },

    deleteEmployee(id) {
        const employees = this.getEmployees().filter(e => e.id !== id);
        this.saveEmployees(employees);
    },

    // Customer Methods
    getCustomers() {
        return JSON.parse(localStorage.getItem('porkshop_customers')) || [];
    },

    saveCustomers(customers) {
        localStorage.setItem('porkshop_customers', JSON.stringify(customers));
    },

    addCustomer(customer) {
        const customers = this.getCustomers();
        customer.id = Math.max(...customers.map(c => c.id), 0) + 1;
        customer.registeredDate = new Date().toLocaleDateString();
        customer.points = 0;
        customer.totalPurchases = 0;
        customers.push(customer);
        this.saveCustomers(customers);
        return customer;
    },

    updateCustomer(id, updates) {
        const customers = this.getCustomers();
        const index = customers.findIndex(c => c.id === id);
        if (index !== -1) {
            customers[index] = { ...customers[index], ...updates };
            this.saveCustomers(customers);
        }
    },

    addLoyaltyPoints(customerId, points) {
        const customers = this.getCustomers();
        const index = customers.findIndex(c => c.id === customerId);
        if (index !== -1) {
            customers[index].points += points;
            this.saveCustomers(customers);
        }
    },

    // Sales Methods
    getSales() {
        return JSON.parse(localStorage.getItem('porkshop_sales')) || [];
    },

    saveSales(sales) {
        localStorage.setItem('porkshop_sales', JSON.stringify(sales));
    },

    recordSale(saleData) {
        const sales = this.getSales();
        saleData.id = Math.max(...sales.map(s => s.id), 0) + 1;
        saleData.timestamp = new Date().toLocaleString();
        saleData.date = new Date().toLocaleDateString();
        sales.push(saleData);
        this.saveSales(sales);
        return saleData;
    },

    getDailySales(date) {
        return this.getSales().filter(s => s.date === date);
    },

    getTotalDailyRevenue(date) {
        return this.getDailySales(date).reduce((sum, s) => sum + s.total, 0);
    },

    // Settings Methods
    getSettings() {
        return JSON.parse(localStorage.getItem('porkshop_settings')) || {};
    },

    updateSettings(settings) {
        localStorage.setItem('porkshop_settings', JSON.stringify(settings));
    },

    // Analytics Methods
    getAnalytics() {
        const sales = this.getSales();
        const customers = this.getCustomers();
        const employees = this.getEmployees();
        const products = this.getProducts();

        const totalRevenue = sales.reduce((sum, s) => sum + s.total, 0);
        const totalTransactions = sales.length;
        const avgTransactionValue = totalTransactions > 0 ? totalRevenue / totalTransactions : 0;

        return {
            totalRevenue,
            totalTransactions,
            avgTransactionValue,
            uniqueCustomers: customers.length,
            totalEmployees: employees.length,
            totalProducts: products.length,
            lowStockProducts: products.filter(p => p.stock <= 5).length,
            topProducts: this.getTopProducts(5),
            topCustomers: this.getTopCustomers(5)
        };
    },

    getTopProducts(limit = 5) {
        const sales = this.getSales();
        const productSales = {};

        sales.forEach(sale => {
            sale.items?.forEach(item => {
                if (!productSales[item.id]) {
                    productSales[item.id] = { qty: 0, revenue: 0, name: item.name };
                }
                productSales[item.id].qty += item.qty;
                productSales[item.id].revenue += item.qty * item.price;
            });
        });

        return Object.values(productSales)
            .sort((a, b) => b.revenue - a.revenue)
            .slice(0, limit);
    },

    getTopCustomers(limit = 5) {
        const customers = this.getCustomers();
        return customers
            .sort((a, b) => b.totalPurchases - a.totalPurchases)
            .slice(0, limit);
    },

    getSalesByPaymentMethod() {
        const sales = this.getSales();
        const byMethod = {};

        sales.forEach(sale => {
            const method = sale.paymentMethod || 'Unknown';
            byMethod[method] = (byMethod[method] || 0) + sale.total;
        });

        return byMethod;
    },

    // Loyalty Program Methods
    getCustomerLoyaltyStatus(customerId) {
        const customer = this.getCustomers().find(c => c.id === customerId);
        if (!customer) return null;

        const points = customer.points || 0;
        let tier = 'Bronze';
        let rewardDiscount = 0;

        if (points >= 5000) {
            tier = 'Gold';
            rewardDiscount = 10;
        } else if (points >= 2500) {
            tier = 'Silver';
            rewardDiscount = 5;
        }

        return {
            tier,
            points,
            rewardDiscount,
            pointsPerPeso: 1
        };
    },

    redeemPoints(customerId, points) {
        const customers = this.getCustomers();
        const index = customers.findIndex(c => c.id === customerId);
        if (index !== -1 && customers[index].points >= points) {
            customers[index].points -= points;
            this.saveCustomers(customers);
            return true;
        }
        return false;
    }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    PorkShopDataService.init();
});
