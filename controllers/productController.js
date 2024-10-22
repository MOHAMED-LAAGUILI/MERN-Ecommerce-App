import braintree from "braintree";
import productModel from "../models/productModel.js";
import fs from "fs";
import slugify from "slugify";
import orderModel from "../models/orderModel.js";
import dotenv from "dotenv";

dotenv.config();
/// Payment Gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

// Create Product Controller
export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { image } = req.files;

    // Validation
    switch (true) {
      case !name:
        return res.status(400).send({ error: "Name is required." });
      case name.length < 3: // Check if name is at least 3 characters long
        return res
          .status(400)
          .send({ error: "Name must be at least 3 characters long." });

      case !description:
        return res.status(400).send({ error: "Description is required." });
      case description.length < 10: // Check if description is at least 10 characters long
        return res
          .status(400)
          .send({ error: "Description must be at least 10 characters long." });

      case !price:
        return res.status(400).send({ error: "Price is required." });
      case isNaN(price): // Check if price is a number
        return res.status(400).send({ error: "Price must be a valid number." });
      case price <= 0: // Ensure price is greater than zero
        return res
          .status(400)
          .send({ error: "Price must be greater than zero." });

      case !category:
        return res.status(400).send({ error: "Category is required." });

      case !quantity:
        return res.status(400).send({ error: "Quantity is required." });
      case isNaN(quantity): // Check if quantity is a number
        return res
          .status(400)
          .send({ error: "Quantity must be a valid number." });
      case quantity < 0: // Ensure quantity is not negative
        return res.status(400).send({ error: "Quantity cannot be negative." });

      case !image: // Check if the image is provided
        return res.status(400).send({ error: "Image is required." });
      case image && image.size > 1000000: // Check image size
        return res.status(400).send({
          error: "Image should be less than 1 MegaByte.",
        });

      // You can add more validation cases here as needed
    }

    // create product
    const product = new productModel({ ...req.fields, slug: slugify(name) });

    if (image) {
      product.image.data = fs.readFileSync(image.path);
      product.image.contentType = image.type;
    }

    await product.save();
    res.status(201).send({
      success: true,
      message: "Product created successfully",
      data: product,
    });

    // res.status(201).json(product);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Error in Creating Product in [createProductController] ${error} Error ${error.message}`,
    });
  }
};

// get All Products Controller
export const getAllProductsController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category") // Populate the category field
      .select("-image") // Exclude the image field if not needed
      .sort({ createdAt: -1 }); // Sort products by creation date

    res.status(200).send({
      success: true,
      countTotal: products.length,
      message: "All products retrieved successfully",
      products,
    });
  } catch (error) {
    console.error(
      `Error in Fetching Products in [getAllProductsController] ${error}`
    );
    res.status(500).send({
      success: false,
      message: `Error in Fetching Products: ${error}`,
    });
  }
};
// get single product
export const getProductController = async (req, res) => {
  try {
    const SlugParam = req.params.slug;

    console.log(`Fetching product with slug: ${SlugParam}`);
    const product = await productModel
      .findOne({ slug: SlugParam })
      .select("-image")
      .populate("category");
    console.log(`Product found: ${product}`);
    res.status(200).send({
      success: true,
      message: "Single Product Fetched Successfully",
      product,
    });
  } catch (error) {
    console.error(`Error fetching single product: ${error}`);
    res.status(500).send({
      success: false,
      message: `Error in getting signle Product in [getProductController] ${error} Error ${error.message}`,
      error,
    });
  }
};

// Get similar products by category ID
export const getSimilarProductsController = async (req, res) => {
  const { categoryId } = req.params;

  // Check if categoryId is provided
  if (!categoryId) {
    return res.status(400).json({
      success: false,
      message: "Category ID is required",
    });
  }

  try {
    const similarProducts = await productModel
      .find({ category: categoryId })
      .limit(10); // Limit to 10 products

    // Check if similar products were found
    if (similarProducts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No similar products found for this category",
      });
    }

    res.status(200).json({
      success: true,
      products: similarProducts,
    });
  } catch (error) {
    console.error(`Error fetching similar products: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Server error while fetching similar products",
      error: error.message, // Include the error message for debugging
    });
  }
};

// get product Image
export const productImageController = async (req, res) => {
  try {
    const productImage = await productModel
      .findById(req.params.pid)
      .select("image");
    if (productImage.image.data) {
      res.set("Content-type", productImage.image.contentType);
      return res.status(200).send(productImage.image.data);
    }
  } catch (error) {
    console.error(`Error fetching single product: ${error}`);
    res.status(500).send({
      success: false,
      message: `Error getting photo Product in [productImageController] ${error} Error ${error.message}`,
      error,
    });
  }
};

// delete product controller

export const deleteProductController = async (req, res) => {
  try {
    const pid = req.params.pid;
    const product = await productModel.findById(pid);
    if (!product) {
      return res
        .status(404)
        .send({ success: false, message: "Product not found" });
    }
    await productModel.findByIdAndDelete(pid).select("-image");
    res
      .status(200)
      .send({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error(
      `Error Deleting Product in [deleteProductController] ${error} Error ${error.message}`
    );
    res.status(500).send({
      success: false,
      message: `Error Deleting Product in [deleteProductController] ${error} Error ${error.message}`,
      error,
    });
  }
};

// update product controller
export const updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { image } = req.files;

    // validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "name is required" });
      case !description:
        return res.status(500).send({ error: "description is required" });
      case !price:
        return res.status(500).send({ error: "price is required" });
      case !category:
        return res.status(500).send({ error: "category is required" });
      case !quantity:
        return res.status(500).send({ error: "quantity is required" });
      case image && image.size > 1000000:
        return res.status(500).send({
          error: "Image is required and should be less tha 1 MegaByte",
        });
      //   default: break;
    }
    //update product
    const pid = req.params.pid;
    const product = await productModel.findByIdAndUpdate(
      pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (image) {
      product.image.data = fs.readFileSync(image.path);
      product.image.contentType = image.type;
    }

    await product.save();
    res.status(201).send({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    console.error(
      `Error Updating Product in [updateProductController] ${error} Error ${error.message}`
    );
    res.status(500).send({
      success: false,
      message: `Error Updating Product in [updateProductController] ${error} Error ${error.message}`,
      error,
    });
  }
};

//////////// Braintree payment gateway API/////////////////
//Token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
        // res.send(response.clientToken)
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// Payment
export const braintreePaymentController = async (req, res) => {
  try {
    const { cart, nonce, shipping } = req.body; // Add shipping to the destructured object
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity; // Calculate total based on quantity
    });

    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      async (error, result) => {
        if (result) {
          // Create the order with shipping details
          const order = await orderModel.create({
            products: cart.map(item => item._id), // Ensure you're storing product IDs
            payment: result,
            buyer: req.user._id,
            shipping: shipping, // Include the shipping details
          });
          res.send({ success: true, message: "Order Created Successfully" });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Payment processing error");
  }
};


