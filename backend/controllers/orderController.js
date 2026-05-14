import Order from "../models/Order.js";
import Products from "../models/Products.js";
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

    const order = await Order.create({
      orderNumber: `ORD-${datePart}-${randomPart}`,
      userId: req.user?.id,
      ...req.body,
    });

    res.status(201).json({ data: order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// GET ALL ORDERS (admin)
export const getAllOrders = async (req, res) => {
  try {
    const { status, paymentStatus,limit=10,page=1 } = req.query;
    const skip = (page-1)*limit;
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
      .sort({ createdAt: -1 }).skip(skip)
      .limit(Number(limit));

          const totalCount = await Order.countDocuments(filter);
      
          const totalPage = Math.ceil(totalCount / Number(limit));

    res.status(200).json({ count: totalCount, totalPage, page, data: orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// GET ORDERS OF LOGGED IN USER
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user?.id })
      .populate("items.productId", "slug")

      .sort({ createdAt: -1 });

    res.status(200).json({ count: orders.length, data: orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
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

    order.status = status;

    // write-once — only set if not already set
    if (status === "delivered" && !order.deliveredAt)
      order.deliveredAt = new Date();
    if (status === "cancelled" && !order.cancelledAt)
      order.cancelledAt = new Date();

    // console.log("hello");

    await order.save();
    res.status(200).json({ data: order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
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
    res.status(500).json({ message: err.message });
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

    // write-once
    if (!order.cancelledAt) order.cancelledAt = new Date();

    // push to history
    order.statusHistory.push({
      status: "cancelled",
      changedAt: new Date(),
      changedBy: req.user?.id,
      note: "Cancelled by user",
    });

    await order.save();
    res.status(200).json({ data: order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

