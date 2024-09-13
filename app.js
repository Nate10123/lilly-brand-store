function buyProduct() {
    stripe.redirectToCheckout({
        lineItems: [{
            price: 'price_1PyTax8bpC4D3fT9y760oX', // Use your actual Price ID here
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
