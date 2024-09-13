// Initialize Stripe with your publishable key
var stripe = Stripe('pk_test_51PXaWjBbpC4dD3dTRcSrwqAWdgHHtAV8RO1v8W7fpbfY91FaqOKqbpdlwjJQAWtUSZu3hkczabVoksBOsBi0Xjur00ju2anpdH');

// Function to initiate the checkout process
function buyProduct(productId) {
    stripe.redirectToCheckout({
        lineItems: [{
            price: productId, // Use your Stripe product price ID here
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
