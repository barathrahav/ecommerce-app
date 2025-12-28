const express = require("express");
const router = express.Router();
const controller = require("../controllers/product.controller");
const { protect, adminOnly } = require("../middleware/auth.middleware");
const upload = require("../middleware/upload");

// Public routes
router.get("/", controller.getProducts);
router.get("/:slug", controller.getProductBySlug);

// Admin routes
router.get("/", protect, adminOnly, controller.getAllProductsAdmin);
router.post("/", protect, adminOnly, controller.createProduct);
router.delete("/:id", protect, adminOnly, controller.deleteProduct);
router.put("/:id", protect, adminOnly, controller.updateProduct);

// IMAGE UPLOAD
router.post(
  "/upload",
  protect,
  adminOnly,
  upload.array("images", 5),
  (req, res) => {
    const urls = req.files.map((file) => file.path);
    res.json({ urls });
  }
);

module.exports = router;
