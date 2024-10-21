import express from "express";
import { CheckAdmin, requireSignin } from "../middlewares/authMiddleware.js";
import { 
    createProductController,
    getAllProductsController,
    getProductController,
    getSimilarProductsController,
    productImageController,
    deleteProductController,
    updateProductController,
    braintreeTokenController,
    braintreePaymentController
 } from "../controllers/productController.js";

import formidable from "formidable";

const router = express.Router();

//Routes
// create Product Route
router.post(
    "/create-product",
    requireSignin,
    CheckAdmin,
    (req, res, next) => {
      const form = formidable();
      form.parse(req, (err, fields, files) => {
        if (err) {
          return next(err);
        }
        req.fields = fields;
        req.files = files;
        next(); // Call the next middleware or controller
      });
    },
    createProductController
  );

// Update Product Route
router.put(
    "/update-product/:pid",
    requireSignin,
    CheckAdmin,
    (req, res, next) => {
      const form = formidable();
      form.parse(req, (err, fields, files) => {
        if (err) {
          return next(err);
        }
        req.fields = fields;
        req.files = files;
        next(); // Call the next middleware or controller
      });
    },
    updateProductController
  );

  //get All Products Route
  router.get("/get-all-products", getAllProductsController);

//get Single Products Route
router.get("/get-product/:slug", getProductController);

// Single Products --> similar products
router.get('/similar-products/:categoryId', getSimilarProductsController);

//get photo
router.get("/product-photo/:pid", productImageController);

// delete product
router.delete("/delete-product/:pid", requireSignin, CheckAdmin, deleteProductController);

//////////Payement Routes
//Token
router.get("/braintree/token", braintreeTokenController)

//payement
router.post("/braintree/payment", requireSignin ,braintreePaymentController);

export default router;
