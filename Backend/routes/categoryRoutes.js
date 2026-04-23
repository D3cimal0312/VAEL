import express from 'express';
import { 
    createCategory,
    getAllCategory,
    updateCategory,
    getCategoryById
} from '../controllers/categoryController.js';


import {protect,adminOnly,optionalProtect} from "../middleware/authMiddleware.js"
const router=express.Router();

// C
// router.post('/', protect,adminOnly, createCategory);
router.post("/", protect, adminOnly, createCategory)
// R
router.get("/",optionalProtect,getAllCategory);
// U
router.put('/:id', protect,adminOnly,updateCategory);

router.get("/id/:id", getCategoryById);
// U
// D


export default router;  
