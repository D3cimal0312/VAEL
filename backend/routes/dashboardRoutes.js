import express from "express";
import { getOverview } from "../controllers/dashboardController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/overview", protect, adminOnly, getOverview);

export default router;
