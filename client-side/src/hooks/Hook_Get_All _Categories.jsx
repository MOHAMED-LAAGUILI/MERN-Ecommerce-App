import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast';
const apiUrl = import.meta.env.REACT_APP_API;

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  //get categories
  const getAllCategories = async () => {
    try {
      const {data} = await axios.get(
        `${apiUrl}/api/v1/category/all-categories`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (data.success) {
        setCategories(data.categories || []);
      } else {
        console.error("Error fetching categories:", data.message);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return categories;
}