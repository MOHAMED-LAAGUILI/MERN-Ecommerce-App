import bcrypt from "bcrypt";
import UserModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import { comparePassword } from "../helpers/authHelper.js";

export const registerUserController = async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;

    // validation
    if (!username || !email || !password || !phone) {
      return res.send({
        success: false,
        message: "All fields are required required",
      });
    }

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      phone,
    });

    res.status(201).json({ success: true, message: "User created successfully",user});
  } catch (error) {
    console.error(`Error in registering user : ${error.message}`.red);
    res.status(500).json({ success: false, message: `Internal Server Error ${error}` });
  }
};


// Post login
export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.send({
        success: false,
        message: "All fields are required required",
      });
    }

    // Check if the user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({success: false, message: "User does not exist" });
    }

    // Check if the password is correct
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: "Invalid password" });
    }

    // Generate JWT token
    const token = JWT.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({success: true, message: "Login successful",user:{
      name:user.username,
      email:user.email,
      phone:user.phone,
      _id:user._id
    }, token, });

  } catch (error) {
    console.error(`Error in login user : ${error.message}`.red);
    res.status(500).json({success: false, message: `Internal Server Error ${error}` });
  }
};


// Test Controller
export const testController = async (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.error(`Error while testing protected route : ${error.message}`.red);
    res.send("Error while testing protected route");
  }
}
