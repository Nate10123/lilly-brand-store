// lib/printful.js

export async function fetchPrintfulProducts() {
  const apiKey = '7vRguL8KhUFeRLRWMEdBx4uTOsYremkEkGBHLeCB'; // Printful API Key

  try {
    const response = await fetch('https://api.printful.com/store/products', {
      headers: {
        'Authorization': `Basic ${btoa(apiKey)}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    return data.result.map(product => ({
      name: product.name,
      price: product.variants[0].retail_price,
      thumbnail_url: product.thumbnail_url,
    }));
  } catch (error) {
    console.error('Error fetching Printful products:', error);
    return [];
  }
}
