import getStripe from '../lib/stripe';

export default function ProductCard({ product }) {
  const startCheckout = async () => {
    const stripe = await getStripe();
    await stripe.redirectToCheckout({
      lineItems: [{ price: product.variant_id, quantity: 1 }],
      mode: 'payment',
      successUrl: `${window.location.origin}/success`,
      cancelUrl: `${window.location.origin}/cancel`,
    });
  };

  return (
    <div className="product-card">
      <img src={product.thumbnail_url} alt={product.name} />
      <h2>{product.name}</h2>
      <p>Price: {product.price} USD</p>
      <button onClick={startCheckout}>Buy Now</button>
    </div>
  );
}
