import bcrypt from "bcrypt";
import UserModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import { comparePassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import { hashPassword } from "../helpers/authHelper.js";

//Register Controller
export const registerUserController = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      answer,
      phone,
      street,
      city,
      state,
      zip,
      isAdmin
    } = req.body;

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      answer,
      phone,
      street,
      city,
      state,
      zip,
      isAdmin
    });

    res
      .status(201)
      .json({ success: true, message: "User created successfully", user });
  } catch (error) {
    console.error(`Error in registering user : ${error.message}`.red);
    res
      .status(500)
      .json({ success: false, message: `Internal Server Error ${error}` });
  }
};

// Login Controller
export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }

    // Check if the password is correct
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    // Generate JWT token
    const token = JWT.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({
      success: true,
      message: "Login successfully",
      user: {
        username: user.username,
        email: user.email,
        phone: user.phone,
        answer: user.answer,
        street: user.street,
        city: user.city,
        state: user.state,
        zip: user.zip,
        isAdmin: user.isAdmin,
        _id: user._id,
      },
      token,
    });
  } catch (error) {
    console.error(`Error in login user : ${error.message}`.red);
    res
      .status(500)
      .json({ success: false, message: `Internal Server Error ${error}` });
  }
};

// forgot Password Controller
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    const user = await userModel.findOne({ email, answer });

    if (!user)
      return res
        .status(404)
        .send({ success: false, message: `wrong email or answer` });

    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    return res
      .status(200)
      .send({ success: true, message: `Password resset successfully` });
  } catch (err) {
    console.log(`Error in reseting Password : ${err}`);
    res
      .status(500)
      .send({ success: false, message: `Error in reseting Password : ${err}` });
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
};
