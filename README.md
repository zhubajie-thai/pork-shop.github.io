# 🐷 Pork Shop Production Planner

## Overview

A **Live Order Entry Production Planner** for managing pork shop recipe production. This web-based application helps track customer orders and calculate the exact ingredients (chicken and pork) needed for each recipe, enabling efficient batch production planning.

## Features

- **📊 Real-time Calculations**: Automatically calculates production batches and ingredient requirements as orders are entered
- **🔢 Multiple Recipes**: Support for 4 different recipes with varying ingredient ratios
- **📈 Grand Totals**: Automatic aggregation of all orders and ingredient needs
- **⏱️ Live Timestamp**: Displays current date and time for each production plan
- **💾 Save Production Plans**: Export daily production plans with complete order details
- **📱 Responsive Design**: Clean, intuitive interface optimized for quick data entry

## How It Works

### Recipe Specifications

Each recipe has a base unit composition:

| Recipe | Base Chicken | Base Pork | Total Base |
|--------|-------------|-----------|-----------|
| No 1   | 20 units    | 3 units   | 23 units  |
| No 2   | 20 units    | 5 units   | 25 units  |
| No 3   | 20 units    | 9 units   | 29 units  |
| No 4   | 20 units    | 14 units  | 34 units  |

### Production Calculation

1. **Enter Customer Orders**: Input the number of units ordered for each recipe
2. **Auto-Calculate Batches**: System divides total order by the base unit amount
3. **Calculate Ingredient Needs**: Multiplies recipe ratios by batch count to get exact ingredient amounts
4. **View Grand Totals**: See total units ordered, batches needed, and total chicken/pork required

### Example

- Recipe No 1: 69 units ordered
- Base total: 23 units per batch
- Batches needed: 69 ÷ 23 = 3.00 batches
- Chicken needed: 20 × 3 = 60 units
- Pork needed: 3 × 3 = 9 units

## Getting Started

Simply open `index.html` in a web browser. No installation or server required for basic operation.

### Basic Usage

1. Open the application in your browser
2. Enter the number of units ordered for each recipe in the "Customer Order (INPUT)" column
3. The system automatically calculates:
   - Total Grind Batches needed
   - Chicken needed per recipe
   - Pork needed per recipe
   - Grand totals for all ingredients
4. Click "Save Production Plan" to log the day's production requirements

## Files

- **index.html** - Main application with embedded styling and JavaScript
- **file/** - Storage directory for receipts and invoices
- **README.md** - This documentation

## Technical Details

- Built with vanilla HTML, CSS, and JavaScript
- No dependencies or frameworks required
- Client-side calculations for instant feedback
- localStorage integration ready for enhanced data persistence
- Simulated server endpoint for future backend integration

## Future Enhancements

- Backend API integration for persistent data storage
- Historical production tracking and analytics
- Export to PDF or CSV format
- Ingredient inventory management
- Multi-user support with authentication