export async function fetchPrintfulProducts() {
  try {
    const response = await fetch('https://api.printful.com/store/products', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.7vRguL8KhUFeRLRWMEdBx4uTOsYremkEkGBHLeCB}` // Use env variable
      }
    });

    // Log status and data for debugging
    console.log('Response Status:', response.status);
    const data = await response.json();
    console.log('API Response Data:', data);

    if (!response.ok) {
      throw new Error(`Failed to fetch products, status: ${response.status}`);
    }

    return data.result;
  } catch (error) {
    console.error('Error fetching products:', error.message);
    return []; // Return empty list if there's an error
  }
}
