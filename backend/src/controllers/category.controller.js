const Category = require("../models/Category");

// GET /api/categories
exports.getCategories = async (req, res) => {
  const categories = await Category.find({ isActive: true }).sort({ name: 1 });
  res.json(categories);
};

// POST /api/categories (ADMIN)
exports.createCategory = async (req, res) => {
  const { name, slug } = req.body;
  const category = await Category.create({ name, slug });
  res.status(201).json(category);
};
