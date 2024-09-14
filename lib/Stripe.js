const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function createPaymentIntent(amount) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount, // amount in cents
    currency: 'usd',
    automatic_payment_methods: {enabled: true},
  });

  return paymentIntent.client_secret;
}
