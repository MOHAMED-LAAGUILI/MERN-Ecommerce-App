import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

//Category Controller
// create a new category
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res
        .status(200)
        .send({ success: true, message: "Category already exists" });
    }

    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();

    res.status(200).send({
      success: true,
      message: "New category created successfully",
      category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error,
      message: `Error in Creating category in [createCategoryController] ${error}`,
    });
  }
};


// Update category
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params; // Change to id

    const category = await categoryModel.findByIdAndUpdate(
      id, // Use ID directly to find the category
      { name, slug: slugify(name) }, // Update the name and slug
      { new: true } // Return the updated category
    );

    // Check if category was found and updated
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: `Error in updating category: ${error}`,
    });
  }
};

// get All Categories
export const showCategoriesControlller = async (req, res) => {
  try {
    const categories = await categoryModel.find({});

    res.status(200).send({
      success: true,
      message: "All Categories Retrieved Successfully",
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: `Error getting all categories in [showCategoryController] ${error}`,
    });
  }
};

// get single category
export const singleCategoryController = async (req, res) => {
  try {
    const slug = { slug: req.params.slug }
    
    const category = await categoryModel.findOne(slug);

    // check if exists
    if(!category){
     return res.status(404).send({
       success: false,
       message: `No such Category Exists`,
     });
    } 

      res.status(200).send({
        success: true,
        message: `Category Retrieved Successfully`,
        category,
      });
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: `Error getting single Category in [singleCategoryController] ${error}`,
    });
  }
};
// delete category
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findByIdAndDelete(id);

       // check if exists
       if(!category){
        return res.status(404).send({
          success: false,
          message: `No such Category Exists to delete`,
        });
       } 

    res.status(200).send({
      success: true,
      message: `Category Deleted Successfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: `Error Deleting Category in [deleteCategoryController] ${error}`,
    });
  }
};