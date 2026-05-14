import express from "express";
import {
  createOrder,
  getAllOrders,
  getMyOrders,
  updateOrderStatus,
  cancelOrder,
  updatePaymentStatus,
  // deleteOrder,

} from "../controllers/orderController.js";

import { protect,adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/", protect, adminOnly, getAllOrders);

router.get("/my-orders", protect, getMyOrders);





router.patch("/:id/status", protect, adminOnly, updateOrderStatus);
router.patch("/:id/cancel", protect, cancelOrder);
router.patch("/:id/payment", protect, adminOnly, updatePaymentStatus);
// router.delete("/:id", protect, adminOnly, deleteOrder);

export default router;
