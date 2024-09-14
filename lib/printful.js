const fetch = require('node-fetch');

const PRINTFUL_API_URL = 'https://api.printful.com/store/products';
const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY;  // Environment variable for the Printful API key

async function getProducts() {
    const response = await fetch(PRINTFUL_API_URL, {
        headers: {
            Authorization: `Bearer ${PRINTFUL_API_KEY}`
        }
    });
    const data = await response.json();
    return data.result;
}

module.exports = { getProducts };
