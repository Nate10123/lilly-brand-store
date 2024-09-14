const fetch = require('node-fetch');

const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY;

export async function fetchPrintfulProducts() {
  const response = await fetch('https://api.printful.com/store/products', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${PRINTFUL_API_KEY}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch products from Printful');
  }

  const data = await response.json();
  return data.result; // Returns the list of products
}
