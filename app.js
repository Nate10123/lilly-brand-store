const apiToken = '7vRguL8KhUFeRLRWMEdBx4uTOsYremkEkGBHLeCB'; // Your API token

// Fetch products from Printful
async function fetchProducts() {
    try {
        const response = await fetch('https://api.printful.com/store/products', {
            headers: {
                'Authorization': `Bearer ${apiToken}`
            }
        });
        const data = await response.json();
        console.log(data); // This will print the API response in the console for debugging
        const products = data.result;

        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Display products in the HTML
function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear previous content

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        productCard.innerHTML = `
            <img src="${product.thumbnail_url}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.retail_price}</p>
            <button onclick="addToCart('${product.id}')">Add to Cart</button>
        `;
        productList.appendChild(productCard);
    });
}

// Add product to cart
let cart = [];

function addToCart(productId) {
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity += 1; // Increase quantity if already in the cart
    } else {
        cart.push({ id: productId, quantity: 1 });
    }

    displayCart();
}

// Display cart items
function displayCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ''; // Clear previous content

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';

            cartItem.innerHTML = `
                <p>Product ID: ${item.id}, Quantity: ${item.quantity}</p>
            `;

            cartItems.appendChild(cartItem);
        });
    }
}

// Checkout function (to be integrated with Snipcart or Printful)
function checkout() {
    alert('Checkout functionality to be added.');
}

// Fetch and display products when the page loads
fetchProducts();
