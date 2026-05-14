import express from "express";

import {
    toggleFav,
    getUserFavs,
    isFav,
    clearFavs
} from "../controllers/favController.js"

import {
    protect
} from "../middleware/authMiddleware.js"
const router=express.Router();

// app.use("/favourites",favRoutes)

router.get("/" ,protect,getUserFavs)

router.post("/:id",protect,toggleFav)

// no used just in case scenario
router.get("/isFav/:id",protect,isFav)

// for clearing the whole favlist
router.delete("/clear",protect,clearFavs)

export default router;