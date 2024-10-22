import express from "express";
import {
  registerUserController,
  testController,
  loginUserController,
  forgotPasswordController,
  updateProfileController,
  getUserOrdersController,
  getAllUsersOrdersController,
  updateOrderStatusController
} from "./../controllers/authController.js";

import {requireSignin, CheckAdmin}  from '../middlewares/authMiddleware.js';




const router = express.Router();
//routing
//Register || method post

router.post("/register", registerUserController);

//Login
router.post("/login", loginUserController);

//Forgot password
router.post('/forgot-password',forgotPasswordController)


// test route
router.get("/test", requireSignin, CheckAdmin, testController);

//Update Profile
router.put("/update-profile", requireSignin, updateProfileController);

// user Orders
router.get("/user-orders/:userId", requireSignin, getUserOrdersController);

// get All USERS orders
router.get("/get-users-orders",requireSignin, CheckAdmin, getAllUsersOrdersController)

// update order status
router.put("/update-order-status/:orderId", requireSignin, CheckAdmin, updateOrderStatusController);


export default router;
