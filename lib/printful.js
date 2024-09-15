export async function fetchPrintfulProducts() {
  const response = await fetch('https://api.printful.com/store/products', {
    headers: {
      Authorization: 'Bearer 7vRguL8KhUFeRLRWMEdBx4uTOsYremkEkGBHLeCB'
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await response.json();
  return data.result;
}
