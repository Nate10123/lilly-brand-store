const productList = document.getElementById('product-list');

// Fetch products from Printful
async function fetchProducts() {
    try {
        const response = await fetch('https://api.printful.com/store/products', {
            headers: {
                'Authorization': 'Bearer YOUR_PRINTFUL_API_KEY'
            }
        });
        const data = await response.json();
        displayProducts(data.result);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Display products on the page
function displayProducts(products) {
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.thumbnail_url}" alt="${product.name}">
            <h2>${product.name}</h2>
            <button onclick="buyProduct('${product.id}')">Buy Now</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Stripe setup
var stripe = Stripe('YOUR_STRIPE_PUBLISHABLE_KEY');

function buyProduct(productId) {
    stripe.redirectToCheckout({
        lineItems: [{
            price: productId, // This would be your Stripe price ID
            quantity: 1,
        }],
        mode: 'payment',
        successUrl: window.location.origin + '/success.html',
        cancelUrl: window.location.origin + '/cancel.html',
    }).then(function (result) {
        if (result.error) {
            console.error(result.error.message);
        }
    });
}

// Fetch products on page load
fetchProducts();
