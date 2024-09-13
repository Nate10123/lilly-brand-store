const productList = document.getElementById('product-list');

// Fetch products from Printful
async function fetchProducts() {
    try {
        const response = await fetch('https://api.printful.com/store/products', {
            headers: {
                'Authorization': 'Bearer 7vRguL8KhUFeRLRWMEdBx4uTOsYremkEkGBHLeCB'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        console.log("Fetched products: ", data); // Log the response

        displayProducts(data.result);
    } catch (error) {
        console.error('Error fetching products:', error);
        productList.innerHTML = '<p>Unable to load products. Please try again later.</p>';
    }
}

// Display products on the page
function displayProducts(products) {
    if (!products || products.length === 0) {
        productList.innerHTML = '<p>No products available.</p>';
        return;
    }

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
            price: productId, // Use Stripe price ID
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
