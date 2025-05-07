import axios from 'axios';

// The base URL will be proxied by Vite dev server to your backend
const API_BASE_URL = '/api';

export const getTopUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching top users:', error);
    throw error;
  }
};

export const getTrendingPosts = async () => {
  try {
    // Assuming 'popular' type fetches trending posts (max comments)
    const response = await axios.get(`${API_BASE_URL}/posts?type=popular`);
    return response.data;
  } catch (error) {
    console.error('Error fetching trending posts:', error);
    throw error;
  }
};

export const getFeedPosts = async () => {
  try {
    // No type parameter fetches latest posts by default from your backend
    const response = await axios.get(`${API_BASE_URL}/posts`);
    return response.data;
  } catch (error)
 {
    console.error('Error fetching feed posts:', error);
    throw error;
  }
};