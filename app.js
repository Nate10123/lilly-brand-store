document.addEventListener('DOMContentLoaded', async () => {
  const productList = document.getElementById('product-list');

  try {
    // Fetch products from the Vercel API endpoint
    const response = await fetch('/api/products');
    const { result: products } = await response.json();  // Fetch the products

    if (products.length === 0) {
      productList.innerHTML = '<p>No products available at the moment.</p>';
      return;
    }

    // Display each product
    products.forEach(product => {
      const item = document.createElement('div');
      item.classList.add('product-item');
      item.innerHTML = `
        <img src="${product.thumbnail_url}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Price: ${product.price} USD</p>
        <button onclick="startPayment(${product.price})">Buy Now</button>
      `;
      productList.appendChild(item);
    });
  } catch (error) {
    console.error('Error loading products:', error);
    productList.innerHTML = '<p>Error loading products. Please try again later.</p>';
  }
});
