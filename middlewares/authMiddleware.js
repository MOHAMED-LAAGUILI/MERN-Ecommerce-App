import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const requireSignin = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    req.user = decode;
    
    next();
  } catch (error) {
    console.error(error);
  }
};

//admin access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    // const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET)
    if (user.role !== 1) {
      return res.status(401).send({ error: "Admin resource. Access denied" });
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    res.status(401).send({ error: "Admin resource. Access denied" });
  }
};
