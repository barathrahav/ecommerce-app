const router = require("express").Router();
const { getCategories, createCategory } = require("../controllers/category.controller");
const { protect, adminOnly } = require("../middleware/auth.middleware");

// Public (used by admin dropdown + frontend filters)
router.get("/", getCategories);

// Admin only
router.post("/", protect, adminOnly, createCategory);
module.exports = router;
