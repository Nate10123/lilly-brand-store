const printfulApiKey = '7vRguL8KhUFeRLRWMEdBx4uTOsYremkEkGBHLeCB';

export async function fetchPrintfulProducts() {
  const response = await fetch('https://api.printful.com/store/products', {
    headers: {
      'Authorization': `Bearer ${printfulApiKey}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch products from Printful');
  }

  const data = await response.json();
  return data.result.map(product => ({
    name: product.name,
    price: product.retail_price,
    thumbnail_url: product.thumbnail_url
  }));
}
