import mongoose from "mongoose";
import Order from "./models/Order.js";
import dotenv from "dotenv";
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
// migrate.js — run once, then delete

const migrate = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to DB...");

    const orders = await Order.find({
      $or: [
        { statusHistory:  { $exists: false } },
        { statusHistory:  { $size: 0 } },
        { paymentHistory: { $exists: false } },
        { paymentHistory: { $size: 0 } },
      ],
    });

    console.log(`Found ${orders.length} orders to migrate...`);

    let count = 0;
for (const order of orders) {
  if (order.status === "delivered" && !order.deliveredAt) {
    order.deliveredAt = order.updatedAt;
  }
  if (order.status === "cancelled" && !order.cancelledAt) {
    order.cancelledAt = order.updatedAt;
  }
  if (order.paymentStatus === "paid" && !order.paidAt) {
    order.paidAt = order.updatedAt;
  }

  if (!order.statusHistory || order.statusHistory.length === 0) {
    order.statusHistory = [{
      status: order.status,
      changedAt: order.updatedAt,
      note: "Backfilled by migration",
    }];
  }

  if (!order.paymentHistory || order.paymentHistory.length === 0) {
    order.paymentHistory = [{
      paymentStatus: order.paymentStatus,
      changedAt: order.updatedAt,
      note: "Backfilled by migration",
    }];
  }

  await order.save({ validateBeforeSave: false });  // ← add this
  count++;
}

    console.log(`Migrated ${count} orders successfully!`);
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected. Done!");
  }
};

migrate();