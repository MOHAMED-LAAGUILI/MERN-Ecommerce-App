import express from "express";
import { CheckAdmin, requireSignin } from "./../middlewares/authMiddleware.js";
import {
  createCategoryController,
  updateCategoryController,
  showCategoriesControlller,
  singleCategoryController,
  deleteCategoryController
} from "./../controllers/categoryController.js";

const router = express.Router();

// create
router.post(
  "/create-category",
  requireSignin,
  CheckAdmin,
  createCategoryController
);

//update category
router.put(
  "/update-category/:CategoryName",
  requireSignin,
  CheckAdmin,
  updateCategoryController
);

//getALL category
router.get("/all-categories", showCategoriesControlller);

//single category
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete("/delete-category/:id", requireSignin, CheckAdmin, deleteCategoryController);

export default router;
