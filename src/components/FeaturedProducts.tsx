import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { SectionHeading } from '@/components/SectionHeading';
import { fetchStoreProducts } from '@/lib/products';

interface FeaturedProductsProps {
  limit?: number;
  showViewAll?: boolean;
}

export async function FeaturedProducts({ limit = 6, showViewAll = true }: FeaturedProductsProps) {
  const products = await fetchStoreProducts();
  const featured = products.slice(0, limit);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} compact />
        ))}
      </div>
      {showViewAll && products.length > limit && (
        <div className="mt-10 text-center">
          <Link href="/products" className="btn-primary inline-flex">
            View All {products.length} Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      )}
    </>
  );
}

export async function ProductsGrid() {
  const products = await fetchStoreProducts();

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
