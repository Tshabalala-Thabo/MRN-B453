import { useState, useEffect } from 'react';
import axios from '../config/axiosConfig'; // Import the configured Axios instance

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/products'); // Fetch products from the backend
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch products');
        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`/products/${productId}`); // Delete the product from the backend
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId)); // Update state
      return response.data.message; // Return success message
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete product. Please try again.'); // Fetch error from backend
      console.error('Error deleting product:', err);
      throw new Error(err.response?.data?.message || 'Failed to delete product. Please try again.'); // Throw error for handling in the component
    }
  };

  const createProduct = async (newProductData) => {
    try {
      const response = await axios.post('/products', newProductData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type for file upload
        },
      });
      setProducts((prevProducts) => [...prevProducts, response.data.product]); // Add the created product to the state
      return response.data.message // Return success message and the created product
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create product. Please try again.'); // Fetch error from backend
      console.error('Error creating product:', err);
      throw new Error(err.response?.data?.message || 'Failed to create product. Please try again.'); // Throw error for handling in the component
    }
  };

  const updateProduct = async (productId, updatedProductData) => {
    try {
      const response = await axios.put(`/products/${productId}`, updatedProductData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type for file upload
        },
      });
      setProducts((prevProducts) =>
        prevProducts.map((product) => (product._id === productId ? response.data.product : product))
      ); // Update the product in the state
      return response.data.message; // Return success message
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update product. Please try again.'); // Fetch error from backend
      console.error('Error updating product:', err);
      throw new Error(err.response?.data?.message || 'Failed to update product. Please try again.'); // Throw error for handling in the component
    }
  };

  return { products, isLoading, error, deleteProduct, createProduct, updateProduct }; // Return create and update functions
};

export default useProducts;
