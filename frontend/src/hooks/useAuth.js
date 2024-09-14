import { useState } from 'react';
import axios from 'axios';

// Set the base URL for Axios
axios.defaults.baseURL = 'http://localhost:5000'; // Update this if your backend runs on a different port

const useAuth = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const register = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/auth/register', { email, password });
      return response.data; // Return the response data
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err; // Rethrow the error for further handling
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token); // Store token
      return response.data; // Return the response data
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err; // Rethrow the error for further handling
    } finally {
      setLoading(false);
    }
  };

  return { register, login, error, loading };
};

export default useAuth;