import Order from "../models/Order.js";
import Product from "../models/Products.js";
import Users from "../models/Users.js";

// CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const date = new Date();
    const datePart = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`;
    const randomPart = Math.random()
      .toString(36)
      .substring(2, 10)
      .toUpperCase();

    const { items, skipOutOfStock = false } = req.body;

    const outOfStockItems = [];
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product || product.stock === 0) {
        outOfStockItems.push({
          productId: item.productId,
          name: product?.name || "Unknown",
        });
      }
    }

    if (outOfStockItems.length > 0 && !skipOutOfStock) {
      return res.status(400).json({
        message: "Some items are out of stock",
        outOfStockItems,
      });
    }

    const validItems = skipOutOfStock
      ? items.filter(
          (item) =>
            !outOfStockItems.find((o) => o.productId === item.productId),
        )
      : items;

    if (validItems.length === 0) {
      return res.status(400).json({
        message: "All items in your cart are out of stock",
        outOfStockItems,
      });
    }

    for (const items of validItems) {
      await Product.findByIdAndUpdate(items.productId, {
        $inc: { stock: -items.quantity },
      });
    }

    const order = await Order.create({
      orderNumber: `ORD-${datePart}-${randomPart}`,
      userId: req.user?.id,
      ...req.body,
      items: validItems,
    });

    return res.status(201).json({ data: order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to place order" });
  }
};

// GET ALL ORDERS (admin)
export const getAllOrders = async (req, res) => {
  try {
    const { status, paymentStatus, limit = 10, page = 1 } = req.query;
    const skip = (page - 1) * limit;
    const q = req.query.q?.trim() || "";
    const filter = {};

    if (q) {
      const users = await Users.find({
        $or: [
          { firstName: { $regex: q, $options: "i" } },
          { lastName: { $regex: q, $options: "i" } },
          { email: { $regex: q, $options: "i" } },
        ],
      }).select("_id");

      const userIds = users.map((u) => u._id);

      filter.$or = [
        { orderNumber: { $regex: q, $options: "i" } },
        { userId: { $in: userIds } },
      ];
    }

    if (status) filter.status = status;
    if (paymentStatus) filter.paymentStatus = paymentStatus;

    const orders = await Order.find(filter)
      .populate("userId", "firstName lastName email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const totalCount = await Order.countDocuments(filter);
    const totalPage = Math.ceil(totalCount / Number(limit));

    res.status(200).json({ count: totalCount, totalPage, page, data: orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// GET ORDERS OF LOGGED IN USER
export const getMyOrders = async (req, res) => {
  try {
    let totalspent = 0;
    const orders = await Order.find({ userId: req.user?.id })
      .populate("items.productId", "slug")
      .sort({ createdAt: -1 });

    orders.map((item) => {
      if (item.paymentStatus === "paid") {
        totalspent += item.pricing.total;
      }
    });

    res
      .status(200)
      .json({ count: orders.length, data: orders, spent: totalspent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// UPDATE ORDER STATUS (admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    console.log(status);
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    console.log(order.status);
    if (order.status === status)
      return res
        .status(400)
        .json({ message: "Order is already in this status" });

        if(order.status==="cancelled"){
          return res.status(400).json({message:"Order cannot be changed once it has been cancelled"})
        }


    order.status = status;

    // write-once — only set if not already set
    if (status === "delivered" && !order.deliveredAt)
      order.deliveredAt = new Date();
    if (status === "cancelled" && !order.cancelledAt) {
      order.cancelledAt = new Date();
      order.items.forEach(async (item) => {
        await Product.findByIdAndUpdate(item.productId, {
          $inc: { stock: +item.quantity },
        });
      });
    }
    await order.save();
    res.status(200).json({ data: order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update order status" });
  }
};

// UPDATE PAYMENT STATUS (admin)
export const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.paymentStatus === paymentStatus)
      return res
        .status(400)
        .json({ message: "Order is already in this status" });

    order.paymentStatus = paymentStatus;

    // write-once
    if (paymentStatus === "paid" && !order.paidAt) order.paidAt = new Date();

    await order.save();
    res.status(200).json({ data: order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update payment status" });
  }
};

// CANCEL ORDER (user)
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.user?.id,
    });

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (!["pending", "confirmed"].includes(order.status)) {
      return res.status(400).json({
        message: `Order cannot be cancelled once it is ${order.status}`,
      });
    }

    order.status = "cancelled";

    if (!order.cancelledAt) order.cancelledAt = new Date();

    order.items.forEach(async (item) => {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: +item.quantity },
      });
    });

    await order.save();
    res.status(200).json({ data: order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to cancel order" });
  }
};
