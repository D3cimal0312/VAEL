import express from 'express';
import {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProductBySlug,
} from "../controller/product.controller.js"


const router=express.Router();

router.get("/",           getAllProducts)

router.get("/:slug",           getProductBySlug);   


// only have the admin to permission to add delte add update from their dashboard
router.post(  "/",      createProduct); 
router.put(   "/:id",    updateProduct); 
router.delete("/:id",    deleteProduct);


export default router;