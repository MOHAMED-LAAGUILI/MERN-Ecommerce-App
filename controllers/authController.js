import bcrypt from "bcrypt";
import UserModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import { comparePassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import { hashPassword } from "../helpers/authHelper.js";
import orderModel from "../models/orderModel.js";

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
      isAdmin,
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
      isAdmin,
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
    const token = JWT.sign(
      { _id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        username: user.username,
        email: user.email,
        password: user.password,
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
    res.json({ user: req.user });
  }
};

// updateProfileController
export const updateProfileController = async (req, res) => {
  try {
    // Validate token format
    const token = req.headers.authorization;
    if (!token || !token.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Token format invalid" });
    }

    // Log request body and user
    console.log("Request body:", req.body);
    console.log("Request user:", req.user);

    // Validate request body
    if (!req.body || !req.body.username || !req.body.phone) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const { username, phone, street, city, state, zip } = req.body;
    const userId = req.user._id; // Ensure this is correct

    // Validate user ID
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User  ID is undefined" });
    }

    console.log("Updating user with ID:", userId);
    console.log("Update data:", { username, phone, street, city, state, zip });

    // Update user in the database
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { username, phone, street, city, state, zip },
      { new: true }
    );

    if (!updatedUser) {
      console.log("User  update failed for ID:", userId);
      return res.status(500).json({
        success: false,
        message: "Failed to update user",
      });
    }

    console.log("User  updated successfully:", updatedUser);

    // Respond with updated user data
    res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(
      `Error while updating profile in [updateProfileController] ${error}`,
      error.stack
    );
    res.status(500).json({
      success: false,
      message: `Error while updating profile in [updateProfileController] ${error}`,
      error: error.message,
    });
  }
};


// get user orders controller
export const getUserOrdersController = async (req, res) => {
  try {
    // Get user ID from the request parameters
    const userId = req.params.userId; 

    // Find orders associated with the user ID
    const orders = await orderModel.find({ buyer: userId }) // Ensure 'buyer' refers to the user ID
      .populate("products") // Populate products if needed
      .populate("buyer", "username") // Populate buyer with only the username field
      .exec();

    // Check if no orders were found
    if (!orders.length) {
      return res.status(404).json({ message: "No orders found." });
    }

    // Return the found orders
    res.json(orders);
  } catch (error) {
    console.error("Error while getting orders:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// Get all users' orders controller
export const getAllUsersOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products") // Populating product references if required
      .populate("buyer", "username")
      .sort({ createdAt: -1 }) // Populating buyer with only the username field
      .exec();

      if (!orders.length) {
        return res.status(404).json({ message: "No orders found." });
      }
    res.json(orders); // Send the fetched orders as the response
  } catch (error) {
    console.error("Error while getting orders:", error);
    res.status(500).json({ message: `Server error while fetching orders.${error}` });
  }
};



// updateOrderStatusController
export const updateOrderStatusController = async (req, res) => {
  try {
    const {orderId} = req.params
  const {status} = req.body
  
  const order = await orderModel.findByIdAndUpdate(orderId,{status},{new:true})
  if(order){
    res.send({success:true,message:"Order status updated successfully", order})
    } else {
      res.status(404).send({success:false,message:"Order not found"})
      }
  
  
  } catch (error) {
    console.log(error);
    res.status(500).send({success:false, message:`Error on [updateOrderStatusController] ${error}`});
  }
  };