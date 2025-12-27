const express = require("express");
const router = express.Router();
const controller = require("../controllers/order.controller");
const { protect, adminOnly } = require("../middleware/auth.middleware");

// User routes
router.post("/", protect, controller.createOrder);
router.get("/my", protect, controller.getMyOrders);

// Admin route
router.get("/", protect, adminOnly, controller.getAllOrders);

module.exports = router;
