const Order = require("../models/Order");


// POST /api/orders
exports.createOrder = async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order items required" });
    }

    const order = await Order.create({
      userId: req.user.id,
      items,
      totalAmount,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Order creation failed" });
  }
};

// GET /api/orders/my
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

exports.createOrder = async (req, res) => {
  const { items, totalAmount, paymentId } = req.body;

  const order = await Order.create({
    userId: req.user.id,
    items,
    totalAmount,
    paymentId,
    status: "PAID",
  });

  res.status(201).json(order);
  
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("ADMIN ORDERS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};