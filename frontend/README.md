# 🛍️ E-commerce Frontend (React)

This is the frontend application for the E-commerce platform built using **React** and **Tailwind CSS**.  
It consumes APIs from the Node.js backend and provides both **user** and **admin** interfaces.

---

## 🚀 Features Implemented

### 👤 User Features
- User Registration & Login
- Product listing
- Product details page
- Add to cart (auth required)
- Cart management (quantity, remove, clear)
- Checkout flow
- View order history
- Protected routes for authenticated users
- Product Management
- Category dropdown (DB-driven)
- Image preview for uploads

### 🧑‍💼 Admin Features
- Admin dashboard
- Create products
- Edit/update products
- Delete products
- View all orders
- Update order status
- Role-based route protection

### 🧭 UI/UX
- Navbar with auth-aware navigation
- Empty state handling
- Loading indicators
- Alerts for login-required actions
- Clean responsive layout

---

## 🧱 Tech Stack

- React
- React Router DOM
- Context API
- Tailwind CSS
- Axios

---

## 📂 Project Structure
```
frontend/
├── admin/
├── app/
├── components/
├── context/
├── hooks/
├── pages/
├── services/
├── styles/
├── main.jsx
└── App.js
```
---

## ⚙️ Environment Variables

Create a `.env` file in the frontend root:

```
REACT_APP_API_URL=http://localhost:5000/api

```

## ▶️ Run Frontend Locally

- npm install
- npm run dev

- Application runs on: http://localhost:3000

---

## 🔐 Authentication Flow
- JWT stored in localStorage
- Axios interceptor attaches token automatically
- Protected routes redirect unauthenticated users

---

## ✅ Status
✔ Auth flow complete
✔ Cart & checkout complete
✔ Admin dashboard complete
✔ Backend fully integrated

---

## 🔮 Future Enhancements
- Toast notifications
- Payment gateway UI
- Image upload UI
- Deployment
