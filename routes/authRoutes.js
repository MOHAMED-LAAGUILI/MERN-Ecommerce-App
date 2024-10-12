import express from "express";
import {
  registerUserController,
  testController,
  loginUserController,
  forgotPasswordController
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


export default router;
