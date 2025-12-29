const mongoose = require("mongoose");
const Category = require("../models/Category");
require("dotenv").config();

const categories = [
  { name: "Electronics", slug: "electronics", isActive: true },
  { name: "Grocery & Essentials", slug: "grocery-essentials", isActive: true },
  { name: "Home Appliances", slug: "home-appliances", isActive: true },
  { name: "Watches", slug: "watches", isActive: true },
  { name: "Health & Personal Care", slug: "health-personal-care", isActive: true },
  { name: "Computers & Laptops", slug: "computers-laptops", isActive: true },
  { name: "Fashion & Apparel", slug: "fashion-apparel", isActive: true },
  { name: "Electronic Accessories", slug: "electronic-accessories", isActive: true },
  { name: "Personal Accessories", slug: "personal-accessories", isActive: true },
  { name: "Books & Stationery", slug: "books-stationery", isActive: true },
  { name: "Toys & Games", slug: "toys-games", isActive: true },
  { name: "Sports & Fitness", slug: "sports-fitness", isActive: true },
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Category.insertMany(categories);
    console.log("✅ Categories seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
})();
