import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "./Admin-Menu";
import toast from "react-hot-toast";
import axios from "axios";
import { Modal } from "antd";

const CreateCategory = () => {
  // State variables
  const [categories, setCategories] = useState([]); // Ensure this is always an array
  const [searchTerm, setSearchTerm] = useState("");
  const [newCategory, setNewCategory] = useState({ name: "" });
  const apiUrl = import.meta.env.REACT_APP_API;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(null); // Holds the ID of the category being edited
  const [error, setError] = useState(null); // To store the error message for validation

  const showModal = (category) => {
    setCurrentCategoryId(category._id);
    setNewCategory({ name: category.name });
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setNewCategory({ name: "" });
  };

  useEffect(() => {
    const getAllCategory = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/v1/category/all-categories`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.success) {
          setCategories(response.data.categories || []); // Ensure it's always an array
          return toast.success(`${response.data.message}`);
        } else {
          return console.log(
            "Error fetching categories:",
            response.data.message
          );
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error(`Error: ${error.message} ${apiUrl}`);
      }
    };
    getAllCategory();
  }, [apiUrl]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();

    // Check if category name already exists
    const categoryExists = categories.some(
      (category) =>
        category.name.toLowerCase() === newCategory.name.toLowerCase()
    );

    if (categoryExists) {
      setError(`Category ${newCategory.name} already exists!`); // Set the error state
      toast.error(`Category ${newCategory.name} already exists!`); // Show error notification
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/api/v1/category/create-category`,
        { name: newCategory.name },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        const newCategoryData = response.data.category;
        setCategories([...categories, newCategoryData]); // Append to categories
        setNewCategory({ name: "" });
        setError(null); // Clear the error after a successful submission
        toast.success(`Category ${newCategoryData.name} created`);
      } else {
        console.log("Error creating category:", response.data.message);
      }
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleEditCategory = async (id, name) => {
    if (
      name.toLowerCase() ===
      categories.find((category) => category._id === id).name.toLowerCase()
    ) {
      toast.info("No changes made to the category name");
      setIsModalOpen(false);
      return;
    }
  
    try {
      const slug = name.toLowerCase().replace(/\s+/g, "-");
      const response = await axios.put(
        `${apiUrl}/api/v1/category/update-category/${id}`, // Use ID in the URL
        { name, slug },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        const updatedCategories = categories.map((category) =>
          category._id === id ? { ...category, name, slug } : category
        );
        setCategories(updatedCategories);
        setIsModalOpen(false);
        toast.success(`Category updated successfully`);
      } else {
        console.log("Error updating category:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error(`Error: ${error.message}`);
    }
  };
  
  const handleDeleteCategory = async (id) => {
    try {
      const response = await axios.delete(
        `${apiUrl}/api/v1/category/delete-category/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        const updatedCategories = categories.filter(
          (category) => category._id !== id
        );
        setCategories(updatedCategories);
        toast.success(`Category deleted successfully`);
      } else {
        console.log("Error deleting category:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleOk = () => {
    const categoryExists = categories.some(
      (category) =>
        category.name.toLowerCase() === newCategory.name.toLowerCase() &&
        category._id !== currentCategoryId
    );

    if (categoryExists) {
      setError(`Category ${newCategory.name} already exists!`); // Set the error state
      toast.error(`Category ${newCategory.name} already exists!`); // Show error notification
      return;
    }

    handleEditCategory(currentCategoryId, newCategory.name); // Ensure this is called
    setIsModalOpen(false);
  };

  return (
    <Layout title={"Dashboard - Create Category"} className={"flex"}>
      <div className="dark:text-white flex flex-col md:flex-row bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen text-gray-300 text-gray-800">
        <div className="md:w-1/4 lg:2/4 container mx-auto p-4 pt-6 md:p-6 lg:p-12">
          <AdminMenu />
        </div>
        <div className="md:w-3/4 lg:2/4 p-4 pt-6 md:p-6 lg:p-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Manage Categories
          </h1>
          <form
            onSubmit={handleAddCategory}
            className="flex flex-wrap -mx-3 mb-6"
          >
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 dark:text-gray-300 text-xs font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <div className="flex">
                <input
                  required
                  type="text"
                  id="name"
                  value={newCategory.name}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, name: e.target.value })
                  }
                  className="appearance-none block w-80 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white dark:focus:bg-gray-800"
                />
                <button
                  className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded ml-2"
                  type="submit"
                >
                  Add Category
                </button>
              </div>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
          </form>

          <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              All Categories
            </h2>
            <input
              type="search"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search categories..."
              className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white dark:focus:bg-gray-800"
            />
          </div>

          <table className="dark:text-gray-100 font-bold min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                <th className="text-left p-3">#</th>
                <th className="text-left p-3">ID</th>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Slug</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(categories) && categories.length > 0 ? (
                categories.filter((category) =>
                  category.name.toLowerCase().includes(searchTerm.toLowerCase())
                ).length > 0 ? (
                  categories
                    .filter((category) =>
                      category.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    )
                    .map((category, index) => (
                      <tr
                        key={category._id}
                        className="border-b dark:border-gray-600"
                      >
                        <td className="p-3">{index + 1}</td>
                        <td className="p-3">{category._id}</td>
                        <td className="p-3">{category.name}</td>
                        <td className="p-3">{category.slug}</td>
                        <td className="p-3 flex space-x-2">
                          <button
                            className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
                            onClick={() => showModal(category)}
                          >
                            <i className="uil uil-edit"></i>
                          </button>

                          <Modal
                            title="Update Category"
                            open={
                              isModalOpen && currentCategoryId === category._id
                            }
                            onOk={handleOk} // directly call handleOk without (e) parameter
                            onCancel={handleCancel}
                          >
                            <form>
                              <label
                                className="block uppercase tracking-wide text-gray-700 dark:text-gray-300 text-xs font-bold mb-2"
                                htmlFor="name"
                              >
                                Name
                              </label>
                              <input
                                type="text"
                                id="name"
                                value={newCategory.name}
                                onChange={(e) =>
                                  setNewCategory({
                                    ...newCategory,
                                    name: e.target.value,
                                  })
                                }
                                className="appearance-none block w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white dark:focus:bg-gray-800"
                              />
                            </form>
                          </Modal>

                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleDeleteCategory(category._id)}
                          >
                            <i className="uil uil-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center p-3 flex justify-center"
                    >
                      <p className="text-gray-600 dark:text-gray-300">
                        No categories found matching your search term:{" "}
                        <strong>{searchTerm}</strong>
                      </p>
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center p-3 flex justify-center"
                  >
                    <p className="text-gray-600 dark:text-gray-300">
                      No categories exist. Please add a new category to get
                      started.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
