# Online Furniture Store Documentation

## Table of Contents
1. [Overview](#overview)
2. [Technical Stack](#technical-stack)
3. [System Architecture](#system-architecture)
4. [Core Features](#core-features)
5. [Setup and Installation](#setup-and-installation)
6. [API Reference](#api-reference)
7. [Database Schema](#database-schema)
8. [Security](#security)
9. [Future Roadmap](#future-roadmap)
10. [Support](#support)

## Overview

The Online Furniture Store is a full-stack e-commerce platform designed for furniture retail. The system supports both customer-facing operations and administrative functions through a dual-interface architecture.

### Key Capabilities
- **Customer Portal**: Browse, search, and purchase furniture
- **Admin Dashboard**: Manage inventory, users, and orders
- **Order Management**: Process and track customer orders
- **User Management**: Handle user authentication and profiles

## Technical Stack

### Frontend
- **Framework**: React.js
- **Markup/Styling**: HTML5, CSS3
- **State Management**: Built-in React hooks

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

### Third-Party Services
- **Payment Processing**: Stripe / PayPal integration
- **Image Storage**: AWS S3 / Firebase
- **Security**: SSL/TLS encryption

## System Architecture

```
src/
├── components/       # Reusable UI components
├── pages/           # Route-based view components
├── utils/           # Helper functions
├── services/        # API integration layer
└── styles/          # Global styles and themes

server/
├── models/          # Database schemas
├── routes/          # API route definitions
├── services/        # Business logic
├── middleware/      # Request processors
└── server.js        # Application entry point
```

## Core Features

### Customer Features
1. **Product Browsing**
   - Category-based navigation
   - Advanced search functionality
   - Detailed product views

2. **Shopping Cart**
   - Real-time cart management
   - Secure checkout process
   - Multiple payment options

3. **User Accounts**
   - Profile management
   - Order history tracking
   - Saved preferences

### Administrative Features
1. **Inventory Management**
   - Product CRUD operations
   - Image upload and management
   - Stock level tracking

2. **Order Processing**
   - Order status updates
   - Shipment tracking
   - Payment verification

3. **User Administration**
   - Customer account management
   - Access control
   - Activity monitoring

## Setup and Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB instance
- Git

### Installation Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/username/furniture-store.git
   cd furniture-store
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```
   PORT=3000
   MONGO_URI=your-mongodb-uri
   JWT_SECRET=your-secret-key
   STRIPE_KEY=your-stripe-api-key
   ```

4. Launch the application:
   ```bash
   npm run dev
   ```

## API Reference

### Authentication Endpoints
```
POST /api/users/register
POST /api/users/login
GET  /api/users/profile
```

### Product Endpoints
```
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

### Order Endpoints
```
POST /api/orders
GET  /api/orders/:id
PUT  /api/orders/:id
```

## Database Schema

### User Schema
```javascript
{
  name: String,
  email: String,
  password: String,
  isAdmin: Boolean
}
```

### Product Schema
```javascript
{
  name: String,
  price: Number,
  category: String,
  description: String,
  imageUrl: String
}
```

### Order Schema
```javascript
{
  userId: ObjectId,
  products: [{
    productId: ObjectId,
    quantity: Number
  }],
  totalAmount: Number,
  paymentStatus: String,
  orderStatus: String
}
```

## Security

### Implemented Measures
- JWT-based authentication
- Password hashing (bcrypt)
- HTTPS encryption
- Input validation
- XSS protection

### Best Practices
- Regular security audits
- Dependency updates
- Access control validation
- Rate limiting

## Future Roadmap

### Planned Features
1. **Enhanced User Experience**
   - Wishlist functionality
   - Product reviews and ratings
   - Discount system

2. **Technical Improvements**
   - AI-powered recommendations
   - Performance optimization
   - Mobile application

3. **Administrative Tools**
   - Advanced analytics
   - Automated inventory management
   - Enhanced reporting

## Support

### Contact Information
- Technical Support: support@furniturestore.com
- Documentation: [Internal Wiki]
- Issue Tracking: GitHub Issues

### Troubleshooting Guide
1. **Database Connection Issues**
   - Verify MongoDB URI
   - Check network connectivity
   - Confirm database permissions

2. **Payment Processing Errors**
   - Validate Stripe API keys
   - Check payment configuration
   - Verify webhook setup

3. **Administrative Access**
   - Confirm admin privileges
   - Verify JWT token
   - Check role assignments
