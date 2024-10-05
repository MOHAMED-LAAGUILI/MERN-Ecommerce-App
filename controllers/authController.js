import bcrypt from "bcrypt";
import User from "../models/userModel.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // validation
    if (!name || !email || !password || !phone) {
      return res.send({
        success: false,
        message: "All fields are required required",
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    res.status(201).json({ message: "User created successfully",user});
  } catch (error) {
    console.error(`Error in registering user : ${error.message}`.red);
    res.status(500).json({ message: `Internal Server Error ${error}` });
  }
};

export { registerUser };
