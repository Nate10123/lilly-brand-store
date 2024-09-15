document.addEventListener('DOMContentLoaded', async () => {
  const productList = document.getElementById('product-list');

  try {
    const response = await fetch('/api/products');
    const products = await response.json();

    if (products.length === 0) {
      productList.innerHTML = '<p>No products available at the moment.</p>';
      return;
    }

    products.forEach(product => {
      const item = document.createElement('div');
      item.classList.add('product-item');
      item.innerHTML = `
        <img src="${product.thumbnail_url}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Price: ${product.variants[0].retail_price} USD</p>
        <button onclick="startPayment(${product.variants[0].retail_price})">Buy Now</button>
      `;
      productList.appendChild(item);
    });
  } catch (error) {
    console.error('Error loading products:', error);
    productList.innerHTML = '<p>Error loading products. Please try again later.</p>';
  }
});
