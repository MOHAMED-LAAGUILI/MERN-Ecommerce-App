import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "./Admin-Menu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Spinner from "../../components/Spinner";

const { Option } = Select;

const SingleProductUpdate = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");
  const [auth] = useAuth();
  const apiUrl = import.meta.env.REACT_APP_API;

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/v1/product/get-product/${params.slug}`);
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/v1/category/all-categories`);
      console.log("Category Data:", data); // Log for debugging
      if (data?.success) {
        setCategories(data?.categories || []); // Ensure categories is always an array
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };


  useEffect(() => {
    getAllCategory();
    //eslint-disable-next-line
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("image", photo);
      productData.append("category", category);
      productData.append("shipping", shipping); // Ensure you append the shipping value correctly
  
      const { data } = await axios.put(`${apiUrl}/api/v1/product/update-product/${id}`, productData);
      if (data?.success) {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/list-products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  



 
  if (!auth.user) {
    return <Spinner message={"Must be Logged in to access this ressource"} />;
  } else if (auth.user.isAdmin !== 1) {
    return <Spinner message={"Must be an Admin to access this ressource"} />;
  }

  return (
    <Layout title={"Dashboard - Update Product"}>
      <div className="container mx-auto p-5">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 p-4">
            <AdminMenu />
          </div>
          <div className="md:w-3/4 p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">Update Product</h1>
            <form className="space-y-4">

            {Array.isArray(categories) && categories.length > 0 ? (
  <Select
    bordered={false}
    placeholder="Select a category"
    size="large"
    showSearch
    className="w-full mb-4"
    onChange={(value) => setCategory(value)}
    value={category}
  >
    {categories.map((c) => (
      <Option key={c._id} value={c._id}>
        {c.name}
      </Option>
    ))}
  </Select>
) : (
  <Select className="w-full mb-4">
    <Option disabled>No categories available</Option>
  </Select>
)}



              <div className="mb-4">
                <label className="flex items-center justify-center p-2 bg-gray-200 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-300 transition">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>

              <div className="mb-4 text-center">
                {photo ? (
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    className="mx-auto mb-4 h-48 object-contain"
                  />
                ) : (
                  <img
                    src={`${apiUrl}/api/v1/product/product-photo/${id}`}
                    alt="product_photo"
                    className="mx-auto mb-4 h-48 object-contain"
                  />
                )}
              </div>

              <input
                type="text"
                value={name}
                placeholder="Product Name"
                className="w-full p-2 border border-gray-300 rounded-lg"
                onChange={(e) => setName(e.target.value)}
              />

              <textarea
                value={description}
                placeholder="Product Description"
                className="w-full p-2 border border-gray-300 rounded-lg"
                onChange={(e) => setDescription(e.target.value)}
              />

              <input
                type="number"
                value={price}
                placeholder="Product Price"
                className="w-full p-2 border border-gray-300 rounded-lg"
                onChange={(e) => setPrice(e.target.value)}
              />

              <input
                type="number"
                value={quantity}
                placeholder="Product Quantity"
                className="w-full p-2 border border-gray-300 rounded-lg"
                onChange={(e) => setQuantity(e.target.value)}
              />

              <Select
                className="w-full"
                onChange={(value) => setShipping(value)}
                placeholder="Select Shipping"
                value={shipping ? "Yes" : "No"}
              >
                <Option value={true}>Free</Option>
                <Option value={false}>Paid</Option>
              </Select>

              <div className="flex justify-between">
                <button
                  className="w-full p-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition"
                  onClick={handleUpdate}
                >
                  Update Product
                </button>
             
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SingleProductUpdate;
