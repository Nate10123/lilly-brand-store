const fetch = require('node-fetch');

const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY;

export async function fetchPrintfulProducts() {
  try {
    const response = await fetch('https://api.printful.com/store/products', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${PRINTFUL_API_KEY}`
      }
    });

    // Log the entire response
    console.log('Printful response:', response);

    if (!response.ok) {
      throw new Error('Failed to fetch products from Printful');
    }

    const data = await response.json();
    console.log('Printful products data:', data);
    return data.result; // Returns the list of products
  } catch (error) {
    console.error('Error fetching products:', error.message);
    return []; // Return empty list if there's an error
  }
}
