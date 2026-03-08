# POS System - Setup & Testing Guide

## ✅ Current Status
- Backend files: ✓ Created
- Backend dependencies: ✓ Installed
- Frontend files: ✓ Created
- Frontend dependencies: ✗ Need installation
- Environment config: ✓ Created

## 🚀 Quick Start (3 Steps)

### Step 1: Install Frontend Dependencies
Open Command Prompt in the `pos-system` folder and run:
```cmd
cd client
npm install
cd ..
```

Or simply double-click: `install.bat`

### Step 2: Start MongoDB
Make sure MongoDB is running. Open a new Command Prompt and run:
```cmd
mongod
```

Leave this window open while using the application.

### Step 3: Seed Database & Start Application

**First time only** - Add sample data:
```cmd
Double-click: seed.bat
```

**Start the application:**
```cmd
Double-click: start.bat
```

This will open two windows:
- Backend server (http://localhost:5000)
- Frontend app (http://localhost:3000)

## 🔐 Login Credentials

**Admin Account:**
- Email: `admin@pos.com`
- Password: `admin123`

## 📋 Features to Test

### 1. Dashboard
- View today's sales statistics
- Check low stock alerts
- See top-selling products chart

### 2. Products Management
- Click "Add Product" to create new products
- Edit existing products
- Check stock levels
- Products with low stock show warning badge

### 3. Sales / Billing
- Click "New Sale" to start
- Add products to cart by clicking them
- Select customer (optional)
- Choose payment method
- Complete sale
- View sales history

### 4. Customer Management
- Add new customers
- View customer details
- Track loyalty points
- View purchase history

### 5. Reports & Analytics
- View sales trends over time
- Check product performance
- Filter by date range
- Export data (future feature)

### 6. Settings (Admin/Manager only)
- Manage users
- Create cashier accounts
- Set user roles and permissions

## 🛠️ Troubleshooting

### MongoDB Connection Error
**Problem:** "MongoDB connection error"
**Solution:** Make sure MongoDB is running (`mongod` command)

### Port Already in Use
**Problem:** "Port 5000 or 3000 already in use"
**Solution:** 
- Close other applications using these ports
- Or change ports in `.env` file (backend) and `client/package.json` (proxy)

### Cannot Find Module Error
**Problem:** "Cannot find module 'express'"
**Solution:** Run `npm install` in the pos-system folder

### Frontend Won't Start
**Problem:** Frontend dependencies missing
**Solution:** 
```cmd
cd client
npm install
```

## 📁 Project Structure

```
pos-system/
├── server/              # Backend (Node.js + Express)
│   ├── models/         # Database models
│   ├── routes/         # API endpoints
│   ├── middleware/     # Auth middleware
│   └── scripts/        # Utility scripts
├── client/             # Frontend (React)
│   ├── src/
│   │   ├── pages/     # Page components
│   │   ├── components/ # Reusable components
│   │   └── context/   # Auth context
│   └── public/
├── .env               # Environment variables
└── *.bat             # Helper scripts
```

## 🔧 Manual Commands

If batch files don't work, use these commands:

**Install all dependencies:**
```cmd
npm install
cd client && npm install && cd ..
```

**Seed database:**
```cmd
node server/scripts/seed.js
```

**Start backend only:**
```cmd
node server/index.js
```

**Start frontend only:**
```cmd
cd client
npm start
```

## 📊 Sample Data Included

After running `seed.bat`, you'll have:
- 1 Admin user
- 5 Sample products (Laptop, Mouse, Keyboard, Monitor, USB Cable)
- 3 Sample customers

## 🎯 Next Steps After Testing

1. Customize products for your business
2. Add your actual inventory
3. Create user accounts for staff
4. Configure tax rates in the code
5. Set up receipt printing
6. Add barcode scanner integration

## 💡 Tips

- Use Ctrl+C in the command windows to stop servers
- Keep MongoDB running while using the app
- Admin can access all features
- Managers can manage products and view reports
- Cashiers can only process sales

## 🐛 Found Issues?

Check the console output in both server and browser for error messages.
