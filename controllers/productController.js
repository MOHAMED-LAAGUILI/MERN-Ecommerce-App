import productModel from "../models/productModel.js";
import fs from "fs";
import slugify from "slugify";

// Create Product Controller
export const createProductController = async (req, res) => {
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
      .select("-image")
      .limit(12)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      countTotal: products.length,
      message: "all products retrieved successfully",
      products,
    });
  } catch (error) {
    console.error(
      `Error in Fetching Products in [getAllProductsController] ${error}`
    );
    res.status(500).send({
      success: false,
      message: `Error in Fetching Products${error}`,
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


// get product Image
export const productImageController = async (req, res) => {
  try {
    const productImage = await productModel
      .findById(req.params.pid)
      .select("image");
    if (productImage.image.data) {
        res.set("Content-type", productImage.image.contentType)
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
      const product = await productModel.findByIdAndUpdate(pid, {...req.fields, slug:slugify(name)}, {new : true})  
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
}