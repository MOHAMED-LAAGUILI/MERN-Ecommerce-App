import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "./Admin-Menu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const apiUrl = import.meta.env.REACT_APP_API;

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/v1/category/all-categories`);
      if (data?.success) {
        setCategories(data.category); // Store fetched categories in state
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      
      const { data } = await axios.post("/api/v1/product/create-product", productData);
      if (data?.success) {
        toast.success("Product Created Successfully");
        // Optionally reset the form or navigate to another page
        resetForm();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setQuantity("");
    setShipping("");
    setPhoto("");
    setCategory("");
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container">
        <div className="flex">
          <div className="md:w-1/4">
            <AdminMenu />
          </div>
          <div className="md:w-3/4">
            <h1 className="text-2xl font-bold mb-4">Create Product</h1>
            <form className="bg-white p-6 rounded shadow-md">
              <div className="mb-4">
                <Select
                  bordered={false}
                  placeholder="Select a category"
                  size="large"
                  showSearch
                  className="w-full mb-4"
                  onChange={setCategory}
                >
                  {categories?.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name} {/* Displaying category name */}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Upload Photo
                </label>
                <label className="flex items-center justify-center w-full bg-gray-200 hover:bg-gray-300 text-gray-700 border border-gray-300 rounded py-2 cursor-pointer">
                  {photo ? photo.name : "Choose File"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
                {photo && (
                  <div className="mt-2 text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"100px"}
                      className="rounded shadow-lg"
                    />
                  </div>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  value={name}
                  placeholder="Product Name"
                  className="form-input w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <textarea
                  value={description}
                  placeholder="Product Description"
                  className="form-textarea w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <input
                  type="number"
                  value={price}
                  placeholder="Product Price"
                  className="form-input w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Product Quantity"
                  className="form-input w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <Select
                  bordered={false}
                  placeholder="Select Shipping"
                  size="large"
                  showSearch
                  className="w-full mb-4"
                  onChange={setShipping}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <button
                className="w-full bg-indigo-600 text-white font-bold py-2 rounded hover:bg-indigo-700 transition duration-200"
                onClick={handleCreate}
              >
                CREATE PRODUCT
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
