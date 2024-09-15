export function startPayment(amount) {
  const stripe = Stripe('pk_test_51PXaWjBbpC4dD3dTRcSrwqAWdgHHtAV8RO1v8W7fpbfY91FaqOKqbpdlwjJQAWtUSZu3hkczabVoksBOsBi0Xjur00ju2anpdH');

  stripe.redirectToCheckout({
    lineItems: [{ price: 'price_ID', quantity: 1 }], // Replace with correct product price ID
    mode: 'payment',
    successUrl: window.location.origin + '/success.html',
    cancelUrl: window.location.origin + '/cancel.html',
  }).then(function (result) {
    if (result.error) {
      console.error('Error redirecting to checkout:', result.error.message);
    }
  });
}
