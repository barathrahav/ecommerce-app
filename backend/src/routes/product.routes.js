const express = require("express");
const router = express.Router();
const controller = require("../controllers/product.controller");
const { protect, adminOnly } = require("../middleware/auth.middleware");

// Public routes
router.get("/", controller.getProducts);
router.get("/:slug", controller.getProductBySlug);

// Admin routes
router.post("/", protect, adminOnly, controller.createProduct);
router.delete("/:id", protect, adminOnly, controller.deleteProduct);
router.put("/:id", protect, adminOnly, controller.updateProduct);

module.exports = router;
