import { useState, useEffect } from 'react';
import axios from 'axios';

const useProductImage = (productId) => {
  const [imageUrl, setImageUrl] = useState('');
  const apiUrl = import.meta.env.REACT_APP_API;

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/v1/product/product-photo/${productId}`);
        setImageUrl(response.data.imageUrl);
      } catch (error) {
        console.error(error);
      }
    };
    fetchImage();
  }, [productId]);

  return imageUrl;
};

export default useProductImage;