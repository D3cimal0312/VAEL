import express from "express";
import {register,login} from "../controllers/authController.js";
import { protect,adminOnly } from "../middleware/authMiddleware.js";

const router =express.Router();



router.post("/register", register);
router.post("/login", login);

router.get("/adminverify",protect,adminOnly,(req,res)=>{
    console.log("Admin verify")
    res.status(200).json({ok:true});
})




export default router;