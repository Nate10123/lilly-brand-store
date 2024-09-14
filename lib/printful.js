// lib/printful.js
import axios from 'axios';

const API_KEY = '7vRguL8KhUFeRLRWMEdBx4uTOsYremkEkGBHLeCB'; // Your Printful API Key

export const getProducts = async () => {
  try {
    const response = await axios.get('https://api.printful.com/store/products', {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
      },
    });
    return response.data.result;
  } catch (error) {
    console.error('Error fetching products from Printful:', error);
    return [];
  }
};
