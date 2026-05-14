import express from 'express'

import{
    getAllUsers,
    getUserById,
    updateUser,
    updateMe,
    updateAddress,
    getMyAddress

} from '../controllers/usersController.js'

import {protect,adminOnly} from "../middleware/authMiddleware.js"
const router=express.Router();

router.get('/', protect, adminOnly,getAllUsers);
router.get('/myaddress', protect, getMyAddress);
router.get('/profile/:id', protect, getUserById);
router.put('/myprofile',  protect,updateMe);

router.patch('/update/:id',  protect,adminOnly,updateUser);



//address route for home and work

router.put('/address/:type',  protect,updateAddress);



export default router