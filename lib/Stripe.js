const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Access environment variable for Stripe secret key

async function createCheckoutSession(product) {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: product.name,
                        images: [product.image],
                    },
                    unit_amount: product.price * 100, // Stripe handles price in cents
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${process.env.DOMAIN}/success.html`,
        cancel_url: `${process.env.DOMAIN}/cancel.html`,
    });
    return session;
}

module.exports = { createCheckoutSession };
