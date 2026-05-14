import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import {
  getCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  mergeCart
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/", protect, getCart);
router.post("/", protect, addToCart);
router.post("/sync", protect, mergeCart);
router.delete("/clear", protect, clearCart);
router.delete("/:id", protect, removeFromCart);
router.patch("/:id", protect, updateQuantity);

export default router;
