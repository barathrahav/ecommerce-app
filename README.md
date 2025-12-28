# 🛒 Ecommerce App (MERN Stack)

A full-stack ecommerce application built using the **MERN stack** with complete user and admin workflows, secure authentication, product management, order handling, and cloud-based image uploads.

---

## 🚀 Tech Stack

### Frontend
- React
- React Router
- Context API
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Multer
- Cloudinary (Image Upload)

---

## ✨ Features

### 👤 User Features
- User registration & login (JWT based)
- View products
- Product details page
- Cart management
- Place orders
- View order history

### 🛠 Admin Features
- Secure admin login
- Admin dashboard
- Product management (CRUD)
- Upload multiple product images (Cloudinary)
- Edit & delete products
- Manage orders
- Role-based route protection

---

## 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control (USER / ADMIN)
- Protected routes on frontend and backend

---

## ☁️ Image Upload (Cloudinary)
- Admins can upload product images
- Images are stored in Cloudinary
- Only image URLs are saved in MongoDB
- Secure upload using Multer middleware

---

## 📁 Project Structure
ecommerce-app/
│
├── backend/
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ ├── middleware/
│ ├── config/
│ ├── server.js
│ └── .env
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── admin/
│ │ ├── components/
│ │ ├── context/
│ │ ├── routes/
│ │ └── services/
│ └── package.json
│
└── README.md

## ⚙️ Environment Variables

Create a `.env` file in the **backend** folder:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

▶️ Run Locally
Backend

cd backend
npm install
npm start

Frontend

cd frontend
npm install
npm start

Frontend runs on: http://localhost:3000
Backend runs on: http://localhost:5000

📌 Future Enhancements

Product image removal & reordering
Admin analytics dashboard
Pagination & search
Payment gateway integration
Wishlist feature

👨‍💻 Author

Barath Rahav
Full Stack Developer (MERN)