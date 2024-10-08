import express from "express";
import {
  registerUserController,
  testController,
  loginUserController,
} from "../controllers/authController.js";

import {requireSignin, isAdmin}  from '../middlewares/authMiddleware.js';



const router = express.Router();
//routing
//Register || method post

router.post("/register", registerUserController);

//Login
router.post("/login", loginUserController);

// test route
router.get("/test", requireSignin, isAdmin, testController);

// protected route auuth
router.get("/user-auth", requireSignin, (req, res) => {
  res.status(200).send({ok:true});
});

export default router;
