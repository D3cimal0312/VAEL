import express from 'express'

import{
    getAllUsers,
    getUserById,
    updateUser,
    updateMe

} from '../controllers/usersController.js'

import {protect,adminOnly} from "../middleware/authMiddleware.js"
const router=express.Router();

router.get('/', protect, adminOnly,getAllUsers);
router.get('/:id', protect, getUserById);
router.put('/:id',  protect,adminOnly,updateUser);
router.put('/myprofile',  protect,updateMe);



export default router