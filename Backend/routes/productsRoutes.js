import express from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductBySlug,
  getProductById,
} from "../controllers/productController.js";
import { protect, adminOnly,optionalProtect } from "../middleware/authMiddleware.js";

import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products",
    allowed_formats: ["jpg", "jpeg", "png", "webp","avif"],
    quality: "auto",
    fetch_format: "auto",
    eager_async: true,
    //  for all type of format allowed_formats: ["*"],
  },
});

const parser = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024  }, 
   timeout: 5 * 60 * 1000, // without this it can hang on large files direct 50 mb tesari hale ne hunxa
});

// !ALL ROUTES REGARDING PRODUCTS

router.get("/",optionalProtect, getAllProducts);

router.post("/addproducts", protect, adminOnly, parser.array("images", 4), createProduct);


router.get("/:slug",optionalProtect, getProductBySlug);

// R

router.get("/id/:id", getProductById);

// R




// only have the admin to permission to add delte add update from their dashboard
//C
// U
router.put(
  "/:id",
  protect,
  adminOnly,
  parser.array("images", 4),
  updateProduct,
);
// D
router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;
