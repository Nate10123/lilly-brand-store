async function fetchPrintfulProducts() {
  try {
    const response = await fetch('https://api.printful.com/store/products', {
      headers: { Authorization: 'Bearer YOUR_PRINTFUL_KEY' }
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Error fetching Printful products:', error);
    throw error;
  }
}
