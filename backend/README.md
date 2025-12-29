# 🛒 E-commerce Backend (Node.js + MongoDB)

This is the backend service for the E-commerce application built using **Node.js, Express, and MongoDB**.  
It provides REST APIs for authentication, product management, cart orders, and admin operations.

---

## 🚀 Features Implemented
- RESTful APIs
- JWT-based authentication
- Role-based access (ADMIN / USER)
- Product & Category management
- Image upload via Cloudinary
- MongoDB with Mongoose
- Secure middleware & validations

### 🔐 Authentication & Authorization
- User Registration & Login
- JWT-based authentication
- Role-based access control (USER / ADMIN)
- Protected routes using middleware

### 📦 Products
- Get all products (public)
- Get product by slug (public)
- Create product (ADMIN only)
- Update product (ADMIN only)
- Delete product (ADMIN only)

### 🛒 Orders
- Create order (logged-in users)
- View own orders
- Admin: view all orders
- Admin: update order status
- Orders linked with users using MongoDB populate

### 👮 Admin Panel Support
- Admin-only APIs
- Manage products and orders

---

## 🧱 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- Cloudinary
- dotenv

---

## 📂 Project Structure
backend/
├── controllers/
├── models/
├── routes/
├── middleware/
├── config/
├── server.js
└── .env

## ⚙️ Environment Variables

Create a `.env` file in the backend root:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx

▶️ Run Backend Locally
npm install
npm run dev

Server will run on:
http://localhost:5000

📮 API Base URL
http://localhost:5000/api

🌱 Seed Categories
To insert default categories:
node src/seed/categories.seed.js

✅ Status
✔ Authentication complete
✔ Products CRUD complete
✔ Orders flow complete
✔ Admin APIs complete

🔮 Future Enhancements
Payment Gateway Integration (Razorpay)
Image upload (Cloudinary / S3)
Deployment (Render / AWS)
Rate limiting & refresh tokens
