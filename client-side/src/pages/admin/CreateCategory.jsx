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
        const response = await axios.get(`${apiUrl}/api/v1/category/all-categories`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.data.success) {
          setCategories(response.data.category || []); // Ensure it's always an array
          toast.success(`${response.data.message}`);
        } else {
          console.log("Error fetching categories:", response.data.message);
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
    try {
      const response = await axios.post(`${apiUrl}/api/v1/category/create-category`, { name: newCategory.name }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.success) {
        const newCategoryData = response.data.category;
        setCategories([...categories, newCategoryData]); // Append to categories
        setNewCategory({ name: "" });
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
    try {
      const slug = name.toLowerCase().replace(/\s+/g, '-'); // Generate the slug from the updated name
      const response = await axios.put(`${apiUrl}/api/v1/category/update-category/${id}`, { name, slug }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
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
      const response = await axios.delete(`${apiUrl}/api/v1/category/delete-category/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.success) {
        const updatedCategories = categories.filter((category) => category._id !== id);
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
    handleEditCategory(currentCategoryId, newCategory.name);
    setIsModalOpen(false);
  };

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
        <AdminMenu />
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Manage Categories
          </h1>
        </div>

        <form onSubmit={handleAddCategory}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  className="me-2 appearance-none block w-80 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus: outline-none focus:bg-white"
                />
                <button
                  className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Add Category
                </button>
              </div>
            </div>
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
            className="bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
          />
        </div>

        <table className="w-full text-md bg-white shadow-md rounded">
          <thead>
            <tr>
              <th className="text-left p-3">#</th>
              <th className="text-left p-3">ID</th>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Slug</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(categories) && categories.length > 0 ? (
              categories
                .filter((category) =>
                  category.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((category, index) => (
                  <tr key={category._id}>
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{category._id}</td>
                    <td className="p-3">{category.name}</td>
                    <td className="p-3">{category.slug}</td>
                    <td className="p-3">
                      <button
                        className="m-2 bg-yellow-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => showModal(category)}
                      >
                        Edit
                      </button>

                      <Modal
                        title="Update Category"
                        open={isModalOpen && currentCategoryId === category._id}
                        onOk={handleOk}
                        onCancel={handleCancel}
                      >
                        <form>
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="name"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            value={newCategory.name}
                            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                          />
                        </form>
                      </Modal>

                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDeleteCategory(category._id)}
                      >
                        Delete
                      </button>
               


                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-3 flex justify-center">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default CreateCategory;

