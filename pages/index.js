import { fetchPrintfulProducts } from '../lib/printful';
import ProductCard from '../components/ProductCard';

export default function Home({ products }) {
  return (
    <div>
      <h1>La Lilly Store</h1>
      <div className="product-list">
        {products.length === 0 ? (
          <p>No products available at the moment.</p>
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const products = await fetchPrintfulProducts();
    return { props: { products } };
  } catch (error) {
    return { props: { products: [] } };
  }
}
