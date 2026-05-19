import express from "express";

const router = express.Router();

import { sendBulkEmail, unsubscribe } from "../controllers/emailController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";
router.post("/send", protect, adminOnly, sendBulkEmail);

// No auth required for unsubscribe route but need to use tokens system so only the unsubscibers can unsubscribe 
router.get("/unsubscribe/:token", unsubscribe);

export default router;
