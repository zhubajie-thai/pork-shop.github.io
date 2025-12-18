const express = require('express');
const cors = require('cors');
const { v4: uuid } = require('uuid');

// In-memory data for demo purposes only.
// In a real app, replace this with a database (Postgres, MySQL, etc.).

/** @type {Array<{id:string,name:string,category:string,price:number,unit:string,description:string,imageUrl:string,stockQty:number,isActive:boolean}>} */
const products = [
  // Minimal sample data; you can sync this with your frontend PRODUCTS if needed.
  {
    id: 'p1',
    name: 'Premium Triple-Layer Belly',
    category: 'Chops & Steaks',
    price: 140,
    unit: 'kg',
    description: 'The ultimate standard for pork belly. Perfect fat-to-meat ratio for braising or crispy roasting.',
    imageUrl: 'https://images.unsplash.com/photo-1602491950780-1c5014a09805?auto=format&fit=crop&q=80&w=800',
    stockQty: 50,
    isActive: true,
  },
];

/** @type {Array<{id:string,name:string,email:string,phone?:string,addressLine1?:string,addressLine2?:string,city?:string,country?:string}>} */
const customers = [];

/** @type {Array<{id:string,customerId:string,items:Array<{productId:string,name:string,unitPrice:number,quantity:number}>,status:string,total:number,createdAt:string}>} */
const orders = [];

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Inventory (products)
app.get('/api/products', (_req, res) => {
  res.json(products.filter(p => p.isActive));
});

app.post('/api/products', (req, res) => {
  const { name, category, price, unit, description, imageUrl, stockQty = 0, isActive = true } = req.body;
  const product = {
    id: uuid(),
    name,
    category,
    price,
    unit,
    description,
    imageUrl,
    stockQty,
    isActive,
  };
  products.push(product);
  res.status(201).json(product);
});

app.patch('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const product = products.find(p => p.id === id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  Object.assign(product, req.body);
  res.json(product);
});

// Customers
app.get('/api/customers', (_req, res) => {
  res.json(customers);
});

app.post('/api/customers', (req, res) => {
  const { name, email, phone, addressLine1, addressLine2, city, country } = req.body;
  const customer = { id: uuid(), name, email, phone, addressLine1, addressLine2, city, country };
  customers.push(customer);
  res.status(201).json(customer);
});

// Orders
app.get('/api/orders', (_req, res) => {
  const hydrated = orders.map(order => ({
    ...order,
    customer: customers.find(c => c.id === order.customerId) || null,
  }));
  res.json(hydrated);
});

app.post('/api/orders', (req, res) => {
  const { customer, items } = req.body;
  if (!customer || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Customer and at least one item are required' });
  }

  // Find or create customer by email
  let existingCustomer = customers.find(c => c.email === customer.email);
  if (!existingCustomer) {
    existingCustomer = { id: uuid(), ...customer };
    customers.push(existingCustomer);
  } else {
    Object.assign(existingCustomer, customer);
  }

  const normalizedItems = items.map(it => ({
    productId: it.productId,
    name: it.name,
    unitPrice: it.unitPrice,
    quantity: it.quantity,
  }));

  const total = normalizedItems.reduce((sum, it) => sum + it.unitPrice * it.quantity, 0);

  const order = {
    id: uuid(),
    customerId: existingCustomer.id,
    items: normalizedItems,
    status: 'pending',
    total,
    createdAt: new Date().toISOString(),
  };
  orders.push(order);

  res.status(201).json({
    ...order,
    customer: existingCustomer,
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});


