import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "./Admin-Menu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";

const { Option } = Select;

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState(false); // Initialize as boolean
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.REACT_APP_API;
  const [photoPreview, setPhotoPreview] = useState(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    } else {
      setPhotoPreview(null);
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/category/all-categories`);
      if (response.data.success && Array.isArray(response.data.categories)) {
        setCategories(response.data.categories);
      } else {
        console.error("Invalid categories data:", response.data);
        setCategories([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const createProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Define default values
    const filledName = name ;
    const slug = filledName.toLowerCase().replace(/\s+/g, "-");
    const filledDescription = description || "No description provided.";
    const filledPrice = price ;
    const filledQuantity = quantity || 1;
    const filledphoto = photo || "/src/assets/images/ecommerceLogo.jpg";
    // Prepare form data
    const formData = new FormData();
    formData.append("name", filledName);
    formData.append("slug", slug);
    formData.append("description", filledDescription);
    formData.append("price", filledPrice);
    formData.append("category", category);
    formData.append("quantity", filledQuantity);
    formData.append("shipping", shipping); // Directly append the boolean
    if (photo) formData.append("image", filledphoto);
  
    try {
      const response = await axios.post(`${apiUrl}/api/v1/product/create-product`, formData);
      
      if (response.data.success) {
        toast.success(`Product ${filledName} created successfully!`);
        // Reset form fields after successful creation
        setName("");
        setDescription("");
        setPrice("");
        setCategory("");
        setQuantity("");
        setShipping(false); // Reset to false
        setPhoto("");
        setPhotoPreview(null);
      } else {
        // Show error message from the server response
        toast.error(response.data.error || "Failed to create product");
      }
    } catch (error) {
      // Show error message from the server response
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Failed to create product");
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Layout title="Dashboard - Create Product"> 
      <div className={"flex px-8"}>
        <div className={"md:1/4 w-full"}>
          <AdminMenu />
        </div>
        <div className="container md:w-2/4 lg:2/4 p-4 pt-6 md:p-6 lg:p-12 w-full">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Create Product</h1>
            <form onSubmit={createProduct} className="space-y-6">
              {/* Form fields (Name, Description, Price, Category, Quantity, Shipping, Photo) */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
                <textarea
                  id="description"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="3"
                />
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price:</label>
                <input
                  type="number"
                  id="price"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category:</label>
                <Select
                  id="category"
                  value={category}
                  onChange={(value) => setCategory(value)}
                  placeholder="Select a category"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  {Array.isArray(categories) && categories.length > 0 ? (
                    categories.map((cat) => (
                      <Option key={cat._id} value={cat._id}>
                        {cat.name}
                      </Option>
                    ))
                  ) : (
                    <Option disabled>No categories available</Option>
                  )}
                </Select>
              </div>
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="shipping" className="block text-sm font-medium text-gray-700">Shipping:</label>
                <select
                  id="shipping"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={shipping.toString()} // Convert boolean to string for select
                  onChange={(e) => setShipping(e.target.value === "true")}
                >
                  <option value={true}>Free</option>
                  <option value={false}>Paid</option>
                </select>
              </div>
              <div>
                <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Photo:</label>
                <input
                  type="file"
                  id="photo"
                  
                  className="text-bold mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-indigo-50 file:text-indigo-700
                    hover:file:bg-indigo-100"
                  onChange={handlePhotoChange}
                />
                {photoPreview && (
                  <div className="mt-2">
                    <img
                      src={photoPreview}
                      alt="Product preview"
                      className="max-w-xs h-auto rounded-lg shadow-lg"
                    />
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2                 focus:ring-indigo-500"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Product"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;

