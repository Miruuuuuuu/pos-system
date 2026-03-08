# POS System with Inventory Management

A complete Point of Sale system built with MERN stack.

## Features
- User authentication with role-based access
- Product & inventory management
- Sales & billing with QR code support
- Customer management
- Reports & analytics
- Real-time stock alerts

## Setup

1. Install dependencies:
```bash
npm install
cd client && npm install
```

2. Configure environment:
```bash
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```

3. Start MongoDB locally or use MongoDB Atlas

4. Run the application:
```bash
npm run dev
```

Server runs on http://localhost:5000
Client runs on http://localhost:3000

## Default Admin Login
Email: admin@pos.com
Password: admin123
