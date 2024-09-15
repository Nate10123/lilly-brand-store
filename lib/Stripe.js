const stripePublicKey = 'pk_test_51PXaWjBbpC4dD3dTRcSrwqAWdgHHtAV8RO1v8W7fpbfY91FaqOKqbpdlwjJQAWtUSZu3hkczabVoksBOsBi0Xjur00ju2anpdH';
const stripe = Stripe(stripePublicKey);

export function startPayment(amount) {
  stripe.redirectToCheckout({
    lineItems: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Product Name',
        },
        unit_amount: amount * 100, // amount in cents
      },
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
