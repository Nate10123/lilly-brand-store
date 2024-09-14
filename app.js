import { fetchPrintfulProducts } from './lib/printful';
import { createPaymentIntent } from './lib/Stripe';

// Display Printful products on the page
document.addEventListener('DOMContentLoaded', async () => {
  const productList = document.getElementById('product-list');

  try {
    const products = await fetchPrintfulProducts();

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
  }
});

// Handle Stripe payment
async function startPayment(price) {
  const response = await fetch('/create-payment-intent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount: price * 100 }), // Convert to cents
  });

  const { clientSecret } = await response.json();

  const stripe = Stripe('your-publishable-key-here'); // Replace with your publishable key

  const result = await stripe.confirmCardPayment(clientSecret);

  if (result.error) {
    console.error('Payment failed:', result.error.message);
  } else {
    console.log('Payment successful!');
  }
}
