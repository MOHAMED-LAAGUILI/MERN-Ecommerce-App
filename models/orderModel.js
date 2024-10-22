import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
      },
    ],
    payment: {}, // Payment details can be stored here
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    status: {
      type: String,
      default: "Not processed", // Correct default value
      enum: ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"],
    },
    shipping: {
      address: { type: String, required: true }, // Required shipping address
      city: { type: String, required: true }, // Required city
      state: { type: String, required: true }, // Required state
      zip: { type: String, required: true }, // Required ZIP code
      phone: { type: String, required: true }, // Required phone number
    },
  },
  { timestamps: true }
);

export default mongoose.model("Orders", orderSchema);
