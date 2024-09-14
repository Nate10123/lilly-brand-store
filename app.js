const { getProducts } = require('./lib/printful');
const { createCheckoutSession } = require('./lib/Stripe');

// Fetch and display products
async function displayProducts() {
    const productsContainer = document.getElementById('products');
    const products = await getProducts();

    products.forEach(product => {
        const productHTML = `
            <div class="product">
                <img src="${product.thumbnail_url}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>Price: $${product.retail_price}</p>
                <button onclick="buyProduct('${product.id}')">Buy Now</button>
            </div>`;
        productsContainer.innerHTML += productHTML;
    });
}

// Handle buying product
async function buyProduct(productId) {
    const product = await getProductById(productId); // Fetch product details
    const session = await createCheckoutSession(product);

    // Redirect to Stripe Checkout
    window.location = session.url;
}

// On page load, display products
window.onload = function() {
    displayProducts();
};
