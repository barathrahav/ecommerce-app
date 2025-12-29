const Product = require("../models/Product");
const Category = require("../models/Category");

// GET /api/products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true }).sort({
      createdAt: -1,
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// GET /api/products/:slug
exports.getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({
      slug: req.params.slug,
      isActive: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

// GET /api/admin/products (ADMIN)
exports.getAllProductsAdmin = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// POST /api/products (ADMIN)
exports.createProduct = async (req, res) => {
  try {
    const {
      title,
      slug,
      price,
      images = [],
      description = "",
      category = "",
      stock = 0,
      isActive = true,
    } = req.body;

    if (!title || !slug || price === undefined) {
      return res.status(400).json({
        message: "Title, slug and price are required",
      });
    }

    const existingProduct = await Product.findOne({ slug });
    if (existingProduct) {
      return res.status(400).json({ message: "Slug already exists" });
    }

    if (!category || category === "") {
      return res.status(400).json({ message: "Category is required" });
    }
    
    const categoryExists = await Category.findOne({ slug: category });
    if (!categoryExists) {
      return res.status(400).json({ message: "Invalid category" });
    }

    const product = await Product.create({
      title,
      slug,
      price,
      images,
      description,
      category,
      stock,
      isActive,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    res.status(500).json({ message: "Product creation failed" });
  }
};

// DELETE /api/products/:id (ADMIN)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete product" });
  }
};

// PUT /api/products/:id (ADMIN)
exports.updateProduct = async (req, res) => {
  try {
    const {
      title,
      slug,
      price,
      images,
      description,
      category,
      stock,
      isActive,
    } = req.body;

    if (!category || category === "") {
      return res.status(400).json({ message: "Category is required" });
    }

    const categoryExists = await Category.findOne({ slug: category });
    if (!categoryExists) {
      return res.status(400).json({ message: "Invalid category" });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Optional: prevent slug collision
    if (slug && slug !== product.slug) {
      const slugExists = await Product.findOne({ slug });
      if (slugExists) {
        return res.status(400).json({ message: "Slug already exists" });
      }
    }

    if (category) {
      const categoryExists = await Category.findOne({ slug: category });
      if (!categoryExists) {
        return res.status(400).json({ message: "Invalid category" });
      }
    }

    product.title = title ?? product.title;
    product.slug = slug ?? product.slug;
    product.price = price ?? product.price;
    product.images = images ?? product.images;
    product.description = description ?? product.description;
    product.category = category ?? product.category;
    product.stock = stock ?? product.stock;
    product.isActive = isActive ?? product.isActive;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
    res.status(500).json({ message: "Update failed" });
  }
};
