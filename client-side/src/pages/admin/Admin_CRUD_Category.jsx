import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "./Admin-Menu";
import toast from "react-hot-toast";
import axios from "axios";
import { Modal } from "antd";
import DataTable from "react-data-table-component";
import Spinner from "../../components/Spinner";
import { useAuth } from "../../context/auth";

const CrudCategory = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newCategory, setNewCategory] = useState({ name: "" });
  const apiUrl = import.meta.env.REACT_APP_API;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  const [error, setError] = useState(null);
  const [auth] = useAuth();

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
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.data.success) {
          setCategories(response.data.categories || []);
         // toast.success(response.data.message);
        } else {
          console.error("Error fetching categories:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error(`Error: ${error.message}`);
      }
    };
    getAllCategory();
  }, [apiUrl]);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const categoryExists = categories.some(
      (category) =>
        category.name.toLowerCase() === newCategory.name.toLowerCase()
    );

    if (categoryExists) {
      setError(`Category ${newCategory.name} already exists!`);
      toast.error(`Category ${newCategory.name} already exists!`);
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/api/v1/category/create-category`,
        { name: newCategory.name },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.data.success) {
        setCategories([...categories, response.data.category]);
        setNewCategory({ name: "" });
        setError(null);
        toast.success(`Category ${response.data.category.name} created`);
      }
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleEditCategory = async (id, name) => {
    if (
      name.toLowerCase() ===
      categories.find((cat) => cat._id === id).name.toLowerCase()
    ) {
      toast.info("No changes made to the category name");
      setIsModalOpen(false);
      return;
    }

    try {
      const slug = name.toLowerCase().replace(/\s+/g, "-");
      const response = await axios.put(
        `${apiUrl}/api/v1/category/update-category/${id}`,
        { name, slug },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.data.success) {
        const updatedCategories = categories.map((cat) =>
          cat._id === id ? { ...cat, name, slug } : cat
        );
        setCategories(updatedCategories);
        setIsModalOpen(false);
        toast.success(`Category updated successfully`);
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
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.data.success) {
        const updatedCategories = categories.filter((cat) => cat._id !== id);
        setCategories(updatedCategories);
        toast.success(`Category deleted successfully`);
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleOk = () => {
    const categoryExists = categories.some(
      (cat) =>
        cat.name.toLowerCase() === newCategory.name.toLowerCase() &&
        cat._id !== currentCategoryId
    );

    if (categoryExists) {
      setError(`Category ${newCategory.name} already exists!`);
      toast.error(`Category ${newCategory.name} already exists!`);
      return;
    }

    handleEditCategory(currentCategoryId, newCategory.name);
    setIsModalOpen(false);
  };

  const columns = [
    {
      name: "#",
      selector: (row) => row.index,
      sortable: true,
    },
    {
      name: "ID",
      selector: (row) => row._id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Slug",
      selector: (row) => row.slug,
      sortable: true,
    },
    {
      name: "Actions",
      selector: (row) => (
        <div className="flex space-x-2">
          <button
            className="bg-yellow-300 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
            onClick={() => showModal(row)}
          >
            <i className="uil uil-edit"></i>
          </button>
          <Modal
            title="Update Category"
            open={isModalOpen && currentCategoryId === row._id}
            onOk={handleOk}
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
                onChange={(e) => setNewCategory({ name: e.target.value })}
                className="block w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white dark:focus:bg-gray-800"
                required
              />
            </form>
          </Modal>
          <button
            className="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleDeleteCategory(row._id)}
          >
            <i className="uil uil-trash-alt"></i>
          </button>
        </div>
      ),
    },
  ];

  // sorting
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /////////////////////////// Search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };




 
  if (!auth.user) {
    return <Spinner message={"Must be Logged in to access this ressource"} />;
  } else if (auth.user.isAdmin !== 1) {
    return <Spinner message={"Must be an Admin to access this ressource"} />;
  }
  return (
    <Layout title={"Dashboard - CRUD Category"}>
      <div className={"flex flex-col md:flex-row px-8"}>
        <div className={"md:1/4 w-full"}>
          <AdminMenu />
        </div>
        <div className="container md:w-2/4 lg:2/4 p-4 pt-6 md:p-6 lg:p-12 w-full">
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

          <DataTable
            className="dark:bg-gray-900 dark:text-white"
            columns={columns}
            data={filteredCategories.map((category, index) => ({
              index: index + 1,
              _id: category._id,
              name: category.name,
              slug: category.slug,
            }))}
            pagination
            highlightOnHover
          />
        </div>
      </div>
    </Layout>
  );
};

export default CrudCategory;
