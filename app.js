import { fetchPrintfulProducts } from './lib/printful.js';
import { startPayment } from './lib/stripe.js';

document.addEventListener('DOMContentLoaded', async () => {
  const productList = document.getElementById('product-list');

  try {
    const products = await fetchPrintfulProducts();

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
